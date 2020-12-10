export default {
    upfile: type => `/file/upload/${type}`, //上传文件
    upZip:"/file/uploadzip",//电子文件上传
    // downlodeZip: sldh => `/upcoming/uploadZip/${sldh}`,//电子文件上传
    base64: type => `/file/uploadBase64/${type}`,//64wenjian liu
    download: sldh => `/file/download/${sldh}`,//下载
    passimg: (type, param) => `/upcoming/verifySignature/${type}/${param}`, //yanqian  tupian
}