<template>
	<div>
		<mt-swipe :auto="4000" >
			<mt-swipe-item v-for="item in lunboList" :key='item.id'>
				<img :src="item.img" alt="" :class="{full:isFull}">
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	export default {
		props:["lunboList","isFull"]
	}
</script>

<style scoped>
	.mint-swipe {
		height: 250px;
		text-align: center;
	}
	img{
		/* width: 100%; */
		height: 100%;
	}
	.full{
		width: 100%;
	}

</style>
