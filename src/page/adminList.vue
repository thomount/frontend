<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
		      :data="tableData"
		      style="width: 100%">
		      <el-table-column
		        prop="username"
		        label="姓名"
		        >
		      </el-table-column>
		      <el-table-column
		        prop="levelname"
		        label="用户权限等级"
		       >
                     <template slot-scope="props">
                        <span>{{props.row.levelname}}</span>
                        <el-button style="mini" @click="change_Auth(props.$index, props.row.levelname)">修改</el-button>
                    </template>              
		      </el-table-column>
              <el-table-column
                prop="edit_rich_name"
                label="编辑图文权限"
                >
                    <template slot-scope="props">
                        <span>{{props.row.edit_rich_name}}</span>
                        <el-button style="mini" @click="change_editAuth(props.$index, 0)">修改</el-button>
                    </template>
              </el-table-column>
              <el-table-column
                prop="edit_charge_name"
                label="编辑充值活动权限"
                >
                    <template slot-scope="props">
                        <span>{{props.row.edit_charge_name}}</span>
                        <el-button style="mini" @click="change_editAuth(props.$index, 1)">修改</el-button>
                    </template>
              </el-table-column>
              <el-table-column
                prop="edit_config_name"
                label="编辑运行参数权限"
                >
                    <template slot-scope="props">
                        <span>{{props.row.edit_config_name}}</span>
                        <el-button style="mini" @click="change_editAuth(props.$index, 2)">修改</el-button>
                    </template>
              </el-table-column>
		    </el-table>
		    <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dv"
            width="30%">
            <el-select v-model="activityValue" :placeholder="activityValue">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dv=false">取 消</el-button>
                <el-button type="primary" @click="submitEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import { getUserlist, changeUserauth } from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                dv: false,
				options: [{
		          	value: '高级管理员',
		          	label: '高级管理员'
		        }, {
		          	value: '中级管理员',
		          	label: '中级管理员'
		        }, {
		          	value: '渠道商',
		          	label: '渠道商'
		        }],
                activityValue: '用户权限',
                editing: 0,    
            }
        },
    	components: {
    		headTop,
    	},
        activated(){
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const res = await getUserlist({});
                    if (res.status == 200) {
                        this.tableData = []
                        for (var i in res.data) {
                            var x = res.data[i];
                            switch (x.level) {
                                case 0:
                                    x.levelname = "高级用户";
                                    break;
                                case 1:
                                    x.levelname = "中级用户";
                                    break;
                                case 2:
                                    x.levelname = "渠道商";
                                    break;
                                default:
                                    x.levelname = "其他用户";
                            }
                            x.edit_rich_name = (x.edit_rich == true)?'是': "否";
                            x.edit_charge_name = (x.edit_charge == true)?'是': "否";
                            x.edit_config_name = (x.edit_config == true)?'是': "否";
                            this.tableData.push(x);
                        }
                        console.log(this.tableData);
                    } else {
                        console.log('用户列表读取失败');
                    }

                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getAdmin()
            },
            async change_editAuth(index, pos, value = 0) {
                try{
                    var data = this.tableData[index];
                    switch (pos) {
                        case 0 :
                            data.edit_rich = !data.edit_rich;
                            break;
                        case 1:
                            data.edit_charge = !data.edit_charge;
                            break;
                        case 2:
                            data.edit_config = !data.edit_config;
                            break;
                        case 3:
                            data.level = value;
                            break;
                    }
                    delete data.edit_rich_name;
                    delete data.edit_charge_name;
                    delete data.edit_config_name;
                    delete data.levelname;
                    console.log('change auth');
                    console.log(data);
                    const res = await changeUserauth(data);
                    if (res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '修改权限成功'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改权限失败'
                        });                    
                    }
                } catch(e) {
                    console.log(e);
                }
                this.initData();
            },

            change_Auth(index, str) {
                this.editing = index;
                this.activityValue = str;
                this.dv = true;
            },
            submitEdit() {
                console.log(this.activityValue);
                if (this.activityValue == this.tableData[this.editing].levelname) {
                    this.$message({
                        type: 'success',
                        message: '无修改',
                    })
                    this.dv = false;
                    return;
                }
                var tarValue = 0;
                switch (this.activityValue) {
                    case "高级管理员":
                        tarValue = 0;
                        break;
                    case "中级管理员":
                        tarValue = 1;
                        break;
                    case "渠道商":
                        tarValue = 2;
                        break;
                }
                this.change_editAuth(this.editing, 3, tarValue);
                this.dv = false;
            }

        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>


