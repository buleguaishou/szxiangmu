
/*
* 新ERP系统 使用良田高拍仪扫描身份证或者拍照上传到系统
* 页面js使用，by 李宁
*/

//注意：

//前台页面返回或者关闭页面必须调用一下代码
/*关闭所有高拍仪资源 by louis 注意:如果需要拍照功能必须调用*/
//    var ret = me.plugin().Global_DeinitDevs();
// window.highShotInstrument = new HighShotInstrument()
function HighShotInstrument() {
  var me = this;
  me.rootClassList = [];
  me.initEloam = function (options, extend) {
    if (!me.options) {
      me.options = []
    }
    if (!me.extend) {
      me.extend = extend
    }
    me.options = me.options.concat(options)
    for (var i = 0; i <= options.length - 1; i++) {
      if (options[i]) {
        appendImg(options[i]);
      }
    }

    // 已初始化，直接返回
    if (me.readIDcard === true) {
      return
    }

    //高拍仪代码///
    me.readIDcard = false;
    me.cRow = {
      className: null,
      target: null,
      index: 0
    };

    me.plugin = function () {//获取组件对象
      return document.getElementById('view1');
    }

    me.MainView = function () {
      return document.getElementById('view1');
    }

    // me.AssistView = function () {
    //   return document.getElementById('view2');
    // }

    /*关闭摄像头资源*/
    me.CloseVideoMain = function () {
      if (me.VideoMain) {
        me.plugin().Video_Release(me.VideoMain);
        me.VideoMain = null;
        me.MainView().View_SetText("", 0);
      }
    }

    // me.CloseVideoAssist = function () {
    //   if (me.VideoAssist) {
    //     me.AssistView().Video_Release(me.VideoAssist);
    //     me.VideoAssist = null;
    //     me.AssistView().View_SetText("", 0);
    //   }
    // }

    /*开启摄像头资源*/
    me.OpenVideoMain = function () {

      me.CloseVideoMain();

      if (!me.DeviceMain)
        return;

      me.VideoMain = me.plugin().Device_CreateVideo(me.DeviceMain, 0, 1);
      if (me.VideoMain) {
        me.MainView().View_SelectVideo(me.VideoMain);
        me.MainView().View_SetText("打开视频中，请等待...", 0);
      }
    }
    // me.OpenVideoAssist = function () {

    //   me.CloseVideoAssist();

    //   if (!me.DeviceAssist)
    //     return;

    //   me.VideoAssist = me.AssistView().Device_CreateVideo(me.DeviceAssist, 0, 1);
    //   if (me.VideoAssist) {
    //     me.AssistView().View_SelectVideo(me.VideoAssist);
    //     me.AssistView().View_SetText("打开视频中，请等待...", 0);
    //   }
    // }

    me.addEvent = function (obj, name, func) {
      if (obj.attachEvent) {
        obj.detachEvent("on" + name, func);
        obj.attachEvent("on" + name, func);
      } else {
        obj.removeEventListener(name, func, false);
        obj.addEventListener(name, func, false);
      }
    }

    //获取身份证数据
    me.getIcardData = function () {
      var data = {};
      data.empName = me.plugin().Global_GetIdCardData(1);
      data.empSex = me.plugin().Global_GetIdCardData(2);
      if (data.empSex) {
        if ("男" == data.empSex) {
          data.empSex = "1";
        } else {
          data.empSex = "2";
        }
      }
      data.empNation = me.plugin().Global_GetIdCardData(3);
      if (data.empNation) {
        if ("汉" == data.empNation) {
          data.empNation = "01";
        } else if ("苗" == data.empNation) {
          data.empNation = "02";
        } else if ("侗" == data.empNation) {
          data.empNation = "03";
        } else if ("白" == data.empNation) {
          data.empNation = "04";
        } else if ("土家" == data.empNation) {
          data.empNation = "05";
        } else if ("仫佬" == data.empNation) {
          data.empNation = "06";
        } else if ("彝" == data.empNation) {
          data.empNation = "07";
        } else if ("革家" == data.empNation) {
          data.empNation = "08";
        } else if ("穿青" == data.empNation) {
          data.empNation = "09";
        } else if ("水" == data.empNation) {
          data.empNation = "10";
        } else if ("布依" == data.empNation) {
          data.empNation = "12";
        } else if ("瑶" == data.empNation) {
          data.empNation = "13";
        } else if ("回" == data.empNation) {
          data.empNation = "11";
        }
        else if ("壮" == data.empNation) {
          data.empNation = "17";
        } else if ("黎" == data.empNation) {
          data.empNation = "14";
        } else if ("畲" == data.empNation) {
          data.empNation = "15";
        } else if ("黎" == data.empNation) {
          data.empNation = "14";
        } else {
          data.empNation = "";
        }
      }
      data.empBirthday = me.plugin().Global_GetIdCardData(4) + "-" + me.plugin().Global_GetIdCardData(5) + "-" + me.plugin().Global_GetIdCardData(6);
      var birthday = new Date((me.plugin().Global_GetIdCardData(4) + "-" + me.plugin().Global_GetIdCardData(5) + "-" + me.plugin().Global_GetIdCardData(6)).replace(/-/g, "\/"));
      var d = new Date();
      //年龄
      //data.extNum1 = d.getFullYear()-birthday.getFullYear()-((d.getMonth()<birthday.getMonth()|| d.getMonth()==birthday.getMonth() && d.getDate()<birthday.getDate())?1:0);
      //身份证地址
      data.empRegisteredPlace = me.plugin().Global_GetIdCardData(7);
      //身份证号
      data.empIndentity = me.plugin().Global_GetIdCardData(8);
      // console.log(data)
      return data;

    }

    //设备接入
    // var s = me.plugin().Global_GetEloamType(1)
    // console.log(s)



  }
  me.run = function () {
    //绑定事件,读取身份证信息
    me.addEvent(me.plugin(), "IdCard", readId);
    me.addEvent(me.plugin(), "DevChange", DevChange);
    window.onbeforeunload = function (e) {
      me.doExit()
    }
    me.MainView().Global_SetWindowName("view");
    // me.AssistView().Global_SetWindowName("view");

    me.doStart()
  }
  function appendImg(item) {
    // 高拍仪图标
    me.addHighSHotIcon(item)
    if (!me.container) {
      me.container = document.createElement("div");
      me.container.style.cssText = "display: none; z-index: 9998;width: 100%;height:100%; filter:progid:DXImageTransform.Microsoft.gradient(startcolorstr=#7F000000,endcolorstr=#7F000000);background:rgba(0,0,0,0.6);position: fixed; top: 0%; left: 0%;text-align:center";
      me.container.innerHTML = '\
          <div style="z-index:9999;background-color:#FFF;text-align:center;width:652px;height:590px;padding-top:34px;margin-bottom:20px;margin-top: -350px; margin-left: -625px;z-index:999;position: fixed; top: 54%; left: 68%;">\
            <div>\
              <object id="view1" type="application/x-eloamplugin" width="500" height="300" name="view"></object>\
            </div>\
            \<div id="highShotWrap_topArea" style="height: 220px;" ></div>\
            <div id="highShotWrap_tip" style="margin-top:10px;">\
              <input type="button" id="highShotWrap_takePhotoMain" style="margin-left:5px;background: #3796F6;color:#fff;border-color:#3796F6;margin-left:5px;width: 100px;height: 25px;vertical-align:middle;" value="镜头拍照" />\
              <input id="nameIdShow" value="" style="width: 80px;height: 25px;margin-left:5px;vertical-align:middle;" />\
              <input id="cardIdShow" value="" style="width: 150px;height: 25px;margin-left:5px;vertical-align:middle;" />\
              <input id="highShotWrap_makeSure" type="button" value="确定" style="height: 25px;margin-left:5px;background: #3796F6;color:#fff;border-color:#3796F6;display: inline-block;padding: 1px 10px; vertical-align:middle;" />\
            </div>\
          </div>';
      // me.container.appendChild(input)
      document.body.appendChild(me.container)
      document.getElementById("highShotWrap_makeSure").onclick = function () {
        me.container.style.display = 'none';
        var data = me.getIcardData()
        // if(me.cRow.nameId) {
        //   document.getElementById(me.cRow.nameId).value = data.empName;
        // }
        // if(me.cRow.cardId) {
        //   document.getElementById(me.cRow.cardId).value = data.empIndentity;
        // }
        for (var i = 0; i < me.options.length; i++) {
          if (me.options[i].rootClass === me.cRow.className) {
            me.options[i].callBack({
              target: me.cRow.target,
              index: me.cRow.index,
              cardData: data,
              base64capture: me.base64capture
            })
          }
        }
        me.doExit()
      };
      document.getElementById("highShotWrap_takePhotoMain").onclick = function () {
        me.Scan(1)
      };
      // document.getElementById("highShotWrap_takePhotoAssist").onclick = function () {
      //   me.Scan(2)
      // }
    }
  }

  //初始化视频设备 拍照功能必须绑定此事件
  function DevChange(type, idx, dbt) {
    if (1 == type)//视频设备
    {
      if (1 == dbt)//设备到达
      {
        var deviceType = me.plugin().Global_GetEloamType(1, idx);
        if (1 == deviceType)//主摄像头
        {
          if (null == me.DeviceMain) {
            me.DeviceMain = me.plugin().Global_CreateDevice(1, idx);
            if (me.DeviceMain) {
              me.OpenVideoMain();
            }
          }
        }
        else if (3 == deviceType)// 前置辅摄像头
        {
          // || 2 == deviceType 后置摄像头
          if (null == me.DeviceAssist) {
            me.DeviceAssist = me.plugin().Global_CreateDevice(1, idx);
            if (me.DeviceAssist) {
              // me.OpenVideoAssist();
            }
          }
        }
      }
      else if (2 == dbt)//设备丢失
      {
        if (me.DeviceMain) {
          if (me.plugin().Device_GetIndex(me.DeviceMain) == idx) {
            me.CloseVideoMain();
            me.plugin().Device_Release(me.DeviceMain);
            me.DeviceMain = null;
          }
        }

        if (me.DeviceAssist) {
          if (me.plugin().Device_GetIndex(me.DeviceMain) == idx) {
            me.CloseVideoAssist();
            me.plugin().Device_Release(me.DeviceAssist);
            me.DeviceAssist = null;
          }
        }

        // if (me.DeviceAssist) {
        //   if (me.plugin().Device_GetIndex(me.DeviceAssist) == idx) {
        //     me.CloseVideoAssist();
        //     me.plugin().Device_Release(me.DeviceAssist);
        //     me.DeviceAssist = null;
        //
        //     document.getElementById('lab2').innerHTML = "";
        //     document.getElementById('subType2').options.length = 0;
        //     document.getElementById('selRes2').options.length = 0;
        //   }
        // }
      }
    }
  }
  me.addHighSHotIcon = function (item) {
    if (item.rootClass) {
      // 不需要重复添加
      if (me.rootClassList.toString().indexOf(item.rootClass) !== -1) {
        // 已经存在，直接更新
        me.refreshIcon()
      } else {
        me.rootClassList.push(item.rootClass)
      }
      me.refreshIcon()
    }
  }

  me.icon = function (className, index) {
    var r = document.createElement("img");
    var width = 20;
    var height = 20;
    if (me.extend && me.extend.size) {
      width = me.extend.size[0]
      height = me.extend.size[1]
    }
    r.style.cssText = 'width: ' + width + 'px;height:' + height + 'px;cursor:pointer;position: relative;top: 6px;left: 5px;';
    r.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAgAElEQVR4Xu19C5gcVZn2+52emcCSBAQVYdfVRRCCIiAghEzXDEQyXT1JVw86wQuwu66grqL7I4t/vIHXKKv5V8B/FS//GnZZSJTp6sl09YTbTPWEa/DGJSCIiq54iUgSWMnMdH3/UzMTGWCq6lR1VXX1TNXz8ITnme985zvvOW+fOqe+CyF9UgRSBBwRoBSbFIEUAWcEUoKkqyNFwAWBlCDp8kgRSAmSroEUgWAIpDtIMNzSVgsEgZQgC2Si02EGQyAlSDDc0lYLBIGUIAtkotNhBkMgJUgw3NJWCwSBlCALZKLTYQZDICVIMNzSVgsEgZQgMU60qlYWPb0YS9snsHSiLg7kDC8VFpaywFLBWMrAUtscAnZbhN1kYbclsJvqtLs9Y+2aaMfuxU9jt2Hk98Zo9oLuKiVIyNO/vL96cGa8fpRgOhLgo0DiSGDm/4GDQ+ruSYAeAfhRsPWo/f8W8aP1jswjd2zOPRlSH6ma6R+r9AmKwEkXbm8/4InfZTkjeojRNUWI8EgQ1Kwp8jBhlOrW8DOHvbx27zUnTwRVttDbpQTxuQI6i8MnCYs7QXwmgByADp8q4hYfB1AF062WoLGxUs+9cRvQyv2lBPGYPfvc8ExHpgjiVWDuBPDaVp5wAD8B0RiYth4wXi+l5xn32UwJ4oBPd5/RWWf0EVAE44gWJ8Xc5hMeY6CUIQyMDKhj83KMDQ4qJcgsADt7txyRyWSKFtBHBHu3WDAPM8YEMFCv10tjQ6sfWzAD9xhoShAAXZrRx+BzACoCWLTAF8degEsEumFUVwcWOBYL9xZr6ptEO84H6Pw4dgsGLAA7BOiXAD/FoKfsfwHsYraeAsRTDPtf+2pRHARYBxHZ/+JAgA4i8EH2vxb4lQCWESCiXrz2rgLwxsUT2LhQzyoLbgc5c/XgX06INpsU5wM4JuxFxsD/2EQA6EEQ7wDEDsuydmwrqw+H2deKgnG0EGIZYC0D0zKAj50hzl+E2c+MroeYsbHdmtx465Y1/x2B/sSqXDAE6eyrHk/M5xNPEeOlIc7Ij0G4ExbfxYQ7a3r+wRB1+1aV1SrHEuM0CDoV9r/AG3wrcW6wkwkbmWjj2EDuRyHqTayqeU+QFYWxJW1izzpmrAtnFngriO6GhXu4je6p3Zh7Ihy90WjJnl09jCb5FAicAuY3AbQqjJ6IsH7SWrJ+W7lzTxj6kqpjXhNE0YbPIbbWMeH4BidgOxg6yNJNvfe+BnU1tbmiDR0HFhoIGoCTGzGGGD9iEutNveeGRvQkue28JEj3muFjLMHrALZfpwI9RPgF26QQQjcHem4NpCThjZS+4TNhWRoRNGa8Kri5tFFYtH5ksOeh4DqS2XLeEaSrYFzMNPU6FfScMciM6yYX7dHv2Lz2T8mctnCtWt6/af+2vUtsorwDwJqA2ncSY/1oWd0QsH0im80bgmQLlRVE9CkAKwMiPSiEuGZkoGdLwPbzoll33/Bqy7IubIAotzDzZbVyftt8AGReEETRqu9n8BUEBLniTIkxx0puhCj2VTeBLjX13FdbnSQtTZDO3i0vybRlrmDg3QEmIiWGBGiNEIWAb9Yn65eODa3+o0RXiRRpWYJ0FapnMPEV/m9i+C4QbzBLvZsSOSMJNUopDq0F08UAnerTxO3EdOloOXebz3aJEG9JgswcxG1yZHyg+ATAG8wT796Ayy+33T7Sxy8Cl18ulB+8ySbJxQAO89G8ToxLW/EA33IEyWrGRgLO8zE5APPVQtCXR0rqz321S4XnRKC7aLzasvjDIPqAH4gYuLamq4Gv3v30FZZsSxFEKVQrIFZ9DL7MFm+oDeZHfbRJRSURyK6pdJGY2k0Kkk0AJsMs5/LS8k0WbBmCKJphXxueLosXgz5d03OXycqncsERyGrVTxH4kz403G7q6gof8k0TbQmCKFr1PoBfL4cSPU7Ml4yW1c1y8qlUGAh0FYx+JvoSwH8tp4/uN/XccXKyzZNKPEEUzXgcgB0DIfNUIOqXmAOrd8gIpzLhIqD0bVkGK/MlALKvUL80dVWSUOHaKqst0QRRtKodVHSgzGCY+YpaOf8RGdlUJloEsoXKF4noUrleaJep5+zAsEQ+iSWIohksixgTzquV1P+QlU/lokcgWzTOJca1sj2ZuprItZhIoxTN+C2Al8uAS4y16XlDBqn4ZabPJZD9IPs7U1cPjd9K9x4TRxBFq9wHkNSBPCVH0pbTi+3xRxK+39TziTq4J4ogimbcLOuNSyBlVM/Vkr9EUgu7tGqWwaYkEreYuvpmSdnIxRJDEKVobAKjX2bEgumokXLuURnZVCYZCHQXqkdaxI9IWUPYbJbUtVKyEQslgiC+yNGx35KRzWc8HTEuqfoIEOjuv22xNf6sXAx7QkjSdIL48a0Su/bbf2TkjGcjmLtUZUwIdHfftp914LNSkZpJ8N1qKkFmvHK/LDM3YsI6bKTS+xsZ2VQm2Qh054deYbULqWwwxPhwM72Am0aQmXiOm2Rc1oUlls3HhADJXsbRWjedWMOS8XioE9NZzYonaQpB7EhA0ZbZKhPsJCxePjKYvzPa6Uq1NwOB7jWV0yxBd0j0vd2arK9qRmRiUwjSpRnfkAmTtdhSx8q9VQkAU5EWRaCzMJQTJAwv8+3w3VFdvcBLLuy/x04QO8ECwFd7DSR1H/FCaP78Xd4thT4QdyKIWAlip+YB0Vav7COp4+H8WfyyI5FxcJxKDM68Ks6UQrESRPJLecXU1V5ZYFO5+YOAohlDEq7ysX5pj40gcle69DjEZC6N55g/i97PSKbjSdqqXkFXcV79xkKQmSs922/KNR1o6nzoZznNT1lJ58adwhLZOK7+YyGIolW/45VIOo0hn58LPsio5GLcaaOp5/42iH4/bSIniF2CALCu9zCqbOqqnY4/fVIEphBQNEP3zpYi3hZ16YVICTJVvAZ7al71Odji7jQ1T8qM2QjMpBQacUPFrk8yiSXZKIv4REqQrqLxec/KTsxXm+X8RenySBF4IQJKoXKVV3I6u9LVaEn9aFToRUYQuyagsPiHHoY/IQinpxkPo5re1tY7lcGRcbtXmlNL0AlR1UyMjCDZovFlYthZ91we/mdTz9tpYtInRWBOBBStcglA/+K6iggbaiX1w1FAGAlB7FLLk5k2e/dwudblu8wT7z49TSQdxbQ+p9Mu4skWHd5GOIzZOpwt63AS4tdE4teTjCdI8K8TXYh0OmH27R5Z5Xe21SdPiKJEdSQEyRaMdUT4vOvUk3VOWoIgfHJ0929azONLzmLwWwGyS6pJPnwdgb5LHXtuGtm8NlERm9OlF4RroVBmfLRWVtdLDlZaLHSCqGpl0TMdZO8ex7hYMWjqqnzCY+nhLFxBRTPyDLyNphNJSyXbc0BrFwNlAq43dbWSFEQVzSh7lIV76IBxPsEw8nvDtDl0gmQLlQuI6Bo3I4UQaxZ6LcCwJlEpDCuA9X4Qwk9ywHZOK/FVs9wjm5EkrGG9SM9MpatB17MI84W1cv4bYRoRAUGMGhE6090jzGl6sa5swXgDCfoQmN8VbU8AiL7NFn+lVlZ/HHlfLh147SLMGKuV1WyYNoZKkC7N6GPgxnT3CHOKXqxrxl/pXwEcHm1Pz9P+a2L8UzOzWMrsIgScPaqrA2HhEipBFK1yPUDnpLtHWNMz185RfS8R/1t0PbhrZqb31cq5rzWrf69dBOAbTD3/trDsC40gnb1bjhBtmQcBLHIyLj17NDZtilb5GECfbUxLGK3546ae/1wYmvzqkNhF9lqT9WPHhlY/5lf3XPKhEUQi3iO9uWpgxroKQ2cxCTvRhd/nCTD9EMRPMvAksfUkROYQYn4pEx0CtjoB2t+vUmJr1Wi5185KE/vjtYuEGS8SGkGyBffDOTPeXiurXl69LwJ7ef/t+7ft3XUUCxwc+0zM1WGm/vjY98L5dZIdT1arHEugB2TlAfotga+rE8pjJdXV4c/W2VWsqBaTSqC1AEtnWGfw62p63n5riPXJFoy3EeG/nDoN87AeCkG6+4xOy4JjImki/GK8fc+yOzavlcqot2/g2aKxkhj/F8BrY50B7862CsJ74vAhW95fPbh9nO2k3id6mkU0weCrMsBVQWyzfZ/qwEUEugjM7Z79AT+Y6KA337E596SEbGgiy/s37d8xsWQHM17lpFQIZEcG1LFGOw2FIBJ+V1eauvohP8aeUTCOrhPsAbpGIfrRGaos0U1mKbcqVJ1zKFO0yncBeotnP4R7WNB7azfmvu8p6yGQPbv6RrL4a2Cc4q2Lv2fq+bd6y4UroWjGVwB80HEXCck/q2GCTH05X0QPgnGEIwRCrDQHem71A5GiVb8AcKJLqoV9pfhCfBTNeA8AmRujraau9vjBV0ZW0YxhABI/AvROU89dJ6MzLBmlb/hMWNYtjvoIjx2wl49t9Mt6wwSRiBjcbuqqxC/R84fqdRALC+hG9BDRR0ZLuSsa0eHUdsXqm/46k5moAeRe5JKtT5nl3sujsMHWKRXTQ7jn0PY9yzdvXluPyo659CqacY97ds7GIw4bJkiXZvw/Bv7OERjGJ8yy6vtqUikYXwfhwjgB99sXgy6o6blv+m0nI69ohr1z2DuI8xMxOfZ1LJNTAESXmKWcVCJymfHLyCgF4+MgfMZJloB/H9XVv5fR5aKjkeZTscP2ffPfOGux3mDqvff57aVLM/6Rga/6bRenPDOOj8L9QjId53+aunpuHONd2XfzIZP1iVs8Qqd/NdFBx8d5YFe0oeMA4eb+8jNTV51f/SXAa2gHUbTh0wFrm0s/Db0bK5phV659p8Q44heJ8Ne7q2B8ngnr3AZlkTh5rNRzb1wDV7TqOwD+T/cdjc81y3l3mZAN9j4niRWm3mNHJQZ6GiOIxxYH4AumrrpOtJfVSrGyioCj2eJDvGTj+DuJzE9R54dGB1X7/TeSR9EM+/ZuhaNyxjVmWXV//YrAMqVofA+Ms11Ux7ar7bNB0Qw7BuR/u2AV6BV/n76GCJLVjJsIcCy4KCD6R/Se70YwV/NWZXdx4CCL9/tjknaP5xbjltOBjNsbw5Omrsb6Q9atDb/VgrXZCS8Gbq7p6llBF0xggryuf1PHIeNL7Mgzxw9KIsOvHLkx/6ugxi3EdtlipUhMjt6ojU54o5h6/SiCuMcs5YO4xAQyrfvsyl9ZdfqlS+OJP3TsWfzA5rXjQToITBDbPYGZXCLOeIep548NYtRCbuN9/mhuoguvJArEWD9aji4Nz1xrQ9EqDwK0zGndEHF+tJT3rEEyV/vABPH6ek6E/xgtqect5MUeZOxe1+bt3P6KW8pv/m0Q3WG0WVm4+dAJmnCsFRnG1apfO7uKxrXMcLzR4wa+qgcmiKJV7wT4VMd3vybHDfgFOSnyHrcyu01dbSTePJRhKpqxC8BSB2UN3VwGMTBb8IqRobtMPXdaEN0NEMT4A+DmYRvs+0eQQcynNopm2Pf6xzmM6eemrrp8c4oHCUUzfgbg1Q693Wfq6hvisWS6F4nvIYEvDwIRZMbD1CbInI9dCaimqwfECdJ86UvRjJ0A5r4JYnzfLKsnNXusSsG4F4Q3OtjxB1NXY3cwzWrGM26VyyY66JAgHzEDEaRTGzpVQDhWnmXg3pquntzsiWzF/hXNeNYlKnObqatuCTFiGbLHd5q9pq7uF4shszrJasZ2Ahx/PCxYp43pvXf5tSsQQZRC5Z0gsr9yO+wgdG1Nz53v15hUHlCKxk+dPKMZeLimq275xmKBMKsZD9kfb+fsjPCYWVJfE4shzyNIdSOBnS+FONhX/oAEMS4DwdGDlAkfrZXCz3IXN+jN6M8jMnOnqasva4Zds/tUNOP3TnE6YUbz+RlntmisI3bJ5hnQNSgYQTx8pJhEX63UU/IzwFR2GgGvzDCmrgaaszDxVTSDnfWFm1VE1u5scbhIbLml+wnkBhMIbK8r3jrjmG1l9WHZwaVyzyHg/X0p+EevMHD2+kDcyDeHRuxbUTCOzhAectYR7Ko3IEGcr3gZsGq6mmlksAu5bbZonEuMa53Pd7iqpquOoaZRY5fVjCsJcCx41MxCrFnNqBMgHDAIdNXrmyAzyantm5Y5HwYeqOnq66OeqPmqX8K36FFTV49q1vgVzXgEwJFO/e/3J7F469aeZ5phX1Yz7ifgdU59HzDO+/kNwfVNkGx/5WU0Tr9zMoJA1VE9pzYDoPnSp1I07gU7fmcAEX9wtJS/Ku7xeiauI2w2S2r4SbQlB9qlVQ0G5xx/vDv45bXNefuCQfrxTZAzi5XXTDI96kwQXD+qq2+XtiAVfBECWc3YQMD/coHm0YkOOjXIh6+gcHetMU5hgVEAjknmogxBlrG7SzP+yy4B4STbRnzkraX8T2V07ZPxTZDsmuobSbBLJBt9zdRz7/NjRCr7fARmklNvcsUl4LVlUKyVglECwb1UtyWOMAd7bDeUpjyKVv03gN/ruINYdFJt0F9aJN8E6Swa3YJxmwsCDUcRNgXdhHWqaIadLG5lEkiS1SrXEOgCD4i+aurqB5oJo1d0oUU4QybT5Owx+CaIUjAKINhF3p2edaaufiEsoJTC0OVE4q3scvgKqy9JPYMEVEd11c74GNnTXajmLGLPGIaob426tOrfM/jbHgN9msGnNiMN6Wy7FM2wQ2+dy7AxNLOs2pWqpB/fBPG8hmTrfbVyr0yyM08j3T9IeTaPWiDQhyc/Rkn+ciOqBHYy9V6mx0NfNPWcc1y4n0E3IJstDL2XSDiWhmDCebWS6ugiNVfXvgnilY4naJLqFxpn7xwgcVkDeEXfNOLw0s6+odcKi7YBJOEdS58z9dzHwxq0olU/C/DHJPT9pl6fOHXblsLjErKRingltSbg/X53ft8E8drGLLbUsXJvtVEksgXjOiIk+jYsjuvWrkL1AiZ2rfn4HNZ0F9i6qpHUO9OOqOIit2C42XNLTBeOlnOh1gUMunYk8on5fv1PCRJ0NqZK98XzPcLL/eRFQ2AyWPAmtPOQzL2//W0LE9RLFq0FsfQ3rGa5lThNWSIIkr5izZqeiF+xZi+ErFYZIFDRL58ZGBHMBoMeygAP31ZWH57KnA8cTeBjLLLrgqDbv14u1fR8n992Ucon4hUrPaT/eYojP6S/6FymGfara+hZ3AMs2mFTVx2/WAfQF0qTRBzS47/mNS4jQv9Cu+Z1WjFdWvWjDG5KfcCp+yrQx0b13OdDWdEhK/E6HyOOa970Q2HIsxpAXVYbejdBxH4wZlgX1PTeSLLZB4DhRU0S8aEwdTUJYyqD65ip8mqXhVgTXEvgloNCiGtGBnq2BNYQYcNEuJqkzooRzrCL6iYT44WWJZIoyXBWTN3dY2VIwoiRaKIkwt09DZiKhx/d/bct5vFn7epdsRfI9D1Cwo0T7XRBnO73c9mYiIAp2zBFS0NufS8iHw3sqEKuk00Ox9ISPtQ9J8p4BsQTYGoHIezEfj9g8LnNdFhMRMjtNEHc8/KmSRsCLd+pRt19W15vWW3DAB8eXIvtclKvshA/Z+DnbcDP56qbbtdFnwReTfZ/lvVqkDgTQDZ4v/wUE721VlKdq88GV+7aMmlJG1xLo6Vpf4Ktgu4+o9OyUPPfmu8HaBuYaxOLhNHIq45dwKeORd1kiS6Q/YWdT/BtT8Akbb77mdUgWWl/PDxt08Rx/qe6q2hcyIyv+2pJGAXhSnNAvdFXOx/CSp9xNhgfBKPLRzPbUS3WqrfJShyXph71tVa8hLPFykXEdKWX3L6/E/AASFw5WuqR9PKV1ews11UcvhBsfdCXRwPj78yy+p3Ge/fWkNUSlHo0TV7tPWGyEhIeqLNU0bMEfIY6Fl05svkMu/xdrM/0zdreDzLYTjvrWHpvtlFWffKEsS1rfhS1oYlKXp2WPwhnujvfcvMRNDn+CIGckp3N7ugnBHr3qJ4LcEYJx959WhTNyAOwXU4Ok9BcnxTi8NsHehxTRUno8BRJVPkD21q3q1777wx+XTOv/DwRTYCAolXuA8gzyR6BbiZr0dtHBs+wa4ck4rFvwCzmQRn7QXSTWcqtisrwrFY5lkAPuOgPlFXR1uc7YOq5XxH3q14w/4NZznsF+0eFWeL1KgXjBhC8k6wRfdss5f4hqQPKasZtkvEkXzd11TElTyPjUwqVd4HoW846guXlbYgg2WL1i8R8qaNRhGvMUvzF7hsBOq620vH2Mee+Cjr+Zo9HKRpfB8N24JzzYaIraqXcR4KML/gOsqZyJgS5fRD6samrxwcxaj636V4zfIwl+A6AD3IfJ5umnvd3tdpE4Lyq806bRk8Ji5aPDPa4ZGH3PwhFM+xLAOe6iBavNAfzt/rX3MAr1kkXbm8/4Le/t29SOhyZm6HDazfmnghi2Hxt4+WSPTPuB01ddUzCnFRs5F63ws28mT27ehjV+dcumIw/c+jLFt97zckTQXALvIPYnSmaYSeQKzh2HCCCK8ggWqWNRLCZ/ZP1e2bubsULjjNXD/7lZKZtzKUC7tRUBclw6DTHEhGuZVNX3VOmuiygxghSqH4IxP/qqJ/wWbOkfqKRBawUK6vsenhs8dyVXxtRHqAticxPUeeHRgfVe/w279KqAwx2T7zQ4j8qWc3osTNPumFDoNKongsl4YNSND4DhnM+MKZ/Msu5r/idq33yDRGkszh8kmBru3PnvNXU84GTDCgepd6CDjqUdj4P0F4ZN2ZsutLU1Q+FYl8TlSiaYS9I1yI/oSUY1CrDADleIVskTh4r9bgkW3cHqiGCzLxm2aXWXuvcjfUGU++9z+98eaUX8qsvCnlmHF8rqz+W0a1oxh0ATnOR3dlGfJrf9PwyfcctMxN1apcJd8sIeaepq8sbsU3Rho4DhBv+PzF1de5qvJIdN06QYvVbYH6XY3+MT5hl9bOS9vxZTCkYXwc5X9351ReFvGw9jK7C0FlMYqubDUz0yVop95ko7GyGzmyx+gli/rTrqxY1Vm9RKRgfB8EZsxC+ITVOEG34HMC63gWI7aaunuJ3khTNsLNwNyMxgbSpRPSR0VLuCq8G2ULli0Tk/M0IeKijo+20mzeftctLV6v8/c39Nx04Pj5p7yKOdd0ZjdVbVDTDPgee7IyJeJup99zQCGYNE2QqBHcRPQjGEY6GCLHSHOjxdQ+taNUvABzo404jgPhpK5tVvUsz7nfzgiXifxwt5R2zkvuxKUmyXcXK+5jJrUxE4HqLSt/wmbAs5+9whMcO2MvH+q1J+EL8GiaIrVAid6zvw+dUekyCfWUokdm8CctC0r+o62zjFK7jbhcLnxHW5KtHBtckxs8qLDRXFm4+dILGfwaQY9k2sNVllntNv316XQSElTc4FIJ4RcIR4Rfj7XuW3bF57Z/8AJEtGiuJYf8CuVwC+NEYmuxWQXjPXGGsL+zB0w2jyYUvQ0PEQZGiGUMAbO/fOZ8gC3l5/6b9OyaW7GDGq5z0CoHsyIBq/8A29IRCkKldpGDUiNDpCATj7bWy6nZWmbPp8v7b92/bu+soFji4oZGG1ThTf3zse6sfk1Xn9Xole9CX7S9pcopWuQSgf3Gxy/drlteVOTPGamW1gdj656wNjSBdBeNiJnzZBYhBU1edv7onbWZDsEfCDRv1eturtm05q+nFZ0IY7pwqTi9WXtPmUhXZbiSEOG5koOd+WRu8LnCI8eHRsrpBVp+bXGgE6ezdcoRoyzwIYJHztifWJDVtZRhgvlCHUjDOBuF7jroJ95gl9U1R9J0knZ7OhIy3mGW5uPqZRHqDLuPba03Wjx0bkt/lYyGI3YmiVa4H6Jx0F5lGQNGq7wf4akc8fH6NT9Ki92OL5zkM9AFTz31VRqfX7gHwDaaed6yVLtPHbJnQdhBbqUzRRyEWzi6iaJXPAuRY5y9IzTy/E5wEeW+vCP6cqec96ytK7B6hFzQNlSD2ZHgd1gEsmLOIUjC+CYJjNGDUJZyTQI6pH86C0c+ETc47Kb5lltV3e9nrtXuEeTjfZ0sEBKlcQESu6WgWyi7idcUZptu31+Jq5t8l3Pwrpq72utkos3sw84W1cj7UuimhE2QmufUP3VwMFsouomjG9wGc6DTxCyWxhcRt3g9MXX2jG0G8dg8ADx0wzic0+uX8hTaETpCZ16x1RHAv00XWOWap13nbbeZPXkh9K5phR7o5psbhDn65TBXakMxpmhq7ii6Nk1vanydMXXXMRawUh9aChatPFTM+Wiur68MeZCQEmYkss3cRFzcRvss88e7TcfnlVtiDSoo+RTPYzRZTtwvMLownMBaXXy6UH7zpdoBOdUFqZ1t98oRbt6z577DRjGyCJPyz7OxZ/2zq+S+FPaik6HNNZDDPXUxeOAdBsZD4Eo8g7iqyayQygnT2VY8XFtu7iNvzhCCcLuPTJDugJMm53d5YsE4b03vvSpK9UdoSBIvp5HS43SuDoyXohLGBXCTpTSMjiA12V9H4PDPWuQLPfLVZzl8U5eQ0U3dXsaLydGLqI6fsYPyeCOtHdfX/NNOuZvTtFwulULkKRB9ws3UKy5L60ajGEylBVhTGlrRhT40Jrvmx2OLu2mB+NKpBNlvvPodLEE9mXrL/YyP/fsazzbapWf3LYpFdU+kiQSOu5GD8aBJLstvKnXuiGk+kBLGNVrwjDm2xhlKzRAVOqrd5CHimlJoyrfGIQa8RRk6QaZJUvwPw+W7GMOjTNT13mZfB6d/nPwJZrfopAn/SfaS00dRzfxs1GrEQZDrdpmWn7XeNDlworhdRT2or6/d0S5ke3E5hiWzYKUznwi0WgtgdS8SL2LlbH4eYzJkDq3e08iSntgdDQOnbsgxWWxXgv/Y4e4QW7+FlaWwEmX7VMm4GsNLDKE+/HK9BpX9vTQS8fNdmRnWLqavhlsd2gStWgmQLlRUg2krAX7ieR5ivqJXzic5o0ppLMLlWS6RGAgP/A+ZVtXJ+W1wjiZUgMwd29yCimZEz4bxaSUvc6QkAAAd+SURBVLXLTafPPEcgWzTOJca13sOUD6zy1iUnETtBps4jmvENBjz9/9NDu9wktrKU5KHcDoT65qiuXhD3WJtCkM7eLS8RbRk7FadLVrxpKFKSxL0k4utPlhwAtluT9VVjQ6v/GJ91M+sv7g739ddVqJ7BxDcByHjZQCAlCdVdvexM/y6PQJdWzTJYJmFcnZjOGi3nbpPXHp5kU3aQ50jimSrozyMVTEeNlHOPhjf0VFOzEOguVI+0iB+R6T/MFD4y/b1QpqkEsY3JasZGAs6TMV507LdkZPMZdtm39GlRBLr7b1tsjT8r5TvFwLU1XXX1wIgahqYTxB6gUqhWQKzKDFbs2m//kZGF6+wng1FSZbq7b9vPOvBZufSzTIZZzjmmLI1rjIkgyBRJNMO+2z5dZuBiwjpspNL7GxnZVCYZCHTnh15htQvZgq63m7q6IgmWJ4Yg0ySp3gfw62WAEZZYFocvjowtqYw7AjO+eJLuQ3S/qeeOSwqmiSLIzE5i56l9pQxAwuLlI4N5u0hL+iQUge41ldMsQXb5OZnnl6auuvphySgJUyZxBJnZSZ4C+ECZgVpsqWPlXteqqjJ6UpnwEegsDOUECUNOM+0y9dxBcrLxSSWSIDM7iWtGkNkQpW4p8S0Y2Z7k3UemNSY1w0tiCTJDkt8CeLnMpHDq4CgDUywyMo6Hswz5namrh8ZiWIBOEk2QaZJU7gNI6uAOoAJRvySNJwmwEkJoMh3PkbHTOElez/L9pp5PzIF8LggST5CZnUQmjmRmfPQ4MV8yWlY3hzDnqQpJBKb9quhLXsFOs9TFGtchOYwXibUEQaZIUjQ2gdEvO9A0xl0Wqcbl5GLIZ/XTQknzWoYgQUhiZ0thizfM55RCjS/v4BpmUvNcDEC+tF4LkcNGpqUIYhvsx3frz1PPfLUQ9OX5msEx+BIP1nIq46HFH/ZK6vZC7UnwrfI74pYjiD3AmQQQV8i4ys8C5AmAN5gn3r1hPifM9rsAfMlPJ5K+GCB713DMWj+HzjoxLg2rsKYvmxsUbkmCTJNkKp7EJoln0NXzMeK7QLxhvpdeaHBdvKj5dAkCmxiuWdbn6nY7MV3arHiORnFoWYLYA7cjEzNtmStkwnfnAGpQCHHNQqq6G2SxzFR2uhDAGr/t7TDZ+mT90mZEAvq11Um+pQmyb1B2NVkGX+GVLcUBhJQocwDTCDHs7CMEulS2cm1YizkKPfOCIFOH90JlBRF9SiLvlhOOKVEANEKMGWBvYebL4kzNEwUx9umcNwTZN6CZA7xdcsE1zakLqIPMuG5y0R79js1r5YJ7opyhGHQv79+0f9veJRoR3hHkVWrGxJ3EWN+KB3E3iOcdQezBTscf8DqvhNmuwBB+wQwdQujmQM+tMazT2LtQ+obPhGXZxNCY8argBtBGYdH6+RifMy8J8tzZZPgcYmudV30SiYWxHTZZyNJNvfc+CfnEiija0HFgoYGg+b8BfP6wiPEjJrHe1HtcC2wmFgwJw+Y1QezxTxXxEXvWeVa6kgBrRsTO5/V9AXEvMvU7R27M/0q+afyS3WdX/gr1zGkWrJMA2KWWV4VhhV3ZadJasj7K4jVh2NmojnlPkH0A2TUTifl8YthZMoKeT+bAm3cQ0b2WRduI6tuavcPYOwRzZoUQvIKZTwJoWaOLZFb7nUzYyEQbo6oJGKKtoahaMATZh5ZdonpCtJ1PNEWUY0JBcZaSqQTLwA6AHgTxDkDssCxrx7ay+nCYfa0oGEcLIZYB1jKwTQI+FsCygFfdXqY9xIyN7dbkxihKLXt13sy/LziC7ANbVSuLnm63SUI2WTqjngQG7HrwOwTolwA/xSA7rPgpALuYracA8RTD/td2kBMHAdZBRPa/OBCggwh8kP2vBbbj9W0iiMhtZowBvHHxBDYaRn5v1P0lUf+CJcjsyejSjD4GnwNQEcCiJE5UjDbtBbhEoBtGdXUgxn4T2VVKkFnT0tm75YhMJlO0gL44dpUkrQhmjAlgoF6vl8aGVj+WJNuaaUtKEAf0u/uMzjqjj4AiGEc0c5Ii65vwGAOlDGFgZEAdi6yfFlacEsRj8uyzyjMdmSLByjHQBeBvWni+bdN/RsAoQ1QPGK+XFurZQnYOU4LIIjUjp2jDp4OtM5nQRdOEafepIm7xCQZGiTEKEreaes/tcRvQyv2lBGlg9l7Xv6njpROLV1qgNxPTCoCPAnBwAyrDaPokQI8w8TYBvnln+9O3PLB57XgYiheijpQgIc/68v7qwZnx+lGC6UiAjgThqKl/wyXPFAkAfhSMqX8t4kfrHZlH7ticezLkIS1odSlBYpz+qW8vi7G0fQJLJ+riQM7wUmFhKQssFYylDCy1zSFgt0XYTRZ2WwK7qU672zPWrol27F78NHan54b4Ji0lSHxYpz21IAIpQVpw0lKT40MgJUh8WKc9tSACKUFacNJSk+NDICVIfFinPbUgAilBWnDSUpPjQyAlSHxYpz21IAIpQVpw0lKT40MgJUh8WKc9tSACKUFacNJSk+NDICVIfFinPbUgAilBWnDSUpPjQ+D/A0Rdo6qBk0nOAAAAAElFTkSuQmCC");
    // r.setAttribute("src", "/assert/app/apply/image/scan-upload.png");
    r.onclick = function (e) {
      me.container.style.display = 'block';
      me.cRow.index = index
      me.cRow.className = className
      var event = e || window.event;
      me.cRow.target = event.target || event.srcElement;;
      // me.cRow = item
      setTimeout(function () {
        me.run()
      }, 350)
    };
    return r;
  }
  me.refreshIcon = function () {
    for (var i = 0; i <= me.rootClassList.length - 1; i++) {
      var className = me.rootClassList[i];
      var doms = document.querySelectorAll(className);
      for (var j = 0; j < doms.length; j++) {
        if (doms[j].imgNode) {
          doms[j].removeChild(doms[j].imgNode)
        }
        doms[j].imgNode = doms[j].appendChild(me.icon(className, j))
      }
    }
  }

  me.doStart = function () {
    // debugger;
    me.ret = me.plugin().Global_InitDevs();
    // if (me.ret) {
    //进行人脸识别初始化时，视频应处于关闭状态
    // me.plugin().InitFaceDetect();
    // }
    // 初始化录像
    if (!me.plugin().Global_VideoCapInit()) {
      layer.msg("初始化失败！", { icon: 2, time: 3000 });
    }
    if (me.plugin().Global_InitIdCard()) {
      if (me.plugin().Global_DiscernIdCard()) {
        me.readIDcard = true;
        // setTimeout(function () {
        //   alert("系统提示,请刷卡！");
        // }, 600);
      }
      else {
        layer.msg("二代证阅读已启动！", { icon: 6, time: 3000 });
      }
    }
    else {
      layer.msg("初始化二代证阅读器失败！", { icon: 2, time: 3000 });
    }
  }

  me.doExit = function () {
    // 清空遗留数据
    // debugger;
    if (me.VideoMain) {
      me.MainView().View_SetText("", 0);
      me.MainView().Video_Release(me.VideoMain);
      me.VideoMain = null;
    }
    if (me.DeviceMain) {
      me.MainView().Device_Release(me.DeviceMain);
      me.DeviceMain = null;
    }

    // if (me.VideoAssist) {
    //   me.AssistView().View_SetText("", 0);
    //   me.AssistView().Video_Release(me.VideoAssist);
    //   me.VideoAssist = null;
    // }
    // if (me.DeviceAssist) {
    //   me.AssistView().Device_Release(me.DeviceAssist);
    //   me.DeviceAssist = null;
    // }
    // me.CloseVideoMain()
    // me.CloseVideoAssist()
    me.StopIDCard();
    /*关闭所有高拍仪资源 by louis 注意:如果需要拍照功能必须调用*/
    var ret = me.plugin().Global_DeinitDevs();
    document.getElementById("highShotWrap_topArea").innerHTML = '';
    document.getElementById("nameIdShow").value = '';
    document.getElementById("cardIdShow").value = '';
    document.getElementById("idcardimg").src = '';
    me.base64capture = [];
    // if (ret) {
    //   alert("已停止！");
    // } else {
    //   alert("已停止！");
    // }
  }
  me.StopIDCard = function () {
    me.plugin().Global_StopIdCardDiscern();
    me.plugin().Global_DeinitIdCard();
    me.readIDcard = false;
  }


  /***拍照例子 by louis 20180629 ***/
  me.Scan = function (type) {
    // debugger;
    if (!me.base64capture) {
      me.base64capture = [];
    }
    var length = me.base64capture.length;

    var video = null
    if (type === 1) {
      video = me.VideoMain
    } else if (type === 2) {
      video = me.VideoAssist
    }
    var imgList = me.plugin().Video_CreateImageList(video, 0, 0);
    var img = me.plugin().ImageList_GetImage(imgList, 0);
    me.plugin().Image_Release(img);

    var base64 = me.plugin().Image_GetBase64(img, 2, 0);

    if (base64) {
      var div = document.createElement("div");
      div.style.cssText = "position: relative;display: inline-block;margin-right: 10px;margin-top: 10px;";
      var span = document.createElement("span")
      span.style.cssText = "cursor:pointer;position: absolute;top:0;right:0;color: #fff;width: 14px; height: 14px; border-radius: 7px;border: 1px solid #fff; background: rgba(0,0,0,0.5);filter:progid:DXImageTransform.Microsoft.gradient(startcolorstr=#7F000000,endcolorstr=#7F000000);";
      span.innerText = "X";
      span.onclick = function () {
        document.getElementById("highShotWrap_topArea").removeChild(div);
        me.base64capture.splice(length, 1);
      }
      var img = document.createElement("img");
      img.style.width = "100px"
      img.style.height = "100px"
      img.style.cssText = "width: 100px; height: 100px;"
      img.src = "data:image/jpg;base64," + base64;

      me.base64capture.push(img.src);
      div.appendChild(span)
      div.appendChild(img)
      document.getElementById("highShotWrap_topArea").appendChild(div);
      // var dc = new DataSet();
      // dc.setParameter("imgData", tempImg);
      // me.requestData({
      //   "module": "idcard",
      //   "action": "IDCardAction",
      //   "event": "show",
      //   "dataSet": dc,
      //   "success": function () {
      //     //设置图片labId，并刷新图片
      //     var empPicture = me.dataCenter.getParameter("labId") || "";
      //     me.byId("empImage").extfileinput("setValue", empPicture);
      //     var dataSet = new DataSet();
      //     dataSet.setParameter("lobId", empPicture);
      //     if (_application._identifier) {
      //       dataSet.setHeader(constant.IDENTIFIER, _application._identifier);
      //     }
      //     var dataObj = dataSet.clone();
      //     dataObj["requestComponent"] = "1";
      //     var url = contextPath + "/fileinput/FileUploadAction/downLoad.do?" + constant.PARAM_DATA_KEY + "=" + encodeURIComponent(JSON.toStr(dataObj));
      //     $(".photoImg" + "empImage", me.container).attr("src", url);
      //     $(".photoImg" + "empImage", me.container).height(120);
      //     $(".photoImg" + "empImage", me.container).width(90);
      //     alert("系统提示", "拍照成功！", "info");
      //   }
      // });
    } else {
      layer.msg("摄像头初始化中，请稍后...", { icon: 7, time: 3000 });
    }

  }



  //刷卡时自动调用上传身份证头像图片并填充解析的数据到页面，例子
  function readId() {
    var data = me.getIcardData()
    var image = me.plugin().Global_GetIdCardImage(1);//1表示头像， 2表示正面， 3表示反面
    var base64 = me.plugin().Image_GetBase64(image, 13, 0);//1表示头像， 2表示正面， 3表示反面
    // me.carImgPreview().View_SelectImage(image)
    // me.plugin().Image_Save(image, "C:\\idcard.jpg", 0);
    // me.plugin().Image_Release(image);
    document.getElementById("idcardimg").src = "data:image/jpg;base64," + base64;
    document.getElementById("nameIdShow").value = data.empName;
    document.getElementById("cardIdShow").value = data.empIndentity;
    // debugger;
    // 	var data = me.getIcardData();
    // 	var image = me.plugin().Global_GetIdCardImage(1);//1表示头像， 2表示正面， 3表示反面 ...
    // 	var tempImg = me.plugin().Image_GetBase64(image, 2, 0);
    // 	me.plugin().Image_Release(image);
    // 	var dc = new DataSet();
    //     dc.setParameter("imgData", tempImg);
    // 	me.requestData({
    //     	"module":"idcard",
    //         "action":"IDCardAction",
    //         "event":"show",
    //         "dataSet":dc,
    //         "success":function(){
    //me.refreshEmpPic(data);
    //         	alert("","扫描成功！","info");
    //         }
    //     });

  }


  me.refreshEmpPic = function (data) {

    //设置图片labId，并刷新图片
    var empPicture = me.dataCenter.getParameter("labId") || "";
    me.byId("empImage").extfileinput("setValue", empPicture);
    var dataSet = new DataSet();
    dataSet.setParameter("lobId", empPicture);
    if (_application._identifier) {
      dataSet.setHeader(constant.IDENTIFIER, _application._identifier);
    }
    var dataObj = dataSet.clone();
    dataObj["requestComponent"] = "1";
    var url = contextPath + "/fileinput/FileUploadAction/downLoad.do?" + constant.PARAM_DATA_KEY + "=" + encodeURIComponent(JSON.toStr(dataObj));
    $(".photoImg" + "empImage", me.container).attr("src", url);
    //设置身份证信息
    var combobox = ["empSex", "empNation"];
    var datebox = ["empBirthday"];
    for (var i in data) {
      if (_.indexOf(combobox, i) >= 0) {
        me.byId(i).extcombobox("setValue", data[i]);
      } else if (_.indexOf(datebox, i) >= 0) {
        // console.log("empBirthday:setValue"+data[i]);
        me.byId(i).extdate("setValue", data[i]);
      } else {
        me.byId(i).val(data[i]);
      }
    }

  }
}

export default new HighShotInstrument()