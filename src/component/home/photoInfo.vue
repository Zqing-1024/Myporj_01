<template>
	<div>
		<div class="photoinfo-container">
			<!-- 标题区域 -->
			<h3 class="photoinfo-title">{{photoinfo.title}}</h3>
			<p class="photoinfo-subtitle">
				<span>发表时间：{{photoinfo.add_time | dateFormat}}</span>
				<span>点击次数：{{photoinfo.click}}</span>
			</p>
			<hr>

			<!-- 缩略图区域 -->
			<div class="thumbs">
				<vue-preview :slides="list" @close="handleClose"></vue-preview>
			</div>


			<!-- 图片内容区域 -->
			<div class="photoinfo-content" v-html="photoinfo.content"></div>

			<!-- 评论子组件区域 -->
			<cmt-box :id="id"></cmt-box>

		</div>
	</div>

</template>

<script>
	import comment from '../comment.vue'

	import {
		Toast
	} from 'mint-ui'

	export default {
		data() {
			return {
				id: this.$route.params.id,
				photoinfo: {}, // 图片详情对象
				list: [], // 缩略图
			}
		},
		created() {
			this.getPhotoInfo()
			this.getThumbs()
		},
		methods: {
			getPhotoInfo() {
				this.$axios.get('http://www.liulongbin.top:3005/api/getimageInfo/' + this.id)
					.then(response => {
						this.photoinfo = response.data.message[0]
					}).catch(error => {
						Toast('图片加载失败')
						console.log('错误：' + error)
					})
			},
			getThumbs() {
				this.$axios.get('http://www.liulongbin.top:3005/api/getthumimages/' + this.id)
					.then(response => {
						response.data.message.forEach(item => {
							item.msrc = item.src
							item.w = 600
							item.h = 400
						})
						this.list = response.data.message
					}).catch(error => {
						Toast('缩略图加载失败')
						console.log('错误：' + error)
					})
			},
			handleClose() {
				console.log('close event')
			}
		},
		components: {
			'cmt-box': comment
		}
	}
</script>

<style scoped >
	.photoinfo-container {
		padding: 3px;
		margin-top: px;
	}

	.photoinfo-title {
		color: #226AFF;
		font-size: 15px;
		text-align: center;
		margin: 15px 0;

	}

	.photoinfo-subtitle {
		display: flex;
		justify-content: space-between;
		font-size: 13px;
	}

	.photoinfo-content {
		font-size: 13px;
		line-height: 25px;
	}
</style>
