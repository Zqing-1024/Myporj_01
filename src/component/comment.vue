<template>
	<!-- 评论子组件 -->
	<div class="cmt-container">
		<h3>发表评论</h3>

		<hr>
		<textarea placeholder="请输入要发表的内容(最多120字)" maxlength="120" v-model="msg"></textarea>

		<mt-button type="primary" size="large" @click="postComment()">发表评论</mt-button>
		<div class="cmt-list">
			<div class="cmt-item" v-for="(item,i) in comments" :key="i">
				<div class="cmt-title">
					第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}
				</div>
				<div class="cmt-body">
					{{item.content === 'undefind' ? '用户表示很屌都不知道怎么打字了' : item.content}}
				</div>
			</div>
		</div>

		<mt-button type="danger" size="large" plain @click="getMore()">加载更多</mt-button>

	</div>
</template>

<script>
	import {
		Toast
	} from 'mint-ui'

	export default {
		data() {
			return {
				pageIndex: 1, //默认第一页
				comments: [], //获取到的评论数据
				msg: ""
			}
		},
		created() {
			this.getComments()
		},
		methods: {
			getComments() {
				this.$axios.get('http://www.liulongbin.top:3005/api/getcomments/' + this.id + '?pageindex=' +
						this.pageIndex)
					.then(response => {
						if (response.data.message == '') {
							Toast('没有更多评论啦')
						} else {
							this.comments = this.comments.concat(response.data.message)
						}
					})
					.catch(function(error) {
						Toast('加载评论失败')
						console.log('错误：' + error)
					})
			},
			getMore() {
				this.pageIndex++;
				this.getComments()
			},
			postComment() {
				if (this.msg.trim().length === 0) {
					return Toast('评论不能为空')
				}

				this.$axios.post('http://www.liulongbin.top:3005/api/postcomment/' + this.id, {
						content: this.msg.trim()
					}, {
						emulateJSON: true
					})
					.then(response => {
						console.log(response)
						if (response.data.status === 0) {
							var cmt = {user_name:"匿名用户",add_time:Date.now(),content:this.msg.trim()}
							this.comments.unshift(cmt)
							
						}else{
							Toast('接口问题，评论不了')
						}
					}).catch(error => {
						Toast('评论失败')
						console.log('错误：' + error)
					})
			}
		},
		props: ["id"]
	}
</script>

<style scoped>
	.cmt-container h3 {
		font-size: 18px;
	}

	.cmt-container textarea {
		font-size: 14px;
		height: 85px;
		margin: 0;
	}

	.cmt-item {
		font-size: 14px;
		margin: 6px 0;
	}

	.cmt-title {
		background-color: #CCCCCC;
		line-height: 30px;
	}

	.cmt-body {
		line-height: 35px;
		text-indent: 2em;
	}
</style>
