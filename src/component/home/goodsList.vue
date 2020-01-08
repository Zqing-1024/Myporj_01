<template>
	<div>
		
		<!-- 商品列表区域 -->
		<div class="item-container">
			<!-- 标签路由导航方式 -->
			<!-- <router-link class="goods-container" v-for="item in goodslist" :key="item.id" :to="'/home/goodsInfo/'+item.id" tag="div">
				<img :src="item.img_url" alt="">
				<h2 class="goods-title">{{item.title}}</h2>
				<div class="goods-info">
					<p class="goods-price">
						<span class="price-now">￥{{item.sell_price}}</span>
						<span class="price-old">￥{{item.market_price}}</span>
					</p>
					<p class="goods-sell">
						<span>热卖中</span>
						<span>剩余：{{item.stock_quantity}}件</span>
					</p>
				</div>
			</router-link> -->
			
			<!-- 编程式导航 -->
			 <div class="goods-container" v-for="item in goodslist" :key="item.id"  @click="goDetail(item.id)">
				<img :src="item.img_url" alt="">
				<h2 class="goods-title">{{item.title}}</h2>
				<div class="goods-info">
					<p class="goods-price">
						<span class="price-now">￥{{item.sell_price}}</span>
						<span class="price-old">￥{{item.market_price}}</span>
					</p>
					<p class="goods-sell">
						<span>热卖中</span>
						<span>剩余：{{item.stock_quantity}}件</span>
					</p>
				</div>
			</div>
		</div>
		
		<!-- 加载更多按钮 -->
		<div class="morebutton">
			<mt-button type="danger" size="large" @click="getGoodsListMore()" class="morebutton">加载更多</mt-button>
		</div>
		
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				goodslist: [],
				pageIndex: 1
			}
		},
		created() {
			this.getGoodsList()
		},
		methods: {
			getGoodsList() {
				this.$axios.get('http://www.liulongbin.top:3005/api/getgoods?pageindex=' + this.pageIndex)
					.then(response => {
						this.goodslist = this.goodslist.concat(response.data.message)
					}).catch(error => {
						console.log('错误：' + error)
					})
			},
			getGoodsListMore(){
				this.pageIndex ++
				this.getGoodsList()
			},
			goDetail(id){
				this.$router.push("/home/goodsInfo/" + id)
			}
		}
	}
</script>

<style scoped>
	.item-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, 48%);
		gap: 7px 7px;
		padding-left: 7px;
	}

	.goods-container {
		border: 1px solid #C0C0C0;
		box-shadow: 0 0 4px #000000;
		padding: 1px;
		min-height: 293px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.goods-container img {
		width: 100%;
	}

	.goods-title {
		font-size: 15px;
	}

	.goods-info {
		background-color: #C0C0C0;

	}

	.goods-info p {
		margin: 0;
		padding: 5px;
		display: flex;
		justify-content: space-between;
	}

	.goods-price .price-now {
		color: red;
		font-weight: bold;
		font-size: 16px;
	}

	.goods-price .price-old {
		text-decoration: line-through;
		font-size: 13px;
	}
	.morebutton{
		padding: 10px;
	}
</style>
