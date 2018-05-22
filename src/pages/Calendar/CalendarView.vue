<template>
  <content-wrapper :breadcrumb="breadcrumb" sectionClass="">

    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <div class="panel panel-widget calendar-widget mbn">
            <div class="panel-body">
              <!-- header -->
              <div class="fc-toolbar">
                <div class="row">
                  <div class="col-xs-6">
                    <h2 class="cal-title">{{titleTxt}}</h2>
                  </div>
                  <div class="col-xs-6 text-right">
                    <button type="button" class="btn btn-default btn-today" @click="goCurrentMonth">
                      今月
                    </button>
                    <div class="btn-group">
                      <button type="button" class="btn btn-default btn-arrow" @click="goPrev">
                        <i class="fa fa-angle-left"></i>
                      </button>
                      <button type="button" class="btn btn-default btn-arrow" @click="goNext">
                        <i class="fa fa-angle-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- table -->
          <table class="cal-table">
            <thead>
              <tr>
                <th><span class="text-danger">日</span></th>
                <th>月</th>
                <th>火</th>
                <th>水</th>
                <th>木</th>
                <th>金</th>
                <th><span class="text-info">土</span></th>
              </tr>
            </thead>
            <calendarBody :yearMonth="yearMonth" :dateRange="dateRange"></calendarBody>
          </table>
        </div>
      </div>
    </div>
  </content-wrapper>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import contentWrapper from '@/components/Layout/ContentWrapper'
import calendarBody from './CalendarBody'

export default {
  name: 'calendar-view',
  components: {
    contentWrapper,
    calendarBody
  },
  computed: Object.assign({},
    mapGetters({
      app: 'app/state',
      cal: 'cal/state',
      dateRange: 'cal/dateRange',
    }),
    {}
  ),
  watch: {
    '$route.params.yearMonth' (val) {
      this.init()
    }
  },
  data () {
    return {
      breadcrumb: [
        { label: 'Home', link: '/' },
        { label: '予約カレンダー', link: null }
      ],
      yearMonth: '',
      titleTxt: ''
    }
  },
  created () {
    if (!this.app.isLogin) {
      this.$router.push('/login')
      return
    }
    this.init()
  },
  methods: {
    init () {
      const yearMonth = this.$route.params.yearMonth
      if (yearMonth === 'none') {
        // 指定なし
        this.yearMonth = this.app.serverTime.yyyymm
      } else {
        this.yearMonth = yearMonth
      }
      this.titleTxt = moment(this.yearMonth + '01').format('YYYY年M月')
      this.$store.dispatch('cal/getMontly', this.yearMonth)
    },
    goCurrentMonth () {
      const yearMonth = this.app.serverTime.yyyymm
      this.goExe(yearMonth)
    },
    goPrev () {
      const now = this.yearMonth + '01'
      const yearMonth = moment(now).subtract(1, 'months').format('YYYYMM')
      this.goExe(yearMonth)
    },
    goNext () {
      const now = this.yearMonth + '01'
      const yearMonth = moment(now).add(1, 'months').format('YYYYMM')
      this.goExe(yearMonth)
    },
    goExe (yearMonth) {
      this.$router.push({ name: 'cal', params: { yearMonth } })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-body {
  border: 1px solid #e5e5e5;
  border-bottom-width: 0px;
}

.calendar-widget .fc-toolbar h2 {
  font-size: 22px;
  margin: 4px 0 0 0;
}

.btn-today {
  width: 60px;
}
.btn-arrow {
  width: 40px;
}

.cal-table {
  width: 100%;
  background-color: #fff;

  th {
    background-color: #f5f5f5;
    padding: 4px 0;
    color: #999;
    // font-size: 11px;
    font-weight: 400;
    text-align: center;
    border: 1px solid #ddd;
  }
}
</style>
