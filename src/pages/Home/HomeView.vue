<template>
  <content-wrapper :breadcrumb="breadcrumb" sectionClass="pn bg-white">

    <div class="home-page-heading">
      <h2> レストラン管理 <b class="text-primary">My Restaurant</b> について</h2>
      <!-- <h2 class="media-heading">Michael Halls
        <small> - Profile</small>
      </h2> -->
    </div>

    <div class="container-fluid mt16 pb24 mh8">
      <div class="row">
        <div class="col-xs-12">
          <h3>制作目的</h3>
          <p>
            趣味です。Vue、Firestore、UI設計の勉強、練習も兼ねてます。
          </p>
        </div>
        <div class="col-xs-12">
          <h3>担当範囲</h3>
          <p>
            全部。レイアウト、UI設計、実装、バックエンド。
          </p>
        </div>
        <div class="col-xs-12">
          <h3>使用技術 - フロント</h3>
          <ul>
            <li>vue-cli</li>
            <li>vue, vuex, vue-router</li>
            <li>ES2016</li>
            <li>Webpack</li>
            <li>Bootstrap + テーマ</li>
          </ul>
        </div>
        <div class="col-xs-12">
          <h3>使用技術 - バックエンド</h3>
          <p>Firestoreのみ、いわゆるサーバーレスってやつ。</p>
        </div>
        <div class="col-xs-12">
          <h3>使い方</h3>
          <ul>
            <li>Twitterアカウントでログイン</li>
            <li>デフォルトのテーブルが自動で生成される（現状バグで2つ生成されてるがそのうち直します）</li>
            <li>左ナビ：テーブル -> 適当にテーブルを作成</li>
            <li>左ナビ：予約 -> カレンダーで日付を選択</li>
            <li>「新規予約」ボタンを押すかシートのスクロールエリアをクリックで予約を作成</li>
            <li>作成された予約をすきに編集する</li>
          </ul>
        </div>
        <div class="col-xs-12">
          <h3>改善・機能追加の予定</h3>
          <ul>
            <li>更新時のローディング</li>
            <li>メニュー作成</li>
            <li>メニューと連動したコース機能</li>
            <li>注文ログの入力</li>
          </ul>
        </div>
      </div>
    </div>

    <div slot="topBarRight">
      <!-- <button type="button" class="btn btn-default btn-sm">
        testbtn
      </button> -->
    </div>
  </content-wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import contentWrapper from '@/components/Layout/ContentWrapper'
import modal from '@/components/ui/Modal'

const firebase = window.firebase
const db = firebase.firestore()

export default {
  name: 'home-view',
  components: {
    contentWrapper,
    modal
  },
  computed: Object.assign({},
    mapGetters({
      app: 'app/state',
      uid: 'app/uid',
    }),
    {

    }
  ),
  data () {
    return {
      breadcrumb: [
        { label: 'Home', link: '/' },
        { label: 'サイト説明', link: null }
      ],
      myTime: 7,
      myUseTime: 7,
      showModal: false
    }
  },
  created () {
    if (!this.app.isLogin) {
      this.$router.push('/login')
    }
  },
  methods: {
    test1 () {
      db.collection('users').add({
        first: 'ada',
        last: 'Lovelace',
        born: 1815
      }).then((docRef) => {
        console.log('Document written with ID: ', docRef.id)
      }).catch((error) => {
        console.error('Error adding document: ', error)
      })
    },
    test2 () {
      db.collection('users').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          // console.log(`${doc.id} => ${doc.data()}`);
        })
      })
    },
    test3 () {
      // db.doc(`users/${this.uid}/rsv/201803/rsv/CYCtLWrC9oVnrp7BloZ7`).get().then((doc) => {
      //   const data = doc.data()
      //   console.log(data)
      // })

      // const rsvObj = {
      //   courseId: 'agagarrr',
      //   firstName: '太郎',
      //   firstNameKana: 'たろう',
      //   lastName: '田中',
      //   lastNameKana: 'たなか',
      //   long: 8,
      //   start: 5
      // }

      // db.collection('users/1TrIzGHgApU34GrhHrr6/item').get().then((querySnapshot) => {
      //   querySnapshot.forEach((doc) => {
      //     console.log(doc.data())
      //     // console.log(`${doc.id} => ${doc.data()}`);
      //   })
      // })

      // db.collection(`users/${this.uid}/table`).add({
      //   name: 'my table name1',
      //   frame: 7,
      //   minNum: 2,
      //   maxNum: 4,
      // }).then((docRef) => {
      //   console.log('Document written with ID: ', docRef.id)
      // }).catch((error) => {
      //   console.error('Error adding document: ', error)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page-heading {
  position: relative;
  padding: 30px 24px;
  /* margin: -25px 20px 25px; */
  border-bottom: 1px solid #d9d9d9;
  background-color: #f2f2f2;
}

.bg-white {
  background-color: #fff;
}
</style>
