<template>
	<div>
		<div class="mui-numbox" data-numbox-max="9" data-numbox-min="1">
			<button class="mui-btn mui-btn-numbox-minus" type="button" @click="minus()">-</button>
			<input class="mui-input-numbox" id="test" type="number" readonly="readonly" value="1" v-model="num">
			<button class="mui-btn mui-btn-numbox-plus" type="button" @click="add()">+</button>
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
				num: this.initconut
			}
		},
		methods: {
			add() {
				this.num++
				if (this.num > 9) {
					this.num = 9
					Toast('最多买9件啦')
				}
			},
			minus() {
				this.num--
				if (this.num < 1) {
					this.num = 1
					Toast('最少买1件啦')
				}
			},
		},
		watch: {
			num: function(newNum, oldNum) {
				this.$store.commit("updateGoodsInfo", {
					id: this.goodsid,
					conut: this.num
				})
			}
		},
		props: ["initconut", "goodsid"]
	}
</script>

<style scoped>
	.mui-numbox {
		height: 25px;
	}
</style>
