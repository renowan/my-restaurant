<template>
  <div class="row mb32">
    <div class="col-xs-12">
      <div class="panel panel-info">
        <div class="panel-heading">
          <span class="panel-icon">
            <i class="fa fa-star"></i>
          </span>
          <span class="panel-title"> コース基本情報</span>
        </div>
        <div class="panel-body">
          <div class="row">
            <div class="col-xs-12">
              <div class="form-group" :class="{'has-error': hasNameError}">
                <label>コース名</label>
                <input type="text" id="course-name" class="form-control" placeholder="" v-model="editData.name">
              </div>
            </div>
            <div class="col-xs-12">
              <div class="form-group" :class="{'has-error': hasDescriptionError}">
                <label>説明文</label>
                <textarea class="form-control" id="course-description" rows="3" v-model="editData.description"></textarea>
              </div>
            </div>
            <div class="col-xs-6">
              <numberInput
              label="最小人数"
              id="course-min-num"
              :isError="hasNumError"
              v-model="editData.minNum">
              </numberInput>
            </div>
            <div class="col-xs-6">
              <numberInput
              label="最大人数"
              id="course-max-num"
              :isError="hasNumError"
              v-model="editData.maxNum">
              </numberInput>
            </div>
            <div class="col-xs-12 text-danger fs11 mb16" v-if="hasNumError">
              ※ 最大人数より最小人数が多い
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <numberInput label="設定価格" id="course-price" v-model="editData.price"></numberInput>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <label>画像</label>
            </div>
            <div class="col-xs-4">
              <imageBox></imageBox>
            </div>
            <div class="col-xs-4">
              <imageBox></imageBox>
            </div>
            <div class="col-xs-4">
              <imageBox></imageBox>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imageBox from '@/components/ui/ImageBox'
import numberInput from './NumberInput'

export default {
  name: 'base-info',
  props: {
    editData: { type: Object, required: true },
    errors: { type: Array, default: () => [] }
  },
  components: {
    imageBox,
    numberInput,
  },
  computed: {
    hasNameError () {
      return this.errors.indexOf('name') > -1
    },
    hasDescriptionError () {
      return this.errors.indexOf('description') > -1
    },
    // 最大人数が最小人数より大きい
    hasNumError () {
      const { minNum, maxNum } = this.editData
      if (!Number.isInteger(minNum) || !Number.isInteger(maxNum)) {
        return true
      }
      return minNum > maxNum
    }
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

</style>
