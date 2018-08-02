<template lang="html">
  <header class="navbar navbar-fixed-top">
    <div class="navbar-branding dark">
      <a class="navbar-brand" href="dashboard.html">
        My<b> Restaurant</b>
      </a>
      <span id="toggle_sidemenu_l" class="ad ad-lines" v-if="isLogin" @click="toggleNavi"></span>
    </div>
    <ul class="nav navbar-nav navbar-right" v-if="isLogin">
      <li class="dropdown" v-if="userInfo !== null">
        <span class="user-name">ユーザー名: {{userInfo.name}}</span>
      </li>
      <li class="menu-divider hidden-xs">
        <i class="fa fa-circle"></i>
      </li>
      <li class="dropdown" v-if="isLogin">
        <a href="javascript:void(0)" class="btn-logout" @click="logout">ログアウト</a>
      </li>
      <!-- <button type="button" class="btn btn-default btn-sm">
        ログアウト
      </button> -->
    </ul>
  </header>
</template>

<script>
export default {
  name: 'global-header',
  props: {
    isLogin: { type: Boolean, default: () => false },
    userInfo: { type: Object, default: () => null }
  },
  methods: {
    toggleNavi () {
      this.$emit('toggle-navi')
    },
    logout () {
      this.$emit('logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.user-name {
  color: #666;
  font-size: 13px;
  font-weight: 600;
  padding: 20px 20px;
  // padding-bottom: 20px;
  height: 59px;
  max-height: 59px;

  position: relative;
  display: block;
}

.btn-logout {
  height: 100px;
}
</style>
