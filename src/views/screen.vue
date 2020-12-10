<template>
  <div style="background-color:white;with:8000px;height:2000px" :key='Keyup'>
    <div class="esigns" id="con_lf_top_div" style="height:900px">
      <span style="display:block;text-align: center;height: 100px;padding-top:30px">承诺：本表填写内容以及提交的材料真实、合法、有效，并严格按照有关要求查阅、利用不动产登记资料，严格按照查询目的使用查询结果，<br/>如有虚假或者违反由本人（单位）承担相关法律责任。</span>
      <vue-esign
          ref="esign"
          :isCrop="isCrop"
          :lineWidth="lineWidth"
          :lineColor="lineColor"
          :bgColor.sync="bgColor"
          style="border:solid 2px #EBEEF5;position: fixed; top: 15%; left: 0%;"
      />
      <div class="footbutton" style="position: fixed; top: 74%; left: 42%;">
          <el-button type="info" @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleGenerate">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import upload from '@/api/common/index';
export default Vue.extend({
  data() {
    return {
      url:'',
      lineWidth: 6,
      lineColor: '#000000',
      isCrop: false,
      bgColor: '',
      Keyup:0
    }
  },
  methods: {
    //签字版
    handleReset() {
        // 清除
        this.$refs.esign.reset();
    },
    async handleGenerate() {
        // 获取base64
        var _this = this;
        _this.$refs.esign
            .generate()
            .then((res) => {
                // 转成文件
                var file = []
                file.push(res)
                _this.getbase(file)
            })
            .catch((err) => {});
    },
    //64
    async getbase(file) {
        const res = await upload.base64('jysq', {
            file : file,
            signImage : 1
        });
        this.rmCookie("autograph")
        if (res[0].code && res[0].fileName) {
            // const value = res[0]
            const targetWindow = window.opener
            const value = JSON.stringify(res[0])
            this. url = res[0].fileFullPath
            this.setCookie("autograph", value, 1)
            targetWindow.postMessage(111, 'http://192.168.168.51/#/borrow/apply');
            ++this.Keyup
        } else {
            if (res[0].code == 110000) {
                this.$message.warning(res.message);
            }
        }
        window.close()
    },
    async setCookie(name, value, iTime) {
      const iDate = new Date();
      iDate.setDate(iDate.getDate() + iTime);
      document.cookie = name + '=' + value + ';expires=' + iDate.toGMTString();
    },
    async rmCookie(name) {
      this.setCookie(name, '', -1);
    }
  }
})
</script>
<style scoped>
.footbutton {
    display: flex;
    justify-content: center;
}
</style>