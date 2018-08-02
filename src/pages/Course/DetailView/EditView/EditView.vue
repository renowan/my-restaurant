<template>
  <div class="ly">
    <div class="ly-left">
      <div class="row">
        <div class="col-xs-12">
          <h3 class="mt8 mb24">{{pageTitle}}</h3>
        </div>
      </div>

      <baseInfo :editData="editData" :errors="errors"></baseInfo>

      <itemGroup
      v-for="(group, index) in editData.itemGroup"
      :group="group"
      :index="index"
      :key="index"
      :tabList="tabList"
      :productList="productList"
      :productObj="course.productObj"
      :canDeleteGroup="canDeleteGroup"
      @change-index="changeIndex"
      @delete-group="deleteGroup">
       </itemGroup>

      <div class="row mb32">
        <div class="col-xs-12 mb32 text-right">
          <button type="button" class="btn btn-default" @click="cancel">
            キャンセル
          </button>
          <button type="button" class="btn btn-primary" @click="checkForm">
            保存
          </button>
          <button type="button" class="btn btn-success" @click="addGroup">
            グループ追加
          </button>
        </div>
      </div>
    </div>

    <div class="ly-right pr">
      <div class="container-fluid">
        <courseOutLine :editData="editData" :productObj="course.productObj"></courseOutLine>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'
import { select } from 'vue-strap'
import { getDefaultData } from '@/common/constant/defaultData'
import itemGroup from './ItemGroup'
import baseInfo from './BaseInfo'
import courseOutLine from './CourseOutLine/CourseOutLine'

export default {
  name: 'edit-view',
  components: {
    vSelect: select,
    itemGroup,
    courseOutLine,
    baseInfo
  },
  computed: Object.assign(
    {},
    mapGetters({
      app: 'app/state',
      course: 'course/state',
      data: 'course/data',
      tabList: 'course/tabList',
      productList: 'course/productList'
    }),
    {
      noCourse () {
        return this.course.isLoaded && this.list.length < 1
      },
      canDeleteGroup () {
        return this.editData.itemGroup.length > 1
      },
      pageTitle () {
        return this.isCreateMode ? '新規コース' : 'コース編集'
      }
    }
  ),
  watch: {
    'course.isSaved' (val) {
      if (val) {
        this.$router.push({ name: 'course' })
      }
    }
  },
  data () {
    return {
      isCreateMode: false,
      courseId: '',
      currentMenuTab: 1,
      errors: [],
      editData: null
    }
  },
  created () {
    const routerName = this.$route.name
    this.isCreateMode = routerName === 'course-create'
    if (this.isCreateMode) {
      this.editData = getDefaultData('course')
      this.editData.itemGroup[0].errors = []
    } else {
      this.courseId = this.$route.params.id
      // コース編集の処理
      const data = cloneDeep(this.data)
      data.itemGroup = data.itemGroup.map((group, index) => {
        group.errors = []
        return group
      })
      this.editData = data
    }

    // 初期化
    this.$store.commit('course/DETAIL_INIT')
  },
  methods: {
    goList () {
      this.$router.push({ name: 'course' })
    },
    addGroup () {
      this.editData.itemGroup.push({
        item: [],
        name: '',
        errors: []
      })
    },
    deleteGroup (index) {
      this.editData.itemGroup.splice(index, 1)
    },
    checkForm () {
      const errors = []
      if (!this.editData.name) errors.push('name')
      if (!this.editData.description) errors.push('description')
      if (!Number.isInteger(this.editData.price)) errors.push('price')

      let hasGroupError = false

      this.editData.itemGroup.forEach((elm, index) => {
        const groupErrors = this.checkGroup(elm)
        this.editData.itemGroup[index].errors = groupErrors
        if (groupErrors.length) {
          hasGroupError = true
        }
        // 発火させるためにオブジェクトを上書き
        this.editData.itemGroup[index] = Object.assign({}, this.editData.itemGroup[index])
      })

      this.errors = errors

      if (hasGroupError || errors.length) return

      const postData = cloneDeep(this.editData)

      if (this.isCreateMode) {
        this.$store.dispatch('course/createCourse', postData)
      } else {
        this.$store.dispatch('course/updateCourse', { id: this.courseId, postData })
      }
    },
    checkGroup (group) {
      const errors = []
      if (group.name === '') {
        errors.push('name')
      }
      if (!group.item.length) {
        errors.push('no-item')
      }
      group.item.forEach((elm) => {
        if (!Number.isInteger(elm.value) || elm.value < 0) {
          errors.push('price')
        }
      })
      return errors
    },
    cancel () {
      if (this.isCreateMode) {
        this.$router.push({ name: 'course' })
      } else {
        this.$router.push({ name: 'course-detail', id: this.courseId })
      }
    },
    changeIndex (order) {
      const { index, value, groupIndex } = order
      const editData = cloneDeep(this.editData)
      const itemGroup = editData.itemGroup
      // max個数
      const length = itemGroup[groupIndex].item.length
      // 交換対象
      const target = index + value

      // 範囲外の場合、実行しない
      if (target < 0 || target > length - 1) return

      const backup = itemGroup[groupIndex].item[target]

      itemGroup[groupIndex].item[target] = itemGroup[groupIndex].item[index]
      itemGroup[groupIndex].item[index] = backup

      this.editData = editData
    }
  }
}
</script>

<style lang="scss" scoped>
.ly {
  display: table;
  width: 100%;
  // border-top: 1px solid #ddd;
  min-height: 500px;

  .ly-left {
    display: table-cell;
    padding: 16px 16px 0;
    background-color: #fafafa;
    // width: 80%;
  }
  .ly-right {
    display: table-cell;
    width: 280px;
    background-color: #f5f5f5;
    border-left: 1px solid #ddd;
    padding: 16px 8px 8px;
    vertical-align: top;
  }
}

.menu-list {
  border: 1px solid #ddd;
  border-top-width: 0;
  background-color: #fff;
  overflow-y: scroll;
  max-height: 200px;
}

.td-plus {
  width: 21px;
  padding-right: 0;
  vertical-align: top;
}
.td-name {
  border-right: 1px solid #e5e5e5;
}
.td-price {
  width: 66px;
  background: #fdfdfd;
}

.ilb {
  display: inline-block;
  width: auto;
}

.pr {
  position: relative;
}
</style>
