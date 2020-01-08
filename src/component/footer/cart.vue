<template>
	<div class="shopcar-container">

		<div class="goodslist">

			<!-- 商品列表项区域 -->
			<div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
						<img :src="item.thumb_path" alt="">
						<div class="info">
							<h2>{{ item.title }}</h2>
							<p>
								<span class="price">￥{{ item.sell_price }}</span>
								<numbox :initconut="$store.getters.getGoodsConut[item.id]" :goodsid="item.id"></numbox>
								<a href="#" @click.prevent="remove(item.id,i)">删除</a>
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- 结算区域 -->
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
							<p>总计（不含运费）</p>
							<p>已勾选商品 <span class="red">{{$store.getters.getAllConutAndAmount.conut}}</span> 件，
								总价 <span class="red">￥{{$store.getters.getAllConutAndAmount.amount}}</span></p>
						</div>
						<mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
	import numbox from '../shopcar_numbox.vue'
	import {
		Toast
	} from 'mint-ui'

	export default {
		data() {
			return {
				goodslist: [],
			}
		},
		created() {
			this.getGoodsList()
		},
		methods: {
			getGoodsList() {
				// 获取到store中所有商品的id，用逗号分隔
				var idArr = []
				this.$store.state.car.forEach(item => idArr.push(item.id))
				if (idArr.length <= 0) {
					return
				}

				this.$axios.get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/' + idArr.join(","))
					.then(response => {
						this.goodslist = response.data.message
					})
					.catch(function(error) {
						Toast('加载评论失败')
						console.log('错误：' + error)
					})
			},
			remove(id, index) {
				//删除方法，删除goodslist中的第 index条数据，删除store中car id=id的数据
				this.goodslist.splice(index, 1)
				this.$store.commit("removeFromCar", id)
			},
			selectedChanged(id, selected) {
				//每当点击开关，把selected状态同步到store的car中
				this.$store.commit("updateSelected", {
					id,
					selected
				})
			}
		},
		components: {
			numbox
		}
	}
</script>

<style scoped>
	.shopcar-container {
		background-color: #EEEEEE;
		overflow: hidden;
	}

	.goodslist img {
		width: 60px;
		height: 60px;
	}

	.goodslist h2 {
		font-size: 15px;
		text-align: center;
	}

	.info p {
		display: flex;
		justify-content: space-between;
		width: 220px;
	}

	.info p span {
		color: red;
		font-weight: bold;
	}

	.mui-card-content-inner {
		display: flex;
		justify-content: space-between;
	}

	.jiesuan {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.red {
		color: red;
		font-weight: bold;
		font-size: 16px;
	}
</style>
