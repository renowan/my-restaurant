const firebase = window.firebase
const db = firebase.firestore()

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

// メニュー
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
  return db.collection(`users/${uid}/menu`).add(tab).then((doc) => {
    return true
  })
}

export const updateTabName = (uid, tabId, tabObj) => {
  return db.doc(`users/${uid}/menu/${tabId}`).set(tabObj).then((doc) => {
    return true
  })
}

// カテゴリ削除
export const deleteTab = (uid, tabId) => {
  return db.doc(`users/${uid}/menu/${tabId}`).delete().then((doc) => {
    return true
  })
}

export const getMenuItem = (uid, tabId) => {
  return db.collection(`users/${uid}/menu/${tabId}/item`).get().then((snapshot) => {
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
export const addProduct = (uid, tabId, product) => {
  return db.collection(`users/${uid}/menu/${tabId}/item`).add(product).then((doc) => {
    return true
  })
}

// 商品更新
export const updateProduct = (uid, tabId, product) => {
  const productId = product.id
  delete product.id
  return db.doc(`users/${uid}/menu/${tabId}/item/${productId}/`).set(product).then((doc) => {
    console.log('doc', doc)
    return true
  })
}

// 商品削除
export const deleteProduct = (uid, tabId, productId) => {
  return db.doc(`users/${uid}/menu/${tabId}/item/${productId}`).delete().then((doc) => {
    return true
  })
}
