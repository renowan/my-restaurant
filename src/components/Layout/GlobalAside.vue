<template lang="html">
  <aside id="sidebar_left" class="nano nano-primary affix has-scrollbar sidebar-default">
    <div class="sidebar-left-content nano-content" tabindex="0" style="margin-right: -15px;">
      <ul class="nav sidebar-menu">

        <li class="sidebar-label pt20">予約管理</li>

        <!-- <li>
          <router-link tag="a" to="/login">
            <span class="fa fa-tasks"></span>
            <span class="sidebar-title">Login</span>
          </router-link>
        </li> -->

        <li :class="getActiveClass('home')">
          <router-link tag="a" to="/home">
            <span class="fa fa-home"></span>
            <span class="sidebar-title">Home</span>
          </router-link>
        </li>

        <li :class="getActiveClass('rsv')">
          <router-link tag="a" to="/cal/none">
            <span class="fa fa-files-o"></span>
            <span class="sidebar-title">予約</span>
          </router-link>
        </li>

        <li :class="getActiveClass('table')">
          <router-link tag="a" to="/table">
            <span class="fa fa-th"></span>
            <span class="sidebar-title">テーブル</span>
          </router-link>
        </li>

        <!-- <li>
          <router-link tag="a" to="/home">
            <span class="fa fa-list"></span>
            <span class="sidebar-title">コース</span>
          </router-link>
        </li> -->

        <!-- <li class="">
          <a href="base-setting.html">
            <span class="fa fa-cogs"></span>
            <span class="sidebar-title">設定</span>
          </a>
        </li> -->

        <!-- <li class="">
          <a href="design.html">
            <span class="fa fa-yen"></span>
            <span class="sidebar-title">Design</span>
          </a>
        </li> -->

        <!-- <li class="sidebar-label pt15">各種設定</li> -->

        <!-- <li>
          <a class="accordion-toggle menu-open" href="javascript:void(0)">
            <span class="fa fa-cog"></span>
            <span class="sidebar-title">設定</span>
            <span class="caret"></span>
          </a>
          <ul class="nav sub-nav" style="">
            <li>
              <a href="widgets_tile.html">
                <span class="fa fa-circle"></span> Tile Widgets</a>
            </li>
            <li>
              <a href="widgets_panel.html">
                <span class="fa fa-circle"></span> Panel Widgets </a>
            </li>
          </ul>
        </li> -->

      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'global-aside',
  methods: {
    getActiveClass (linkName) {
      const routeName = this.$route.name
      return linkName === routeName ? 'active' : ''
    }
  }
}
</script>

<style lang="css">
</style>
