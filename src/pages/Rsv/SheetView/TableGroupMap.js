import { cloneDeep } from 'lodash'
// import objectAssign from 'object-assign'

const RADIX = 10

/** テーブルと予約データの構造を作るクラス */
class TableGroupMap {
  constructor (order) {
    // 行の長さ
    this.X_LONG = 96
    // マップのベース
    this.tableOrder = {
      matrix: [],
      tableMarkup: []
    }

    this.tableData = null
    // this.selfRsvData = []
    this.rsvData = []

    this.backUpRsvData = null

    this.tableGroup = null
    this.newLine = this.creatEmptyLine()
  }

  init (order) {
    // 【必須】テーブルデータをキャッシュしておく
    this.tableData = order.tableData
    // this.selfRsvData = order.selfRsvData
    this.rsvData = order.rsvData
    // this.baseSetting = order.baseSetting

    // this.rsvDataBackUp()

    // this.tableGroup = this.creatTableGroupMap(order)
  }

  // undo () {
  //   this.selfRsvData = cloneDeep(this.backUpRsvData.selfRsvData)
  //   this.rsvData = cloneDeep(this.backUpRsvData.rsvData)
  // }

  addSelfRsv (selfRsv) {
    // const extend = {
    //   // 登録された予定が全日なら、変更不可にする
    //   canEdit: selfRsv.rsv_time ? true : false,
    //   content_type: 'SHP',
    //   day_crossing_flg: 0,
    //   rsvArrayName: 'self_rsv_data',
    //   rsv_id_for_sort: selfRsv.rsv_id.replace(/[a-zA-Z]/g, '')
    // }
    //
    // const newSelfRsv = objectAssign(selfRsv, extend)
    // this.selfRsvData.push(newSelfRsv)
    // this.backUpRsvData.selfRsvData.push(cloneDeep(newSelfRsv))
  }

  // 予定削除
  subtractSelfRsv (rsvId) {
    // let index = 0
    // // 削除する予定のインデックスを特定
    // for (let i = 0; i < this.selfRsvData.length; i++) {
    //   const target_id = this.selfRsvData[i].rsv_id
    //   if (target_id === rsv_id) {
    //     index = i
    //     break
    //   }
    // }
    // this.selfRsvData.splice(index, 1)
    // this.backUpRsvData.selfRsvData.splice(index, 1)
  }

  // 予定更新、一発確定、undoできない
  updateSelfRsv (selfRsv) {
    // const updateRsvDate = []
    // for (let i = 0; i < this.selfRsvData.length; i++) {
    //   let elm = this.selfRsvData[i]
    //   if (elm.rsv_id === selfRsv.rsv_id) {
    //     // 日付が変更された場合、この処理をぬけ削除処理を行う
    //     if (elm.rsv_date !== selfRsv.rsv_date) {
    //       this.subtractSelfRsv(selfRsv.rsv_id)
    //       return
    //     }
    //
    //     elm = objectAssign(elm, selfRsv)
    //     if (elm.tableId !== null) {
    //       elm.tableId = Number(elm.tableId)
    //     }
    //   }
    //   updateRsvDate.push(elm)
    // }
    //
    // this.backUpRsvData.selfRsvData = cloneDeep(updateRsvDate)
  }

  // rsvDataBackUp () {
  //   // undo用にバックアップ取っておく
  //   this.backUpRsvData = {
  //     selfRsvData: cloneDeep(this.selfRsvData),
  //     rsvData: cloneDeep(this.rsvData)
  //   }
  // }

  // 加工済み、内部で使ってる予約予定データ配列の取得
  getRsvArray (rsvArrayName) {
    if (!rsvArrayName) {
      return {
        // selfRsvData: this.selfRsvData,
        rsvData: this.rsvData,
      }
    }
    return this[rsvArrayName]
  }

  // 差分を取得
  getDiff (rsv) {
    let before = {}
    let after = {}
    let rsvArrayName = this.getRsvArrayName(rsv.rsvArrayName)
    this.backUpRsvData[rsvArrayName].forEach((elm) => {
      if (elm.id === rsv.id) {
        before = elm
      }
    })
    this[rsvArrayName].forEach((elm) => {
      if (elm.id === rsv.id) {
        after = elm
      }
    })
    return {
      before,
      after
    }
  }

  getRsvArrayName (order) {
    let rsvArrayName = ''
    switch (order) {
      case 'rsv_data': {
        rsvArrayName = 'rsvData'
        break
      }
    }
    return rsvArrayName
  }

  updateRsv (rsv) {
    const rsvArrayName = this.getRsvArrayName(rsv.rsvArrayName)

    // let targetArr = cloneDeep(this.[rsvArrayName])
    this[rsvArrayName] = this[rsvArrayName].map(elm => {
      if (rsv.rsv_id === elm.rsv_id) {
        elm.stat = rsv.stat
        elm.start = rsv.start
        if (rsv.tableId !== null) {
          elm.tableId = parseInt(rsv.tableId, RADIX)
        }
        elm.rsv_num = rsv.rsv_num
        elm.tableFrame = rsv.tableFrame || 1
        elm.long = rsv.long
      }
      return elm
    })
  }

  // 未使用
  addRsv (rsv) {
    let target = null
    // const target = this.tableGroup.filter(table => table.info.table_id === rsv.tableId)
    let targetIndex = null
    this.tableGroup.forEach((table, index) => {
      if (table.info.id === rsv.tableId) {
        targetIndex = index
        target = table
      }
    })

    if (target) {
      this.tableGroup[targetIndex] = this.diff(target, rsv)
    }
  }

  // 予定削除
  subtractAskingRsv (rsvId) {
    // let index = 0
    // // 削除する予定のインデックスを特定
    // for (let i = 0; i < this.askingRsvData.length; i++) {
    //   const target_id = this.askingRsvData[i].rsv_id
    //   if (target_id === rsv_id) {
    //     index = i
    //     break
    //   }
    // }
    // this.askingRsvData.splice(index, 1)
    // this.backUpRsvData.askingRsvData.splice(index, 1)
  }

  addRsvData (rsv) {
    // const extend = {
    //   frame   : rsv.rsv_frame_num || 1,
    //   table_id        : parseInt(rsv.tableId)
    // }
    // const newRsv = objectAssign(rsv, extend)
    // this.rsvData.push(newRsv)
    // this.backUpRsvData.rsvData.push(cloneDeep(newRsv))
  }

  // キャンセル
  subtractRsv (rsv) {
    let rsvArrayName = this.getRsvArrayName(rsv.rsvArrayName)
    let index = 0
    // 削除する予定のインデックスを特定
    for (let i = 0; i < this[rsvArrayName].length; i++) {
      const targetId = this[rsvArrayName][i].id
      if (targetId === rsv.id) {
        index = i
        break
      }
    }
    this.rsvData.splice(index, 1)
    this.backUpRsvData.rsvData.splice(index, 1)
  }

  getMap (tableId = null) {
    if (!this.tableData) {
      return []
    }

    // データを作り直す
    this.tableGroup = this.creatTableGroupMap()

    if (tableId === null) {
      return cloneDeep(this.tableGroup)
    }
    const result = this.tableGroup.filter(table => table.info.id === tableId)
    return result.length ? cloneDeep(result[0]) : undefined
  }

  /**
   * 行が開いてるか判別する
   * @param  {array}  baseLine   ベースの行
   * @param  {array}  targetLine 対象予約の行
   * @return {Boolean}           空いてるか、上書きできるかの結果
   */
  isEmpty (baseLine, targetLine) {
    let result = true
    baseLine.forEach((elm, index) => {
      if (targetLine[index] !== 0 && elm !== 0) {
        result = false
      }
    })
    return result
  }

  /**
   * 空の行を渡す
   * @return {array} 空の行
   */
  getNewLint () {
    return this.newLine.slice(0)
  }

  /**
   * 予約のスタート時間から塗りつぶすindexを割り出す
   * @param  {string} time 四桁の時間
   * @return {number}      スタート位置
   */
  getStartPoint (time) {
    const h = (Number(time.slice(0, 2)) - 6) * 4
    const m = Number(time.slice(2, 4)) / 15
    return h + m
  }

  /**
   * どっちが空いてるかを判断しながら、行の上書きを行う
   * @param  {array} baseLine   元の行
   * @param  {array} targetLine ターゲット（予約）の行
   * @return {array}            上書きされた行
   */
  overWrite (baseLine, targetLine) {
    let arr = []
    baseLine.forEach((elm, index) => {
      let dot = null
      if (elm === 0 && targetLine[index] === 0) {
        dot = 0
      } else if (elm === 0) {
        dot = targetLine[index]
      } else {
        dot = elm
      }
      arr.push(dot)
    })
    return arr
  }

  /**
   * 予約を配列情報に変換する
   * @param  {object} rsv 予約情報
   * @return {array}      0, 1で構成される2次元配列
   */
  creatTargetMap (rsv) {
    const startPoint = rsv.start
    const long = rsv.long
    const arr = []

    // 予約の種類によって代入マークを変える
    let marker = rsv.state + 1

    for (var i = 0; i < this.X_LONG; i++) {
      const elm = ((i >= startPoint) && (i < startPoint + long)) ? marker : 0
      arr.push(elm)
    }
    let targetMapArr = []
    for (var k = 0; k < rsv.tableFrame; k++) {
      targetMapArr.push(arr)
    }

    return targetMapArr
  }

  /**
   * 空の行を生成する
   * @return {array} 全部ゼロの行配列
   */
  creatEmptyLine () {
    let arr = []
    for (var i = 0; i < this.X_LONG; i++) {
      arr.push(0)
    }
    return arr
  }

  /**
   * tableOrderのベースを生成すいる
   * @param  {object} table テーブル情報
   * @return {object}       tableOrderのベースを返す
   */
  getTableOrderBase (tableInfo) {
    let tableOrder = {
      info: tableInfo,
      matrix: [],
      tableMarkup: []
    }
    // 日単位で0にしている時はマスタの値を参照する
    const frameNum = tableInfo.frame
    for (var i = 0; i < frameNum; i++) {
      tableOrder.matrix.push(this.creatEmptyLine())
      tableOrder.tableMarkup.push({
        extend: false,
        rsvList: []
      })
    }
    return tableOrder
  }

  /**
   * マップに基いて差分を計算
   * @param  {object}  table     - 最新のmatrixとtableMarkupが含まれる
   * @param  {array}   rsv       - 予約リスト
   * @param  {number}  rowIndex  - 今何行目にいるか
   * @return {object}             完成されたmatrixとtableMarkup
   */
  diff (table, rsv, rowIndex) {
    const rsvExtend = rsv

    // 全日予約の場合は rsv_time: nullとなる
    rsvExtend.startPoint = rsvExtend.start

    const target = this.creatTargetMap(rsvExtend)

    let yPos = 0
    const { matrix, tableMarkup } = table

    let newMatrix = matrix.slice(0)
    let newtableMarkup = tableMarkup.slice(0)
    const targetLong = target.length

    // 多次元の予約配列がベースを全部上書きできたかのフラグ
    // beWrite === targetLongで全部上書きできた証
    let beWrite = 0

    // 拡張のメモ
    /* eslint-disable no-unused-vars */
    let extendMeno = ''
    while (beWrite < targetLong) {
      // 上書き続行できるか
      let canWrite = true
      for (let i = 0; i < targetLong; i++) {
        // 現在の行が存在するか
        let baseLine = newMatrix[yPos + i]
        // 行が存在しない
        if (!baseLine) {
          baseLine = this.getNewLint()
          newtableMarkup.push({
            extend: true,
            rsvList: []
          })
          extendMeno += '1'
        } else {
          extendMeno += '0'
        }

        // 0と1が混在すると続行不可とする（予約が枠非拡張と拡張を跨ぐことを防ぐ）
        // if (extendMeno.indexOf('0') > -1 && extendMeno.indexOf('1') > -1) {
        //   canWrite = false
        // }

        // const tableFrameNum = table.info.frame
        // 枠数 + 現在のライン位置で予約最下のライン
        // const lastLine = rsv.tableFrame + yPos
        // 最下のラインが枠数を越える && 枠数オーバーのラインに到達
        // if (tableFrameNum < lastLine && yPos < tableFrameNum) {
        //   canWrite = false
        // }

        // 1回転の時 予約 or 予定が入っていたら書き込み不可にする
        // if (this.baseSetting.rsv_rotation_flg === 0) {
        //   baseLine.some(item => {
        //     if (item !== 0) {
        //       canWrite = false
        //       return true
        //     }
        //   })
        // }

        const targetLine = target[i]
        // 書き込みが可能なライン && 衝突なし && 書き込み可能な状態
        if (this.isEmpty(baseLine, targetLine) && canWrite) {
          // 上書き実行
          newMatrix[yPos + i] = this.overWrite(baseLine, targetLine)
          beWrite++
        } else {
          // ターゲットブロックが一行でも引っかかったら
          // 上書き停止
          canWrite = false
          // 上書きした回数をリセット
          beWrite = 0
          // メモを戻す
          extendMeno = ''
          // base を戻す
          newMatrix = matrix.slice(0)
          newtableMarkup = tableMarkup.slice(0)
        }
      }
      if (beWrite < targetLong) {
        yPos++
      }
    }

    // rowIndex = rsvアイテムの全体の何行目にいるか
    rsvExtend.rowIndex = yPos + rowIndex

    newtableMarkup[yPos].rsvList.push(rsvExtend)

    return {
      info: table.info,
      matrix: newMatrix,
      tableMarkup: newtableMarkup
    }
  }

  /**
   * テーブルマップ作成
   * @param  {object}  table     - テーブル情報
   * @param  {array}   rsv       - 予約情報リスト
   * @param  {number}  rowIndex  - 今何行目にいるか
   * @return {object}        完成したObj
   */
  creatTableMap (table, rsvList, rowIndex) {
    // 予定・予約の数
    const rsvNum = rsvList.length
    // 日単位で枠数を0にしてる && 掲載フラグが0
    const unpublish = table.frame === 0 || table.disp_flg === 0
    const tableData = Object.assign(table, { rsvNum, unpublish })
    let tableOrder = this.getTableOrderBase(tableData)
    const myRsvList = cloneDeep(rsvList)
    myRsvList.forEach((elm) => {
      tableOrder = this.diff(tableOrder, elm, rowIndex)
    })
    return tableOrder
  }

  creatTableGroupMap () {
    const { tableData, rsvData } = this

    const tableGroup = []
    let rowIndex = 0

    // 不明テーブルを作る
    const unKnownTable = {
      createdAt: '',
      enable: true,
      name: '未設定・不明テーブル',
      id: null,
      maxNum: 999,
      minNum: 1,
      memo: '',
      frame: 1
    }

    // 検索用のtable id配列
    const tableHash = tableData.map(table => table.id)
    // tableId不明のrsvを抽出
    const unKnownRsvList = rsvData.filter(rsv => {
      if (tableHash.indexOf(rsv.tableId) < 0 || rsv.tableId === '' || rsv.tableId === null) {
        return rsv
      }
    })
    // テーブル不明の予約がある場合、マップ生成する
    if (unKnownRsvList.length > 0) {
      const unKnownTableMap = this.creatTableMap(unKnownTable, unKnownRsvList, rowIndex)
      rowIndex += unKnownTableMap.tableMarkup.length
      tableGroup.push(unKnownTableMap)
    }

    // カウント用
    let allDisabledTableNum = 0
    tableData.forEach((table) => {
      const id = table.id
      const rsvList = rsvData.filter(rsv => rsv.tableId === id)
      // const selfRsvList = selfRsvData.filter(rsv => rsv.tableId === id)
      // const allRsvList = rsvList.concat(selfRsvList)
      const tableMap = this.creatTableMap(table, rsvList, rowIndex)
      rowIndex += tableMap.tableMarkup.length
      tableGroup.push(tableMap)
    })

    return tableGroup
  }
}

export default TableGroupMap
