webpackJsonp([9],{192:function(e,t,a){a(453);var n=a(85)(a(304),a(476),null,null);e.exports=n.exports},211:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(50),r=a.n(n),i=a(49),s=a.n(i),o=a(51),l=a.n(o),c=a(86),u=a(87),d=a(52),p=a(88),f=a(214),m=a.n(f);t.default={data:function(){return{baseImgPath:u.b,imgUrl:m.a}},created:function(){this.adminInfo.id||this.getAdminData()},computed:l()({},a.i(p.b)(["adminInfo"])),methods:l()({},a.i(p.c)(["getAdminData"]),{handleCommand:function(e){var t=this;return s()(r.a.mark(function n(){var i;return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if("home"!=e){n.next=4;break}t.$router.push("/manage"),n.next=13;break;case 4:if("signout"!=e){n.next=12;break}return n.next=7,a.i(c.b)();case 7:i=n.sent,console.log(i),200==i.status?(d.a.islogin=!1,d.a.token="",t.$message({type:"success",message:"退出成功"}),t.$router.push("/")):t.$message({type:"error",message:i.message}),n.next=13;break;case 12:"adminSet"==e&&t.$router.push("/adminSet");case 13:case"end":return n.stop()}},n,t)}))()}})}},212:function(e,t,a){t=e.exports=a(188)(!1),t.push([e.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}.header_container{background-color:#eff2f7;height:60px;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;padding-left:20px}.avator{width:36px;height:36px;border-radius:50%;margin-right:37px}.el-dropdown-menu__item{text-align:center}",""])},213:function(e,t,a){var n=a(212);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a(189)("23d4e76d",n,!0)},214:function(e,t,a){e.exports=a.p+"static/img/avator.9ffc07b.jpg"},215:function(e,t,a){a(213);var n=a(85)(a(211),a(216),null,null);e.exports=n.exports},216:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"header_container"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/manage"}}},[e._v("首页")]),e._v(" "),e._l(e.$route.meta,function(t,n){return a("el-breadcrumb-item",{key:n},[e._v(e._s(t))])})],2),e._v(" "),a("el-dropdown",{attrs:{"menu-align":"start"},on:{command:e.handleCommand}},[a("img",{staticClass:"avator",attrs:{src:e.imgUrl}}),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"home"}},[e._v("首页")]),e._v(" "),a("el-dropdown-item",{attrs:{command:"adminSet"}},[e._v("个人")]),e._v(" "),a("el-dropdown-item",{attrs:{command:"signout"}},[e._v("退出")])],1)],1)],1)},staticRenderFns:[]}},304:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(50),r=a.n(n),i=a(49),s=a.n(i),o=a(215),l=a.n(o),c=a(86);t.default={data:function(){return{tableData:[],currentRow:null,offset:0,limit:20,count:0,currentPage:1,dv:!1,options:[{value:"高级管理员",label:"高级管理员"},{value:"中级管理员",label:"中级管理员"},{value:"渠道商",label:"渠道商"}],activityValue:"用户权限",editing:0}},components:{headTop:l.a},activated:function(){this.initData()},methods:{initData:function(){var e=this;return s()(r.a.mark(function t(){var n,i,s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,a.i(c.h)({});case 3:if(n=t.sent,200!=n.status){t.next=29;break}e.tableData=[],t.t0=r.a.keys(n.data);case 7:if((t.t1=t.t0()).done){t.next=26;break}i=t.t1.value,s=n.data[i],t.t2=s.level,t.next=0===t.t2?13:1===t.t2?15:2===t.t2?17:19;break;case 13:return s.levelname="高级用户",t.abrupt("break",20);case 15:return s.levelname="中级用户",t.abrupt("break",20);case 17:return s.levelname="渠道商",t.abrupt("break",20);case 19:s.levelname="其他用户";case 20:s.edit_rich_name=1==s.edit_rich?"是":"否",s.edit_charge_name=1==s.edit_charge?"是":"否",s.edit_config_name=1==s.edit_config?"是":"否",e.tableData.push(s),t.next=7;break;case 26:console.log(e.tableData),t.next=30;break;case 29:console.log("用户列表读取失败");case 30:t.next=35;break;case 32:t.prev=32,t.t3=t.catch(0),console.log("获取数据失败",t.t3);case 35:case"end":return t.stop()}},t,e,[[0,32]])}))()},handleSizeChange:function(e){console.log("每页 "+e+" 条")},handleCurrentChange:function(e){this.currentPage=e,this.offset=(e-1)*this.limit,this.getAdmin()},change_editAuth:function(e,t){var n=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return s()(r.a.mark(function s(){var o,l;return r.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:r.prev=0,o=n.tableData[e],r.t0=t,r.next=0===r.t0?5:1===r.t0?7:2===r.t0?9:3===r.t0?11:13;break;case 5:return o.edit_rich=!o.edit_rich,r.abrupt("break",13);case 7:return o.edit_charge=!o.edit_charge,r.abrupt("break",13);case 9:return o.edit_config=!o.edit_config,r.abrupt("break",13);case 11:return o.level=i,r.abrupt("break",13);case 13:return delete o.edit_rich_name,delete o.edit_charge_name,delete o.edit_config_name,delete o.levelname,console.log("change auth"),console.log(o),r.next=21,a.i(c.i)(o);case 21:l=r.sent,200==l.status?n.$message({type:"success",message:"修改权限成功"}):n.$message({type:"error",message:"修改权限失败"}),r.next=28;break;case 25:r.prev=25,r.t1=r.catch(0),console.log(r.t1);case 28:n.initData();case 29:case"end":return r.stop()}},s,n,[[0,25]])}))()},change_Auth:function(e,t){this.editing=e,this.activityValue=t,this.dv=!0},submitEdit:function(){if(console.log(this.activityValue),this.activityValue==this.tableData[this.editing].levelname)return this.$message({type:"success",message:"无修改"}),void(this.dv=!1);var e=0;switch(this.activityValue){case"高级管理员":e=0;break;case"中级管理员":e=1;break;case"渠道商":e=2}this.change_editAuth(this.editing,3,e),this.dv=!1}}}},344:function(e,t,a){t=e.exports=a(188)(!1),t.push([e.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}.table_container{padding:20px}",""])},453:function(e,t,a){var n=a(344);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a(189)("0763c6cc",n,!0)},476:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"fillcontain"},[a("head-top"),e._v(" "),a("div",{staticClass:"table_container"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData}},[a("el-table-column",{attrs:{prop:"username",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"levelname",label:"用户权限等级"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.levelname))]),e._v(" "),a("el-button",{staticStyle:{},on:{click:function(a){return e.change_Auth(t.$index,t.row.levelname)}}},[e._v("修改")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"edit_rich_name",label:"编辑图文权限"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.edit_rich_name))]),e._v(" "),a("el-button",{staticStyle:{},on:{click:function(a){return e.change_editAuth(t.$index,0)}}},[e._v("修改")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"edit_charge_name",label:"编辑充值活动权限"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.edit_charge_name))]),e._v(" "),a("el-button",{staticStyle:{},on:{click:function(a){return e.change_editAuth(t.$index,1)}}},[e._v("修改")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"edit_config_name",label:"编辑运行参数权限"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.edit_config_name))]),e._v(" "),a("el-button",{staticStyle:{},on:{click:function(a){return e.change_editAuth(t.$index,2)}}},[e._v("修改")])]}}])})],1),e._v(" "),a("div",{staticClass:"Pagination",staticStyle:{"text-align":"left","margin-top":"10px"}},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":20,layout:"total, prev, pager, next",total:e.count},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"提示",visible:e.dv,width:"30%"},on:{"update:visible":function(t){e.dv=t}}},[a("el-select",{attrs:{placeholder:e.activityValue},model:{value:e.activityValue,callback:function(t){e.activityValue=t},expression:"activityValue"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dv=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.submitEdit}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]}}});