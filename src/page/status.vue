<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div style="item-align: center;">
            <!--img :src="imgurl"-->
            <!--v-chart :options="polar"/-->
            <div id="main" style="width: 600px;height: 400px;"></div>

        </div>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%">
                <!--
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="id">
                        <span>{{ props.$index }}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{ props.row.time }}</span>
                      </el-form-item>
                      <el-form-item label="数据">
                        <span>{{ props.row.data }}</span>
                      </el-form-item>
                    </el-form>
                    
                  </template>
                </el-table-column>
                -->
                <el-table-column
                  type="index"
                  label="id"
                  width="100">
                </el-table-column>            
                <el-table-column
                  label="时间"
                  prop="time">
                </el-table-column>
                <el-table-column
                  label="数据"
                  prop="data">
                </el-table-column>

            </el-table>
            <div class="Pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
                <el-button @click="changePeriod('month')">按月查询</el-button>
                <el-button @click="changePeriod('day')">按日查询</el-button>
                <el-button @click="changePeriod('minutes')">按分钟查询</el-button>
                <textarea id="text" placeholder="查询数量(1~15)" style="padding-left:10px;width:20%;"></textarea>
            </div>

        </div>
    </div>

</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getStatlist, deleteRich, getrich, changetop} from '@/api/getData'    
    import echarts from 'echarts'
    import Global from '@/config/global'

//    import ECharts from 'vue-echarts'
//    import 'echarts/lib/chart/line'
//    import 'echarts/lib/component/polar'
    export default {
        data(){
            let data = []

            for (let i = 0; i <= 360; i++) {
                let t = i / 180 * Math.PI
                let r = Math.sin(2 * t) * Math.cos(2 * t)
                data.push([r, i])
            }
            return {
                baseUrl,
                baseImgPath,
                city: {},
                offset: 0,
                limit: 50,
                count: 0,
                tableData: [],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                categoryOptions: [],
                selectedCategory: [],
                address: {},
                text: '',
                _num_p: 12,
                _p: 'month',
                imgurl:'',

                charts: '',
                linename: 'unknown',
            /*  opinion: ["1", "3", "3", "4", "5"],*/
                opinionData: [3, 2, 4, 4, 5],
//                opinionData: [],
            }
        },
        activated(){
            console.log(Global);
            if (Global.level != 2) {
                this.$message("无权限");
                return;
            }
            this.initData();
            this.text = '';
        },
    	components: {
    		headTop,
    	},
        methods: {
            async initData(){
                try{
                    const res = await getStatlist({num_periods: this._num_p, period: this._p});
                    console.log(res);
                    if (res.status == 200) {
                        console.log('Stat list');
                        console.log(res);
                        this.tableData = res.data.data;
                        this.count = this.tableData.length;
                        this.imgurl = baseUrl+"/"+res.data.url;
                        this.make_graph(res.data.data);
                        console.log('img: '+this.imgurl);
                    }else{
                        if (res.status == 401) {
                            this.$message("登录状态过期");
                            this.$router.push("/");
                        }
                    }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            make_graph(data) {

                this.opinionData = [];
                var xData = [];
                for (var i in data) {
                    this.opinionData.push(data[i].data);
                    xData.push(data[i].time);
                }
//                console.log('data = '+this.opinionData);
//                console.log(xData);
                this.drawLine('main', xData, this.linename);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.initData()
            },
            changePeriod(__p) {
                if (Global.level != 2) {
                    this.$$message("无权限查看报表统计");
                    return;
                }
//                console.log(document.getElementById('text'));
                this._num_p = ~~document.getElementById('text').value;
                console.log('number: '+ this._num_p);
                this._p = __p;
                var ch;
                switch (__p) {
                    case ('day'):
                        ch = "日";
                        break;
                    case ('month'):
                        ch = "月";
                        break;
                    case ('minutes'):
                        ch = "分钟";
                        break;                    
                }
                this.linename = "近"+this._num_p+ch+"业绩";
                this.initData();
            },

            drawLine(id, xData, linename) {
                this.charts = echarts.init(document.getElementById(id))
                this.charts.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: [linename]
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
 
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: xData
                    
                    },
                    yAxis: {
                        type: 'value'
                    },
 
                    series: [{
                        name: linename,
                        type: 'line',
                        stack: '总量',
                        data: this.opinionData
                    }]
                })
            }
        },
        
        mounted() {
            this.$nextTick(function() {
                this.drawLine('main', ['2019-11-12', '2019-11-13', '2019-11-14', '2019-11-15', '2019-11-16'], this.linename)
            })
        }

    }
</script>

<style lang="less">
	@import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
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
    .rich_title{
        margin-top: 20px;
        margin-left: 20px;
//        margin-bottom: 20px;
        .sc(24px, #666);
//      text-align: center;
    }
    .rich_area{
//        width: 90%;
//        margin-left: 20px;
        background-color: #F9FAFC;
        min-height: 400px;
        margin: 20px;
        border-radius: 10px;
        ul > li{
            padding: 20px;
            span{
                color: #666;
            }
        }
    }
</style>
