<template>
    <div>
        <div class="container">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <span style="color:#333A4D;height:19px;line-height:19px;font-weight: bold;display:flex"><div style="background:#4687FF; width: 4px; height: 12px;border-radius:2px;margin:3px 4px" ></div>选择借阅人类别</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
            <section class="main">
                <router-link to='/borrow/apply/title/000' class="buttonlink">
                    <el-button type="" class="applybutton title"><div class="header"></div><span>权利人</span></el-button>
                </router-link>
                <router-link to='/borrow/apply/office/000' class="buttonlink">
                    <el-button type="" class="applybutton office"><div class="header"></div><span>国家机关</span></el-button>
                </router-link>
                <router-link to='/borrow/apply/terrible/000' class="buttonlink">
                    <el-button type="" class="applybutton terrible"><div class="header"></div><span>关系利害人</span></el-button>
                </router-link>
            </section>
            <div class="officer"><div></div>人民法院、人民检察院、国家安全机关、公安机关、检察机关等国家机关</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'dashboard',
    data() {
        return {
            
        };
    },
}
</script>
<style scoped>
.main{
    display: flex;
    padding: 50px 0;
    justify-content: flex-start;
}
.buttonlink{
    width:240px;
    margin-right: 32px;
}
.main .applybutton{
    padding: 0;
    width:100%;
    height: 99px;
    color: #333A4D;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden; 
    border-radius: 2px;
    background: #F4F5F8;
    border: 1px #F4F5F8 solid;
}
.applybutton span{
    font-size: 19px;
    float: left;
    margin: -30px 0 0 96px;
}
.applybutton .header{
    height: 48px;
    width: 48px;
    margin-left: 24px;
}
.title .header{
    background:url(../../../../assets/img/borrow-title.png) no-repeat 
}
.office .header{
    background:url(../../../../assets/img/borrow-office.png) no-repeat 
}
.officer{
    width:240px;
    margin: -50px 0 0 280px;
    color: #6F737E;
    font-size: 14px;
}
.officer div{
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: rgb(246, 124, 33);
    border-radius: 50%;
    margin-bottom:3px;
}
.terrible .header{
    background:url(../../../../assets/img/borrow-terrible.png) no-repeat 50% 50% 
}
</style>