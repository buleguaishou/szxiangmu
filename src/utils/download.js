function DownLoad(url, name) {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      //ie
      const oPow = window.open(url, "", "width = 1, height = 1, top = 5000, left = 5000 ");
      let isOpen = true; //判断window.open是否被禁用
      try {
        if (oPow == null) {
          isOpen = false
        }
      } catch (err) {
        isOpen = false
      }
      if (isOpen) {
        //没禁用window.open采用window.open下载
        while (oPow.document.readyState !== "complete") {
          if (oPow.document.readyState === "complete") break;
        }
        oPow.document.execCommand("SaveAs", true, name);
        oPow.close();
      } else {
        //禁用了window.open采用iframe下载
        const oIrame = document.createElement('iframe');
        oIrame.style.width = "0px";
        oIrame.style.height = "0px";
        oIrame.style.opacity = 1;
        document.body.appendChild(oIrame)
        oIrame.src = url;
        const IfDoc = oIrame.contentDocument || oIrame.document;
        oIrame.onreadystatechange = function () { // IE下的节点都有onreadystatechange这个事件  
          if (oIrame.readyState == "complete") {
            // oIrame.execCommand("SaveAs", true, name)
            document.body.removeChild(oIrame)
          }
        };

      }

    } else {
      if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
      }
      const aLink = document.createElement('a');
      aLink.target = '_blank';
      aLink.href = url;
      aLink.download = name || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
      let event;
      if (window.MouseEvent) {
        event = new MouseEvent('click');
      } else {
        if (document.createEvent) {
          event = document.createEvent('MouseEvents');
          event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
      }
      aLink.dispatchEvent(event);
    }
  }
export default new DownLoad()
