<template>
	<div>
		<!-- 轮播图 -->
		<swipe :lunboList="lunboList" :isFull="true"></swipe>

		<!-- 六宫格列表 -->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/newsList">
					<span class="mui-icon mui-icon-home"></span>
					<div class="mui-media-body">新闻资讯</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/photoList">
					<span class="mui-icon mui-icon-image"></span>
					<div class="mui-media-body">图片分享</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/goodsList">
					<span class="mui-icon mui-icon-chatbubble"></span>
					<div class="mui-media-body">商品购买</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
					<span class="mui-icon mui-icon-email-filled"></span>
					<div class="mui-media-body">留言反馈</div>
				</a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
					<span class="mui-icon mui-icon-videocam"></span>
					<div class="mui-media-body">视频专区</div>
				</a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
					<span class="mui-icon mui-icon-phone"></span>
					<div class="mui-media-body">联系我们</div>
				</a></li>
		</ul>
	</div>
</template>

<script>
	import {
		Toast
	} from "mint-ui";
	import swipe from "../swipe.vue"

	export default {
		data() {
			return {
				lunboList: [] //轮播图数组
			}
		},
		created() {
			this.getlunbo();
		},
		methods: {
			getlunbo() { //获取轮播的方法
				this.$axios.get('http://www.liulongbin.top:3005/api/getlunbo')
					.then(response => {
						this.lunboList = response.data.message
					}).catch(error => {
						Toast('轮播图加载失败')
						console.log(error)
					});
			}
		},
		components: {
			"swipe":swipe
		}
	}
</script>

<style scoped>


	.mui-grid-view.mui-grid-9 {
		background-color: white;
	}

	.mui-grid-view.mui-grid-9 .mui-table-view-cell {
		border: 0px;
	}
</style>
