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
  },
  menu: {
    name: '',
    pic: {
      image0: {
        url: '',
        coverMode: '',
      },
      image1: {
        url: '',
        coverMode: '',
      },
      image2: {
        url: '',
        coverMode: '',
      }
    },
    mainPic: 0,
    description: '',
    price: 100,
    discount: 0,
    isNew: false,
    allYouCanEat: false,
    isLunchOnly: false
  },
  course: {
    enable: true,
    name: '',
    description: '',
    pic: {
      image0: {
        url: '',
        coverMode: '',
      },
      image1: {
        url: '',
        coverMode: '',
      },
      image2: {
        url: '',
        coverMode: '',
      }
    },
    minNum: 2, // 最小人数
    maxNum: 4, // 最大人数
    itemGroup: [
      {
        name: '',
        item: []
      }
    ],
    price: 1000
  }
}

export const getDefaultData = (type = 'rsv') => {
  return Object.assign({}, obj[type])
}
