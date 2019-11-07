<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="40">
                </el-table-column>
                <el-table-column
                  property="desc"
                  label="描述"
                  width="240">
                </el-table-column>
                <el-table-column
                  property="base"
                  label="充值金额"
                  width="">
                  <template slot-scope="scope">
                    <span>￥{{scope.row.base}}</span>
                    <el-button
                      size="mini"
                      @click="change(scope.$index, 'base')">修改</el-button>
                  </template>

                </el-table-column>

                <el-table-column
                  property="bonus"
                  label="赠送金额"
                  width="">
                  <template slot-scope="scope">
                    <span>￥{{scope.row.bonus}}</span>
                    <el-button
                      size="mini"
                      @click="change(scope.$index, 'bonus')">修改</el-button>
                  </template>

                </el-table-column>
                <el-table-column
                  property="cut"
                  label="折扣"
                  width="90">
                  <template slot-scope="scope">
                    <span>{{scope.row.cut}}</span>
                    <el-button
                      size="mini"
                      @click="change(scope.$index, 'cut')">修改</el-button>
                  </template>

                </el-table-column>
                <el-table-column
                  property="level"
                  label="vip等级"
                  width="90">
                  <template slot-scope="scope">
                    <span>{{scope.row.level}}</span>
                    <el-button
                      size="mini"
                      @click="change(scope.$index, 'level')">修改</el-button>
                  </template>

                </el-table-column>
                <el-table-column
                  property="start"
                  label="起始日期"
                  width="120"
                  >
                </el-table-column>
                <el-table-column
                  property="end"
                  label="结束日期"
                  width="120"
                  >
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
            width="30%"
            >
            <textarea id="input" placeholder="请输入修改后的值"></textarea>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">取 消</el-button>
                <el-button type="primary" @click="submitEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getChargelist, changeCharge} from '@/api/getData'
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
                editing: null,
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
                    const res = await getChargelist({});
                    console.log(res);
                    if (res.status == 200) {
                        this.count = res.data.length;
                        this.tableData = this.arrange(res.data);
                    }else{
                        throw new Error('获取数据失败');
                    }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            arrange(data) {
                var ret = [];
                for (var i in data) {
                    var x = data[i];
                    if (x.level == null) x.level = 0;
                    if (x.cut == null) x.cut = 0;
                    switch (x.choice) {
                        case 1:
                            x.desc = "会员"+x.level+"级以上满"+x.base+"元送"+x.bonus+"元";
                            break; 
                        case 2:
                            x.desc = "全部"+x.cut+"折";
                            break;
                        case 3:
                            x.desc = "会员"+x.level+"级以上"+x.cut+"折";
                            break;
                    }
                    ret.push(x);
                }
                return ret;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getUsers()
            },
            change(_index, _str) {
                this.dv = true;
                this.editing = {
                    index: _index,
                    item: _str,
                }
            },
            cancelEdit() {
                this.editing = null;
                this.dv = false;
            },
            submitEdit() {
                var target_value = document.getElementById("input").value;
                if (this.isNumber(target_value)) {
                    var target_value_num = ~~(target_value);
                    var flag = true;
                    if (this.editing.item == "cut" && (target_value_num < 0 || target_value_num > 10)) flag = false;
                    if (this.editing.item == "level" && (target_value_num < 0 || target_value_num > 10)) flag = false;
                    if (flag) {
                        var data = this.tableData[this.editing.index];
                        data[this.editing.item] = target_value_num;
                        console.log('change data');
                        console.log(data);
                        this.sendChange(data);
                    }
                } else {
                    this.$message({
                        type: "error",
                        message: "请输入数字",
                    })
                }

                this.dv = false;
                this.editing = null;
            },
            async sendChange(data) {
                const res = await changeCharge(data);
                if (res.status == 200) {
                    this.$message({
                        type: "success",
                        message: "修改成功",
                    })                
                    this.initData();
                } else {
                    this.$message({
                        type: "error",
                        message: "修改失败",
                    })
                }
            },
            isNumber(val) {
                var regPos = /^\d+(\.\d+)?$/; //非负浮点数
                var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
                if(regPos.test(val) || regNeg.test(val)) return true; else return false;
            },

        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
