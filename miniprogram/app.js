import defineAlias from "./utils/defineAlias";
import api from "./api/index";
import jumpPage from "./utils/jumpPage";
import { PATHNAME_MAP as pathname } from "./config/constants";
import updateManger from "/utils/updateManager";

defineAlias({
  $api: api,
  $jumpPage: jumpPage,
  $pathname: pathname,
});

App({
  onShow(opts) {
    console.log(opts);
    // version update checker
    updateManger.checkAndUpdate();
    this.userLogin();
  },
  userLogin() {
    // if (wx.getStorageSync("userInfo")) return;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: "https://api.weixin.qq.com/sns/jscode2session",
            data: {
              js_code: res.code,
              appid: "wxf8580a2747e8ab39",
              secret: "992d91d4c289ef32e82964b99085f294",
              grant_type: "authorization_code",
            },
            success: (r) => {
              console.log("登录成功", r.data);
              wx.setStorageSync("userInfo", {
                userId: r.data.openid,
                session_key: r.data.session_key,
              });
              wx.$api
                .getUser({
                  userId: r.data.openid,
                })
                .then((res) => {
                  console.log(111, res.result.data);
                  if (res.result.data.length === 0) {
                    wx.$api
                      .addUser({
                        userId: r.data.openid,
                        session_key: r.data.session_key,
                      })
                      .then((res) => {
                        console.log(111, res);
                      });
                  } else {
                    wx.setStorageSync("userInfo", res.result.data[0]);
                  }
                });
            },
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      },
    });
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }

    this.globalData = {};
  },
});
