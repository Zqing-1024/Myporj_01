<template>
	<div>
		<!-- 滑动条区域 -->
		<van-tabs v-model="active">
			<van-tab :title="item.title" v-for="item in cates" :key="item.id">
				<div class="tab-title" slot="title" @click="getPhotoListByCateId(item.id)">{{ item.title }}</div>
			</van-tab>
		</van-tabs>
		<!-- 图片列表区域 -->
		<ul class="list-container">
			<router-link v-for="item in list" :key="item.id" class="photo-list" :to="'/home/photoInfo/' +item.id" tag="li">
				<img v-lazy="item.img_url">
				<div class="info">
					<h3 class="info-title">
						{{item.title}}
					</h3>
					<div class="info-body">
						{{item.zhaiyao}}
					</div>
				</div>
			</router-link>
		</ul>

	</div>
	</div>
</template>

<script>
	import {
		Toast
	} from 'mint-ui'

	export default {
		data() {
			return {
				active: 0,
				cates: [], //滑动条列表
				list: [], //图片列表 
			}
		},
		created() {
			this.getAllCategory();
			this.getPhotoListByCateId(0);
		},
		methods: {
			getAllCategory() {
				this.$axios.get('http://www.liulongbin.top:3005/api/getimgcategory')
					.then(response => {
						response.data.message.unshift({
							title: '全部',
							id: 0
						})
						this.cates = response.data.message
					}).catch(error => {
						Toast('获取图片失败')
						console.log(error)
					})
			},
			getPhotoListByCateId(cateId) {
				this.$axios.get('http://www.liulongbin.top:3005/api/getimages/' + cateId)
					.then(response => {
						this.list = response.data.message
					}).catch(error => {
						Toast('获取图片失败')
						console.log(error)
					})
			}
		}
	}
</script>

<style scoped>
	img[lazy=loading] {
		width: 40px;
		height: 300px;
		margin: auto;
	}

	.list-container {
		padding: 10px;
	}

	.photo-list {
		background-color: #CCCCCC;
		text-align: center;
		margin-bottom: 10px;
		box-shadow: 0 0 6px #999;
		position: relative;
	}

	.photo-list img {
		width: 100%;
		vertical-align: middle;
	}

	.photo-list .info {
		color: white;
		text-align: left;
		position: absolute;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.4);
		max-height: 84px;
	}

	.photo-list .info-title {
		font-size: 15px;
	}

	.photo-list .info-body {
		font-size: 13px;
	}
</style>
