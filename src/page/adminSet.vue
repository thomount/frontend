<template>
    <div class="fillcontain">
        <head-top></head-top>
        <header class="admin_title">管理员信息</header>
        <div class="admin_set">
            <ul>
                <li>
                    <span>姓名：</span><span>{{adminInfo.username}}</span>
                </li>
                <li>
                    <span>编辑图文权限：</span><span>{{adminInfo.edit_rich}}</span>
                </li>
                <li>
                    <span>编辑充值项目权限：</span><span>{{adminInfo.edit_charge}}</span>
                </li>
                <li>
                    <span>设置运行参数权限：</span><span>{{adminInfo.edit_config}}</span>
                </li>
                <li>
                    <span>管理员等级：</span><span>{{adminInfo.level}}</span>
                </li>
                <li>
                    <span>联系电话：</span><span>{{adminInfo.phone}}</span>
                </li>
                <li style='height: 20px;'>
                    <span style='height: 20px;'>新密码：</span>
                    <textarea placeholder="请输入新密码" id='new_psw' style='height: 20px; width: 50%'></textarea>
                </li>                
                <li>
                    <el-button @click="submit()">确定修改</el-button>
                </li>
             </ul>
        </div>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    import {mapState} from 'vuex'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getAdminInfo, changePsw} from '@/api/getData'
    import Global from '@/config/global'

    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                adminInfo: {

                }
            }
        },
    	components: {
    		headTop,
    	},
        computed: {
        },
        methods: {
            async submit() {
                var new_psw = document.getElementById("new_psw").value;
                try{
                    const res = await changePsw({username: Global.username, password: new_psw});
                    if (res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '修改密码成功',
                        })
                    } else {
                        this.$message({
                            type: "error",
                            message: "修改密码失败"+res.msg,
                        })
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            async initData() {
                const res = await getAdminInfo({username: Global.username});
                if (res.status == 200) {
                    console.log(res.data);
                    this.adminInfo = res.data;
                    Global.edit_rich = this.adminInfo.edit_rich;
                    Global.edit_charge = this.adminInfo.edit_charge;
                    Global.edit_config = this.adminInfo.edit_config;
                    Global.level = this.adminInfo.level;
                } else {
                    if (res.status == 401) {
                        this.$message("登录状态过期");
                        this.$router.push("/");
                    }                }
                console.log(Global);
            }

        },
        activated() {
            this.initData();
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
	}
    .admin_set{
        width: 60%;
        background-color: #F9FAFC;
        min-height: 400px;
        margin: 20px auto 0;
        border-radius: 10px;
        ul > li{
            padding: 20px;
            span{
                color: #666;
            }
        }
    }
    .admin_title{
        margin-top: 20px;
        .sc(24px, #666);
        text-align: center;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        margin-top: 10px;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
