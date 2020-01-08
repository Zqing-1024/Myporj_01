<template>
	<div>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newList" :key="item.id">
				<router-link :to="'/home/newsInfo/' + item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						<h2>{{item.title}}</h2>
						<p class="mui-ellipsis">
							<span>发布时间：{{item.add_time | dateFormat}}</span>
							<span>点击次数：{{item.click}} 次</span>
						</p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import {
		Toast
	} from "mint-ui";

	export default {
		data() {
			return {
				newList: []
			}
		},
		created() {
			this.getNewList()
		},
		methods: {
			getNewList() {
				this.$axios.get('http://www.liulongbin.top:3005/api/getnewslist')
					.then(response => {
						this.newList = response.data.message
					})
					.catch(function(error) {
						Toast('获取新闻失败！');
						console.log('错误：' + error)
					})
			}
		}
	}
</script>

<style scoped>
	.mui-media-body h2 {
		font-size: 14px;
	}

	.mui-ellipsis {
		font-size: 12px;
		color: #0062CC;
		display: flex;
		justify-content: space-between;
	}
</style>
