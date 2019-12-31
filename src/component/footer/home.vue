<template>
	<div>
		<mt-swipe :auto="4000" >
			<mt-swipe-item v-for="item in lunbotuList" :key='item.id'>
				<img :src="item.img" alt="">
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				lunbotuList: [] //轮播图数组
			}
		},
		created() {
			this.getlunbo();
		},
		methods: {
			getlunbo() { //获取轮播的方法
				this.$axios.get('http://www.liulongbin.top:3005/api/getlunbo')
					.then(response => (this.lunbotuList = response.data.message))
					.catch(function(error) {
						console.log(error);
					});
			}
		}
	}
</script>

<style scoped>
	.mint-swipe {
		height: 250px;
	}
	img{
		width: 100%;
		height: 100%;
	}
</style>
