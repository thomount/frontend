<template>
    <div>
        <head-top></head-top>
        <div class="edit_container">

            <div class="text-area">
            <textarea placeholder="请输入标题" id='title_area'>
            </textarea>
            </div>
        	<quill-editor v-model="content"
                ref="myQuillEditor"
                class="editer"
                :options="editorOption"
                @ready="onEditorReady($event)">
  			</quill-editor>
        </div>
        <div class="topped_btn">
            <input type="checkbox" id="topped"/>是否置顶
        </div>
        <div class="submit_btn">
  			<el-button type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import { quillEditor } from 'vue-quill-editor'
    import { richtext } from '@/api/getData'
    import {mapActions, mapState} from 'vuex'

    export default {
        data(){
            return {
                content: '<h3>文本编辑</h3>',
                title:'',
                topped: false,
			    editorOption: {
			        
		        }
            }
        },
    	components: {
    		headTop,
    		quillEditor,
    	},
        computed: {
          	editor() {
	        	return this.$refs.myQuillEditor.quill
	      	}
        },
        methods: {
		    onEditorReady(editor) {
		        console.log('editor ready!', editor)
		    },
		    async submit(){
                this.title = document.getElementById("title_area").value;
                this.topped = document.getElementById("topped").checked;
                console.log(this.topped);
                console.log(this.title);
                console.log(this.content);
                const res = await richtext({'topped': this.topped, 'title': this.title, 'content': this.content})
                if (res.status == 200) {
                    this.$message.success('提交成功！');
                } else {
                    this.$message.error(res.message);
                }
                /*
                let postData = new URLSearchParams()
                postData.append('context',  this.content)
                postData.append('user',  'thomount')
                //192.168.1.104
                */
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.edit_container{
		padding: 40px;
		margin-bottom: 40px;
	}
	.editer{
		height: 350px;
	}
	.submit_btn{
		text-align: center;
    }
    .topped_btn{
        width: 100%;
        text-align: center;
        margin:10px;
//        border-top:1px solid gainsboro;
//        border-bottom:1px solid gainsboro;
//        border-color: #000000;
    }

    .text-area{
        width: 100%;
        border: 1px solid #9E9E9E;
//        border-top:1px solid gainsboro;
//        border-bottom:1px solid gainsboro;
//        border-color: #000000;
        margin-bottom: 20px;
    }
    .text-area textarea {
        width: 100%;
        margin: 0.75rem  0;
//        border: none;
//        outline: none;
//        padding-left: 1.125rem;
        height: 20px;
//        border:#9E9E9E;
    }
    
    .text-area textarea::-webkit-input-placeholder {
        color: #9E9E9E;
    
    }

</style>
