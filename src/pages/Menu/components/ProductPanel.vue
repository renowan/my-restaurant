<template>
  <div class="panel">
    <div class="panel-heading">
      <span class="panel-icon">
        <i class="fa fa-pencil"></i>
      </span>
      <span class="panel-title">メイン 商品</span>
    </div>
    <div class="panel-body pb5">

      <div class="media">
        <div class="media-image pull-left">
          <img src="/static/assets/img/stock/1.jpg" class="">
          <!-- <div class="author-info">
            <span class="label label-warning">NEW</span>
            <span class="label label-info">割引</span>
          </div> -->
        </div>
        <div class="media-body">
          <h4>青椒豚肉絲【チンジャオロースー】</h4>
          <div class="sub-info">
            <span class="label label-warning">NEW</span>
            <span class="label label-info">割引</span>
          </div>
          <p>
            一番人気
中華の定番！豚肉とピーマンの細切り炒め。
          </p>
        </div>
      </div>

      <hr class="short br-lighter">

      <h6>Education</h6>

      <h4>Bachelor of Science, PhD</h4>
      <p class="text-muted"> University of Missouri, Columbia
        <br> Student Health Center, June 2010 through Aug 2011
      </p>

      <hr class="short br-lighter">

      <h6>Accomplishments</h6>

      <h4>Successful Business</h4>
      <p class="text-muted pb10"> University of Missouri, Columbia
        <br> Student Health Center, June 2010 through Aug 2011
      </p>

    </div>
  </div>
</template>

<script>
export default {
  name: 'product-panel',
  components: {

  },
  computed: {

  },
  watch: {

  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.media {
  margin-top: 15px;
  p {
    font-weight: normal;
    color: #999;
  }
  h4 {
    color: #666;
    margin-top: 0;
  }
}
.media, .media-body {
  overflow: hidden;
  zoom: 1;
}
.media:first-child {
  margin-top: 0;
}

.media-left, .media > .pull-left {
    padding-right: 10px;
}

.panel-body .media-image {
  text-align: center;
  margin-right: 10px;
  min-width: 100px;
}

.panel-body .media img {
  // margin-top: 10px;
  width: 100px;
  height: 72px;
  // border-radius: 50%;
  // margin-bottom: 10px;
}

.sub-info {
  margin-bottom: 8px;
}
</style>
