export default {
  dateFormat: 'yyyyMMdd',
  siblingsMonth (v, n) {
    return new Date(v.getFullYear(), v.getMonth() * 1 + n)
  },
  parse (str) {
    let date = new Date(str)
    date.setHours(0, 0, 0)
    return isNaN(date.getFullYear()) ? new Date() : date
  },
  getDayCount (year, month) {
    const dict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (month === 1) {
      if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
        return 29
      }
    }
    return dict[month]
  },
  cvFormat (date) {
    var fmt = {
      'yyyy': function (date) { return date.getFullYear() + '' },
      'MM': function (date) { return ('0' + (date.getMonth() + 1)).slice(-2) },
      'dd': function (date) { return ('0' + date.getDate()).slice(-2) }
    }
    var result = this.dateFormat
    for (var key in fmt) {
      result = result.replace(key, fmt[key](date))
    }
    return result
  },
  getYearMonth (year, month) {
    if (month > 11) {
      year++
      month = 0
    } else if (month < 0) {
      year--
      month = 11
    }
    return {year: year, month: month}
  },
  chkMinDate (date, minDate) {
    if (minDate) {
      if (this.cvFormat(date) < minDate) {
        return false
      }
    }
    return true
  },
  chkMaxDate (date, maxDate) {
    if (maxDate) {
      if (this.cvFormat(date) > maxDate) {
        return false
      }
    }
    return true
  },
  dateReFormat (str) {
    if (str.length !== 8) return ''
    const y = str.slice(0, 4)
    const m = str.slice(4, 6)
    const d = str.slice(6, 8)
    return `${y}/${m}/${d}`
  },
  getDateRange (options) {
    const targetDate = options.targetDate || new Date()
    const minDate = options.minDate || ''
    const maxDate = options.maxDate || ''
    let activeDay = options.activeDay

    if (activeDay) {
      activeDay = this.dateReFormat(activeDay)
      activeDay = this.parse(activeDay)
    }

    this.dateFormat = options.dateFormat || 'yyyyMMdd'

    let dateRange = []
    let decadeRange = []

    const CLASS_ACTIVE = 'datepicker-dateRange-item-active'
    const CLASS_GRAY = 'datepicker-item-gray'
    const CLASS_DISABLE = 'datepicker-item-disable'

    let currDate = this.parse(targetDate)
    let currMonth = this.siblingsMonth(currDate, 0)

    let time = {
      year: currMonth.getFullYear(),
      month: currMonth.getMonth()
    }

    let yearStr = time.year.toString()

    let firstYearOfDecade = (yearStr.substring(0, yearStr.length - 1) + 0) - 1

    for (let i = 0; i < 12; i++) {
      decadeRange.push({
        text: firstYearOfDecade + i + 1 * 10
      })
    }

    const currMonthFirstDay = new Date(time.year, time.month, 1)
    let firstDayWeek = currMonthFirstDay.getDay() + 1

    if (firstDayWeek === 0) {
      firstDayWeek = 7
    }

    const dayCount = this.getDayCount(time.year, time.month)

    if (firstDayWeek > 1) {
      const preMonth = this.getYearMonth(time.year, time.month - 1)
      const prevMonthDayCount = this.getDayCount(preMonth.year, preMonth.month)
      for (let i = 1; i < firstDayWeek; i++) {
        const dayText = prevMonthDayCount - firstDayWeek + i + 1
        const date = new Date(preMonth.year, preMonth.month, dayText)
        const dateText = this.cvFormat(date)
        const week = date.getDay()
        let sclass = 'day-' + week + ' ' + CLASS_GRAY
        let disabled = !this.chkMinDate(date, minDate) || !this.chkMaxDate(date, maxDate)
        if (disabled) {
          sclass += ' ' + CLASS_DISABLE
        }
        dateRange.push({
          text: dayText,
          date: date,
          dateText,
          sclass: sclass,
          disabled: disabled,
          isCurrentMonth: false
        })
      }
    }
    for (let i = 1; i <= dayCount; i++) {
      const date = new Date(time.year, time.month, i)
      const dateText = this.cvFormat(date)
      const week = date.getDay()
      let sclass = 'day-' + week
      let disabled = !this.chkMinDate(date, minDate) || !this.chkMaxDate(date, maxDate)

      if (disabled) {
        sclass += ' ' + CLASS_DISABLE
      }

      // date は Date Obj (Fri Mar 31 2017 00:00:00 GMT+0900 (JST))
      if (String(activeDay) === String(date)) {
        sclass += ' ' + CLASS_ACTIVE
      }

      dateRange.push({
        text: i,
        date: date,
        dateText,
        sclass: sclass,
        disabled,
        isCurrentMonth: true
      })
    }

    if (dateRange.length < 42) {
      let nextMonthNeed = 42 - dateRange.length
      const nextMonth = this.getYearMonth(time.year, time.month + 1)
      if (nextMonthNeed > 6) {
        nextMonthNeed = nextMonthNeed - 7
      }

      for (let i = 1; i <= nextMonthNeed; i++) {
        const date = new Date(nextMonth.year, nextMonth.month, i)
        const dateText = this.cvFormat(date)
        const week = date.getDay()
        let sclass = 'day-' + week + ' ' + CLASS_GRAY
        const disabled = !this.chkMinDate(date, minDate) || !this.chkMaxDate(date, maxDate)
        if (disabled) {
          sclass += ' ' + CLASS_DISABLE
        }
        dateRange.push({
          text: i,
          date: date,
          dateText,
          sclass,
          disabled: disabled,
          isCurrentMonth: false
        })
      }
    }

    return dateRange
  }
}
