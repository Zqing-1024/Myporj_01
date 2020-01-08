<template>
	<div class="news-container">
		<h3 class="title"  >{{newsInfo.title}}</h3>
		
		<p class="subtitle">
			<span>发表时间：{{newsInfo.add_time | dateFormat}}</span>
			<span>点击：{{newsInfo.click}}次</span>
		</p>
		
		<hr>
		
		<div class="content" v-html="newsInfo.content"></div>
		
		<comment-box :id="this.id"></comment-box>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	import comment from '../comment.vue'
	
	export default{
		data(){
			return{
				id:this.$route.params.id,
				newsInfo:{}
			}
		},
		created() {
			this.getNewInfo();
		},
		methods:{
			getNewInfo(){
				this.$axios.get('http://www.liulongbin.top:3005/api/getnew/' + this.id).then(response => {
					this.newsInfo = response.data.message[0]
				}).catch(function(error){
					Toast('获取资讯失败')
					console.log('错误：' + error)
				})
			}
		},
		components:{
			"comment-box":comment
		}
	}
</script>

<style scoped>
	.container{
		padding: 0px 10px;
	}
	.title{
		font-size: 16px;
		text-align: center;
		margin: 15px 0;
		color: red;
	}
	.subtitle{
		font-size: 13px;
		color: #226aff;
		display: flex;
		justify-content: space-between;
		margin: 0 5px;
	}
	.content{
		margin: 0 5px;
	}
</style>