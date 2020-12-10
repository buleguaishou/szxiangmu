<template>
    <router-view @initEloam="initEloam" :row="row"/>
</template>
<script>
    import highShotInstrument  from "@/utils/highShot.js"
    export default {
        data() {
            return {
                row : {}
            }
        },
        mounted() {

        },
        methods: {
            // 初始化高拍仪
            initEloam(className,callBack) {
                let  _this = this
                // console.log(highShotInstrument)
                highShotInstrument.initEloam([
                    {
                        rootClass: className,
                        callBack: function (row) {
                            const { target, index, cardData, base64capture} = row
                            _this.row = row
                        }
                    }
                ], { size: [25, 25] })
            },
        }

    }
</script>