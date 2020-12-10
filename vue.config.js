module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === "develop" ? "/e-archive-website" : "/",
  devServer: {
    disableHostCheck: true, // 跳过检查
    host: "0.0.0.0",
    proxy: {
      "/api/": {
        // target: "http://172.20.10.3:8099", // 蒋亮亮
        // target: "http://192.168.8.74:8099", // 蒋亮亮
        // target: "http://192.168.2.239:8099", // guotu蒋亮亮
        // target: "http://192.168.8.226:8099",//肖育
        target: "http://192.168.2.254:8099/e-archive",//guotu肖育
        // target: 'http://192.168.1.65:31380/e-archive',//zong
        // target: 'http://192.168.168.51:8080',//zong
        // target: 'http://192.168.168.51/e-archive' , // 线上
        ws: true,
        changeOrigin: true,
        pathRewrite: { "^/api/": "/" }
      }
    }
  },
  outputDir:
    process.env.VUE_APP_TITLE === "production" ? "dist_production" : "dist_develop",
}