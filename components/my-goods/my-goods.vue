<template>
	<view>
		<view class="goods-item">
			<!-- 左侧图片 -->
			<view class="left-img">
				<image :src="goods.goods_small_logo || defaultImage"></image>
			</view>
			<!-- 右侧内容 -->
			<view class="right-content">
				<text class="desc">{{goods.goods_name}}</text>
				<text class="price">￥{{goods.goods_price | tofixed}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		data() {
			return {
				defaultImage:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		props:{
			goods:{
				type:Object,
				default:{}
			}
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods-item{
	display: flex;
	padding: 5px 0;
	border-bottom: 1px solid #f0f0f0;
	.left-img{
		width: 100px;
		height: 100px;
		margin-right: 5px;
		image{
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.right-content{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.desc{
			font-size: 13px;
		}
		.price{
			color: #c00000;
			font-size: 16px;
		}
	}
}
</style>
