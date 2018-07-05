<template>
  <div class="ly">
    <div class="ly-left">
      <div class="row">
        <div class="col-xs-12">
          <h3 class="mt8 mb24">新規コース {{routerName}}</h3>
        </div>
      </div>

      <div class="row">
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
                  <div class="form-group">
                    <label>コース名</label>
                    <input type="text" id="inputStandard" class="form-control" placeholder="Type Here...">
                  </div>
                </div>
                <div class="col-xs-12">
                  <div class="form-group">
                    <label>説明文</label>
                    <textarea class="form-control" id="textArea2" rows="3"></textarea>
                  </div>
                </div>
              </div>

              <div class="row">
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

      <div class="row">
        <div class="col-xs-12">
          <div class="panel panel-success">
            <div class="panel-heading">
              <span class="panel-icon">
                <i class="fa fa-star"></i>
              </span>
              <span class="panel-title"> グループ</span>
            </div>
            <div class="panel-body">
              <div class="form-group">
                <label>グループ名</label>
                <input type="text" id="inputStandard" class="form-control" placeholder="Type Here...">
              </div>

              <!-- <hr class="short alt"> -->

              <label>メニュー</label>

              <div class="item-box-1">
                <div class="cell-name">日本料理棒々鶏風味辛味</div>
                <div class="cell-value">
                  <div class="input-group">
                    <span class="input-group-addon">
                      個数
                    </span>
                    <input type="text" id="maskedTime" class="form-control time" maxlength="10" autocomplete="off" placeholder="">
                    <span class="input-group-btn">
                    </span>
                  </div>
                </div>
                <div class="cell-btn">
                  <div class="btn-group">
                    <button type="button" class="btn btn-default">
                      <i class="fa fa-angle-up"></i>
                    </button>
                    <button type="button" class="btn btn-default">
                      <i class="fa fa-angle-down"></i>
                    </button>
                  </div>
                </div>
                <div class="cell-close">
                  <span class="btn-close">
                    <i class="fa fa-times"></i>
                  </span>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-6">
                  <button type="button" class="btn btn-default btn-lg btn-block mt16">
                    <i class="fa fa-plus"></i> 項目追加
                  </button>
                </div>
                <div class="col-xs-6">
                  <button type="button" class="btn btn-default btn-lg btn-block mt16">
                    <i class="fa fa-times"></i> グループ削除
                  </button>
                </div>
              </div>




            </div>
          </div>
        </div>
      </div>

      <div class="row mb32">
        <div class="col-xs-12">
          <button type="button" class="btn btn-success btn-lg btn-block">
            グループ追加
          </button>
        </div>
      </div>
    </div>

    <div class="ly-right">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xs-12">
            <h4>メニュー</h4>
          </div>
          <div class="col-xs-12">
            <v-select v-model="currentMenuTab" :options="menuTabList" options-value="val"></v-select>
          </div>
          <div class="col-xs-12">
            <div class="menu-list">
              <table class="table mbn bg-white">
                <tbody>
                  <tr>
                    <td class="td-plus">
                      <span class="glyphicon glyphicon-plus-sign"></span>
                    </td>
                    <td class="td-name">
                      何か日本語の長いメニュー名を入れてみる
                    </td>
                    <td class="td-price">¥3100</td>
                  </tr>
                  <tr>
                    <td class="td-plus">
                      <span class="glyphicon glyphicon-plus-sign"></span>
                    </td>
                    <td class="td-name">
                      何か日本語の長いメ
                    </td>
                    <td class="td-price">¥3100</td>
                  </tr>
                  <tr>
                    <td class="td-plus">
                      <span class="glyphicon glyphicon-plus-sign"></span>
                    </td>
                    <td class="td-name">
                      何か日本語の長いメ
                    </td>
                    <td class="td-price">¥3100</td>
                  </tr>
                  <tr>
                    <td class="td-plus">
                      <span class="glyphicon glyphicon-plus-sign"></span>
                    </td>
                    <td class="td-name">
                      何か日本語の長いメ
                    </td>
                    <td class="td-price">¥3100</td>
                  </tr>
                  <tr>
                    <td class="td-plus">
                      <span class="glyphicon glyphicon-plus-sign"></span>
                    </td>
                    <td class="td-name">
                      何か日本語の長いメニュー名を入れてみる
                    </td>
                    <td class="td-price">¥3100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { select } from 'vue-strap'
import imageBox from '@/components/ui/ImageBox'

export default {
  name: 'course-edit-view',
  components: {
    vSelect: select,
    imageBox
  },
  computed: Object.assign({},
    mapGetters({
      app: 'app/state',
      course: 'course/state',
      editData: 'course/editData',
    }),
    {
      noCourse () {
        return this.course.isLoaded && this.list.length < 1
      }
    }
  ),
  watch: {

  },
  data () {
    return {
      routerName: '',
      menuTabList: [
        {val: 0, label: 'メイン'},
        {val: 1, label: 'ドリング'}
      ],
      currentMenuTab: 1
    }
  },
  created () {
    const routerName = this.$route.name
    this.routerName = routerName
    if (routerName === 'course-create') {

    } else {

    }
  },
  methods: {

  }
}
</script>

<style src="../../../../static/assets/admin-tools/admin-forms/css/admin-forms.css"></style>
<style lang="scss" scoped>
.ly {
  display: table;
  width: 100%;
  // border-top: 1px solid #ddd;
  min-height: 500px;

  .ly-left {
    display: table-cell;
    padding: 16px 16px 0;
    background-color: #fafafa;
    // width: 80%;
  }
  .ly-right {
    display: table-cell;
    width: 320px;
    background-color: #f5f5f5;
    border-left: 1px solid #DDD;
    padding: 0;
    vertical-align: top;
  }
}

.menu-list {
  border: 1px solid #ddd;
  border-top-width: 0;
  background-color: #fff;
  overflow-y: scroll;
  max-height: 200px;
}

.td-plus {
  width: 21px;
  padding-right: 0;
  vertical-align: top;
}
.td-name {
  border-right: 1px solid #e5e5e5;
}
.td-price {
  width: 66px;
  background: #fdfdfd;
}

.panel-editbox {
  display: block;
  border: 1px solid #ddd;
  border-bottom: 0px solid #ddd;
}

.item-box {
  border: 1px solid #e5e5e5;
  background: #fafafa;
  padding: 8px 8px;
  font-size: 16px;
}

.ilb {
  display: inline-block;
  width: auto;
}

.input-group-wrapper {
  width: 120px;
  display: inline-block;
}

.item-box-1 {
  border: 1px solid #e5e5e5;
  background: #fafafa;
  // padding: 8px 8px;
  font-size: 16px;
  display: table;
  margin-bottom: 16px;
  width: 100%;

  .cell-name {
    display: table-cell;
    padding: 8px 8px;
    vertical-align: middle;
  }
  .cell-value {
    display: table-cell;
    padding: 8px 0 8px 8px;
    vertical-align: middle;
    width: 120px;
  }
  .cell-btn {
    display: table-cell;
    padding: 8px 0 8px 8px;
    vertical-align: middle;
    width: 86px;
    .btn-group {
      width: 100%;
    }
  }
  .cell-close {
    display: table-cell;
    padding: 8px 0;
    vertical-align: middle;
    text-align: center;
    width: 40px;
  }

  .btn-close {
    display: block;
    width: 30px;
    height: 30px;
    text-align: center;
    padding: 4px;
  }
}

div.dataTables_filter {
  text-align: right;
}
div.DTTT .btn {
  color: #333 !important;
  font-size: 12px;
}
div.dataTables_filter label {
  font-weight: normal;
  white-space: nowrap;
  text-align: left;
}
div.dataTables_filter input {
  margin-left: 0.5em;
  display: inline-block;
}
</style>
