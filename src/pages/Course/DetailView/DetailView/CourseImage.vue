<template>
  <div class="image-wrapper mb32">
    <img class="media-object mw150" src="/static/assets/img/stock/1.jpg" width="200">
    <img class="media-object mw150 " src="/static/assets/img/stock/1.jpg" width="200">
    <img class="media-object mw150" src="/static/assets/img/stock/1.jpg" width="200">
  </div>
</template>

<script>
export default {
  name: 'course-image'
}
</script>

<style lang="scss" scoped>
.image-wrapper {
  padding: 14px 16px 16px;
  text-align: center;
  background-color: #fafafa;
  margin: 0 -8px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
}
.media-object {
  margin-top: 2px;
  margin-bottom: 2px;
}
</style>
