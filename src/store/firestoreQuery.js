import axios from 'axios'
const firebase = window.firebase
const db = firebase.firestore()

// admin
export const getServerTime = () => {
  return axios.get('https://us-central1-myrestaurant-4b36a.cloudfunctions.net/getServerTime').then((response) => {
    return response.data.time
  })
}

export const twitterAuth = () => {
  const provider = new firebase.auth.TwitterAuthProvider()
  return firebase.auth().signInWithPopup(provider).then((result) => {
    return result
  })
}

export const loginOut = () => {
  return firebase.auth().signOut().then(() => {
    return true
  })
}

export const createUser = (uid, user) => {
  return db.doc(`users/${uid}`).set(user).then((response) => {
    return true
  })
}

export const getHasUserData = (uid) => {
  return db.doc(`users/${uid}`).get().then((qs) => {
    return qs.exists
  })
}

/*
 * Rsv
 */
export const getRsvByDate = (uid, yyyymm, date) => {
  const list = []
  const rsvRef = db.collection(`users/${uid}/db/${yyyymm}/rsv`)
  const queryRef = rsvRef.where('date', '==', Number(date)).orderBy('createdAt')
  return queryRef.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      const obj = Object.assign({}, { id: doc.id }, doc.data())
      list.push(obj)
    })
    return list
  })
}

/*
 * Table
 */
export const getTableList = (uid) => {
  return db.collection(`users/${uid}/table`).orderBy('createdAt', 'desc').get().then((response) => {
    const tableList = []
    response.forEach((doc) => {
      const data = doc.data()
      data.id = doc.id
      tableList.push(data)
    })
    return tableList
  })
}

export const updateTable = (uid, tableId, table) => {
  return db.doc(`users/${uid}/table/${tableId}`).set(table).then((doc) => {
    return true
  })
}

export const createTable = (uid, table) => {
  table.createdAt = firebase.firestore.FieldValue.serverTimestamp()
  return db.collection(`users/${uid}/table`).add(table).then((snapshot) => {
    return snapshot
  })
}

export const deleteTable = (uid, id) => {
  return db.doc(`users/${uid}/table/${id}`).delete().then((doc) => {
    return true
  })
}

/*
 * Menu
 */
export const getMenuTab = (uid) => {
  return db.collection(`users/${uid}/menu`).get().then((snapshot) => {
    const tabList = []
    snapshot.forEach((doc) => {
      const data = doc.data()
      data.id = doc.id
      tabList.push(data)
    })
    return tabList
  })
}

export const createTab = (uid, tab) => {
  console.log('createTab tab', tab)
  return db.collection(`users/${uid}/menu`).add(tab).then((doc) => {
    return doc.id
  })
}

export const updateTabName = (uid, tabId, tabObj) => {
  return db.doc(`users/${uid}/menu/${tabId}`).set(tabObj).then((doc) => {
    return true
  })
}

/*
 * Product, Tab(カテゴリー)
 */
export const deleteTab = (uid, tabId) => {
  return db.doc(`users/${uid}/menu/${tabId}`).delete().then((doc) => {
    return true
  })
}

export const getMenuItem = (uid, tabId) => {
  return db.collection(`users/${uid}/menuItem`).where('tabId', '==', tabId).get().then((snapshot) => {
    const list = []
    snapshot.forEach((doc) => {
      const data = doc.data()
      data.id = doc.id
      list.push(data)
    })
    return list
  })
}

// 商品追加
export const addProduct = (uid, product) => {
  return db.collection(`users/${uid}/menuItem`).add(product).then((doc) => {
    return true
  })
}

// 商品更新
export const updateProduct = (uid, product) => {
  const productId = product.id
  delete product.id
  return db.doc(`users/${uid}/menuItem/${productId}/`).set(product).then((doc) => {
    return true
  })
}

// 商品削除
export const deleteProduct = (uid, tabId, productId) => {
  return db.doc(`users/${uid}/menu/${tabId}/item/${productId}`).delete().then((doc) => {
    return true
  })
}

/*
 * コース
 */
export const getCourse = (uid) => {
  return db.collection(`users/${uid}/course`).get().then((snapshot) => {
    const list = []
    snapshot.forEach((doc) => {
      const data = doc.data()
      data.id = doc.id
      list.push(data)
    })
    return list
  })
}

export const getAllProduct = (uid) => {
  return db.collection(`users/${uid}/menuItem`).get().then((snapshot) => {
    const productList = []
    const productObj = {}
    snapshot.forEach((doc) => {
      const data = doc.data()
      data.id = doc.id
      productList.push(data)
      productObj[doc.id] = data
    })
    return { productList, productObj }
  })
}

export const createCourse = (uid, course) => {
  return db.collection(`users/${uid}/course`).add(course).then((snapshot) => {
    return true
  })
}

export const updateCourse = (uid, courseId, course) => {
  return db.doc(`users/${uid}/course/${courseId}`).set(course).then((snapshot) => {
    return true
  })
}

export const getCourseDetail = (uid, courseId) => {
  return db.doc(`users/${uid}/course/${courseId}`).get().then((doc) => {
    return doc.data()
  })
}
