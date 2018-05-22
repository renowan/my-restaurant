const obj = {
  rsv: {
    date: '',
    state: 0,
    pay: 0,
    num: 2,
    tableId: '',
    tableFrame: 1,
    tel: '',
    courseId: '',
    name: '',
    nameKana: '',
    memo: '',
    long: 8,
    start: 12
  },
  table: {
    enable: true,
    frame: 1,
    name: '',
    memo: '',
    minNum: 1,
    maxNum: 4,
    tag: '',
  }
}

export const getDefaultData = (type = 'rsv') => {
  return Object.assign({}, obj[type])
}
