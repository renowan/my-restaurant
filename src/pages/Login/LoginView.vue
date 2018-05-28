<template>
  <section id="content_wrapper">
    <section id="content" class="animated fadeIn">

      <div class="admin-form theme-info mw500" v-if="app.isLogin">
        <div class="panel mt30 mb25">
          <div id="contact">
            <div class="panel-body bg-light p25 pb15">
              <div class="section row">
                <div class="col-xs-12">
                  <div class="section-divider mv40">
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

      <div class="admin-form theme-info mw500" id="login" v-else>

        <!-- Login Panel/Form -->
        <div class="panel mt30 mb25">

          <div id="contact">
            <div class="panel-body bg-light p25 pb15">

              <!-- Social Login Buttons -->
              <div class="section row">
                <!-- <div class="col-md-6">
                  <a href="#" class="button btn-social facebook span-left btn-block">
                    <span>
                      <i class="fa fa-facebook"></i>
                    </span>Facebook</a>
                </div> -->
                <div class="col-xs-12">
                  <div class="section-divider mv40">
                    <span>ログイン</span>
                  </div>
                </div>
                <div class="col-xs-12 text-center mb8">
                  現在はTwitterアカウントのみ対応
                </div>
                <div class="col-xs-12">
                  <a href="javascript:void(0)" class="button btn-social twitter span-left btn-block" @click="loginTiwtter">
                    <span>
                      <i class="fa fa-twitter"></i>
                    </span>Twitter</a>
                </div>
              </div>

              <!-- <div class="setion row">
                <div class="col-xs-12">
                  <div class="section-divider mv40">
                    <span>メールアカウントログイン</span>
                  </div>
                </div>
                <div class="col-xs-12">
                  <div class="section">
                    <label for="username" class="field prepend-icon">
                      <input type="text" name="username" id="username" class="gui-input" placeholder="メールアドレス">
                      <label for="username" class="field-icon">
                        <i class="fa fa-user"></i>
                      </label>
                    </label>
                  </div>
                </div>
                <div class="col-xs-12">
                  <div class="section">
                    <label for="password" class="field prepend-icon">
                      <input type="text" name="password" id="password" class="gui-input" placeholder="パスワード">
                      <label for="password" class="field-icon">
                        <i class="fa fa-lock"></i>
                      </label>
                    </label>
                  </div>
                </div>
                <div class="col-xs-12">
                  <button type="button" class="btn btn-primary btn-block">
                    ログイン
                  </button>
                </div>
              </div> -->

              <!-- Divider -->
              <!-- <div class="section-divider mv30">
                <span>OR</span>
              </div> -->

              <!-- Username Input -->
              <!-- <div class="section">
                <label for="username" class="field-label text-muted fs18 mb10">Username</label>
                <label for="username" class="field prepend-icon">
                  <input type="text" name="username" id="username" class="gui-input" placeholder="Enter username">
                  <label for="username" class="field-icon">
                    <i class="fa fa-user"></i>
                  </label>
                </label>
              </div> -->

              <!-- Password Input -->
              <!-- <div class="section">
                <label for="username" class="field-label text-muted fs18 mb10">Password</label>
                <label for="password" class="field prepend-icon">
                  <input type="password" name="password" id="password" class="gui-input" placeholder="Enter password">
                  <label for="password" class="field-icon">
                    <i class="fa fa-lock"></i>
                  </label>
                </label>
              </div> -->

            </div>

            <!-- <div class="panel-footer clearfix">
              <button type="submit" class="button btn-primary mr10 pull-right">Sign In</button>
              <label class="switch ib switch-primary mt10">
                <input type="checkbox" name="remember" id="remember" checked="">
                <label for="remember" data-on="YES" data-off="NO"></label>
                <span>Remember me</span>
              </label>
            </div> -->

          </div>
        </div>

        <!-- Registration Links -->
        <!-- <div class="login-links">
          <p>
            <a href="pages_login-alt.html" class="active" title="Sign In">Forgot Password?</a>
          </p>
          <p>Haven't yet Registered?
            <a href="pages_login-alt.html" title="Sign In">Sign up here</a>
          </p>
        </div> -->

        <!-- Registration Links(alt) -->
        <!-- <div class="login-links hidden">
          <a href="pages_forgotpw(alt).html" class="active" title="Sign In">Sign In</a> |
          <a href="pages_register(alt).html" class="" title="Register">Register</a>
        </div> -->

      </div>
    </section>
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
        // ログアウトできた
        // this.$router.push('/home')
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

.logout-box {
  padding: 30px 0;
}
</style>
