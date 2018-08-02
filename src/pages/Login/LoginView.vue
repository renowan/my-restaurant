<template>
  <section id="content_wrapper" class="pn" :class="{'login-page': !app.isLogin}">

    <div v-if="app.isLogin">
      <section id="content" class="animated fadeIn">
        <div class="admin-form theme-info mw500 login-out-container">
          <div class="panel mb16">
            <div id="contact">
              <div class="panel-body bg-light p16">
                <div class="section row">
                  <div class="col-xs-12">
                    <div class="section-divider mv24">
                      <span>ログアウト</span>
                    </div>
                  </div>
                  <div class="col-xs-12 logout-box text-center">
                    <button type="button" class="btn btn-default btn-lg" @click="loginOut">
                      ログアウト
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-else>

      <div class="home-page-heading">
        <h2> レストラン管理 <b class="text-app-name">My Restaurant</b> について</h2>
        <p>
          レストラン用「メモ帳」です。縛りはなるべくゆるくして毎日の運営を記録できるようなメモ帳を目指します。
        </p>
      </div>

      <section id="features">
        <div class="container admin-form">
          <div class="row">
            <div class="col-lg-12 text-center">
              <h2 class="section-heading hidden">予約を管理する</h2>
              <h2 class="section-heading">予約を管理する</h2>
              <!-- <h3 class="section-subheading text-muted mbn">Our in house team can build the features and solutions you need.</h3> -->
              <p class="mt24 mb32 feature-text">
                一日単位で予約を管理する。時間、人数を入力して、どのテーブルに登録するかを決める。<br>予め登録されたコースを予約に紐づけもできる。来店後は会計金額を入れて売上管理もできる。
              </p>
            </div>
            <div class="col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-4 mb32">
              <a href="javascript:void(0)" class="button btn-social twitter span-left btn-block" @click="loginTiwtter">
                <span>
                  <i class="fa fa-twitter"></i>
                </span>Twitter ログイン
              </a>
            </div>
            <div class="col-xs-12 text-center">
              <img src="/static/images/lp-pic-1.png" title="pic" class="rsv-pic feature-pic">
            </div>
          </div>
        </div>
      </section>

      <section id="features-flat" class="bg-light">
        <div class="container">

          <div class="row">
              <div class="col-sm-12 col-md-6 text-center">
                <h2 class="section-heading mt70">メニューやコースを作成して管理する</h2>
                <!-- <h3 class="section-subheading text-muted mb30">This is basically like more advanced lorem ipsum.</h3> -->
                <p class="text-muted mb50 feature-text">
                  カテゴリー別でメニューを作成して商品を管理する。作成されたメニューをまとめてコースを登録することもできる
                </p>
              </div>
              <div class="hidden-sm hidden-xs col-md-6">
                <img src="/static/images/lp-pic-2.png" title="pic" class="img-responsive pull-right">
            </div>
          </div>

        </div>
      </section>

      <section id="features-flat">
        <div class="container">
          <div class="row">
            <div class="hidden-sm hidden-xs col-md-6">
              <img src="/static/images/lp-pic-3.png" title="pic" class="img-responsive pull-left feature-pic">
            </div>
            <div class="col-sm-12 col-md-6 text-center">
              <h2 class="section-heading mt70">テーブルを管理する</h2>
              <!-- <h3 class="section-subheading text-muted mb30">This is basically like more advanced lorem ipsum.</h3> -->
              <p class="text-muted mb50">予約を登録するにはテーブルが必要だ。店の規模に合わせてテーブルを登録しよう。同じタイプのテーブルは複数枠にすることができて、1つの予約を1枠以上のテーブルを専有するように登録できる。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features-flat" class="bg-light">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-6 text-center">
              <h2 class="section-heading mt70">統計を見る</h2>
              <!-- <h3 class="section-subheading text-muted mb30">This is basically like more advanced lorem ipsum.</h3> -->
              <p class="text-muted mb50">
                月別で、予約数、予約人数を確認できる。また曜日別、時間帯別の予約分布も見れる。
              </p>
            </div>
            <div class="hidden-sm hidden-xs col-md-6">
              <img src="/static/images/lp-pic-4.png" title="pic" class="img-responsive pull-right feature-pic">
            </div>
          </div>
        </div>
      </section>

      <div class="admin-form theme-info mw500 mv40" id="login">

        <!-- Login Panel/Form -->
        <div class="panel">

          <div id="contact">
            <div class="panel-body bg-light p25 pb15">

              <!-- Social Login Buttons -->
              <div class="section row">

                <div class="col-xs-12">
                  <div class="section-divider mb40">
                    <span>ログイン</span>
                  </div>
                </div>
                <div class="col-xs-12 mb16">
                  現在はTwitterアカウントのみ対応です。お気軽にログインして触ってみてください。バグ報告大歓迎。
                </div>
                <div class="col-xs-12">
                  <a href="javascript:void(0)" class="button btn-social twitter span-left btn-block" @click="loginTiwtter">
                    <span>
                      <i class="fa fa-twitter"></i>
                    </span>Twitter
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>

  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'login-view',
  data () {
    return {
      mail: '',
      password: ''
    }
  },
  computed: Object.assign({},
    mapGetters({
      app: 'app/state'
    }),
    {}
  ),
  created () {
    this.$store.commit('app/UPDATE_ISLOADING', false)
  },
  methods: {
    loginMail () {
      const mail = this.mail
      const password = this.password
      this.$store.dispatch('app/login', { mail, password }).then(() => {
        // ログインできた
        this.$router.push('/home')
      })
    },
    loginTiwtter () {
      this.$store.dispatch('app/login').then(() => {
        console.log('ログインおわた')
        // ログインできた
        this.$router.push('/home')
      })
    },
    loginOut () {
      this.$store.dispatch('app/loginOut').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style src="../../../static/assets/admin-tools/admin-forms/css/admin-forms.min.css" scoped></style>

<style lang="scss" scoped>
.admin-form {
  position: relative;
  width: 100%;
  margin: 0 auto;
}

.login-out-container {
  margin-top: 100px;
}

.logout-box {
  padding: 24px 0 0;
}

.sb-r-c #content_wrapper.login-page {
  margin-left: 0;
}

.home-page-heading {
  position: relative;
  padding: 30px 24px;
  border-bottom: 1px solid #d9d9d9;
  // background-color: #f2f2f2;
  background-color: #34475f;
  color: #fff;
  margin-top: 50px;
}

.text-app-name {
  color: #00acee;
}

#features {
  margin-top: 60px;
  margin-bottom: 40px;
  // background: url('/static/images/lp-pic-1.png') no-repeat center 200px #f9f9f9;
  // background-image: url('/static/images/lp-pic-1.png');
  // background-repeat: no-repeat;
  // background-position: center 120px;
  // background-size: 600px;
  // min-height: 550px;
  // overflow: hidden;
  .rsv-pic {
    max-width: 600px;
  }
}

#features-flat {
  padding: 50px 0;
  min-height: 360px;
  overflow: hidden;
  border-bottom: 1px solid #eee;
}

section h2.section-heading {
  color: #555;
  font-size: 40px;
  margin-top: 0;
  margin-bottom: 15px;
}

.feature-text {
  line-height: 1.8;
}

.feature-pic {
  border: 1px solid #ddd;
}
</style>
