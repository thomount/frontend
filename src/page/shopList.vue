<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="标题">
                        <span>{{ props.row.title }}</span>
                      </el-form-item>
                      <el-form-item label="作者">
                        <span>{{ props.row.author }}</span>
                      </el-form-item>
                      <el-form-item label="发布时间">
                        <span>{{ props.row.time }}</span>
                      </el-form-item>
                      <el-form-item label="文章 ID">
                        <span>{{ props.row.id }}</span>
                      </el-form-item>
                      <el-form-item label="是否置顶">
                        <span>{{ props.row.topped }}</span>
                      </el-form-item>
                      <el-form-item label="点赞">
                        <span>{{ props.row.favor }}</span>
                      </el-form-item>
                      <el-form-item label="评论">
                        <span>{{ props.row.comment }}</span>
                      </el-form-item>
                      <el-form-item label="备注">
                        <span>{{ }}</span>
                      </el-form-item>
                    </el-form>
                    
                  </template>
                </el-table-column>
                <el-table-column
                  label="标题"
                  prop="title">
                </el-table-column>
                <el-table-column
                  label="置顶"
                  prop="istop">
                    <template slot-scope="props">
                        <span>{{props.row.istop}}</span>
                        <el-button style="mini" @click="changeTop(props.$index)">修改</el-button>
                    </template>
                </el-table-column>

                <el-table-column
                  label="作者"
                  prop="author">
                </el-table-column>
                <el-table-column
                  label="发布时间"
                  prop="time">
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="checkRich(scope.$index, scope.row)">查看</el-button>
                    <el-button
                      size="mini"
                      type="Success"
                      @click="changeOrder(scope.$index, scope.row)">更改顺序</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
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
            </div>
            <el-dialog title="修改店铺信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="店铺名称" label-width="100px">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" label-width="100px">
                        <el-autocomplete
                          v-model="address.address"
                          :fetch-suggestions="querySearchAsync"
                          placeholder="请输入地址"
                          style="width: 100%;"
                          @select="addressSelect"
                        ></el-autocomplete>
                        <span>当前城市：{{city.name}}</span>
                    </el-form-item>
                    <el-form-item label="店铺介绍" label-width="100px">
                        <el-input v-model="selectTable.description"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" label-width="100px">
                        <el-input v-model="selectTable.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺分类" label-width="100px">
                        <el-cascader
                          :options="categoryOptions"
                          v-model="selectedCategory"
                          change-on-select
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="商铺图片" label-width="100px">
                        <el-upload
                          class="avatar-uploader"
                          :action="baseUrl + '/v1/addimg/shop'"
                          :show-file-list="false"
                          :on-success="handleServiceAvatarScucess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateShop">确 定</el-button>
              </div>
            </el-dialog>
            <header class="rich_title">图文详情</header>
            <div class = 'rich_area'>
                <p v-html = 'text'></p>
            </div>
        </div>
    </div>

</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getRichlist, deleteRich, getrich, changetop} from '@/api/getData'
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                city: {},
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                categoryOptions: [],
                selectedCategory: [],
                address: {},
                text: '',
            }
        },
        activated(){
            this.initData();
            this.text = '';
        },
    	components: {
    		headTop,
    	},
        methods: {
            async initData(){
                try{
                    const res = await getRichlist();
//                    console.log(res);
                    if (res.status == 200) {
                        console.log('rich list');
                        console.log(res);
                        
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getRichlist();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            async getCategory(){
                try{
                    const categories = await foodCategory();
                    categories.forEach(item => {
                        if (item.sub_categories.length) {
                            const addnew = {
                                value: item.name,
                                label: item.name,
                                children: []
                            }
                            item.sub_categories.forEach((subitem, index) => {
                                if (index == 0) {
                                    return
                                }
                                addnew.children.push({
                                    value: subitem.name,
                                    label: subitem.name,
                                })
                            })
                            this.categoryOptions.push(addnew)
                        }
                    })
                }catch(err){
                    console.log('获取商铺种类失败', err);
                }
            },
            async getRichlist(){
                const res = await getRichlist();
                this.tableData = res.data;
                for (var i in this.tableData) {
                    if (this.tableData[i].topped)
                        this.tableData[i].istop = '是'
                    else 
                        this.tableData[i].istop = '否'
                }
                console.log(this.tableData);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getResturants()
            },
            async checkRich(index, row) {
                console.log('查看图文');
                try {
                    const res = await getrich({id: this.tableData[index].id});
//                    console.log(res);
                    this.text = res.data;
                }
                catch (e) {
                    console.log(e);
                }

            },
            async changeOrder(index, row){
                console.log('更改顺序');
            },

            async changeTop(index) {
                console.log('改变'+index+'置顶');
                try {
                    const res = await changetop({id: this.tableData[index].id});
                    if (res.status == 200) {
                        this.getRichlist();
                        this.$message({
                            type: 'success',
                            message: '修改置顶成功'
                        });
                    }

                } catch (e) {
                    console.log(e);
                }
            },
            async handleDelete(index, row) {
                try{
                    const res = await deleteRich({id: row.id});
                    console.log(res);
                    if (res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除图文成功'
                        });

                    }else{
                        throw new Error(res.message)
                    }
                    this.getRichlist();
                }catch(err){
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除图文失败')
                }
            },

            async querySearchAsync(queryString, cb) {
                if (queryString) {
                    try{
                        const cityList = await searchplace(this.city.id, queryString);
                        if (cityList instanceof Array) {
                            cityList.map(item => {
                                item.value = item.address;
                                return item;
                            })
                            cb(cityList)
                        }
                    }catch(err){
                        console.log(err)
                    }
                }
            },
            addressSelect(vale){
                const {address, latitude, longitude} = vale;
                this.address = {address, latitude, longitude};
            },
            handleServiceAvatarScucess(res, file) {
                if (res.status == 1) {
                    this.selectTable.image_path = res.image_path;
                }else{
                    this.$message.error('上传图片失败！');
                }
            },
            beforeAvatarUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            async updateShop(){
                this.dialogFormVisible = false;
                try{
                    Object.assign(this.selectTable, this.address);
                    this.selectTable.category = this.selectedCategory.join('/');
                    const res = await updateResturant(this.selectTable)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新店铺信息成功'
                        });
                        this.getResturants();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }catch(err){
                    console.log('更新餐馆信息失败', err);
                }
            },
        },
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
