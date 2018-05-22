import moment from 'moment'
import _ from 'lodash'
import objectAssign from 'object-assign'

// initial state
const state = {
  // ローカル環境かどうか
  isLocal: window.location.href.indexOf('local') !== -1,
  // electronかどうか
  isElectron: window.process !== undefined,

  // noticeがロード終わったか
  isAppLoaded: false,

  // ページのローディング
  isLoading: false,
  loadingTask: [],

  isPopupLoading: false,
  popupLoadingTask: [],

  isInlineLoading: false,
  inLineLoadingTask: [],

  // 未保存警告Modal
  isShowPageMoveModal: false,

  isNaviOpen: false,

  pageName: '-',
  pageTitle: 'no',
  pageType: 'default',
  error: null,
  canSave: false,
  // 直前のページの情報
  refererQuery: null,

  // 通知
  noticeInfo: {

  },

  // 基本情報
  baseSetting: null,

  // ログイン権限
  loginType: null,

  // 現在時刻
  serverTime: {
    millisecond: new Date().getTime(),
    yyyymmdd: moment().format('YYYYMMDD'),
    hhmm: ''
  },

  // ProFrame
  proframe: null,

  // shopWord
  shopWord: null,

  // groupMng
  groupMng: null
}

// getters
const getters = {
  app: state => state,
  // ぐるなび管理：マスター、ボワイトリスト以外を除外する場合
  isGnaviDisabled (state) {
    const loginType = state.loginType
    if (!loginType) return false
    return loginType.login_type === 'gnavi' && loginType.gnavi_role !== 0 && loginType.gnavi_role !== 1
  },
  hasContractCorporation (state) {
    if (!state.shopWord) return false
    return state.shopWord.has_contract_corporation_reserve === 1
  },
  noticeInfo: state => state.noticeInfo,
}

// app 基本必要な情報をロード
const APP_UPDATE_ISLOADING = 'APP_UPDATE_ISLOADING'
// ページ基本情報の更新
const APP_UPDATE_PAGEINFO = 'APP_UPDATE_PAGEINFO'
// アプリケーションが保存できる状態にあるかのチェック
const APP_UPDATE_CANSAVE = 'APP_UPDATE_CANSAVE'

// loading task
const APP_ADD_LOADINGTASK = 'APP_ADD_LOADINGTASK'
const APP_SUBTRACT_LOADINGTASK = 'APP_SUBTRACT_LOADINGTASK'

const APP_UPDATE_PAGE_MOVE_MODAL = 'APP_UPDATE_PAGE_MOVE_MODAL'

// 新着情報API
const APP_RSVAPI_NOTICE_REQUEST = 'APP_RSVAPI_NOTICE_REQUEST'
const APP_RSVAPI_NOTICE_SUCCESS = 'APP_RSVAPI_NOTICE_SUCCESS'
const APP_RSVAPI_NOTICE_ERROR = 'APP_RSVAPI_NOTICE_ERROR'

// 基本情報取得API
const APP_RSVAPI_BASESETTING_REQUEST = 'DETAIL_RSVAPI_BASESETTING_REQUEST'
const APP_RSVAPI_BASESETTING_SUCCESS = 'DETAIL_RSVAPI_BASESETTING_SUCCESS'
const APP_RSVAPI_BASESETTING_ERROR = 'DETAIL_RSVAPI_BASESETTING_ERROR'

// RSVAPI エラー、共通
const APP_RSVAPI_COMMON_ERROR = 'APP_RSVAPI_COMMON_ERROR'
// error objをnullに戻す
const APP_CLEAR_ERROR = 'APP_CLEAR_ERROR'

// ログイン権限保持
const APP_SET_LOGIN_TYPE = 'APP_SET_LOGIN_TYPE'

// ProFrame
const APP_SET_PROFRAME = 'APP_SET_PROFRAME'

// shopWord
const APP_SET_SHOPWORD = 'APP_SET_SHOPWORD'

// groupMng
const APP_SET_GROUP_MNG = 'APP_SET_GROUP_MNG'

// taskの残鷹を見てisLoadingを決める
const getIsLoading = loadingTask => !(loadingTask.length < 1)

const APP_UPDATE_SERVERTIME = 'APP_UPDATE_SERVERTIME'

const APP_UPDATE_REFERERQUERY = 'APP_UPDATE_REFERERQUERY'

const APP_TOGGLE_NAVI = 'APP_TOGGLE_NAVI'

// actions
const actions = {
  // ===================================
  // App 必要の情報をロード
  // ===================================
  appUpdateIsLoading ({ commit, state }, order) {
    commit(APP_UPDATE_ISLOADING, order)
  },
  // ページ名更新
  appUpatePageInfo ({ commit, state }, order) {
    commit(APP_UPDATE_PAGEINFO, order)
  },
  // ページ遷移警告Modal
  appUpatePageMoveModal ({ commit, state }, isShow) {
    commit(APP_UPDATE_PAGE_MOVE_MODAL, isShow)
  },
  updateNoticeInfo ({ commit, state }) {
    commit(APP_RSVAPI_NOTICE_REQUEST, {
      api: 'informationNotifierGet',
      param: {},
      success: APP_RSVAPI_NOTICE_SUCCESS,
      error: APP_RSVAPI_NOTICE_ERROR,
      isDebug: true,
      loading: '',
      cb: (response, state) => response
    })
  },
  // ===================================
  // 基本情報の取得
  // ===================================
  appLoadBaseSetting ({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit(APP_RSVAPI_BASESETTING_REQUEST, {
        api: 'baseSettingGet',
        param: {},
        success: APP_RSVAPI_BASESETTING_SUCCESS,
        error: APP_RSVAPI_BASESETTING_ERROR,
        loading: '',
        cb: (response, state) => {
          resolve()
          return response.content
        }
      })
    })
  },
  appClearError ({ commit, state }) {
    commit(APP_CLEAR_ERROR)
  },
  updateServerTime ({ commit, state }, millisecond) {
    const obj = {
      millisecond,
      yyyymmdd: moment(millisecond).format('YYYYMMDD'),
      hhmm: moment(millisecond).format('HHmm')
    }
    commit(APP_UPDATE_SERVERTIME, obj)
  }
}

// loadingの制御用変数obj
const loadingConfig = {
  app: {
    taskKey: 'loadingTask',
    isKey: 'isLoading'
  },
  popup: {
    taskKey: 'popupLoadingTask',
    isKey: 'isPopupLoading'
  },
  inline: {
    taskKey: 'inLineLoadingTask',
    isKey: 'isInlineLoading'
  }
}

// mutations
const mutations = {
  // loading 制御
  [APP_UPDATE_ISLOADING] (state, order) {
    state.isLoading = order
  },

  // loading task: add
  [APP_ADD_LOADINGTASK] (state, order) {
    let loadingTask
    const lcfg = loadingConfig[order.loadingType]
    if (lcfg) {
      loadingTask = state[lcfg.taskKey].slice(0)
      loadingTask.push(order.hash)
      state[lcfg.taskKey] = loadingTask
      state[lcfg.isKey] = getIsLoading(loadingTask)
    }
  },

  // loading task: sub
  [APP_SUBTRACT_LOADINGTASK] (state, order) {
    let loadingTask
    const lcfg = loadingConfig[order.loadingType]
    if (lcfg) {
      loadingTask = state[lcfg.taskKey].slice(0)
      loadingTask = _.remove(loadingTask, elm => elm !== order.hash)
      state[lcfg.taskKey] = loadingTask
      state[lcfg.isKey] = getIsLoading(loadingTask)
    }
  },

  [APP_UPDATE_PAGEINFO] (state, order) {
    state.pageName = order.pageName
    state.pageTitle = order.pageTitle
    if (order.pageType) {
      state.pageType = order.pageType
    }
  },

  [APP_UPDATE_CANSAVE] (state, data) {
    state.canSave = data
  },

  // ページ遷移警告Modal
  [APP_UPDATE_PAGE_MOVE_MODAL] (state, isShow) {
    state.isShowPageMoveModal = isShow
  },

  // お知らせ
  [APP_RSVAPI_NOTICE_REQUEST] (state, data) {
  },

  [APP_RSVAPI_NOTICE_SUCCESS] (state, data) {
    state.noticeInfo = objectAssign({}, state.noticeInfo, data.content)

    // 一度でもロードできたとき、trueにする
    state.isAppLoaded = true

    const millisecond = data.head.server_time
    state.serverTime = {
      millisecond,
      yyyymmdd: moment(millisecond).format('YYYYMMDD'),
      hhmm: moment(millisecond).format('HHmm')
    }
  },

  [APP_RSVAPI_NOTICE_ERROR] (state, data) {
  },

  // 基本情報
  [APP_RSVAPI_BASESETTING_REQUEST] (state, data) {
  },
  [APP_RSVAPI_BASESETTING_SUCCESS] (state, data) {
    state.baseSetting = data
  },
  [APP_RSVAPI_BASESETTING_ERROR] (state, data) {
  },

  [APP_RSVAPI_COMMON_ERROR] (state, data) {
    state.error = data

    // 警告modal, loadingを全部強制的に消す
    state.isLoading = false
    state.loadingTask = []

    state.isPopupLoading = false
    state.popupLoadingTask = []

    state.isInlineLoading = false
    state.inLineLoadingTask = []

    state.isShowPageMoveModal = false
  },

  [APP_CLEAR_ERROR] (state) {
    state.error = null
  },

  [APP_SET_LOGIN_TYPE] (state, data) {
    state.loginType = data
  },

  [APP_SET_PROFRAME] (state, data) {
    state.proframe = data
  },

  [APP_SET_SHOPWORD] (state, data) {
    state.shopWord = data
  },

  [APP_SET_GROUP_MNG] (state, data) {
    state.groupMng = data
  },

  [APP_UPDATE_SERVERTIME] (state, data) {
    state.serverTime = data
  },
  [APP_UPDATE_REFERERQUERY] (state, data) {
    state.refererQuery = data
  },
  [APP_TOGGLE_NAVI] (state, data) {
    state.isNaviOpen = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
