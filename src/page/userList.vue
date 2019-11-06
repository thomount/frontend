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
                  width="100">
                </el-table-column>
                <el-table-column
                  property="desc"
                  label="描述"
                  width="400">
                </el-table-column>
                <el-table-column
                  property="base"
                  label="充值金额"
                  width="">
                  <template slot-scope="scope">
                    <span>{{scope.row.base}}</span>
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
                    <span>{{scope.row.bonus}}</span>
                    <el-button
                      size="mini"
                      @click="change(scope.$index, 'bonus')">修改</el-button>
                  </template>

                </el-table-column>
                <el-table-column
                  property="cut"
                  label="折扣"
                  width="">
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
                  width="">
                  <template slot-scope="scope">
                    <span>{{scope.row.level}}</span>
                    <el-button
                      size="mini"
                      @click="change(scope.$index, 'level')">修改</el-button>
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
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getChargelist} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
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
                    switch (x.choice) {
                        case 1:
                            x.desc = "满"+x.base+"元送"+x.bonus+"元";
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
            change(index, str) {
                
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
