<template>
	<div class="desc-container">
		<h3>{{info.title}}</h3>
		
		<hr>
		
		<div class="desc-content" v-html="info.content"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				id: this.$route.params.id,
				info: {}
			}
		},
		created() {
			this.getGoodsDesc()
		},
		methods: {
			getGoodsDesc() {
				this.$axios.get('http://www.liulongbin.top:3005/api/goods/getdesc/' + this.id)
					.then(response => {
						this.info = response.data.message[0]
					}).catch(error => {
						console.log('错误;' + error)
					})
			}
		}
	}
</script>

<style >
	.desc-container{
		
	}
	.desc-container h3{
		font-size: 15px;
		color: #0062ff;
		text-align: center;
		margin: 14px;
	}
	.desc-content img{
		width: 100%;
	}
</style>
