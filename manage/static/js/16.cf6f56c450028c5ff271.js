webpackJsonp([16],{197:function(e,t,a){a(486);var r=a(85)(a(369),a(512),"data-v-1d14b34c",null);e.exports=r.exports},369:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(50),s=a.n(r),n=a(49),o=a.n(n),i=a(51),c=a.n(i),u=a(86),l=a(88),m=a(52);t.default={data:function(){return{loginForm:{username:"",password:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]},showLogin:!1}},mounted:function(){this.showLogin=!0,this.adminInfo.id||this.getAdminData()},computed:c()({},a.i(l.b)(["adminInfo"])),methods:c()({},a.i(l.c)(["getAdminData"]),{submitloginForm:function(e){var t=this;return o()(s.a.mark(function r(){return s.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=o()(s.a.mark(function e(r){var n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=8;break}return e.next=3,a.i(u.m)({username:t.loginForm.username,password:t.loginForm.password});case 3:n=e.sent,console.log(n),200==n.status?(t.$message({type:"success",message:"登录成功"}),m.a.token=n.data.token,m.a.islogin=!0,m.a.username=t.loginForm.username,t.$router.push("adminSet")):t.$message({type:"error",message:n.message}),e.next=10;break;case 8:return t.$notify.error({title:"错误",message:"请输入正确的用户名密码",offset:100}),e.abrupt("return",!1);case 10:case"end":return e.stop()}},e,t)}));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}},r,t)}))()},submitregisterForm:function(e){var t=this;return o()(s.a.mark(function r(){return s.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=o()(s.a.mark(function e(r){var n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=8;break}return e.next=3,a.i(u.n)({username:t.loginForm.username,password:t.loginForm.password});case 3:n=e.sent,console.log(n),200==n.status?t.$message({type:"success",message:"注册成功"}):t.$message({type:"error",message:n.message}),e.next=10;break;case 8:return t.$notify.error({title:"错误",message:"请输入正确的用户名密码",offset:100}),e.abrupt("return",!1);case 10:case"end":return e.stop()}},e,t)}));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}},r,t)}))()}}),watch:{adminInfo:function(e){e.id&&(this.$message({type:"success",message:"检测到您之前登录过，将自动登录"}),this.$router.push("manage"))}}}},393:function(e,t,a){t=e.exports=a(188)(!1),t.push([e.i,".allcover[data-v-1d14b34c]{position:absolute;top:0;right:0}.ctt[data-v-1d14b34c]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.tb[data-v-1d14b34c]{position:absolute;top:50%;transform:translateY(-50%)}.lr[data-v-1d14b34c]{position:absolute;left:50%;transform:translateX(-50%)}.login_page[data-v-1d14b34c]{background-color:#324057}.manage_tip[data-v-1d14b34c]{position:absolute;width:100%;top:-100px;left:0}.manage_tip p[data-v-1d14b34c]{font-size:34px;color:#fff}.form_contianer[data-v-1d14b34c]{width:320px;height:210px;position:absolute;top:50%;left:50%;margin-top:-105px;margin-left:-160px;padding:25px;border-radius:5px;text-align:center;background-color:#fff}.form_contianer .submit_btn[data-v-1d14b34c]{width:100%;font-size:16px}.tip[data-v-1d14b34c]{font-size:12px;color:red}.form-fade-enter-active[data-v-1d14b34c],.form-fade-leave-active[data-v-1d14b34c]{transition:all 1s}.form-fade-enter[data-v-1d14b34c],.form-fade-leave-active[data-v-1d14b34c]{transform:translate3d(0,-50px,0);opacity:0}",""])},486:function(e,t,a){var r=a(393);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(189)("15178a3a",r,!0)},512:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"login_page fillcontain"},[a("transition",{attrs:{name:"form-fade",mode:"in-out"}},[a("section",{directives:[{name:"show",rawName:"v-show",value:e.showLogin,expression:"showLogin"}],staticClass:"form_contianer"},[a("div",{staticClass:"manage_tip"},[a("p",[e._v("elm后台管理系统")])]),e._v(" "),a("el-form",{ref:"loginForm",attrs:{model:e.loginForm,rules:e.rules}},[a("el-form-item",{attrs:{prop:"username"}},[a("el-input",{attrs:{placeholder:"用户名"},model:{value:e.loginForm.username,callback:function(t){e.$set(e.loginForm,"username",t)},expression:"loginForm.username"}},[a("span",[e._v("dsfsf")])])],1),e._v(" "),a("el-form-item",{attrs:{prop:"password"}},[a("el-input",{attrs:{type:"password",placeholder:"密码"},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}})],1),e._v(" "),a("el-form-item",[a("el-button",{staticClass:"submit_btn",attrs:{type:"primary"},on:{click:function(t){return e.submitloginForm("loginForm")}}},[e._v("登陆")]),e._v(" "),a("el-button",{staticClass:"submit_btn",attrs:{type:"primary"},on:{click:function(t){return e.submitregisterForm("loginForm")}}},[e._v("注册")])],1)],1),e._v(" "),a("p",{staticClass:"tip"},[e._v("温馨提示：")]),e._v(" "),a("p",{staticClass:"tip"},[e._v("未登录过的新用户，自动注册")]),e._v(" "),a("p",{staticClass:"tip"},[e._v("注册过的用户可凭账号密码登录")])],1)])],1)},staticRenderFns:[]}}});