<template>
  <content-wrapper :breadcrumb="breadcrumb" sectionClass="pn">

    <div class="container-fluid mv8">
      <div class="row">
        <div class="col-xs-6">
          <div class="btn-group btn-group">
            <button type="button" class="btn btn-default btn-go-prve" @click="goPrveDay">
              <i class="fa fa-angle-left"></i>
            </button>
            <calendar
            v-model="calValue"
            :format="format"
            :has-input="true">
          </calendar>
          <button type="button" class="btn btn-default btn-go-next" @click="goNextDay">
            <i class="fa fa-angle-right"></i>
          </button>
          </div>
        </div>
        <div class="col-xs-6 mt4 text-right">
          <div class="btn-group">
            <button type="button" class="btn bg-light br-b br-light btn-keisai" @click="updateMode(true)">
              <i class="fa fa-tasks"></i> シート
            </button>
            <button type="button" class="btn bg-light br-b br-light btn-keisai" @click="updateMode(false)">
              <i class="fa fa-list-ul"></i> リスト
            </button>
          </div>

          <button type="button" class="btn bg-light br-b br-light" @click="getList(true)">
            更新
          </button>
          <button type="button" class="btn btn-info" @click="createRsv">
            新規予約
          </button>
        </div>
      </div>
    </div>

    <div class="ly">
      <div class="ly-left">

        <SheetView
        v-if="isListMode"
        :rsvList="rsv.list"
        :tableList="tableList"
        :uiLoadingList="app.uiLoadingList"
        @on-select="onSelect"
        @create-rsv="createRsv"
        @on-change-drag-item="onChangeDragItem">
        </SheetView>

        <listView v-else
        :rsvList="rsv.list"
        :tableList="tableList"
        @on-select="onSelect"
        @rsv-action="rsvAction">
        </listView>

      </div>
      <div class="ly-right clearfix">
        <detailView
        :onSelectId="onSelectId"
        :rsvList="rsv.list"
        :tableList="tableList"
        :courseList="courseList"
        :uiLoadingList="app.uiLoadingList"
        @show-course-detail="showCourseDetail"
        @rsv-action="rsvAction">
        </detailView>
      </div>
    </div>

    <div slot="topBarRight">
      <!-- <button type="button" class="btn btn-default btn-sm">
        testbtn
      </button> -->
    </div>

    <deleteModal
    :showModal="showDeleteModal"
    :rsv="deleteTarget"
    :tableList="tableList"
    @delete-rsv-exe="deleteRsvExe"
    @close-delete-modal="showDeleteModal = false">
    </deleteModal>

    <createRsvModal
    :showModal="showCreateModal"
    :today="date"
    :modalType="modalType"
    :editData="editData"
    :tableList="tableList"
    :courseList="courseList"
    :createRequest="createRequest"
    @create-rsv="createRsvExe"
    @close-create-modal="closeCreateModal">
    </createRsvModal>

    <courseModal
    :showModal="showCourseModal"
    :courseId="courseId"
    :courseList="courseList"
    :productObj="productObj"
    @close-create-modal="showCourseModal = false">

    </courseModal>

  </content-wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { cloneDeep } from 'lodash'
import contentWrapper from '@/components/Layout/ContentWrapper'
import calendar from '@/components/ui/Calendar'
import modal from '@/components/ui/Modal'
import SheetView from './SheetView/SheetView'
import listView from './ListView/ListView'
import detailView from './DetailView/DetailView'
import createRsvModal from './CreateRsvModal/CreateRsvModal'
import deleteModal from './DeleteModal/DeleteModal'
import courseModal from './CourseModal/CourseModal'

const changeDateFormat = (val, format) => {
  if (val.indexOf('/') > -1) {
    return val.replace(/\//g, '')
  } else {
    const y = val.slice(0, 4)
    const m = val.slice(4, 6)
    const d = val.slice(6, 8)
    return `${y}/${m}/${d}`
  }
}

export default {
  name: 'rsv2-view',
  components: {
    contentWrapper,
    calendar,
    modal,
    SheetView,
    listView,
    detailView,
    createRsvModal,
    deleteModal,
    courseModal
  },
  computed: Object.assign({},
    mapGetters({
      app: 'app/state',
      rsv: 'rsv/state',
      tableList: 'table/list',
      courseList: 'course/list',
      productObj: 'course/productObj',
    }),
    {
      calValue: {
        get () {
          return changeDateFormat(this.date)
        },
        set (val) {
          const date = changeDateFormat(val)
          if (date === this.date) return
          this.date = date
          this.onDayClick(date)
        }
      }
    }
  ),
  data () {
    return {
      breadcrumb: [
        { label: 'Home', link: '/' },
        { label: '予約カレンダー', link: '/cal/none' },
        { label: '予約', link: null }
      ],
      date: null,
      onSelectId: '',
      // calValue: '2018/04/01',
      deleteTarget: null,
      format: 'yyyy/MM/dd',
      showCreateModal: false,
      createRequest: null,
      showDeleteModal: false,
      modalType: 'create',
      editData: null,
      showCourseModal: false,
      courseId: '',
      // courseList: [
      //   { name: '未選択', id: null },
      //   { name: 'コース1', id: 'abd1' },
      //   { name: 'コース2', id: 'abd2' },
      //   { name: 'コース3', id: 'abd3' },
      // ],
      isListMode: true
    }
  },
  watch: {
    'app.isAppLoaded' (val) {
      if (val) {
        this.init()
      }
    },
    '$route.params.date' () {
      this.init()
    },
    // 保存完了
    'rsv.saved' (val) {
      if (val) {
        this.getList()
      }
    },
    // 新規rsvのオーダーをリセット
    closeCreateModal (val) {
      if (!val) {
        this.createRequest = null
      }
    }
  },
  created () {
    if (!this.app.isLogin) {
      this.$router.push('/login')
      return
    }
    if (this.app.isAppLoaded) {
      this.init()
    }
  },
  methods: {
    init () {
      let date = this.$route.params.date
      if (date === 'none') {
        date = this.app.serverTime.yyyymmdd
      }
      this.date = date
      if (this.app.isDebug) return
      this.$store.dispatch('rsv/getRsvByDate', { date, isShowLoading: true })
      const yearMonth = moment(date).format('YYYYMM')
      this.breadcrumb[1].link = `/cal/${yearMonth}`
      this.breadcrumb[2].label = moment(date).format('YYYY年M月D日')
    },
    onSelect (id) {
      if (this.onSelectId !== id) {
        this.onSelectId = id
      }
    },
    createRsv (request) {
      this.modalType = 'create'
      this.createRequest = request
      this.showCreateModal = true
    },
    onDayClick (e) {
      const date = moment(e).format('YYYYMMDD')
      this.$router.push({ name: 'rsv', params: { date } })
    },
    getList (isShowLoading = false) {
      this.$store.dispatch('rsv/getRsvByDate', { date: this.date, isShowLoading })
    },
    updateMode (val) {
      this.isListMode = val
    },
    rsvAction (e) {
      const { action, id } = e
      switch (action) {
        case 'edit':
          this.setEditData(id)
          break
        case 'delete':
          this.deleteRsv(id)
          break
        case 'copy':
          console.log('copy', id)
          break
        default:
          break
      }
    },
    deleteRsv (id) {
      const rsv = this.rsv.list.filter((rsv) => rsv.id === id)[0]
      this.deleteTarget = rsv
      this.showDeleteModal = true
    },
    deleteRsvExe (id) {
      this.$store.dispatch('rsv/delete', this.deleteTarget)
      this.showDeleteModal = false
    },
    closeCreateModal () {
      this.showCreateModal = false
    },
    setEditData (id) {
      const target = this.rsv.list.filter((rsv) => rsv.id === id)
      if (target.length) {
        this.editData = cloneDeep(target[0])
        this.modalType = 'edit'
        this.showCreateModal = true
      }
    },
    createRsvExe (rsv) {
      if (this.modalType === 'create') {
        // 新規作成モード
        this.$store.dispatch('rsv/createRsv', rsv)
      } else {
        // 更新モード
        this.$store.dispatch('rsv/update', rsv)
      }
      this.showCreateModal = false
    },
    // 予約アイテムがドラッグされた
    onChangeDragItem (order) {
      this.$store.dispatch('rsv/updateDragItem', order)
    },
    goPrveDay () {
      const date = moment(this.calValue).subtract(1, 'day').format('YYYY/MM/DD')
      this.calValue = date
    },
    goNextDay () {
      const date = moment(this.calValue).add(1, 'day').format('YYYY/MM/DD')
      this.calValue = date
    },
    showCourseDetail (courseId) {
      console.log('showCourseDetail', courseId)
      this.courseId = courseId
      this.showCourseModal = true
    }
  }
}
</script>

<style lang="scss" scoped>
.ly {
  display: table;
  width: 100%;
  border-top: 1px solid #ddd;
  min-height: 500px;

  .ly-left {
    display: table-cell;
    padding: 16px 16px 0;
    background-color: #fafafa;
    // width: 80%;
  }
  .ly-right {
    display: table-cell;
    width: 260px;
    background-color: #f5f5f5;
    border-left: 1px solid #DDD;
    padding: 0 24px 0;
    vertical-align: top;
  }
}

.btn-go-prve {
  border-right: 0;
  width: 36px;
}
.btn-go-next {
  border-left: 0;
  width: 36px;
}
.datepicker {
  padding: 0;
  float: left;
}
</style>
