<template>
	<div class="container">

		<!-- header 区域 -->
		<mt-header fixed title='我的Vue项目'>
			<span slot="left" @click="goBack" v-show="flag">
				<mt-button icon="back">返回</mt-button>
			</span>
		</mt-header>

		<!-- 路由 content 区域 -->
		<transition>
			<router-view class="app_container"></router-view>
		</transition>

		<!-- footer 区域 -->

		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/vip">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/cart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{ $store.getters.getAllConut }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				flag: false
			}
		},
		created() {
			this.flag = this.$route.path === '/home' ? false : true
		},
		methods: {
			goBack() {
				//点击后退
				this.$router.go(-1)
			}
		},
		watch: {
			'$route.path': function(newVal) {
				if (newVal === '/home') {
					this.flag = false
				} else {
					this.flag = true
				}
			}
		}
	}
</script>

<style>
	.container {
		overflow-x: hidden;
	}

	.app_container {
		padding-top: 40px;
		padding-bottom: 50px;
	}

	.v-enter {
		opacity: 0;
		transform: translateX(100%);
	}

	.v-leave-to {
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}

	.v-enter-active,
	.v-leave-active {
		transition: all 0.4s ease-in-out;
	}
</style>
