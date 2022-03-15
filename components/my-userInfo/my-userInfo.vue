<template>
	<view class="my-userinfo-container">
		<!-- 头像昵称 -->
		<view class="top-box">
			<view class="avatar">
				<image :src="userInfo.avatarUrl"></image>
			</view>
			<text class="nickname">{{userInfo.nickName}}</text>
		</view>
		<!-- 面板区域 -->
		<view class="panel-list">
			<!-- 第一个面板 -->
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text class="count">8</text>
						<text class="name">收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text class="count">14</text>
						<text class="name">收藏的商品</text>
					</view>
					<view class="panel-item">
						<text class="count">15</text>
						<text class="name">关注的商品</text>
					</view>
					<view class="panel-item">
						<text class="count">20</text>
						<text class="name">足迹</text>
					</view>
				</view>
			</view>
			
			<!-- 第二个面板 -->
			<view class="panel">
				<view class="panel-title">
					我的订单
				</view>
				
				<view class="panel-body">
					<view class="panel-item">
						<image src="/static/my-icons/icon1.png" class="icon"></image>
						<text class="name">代付款</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon2.png" class="icon"></image>
						<text class="name">待收货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon3.png" class="icon"></image>
						<text class="name">退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon4.png" class="icon"></image>
						<text class="name">全部订单</text>
					</view>
				</view>
			</view>
		
			<!-- 第三个面板 -->
			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name:"my-userInfo",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('user',['userInfo'])
		},
		methods:{
			async logout(){
				const [err,succ] = await uni.showModal({
					title:'提示',
					content:'确定退出登录吗?'
				}).catch(err=>err)
				
				if(succ&&succ.confirm){
					this.$store.commit('user/setUserInfo',{})
					this.$store.commit('user/updateToken','')
					this.$store.commit('user/updateAddress',{})
					
				}
			}
		}
	}
</script>

<style lang="scss">
.my-userinfo-container{
	height: 100%;
	background-color: #efefef;
	.top-box{
		height: 400rpx;
		background-color: #c00000;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.avatar{
			width: 90px;
			height: 90px;
			border-radius:45px;
			border:2px solid #fff;
			box-shadow: 0 1px 5px black;
			overflow: hidden;
			image{
				width: 90px;
				height: 90px;
			}
		}
		.nickname{
			font-size: 16px;
			color: #fff;
			font-weight: bold;
			margin-top: 10px;
		}
	}
	.panel-list{
		padding: 0 10px;
		position: relative;
		top: -10px;
		.panel{
			padding: 0 10px;
			margin-bottom: 10px;
			position: relative;
			background-color: #fff;
			border-radius: 3px;
			.panel-title{
				padding-left: 10px;
				font-size: 15px;
				border-bottom: 1px solid #f4f4f4;
				line-height: 45px;
			}
			.panel-body{
				border-radius: 3px;
				display: flex;
				justify-content: space-around;
				.panel-item{
					padding: 5px;
					display: flex;
					flex-direction: column;
					align-items: center;
					.name{
						margin-top: 3px;
						font-size: 14px;
					}
					.icon{
						width: 35px;
						height: 35px;
					}
				}
			}
			.panel-list-item{
				display: flex;
				justify-content: space-between;
				padding: 10px 10px;
				font-size: 15px;
			}
		
		}
	}
}
</style>
