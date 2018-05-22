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
                    <h2 class="cal-title">{{yearmonth}}</h2>
                  </div>
                  <div class="col-xs-6 text-right">
                    <button type="button" class="btn btn-default btn-today">
                      今日
                    </button>
                    <div class="btn-group">
                      <button type="button" class="btn btn-default btn-arrow">
                        <i class="fa fa-angle-left"></i>
                      </button>
                      <button type="button" class="btn btn-default btn-arrow">
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
                <th>日</th>
                <th>月</th>
                <th>火</th>
                <th>水</th>
                <th>木</th>
                <th>金</th>
                <th>土</th>
              </tr>
            </thead>
            <calendarBody :yearmonth="yearmonth"></calendarBody>
          </table>
        </div>
      </div>
    </div>
  </content-wrapper>
</template>

<script>
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
    }),
    {}
  ),
  watch: {

  },
  data () {
    return {
      breadcrumb: [
        { label: 'Home', link: '/' },
        { label: '予約カレンダー', link: null }
      ],
      yearmonth: ''
    }
  },
  created () {
    const yearmonth = this.$route.params.yearmonth
    console.log('yearmonth', yearmonth)
    if (yearmonth === 'none') {
      // 指定なし
      this.yearmonth = this.app.serverTime.yyyymm
    } else {
      this.yearmonth = yearmonth
    }
  },
  methods: {

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
