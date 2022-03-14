<template>
	<view>
		<view class="goods-item">
			<!-- 左侧图片 -->
			<view class="left-img">
				<radio @click="changeChecked" :checked="radioChecked" color="#c00000" v-if="showRadio"></radio>
				<image :src="goods.goods_small_logo || defaultImage"></image>
			</view>
			<!-- 右侧内容 -->
			<view class="right-content">
				<text class="desc">{{goods.goods_name}}</text>
				<view class="goods-priceAndCount">
					<text class="price">￥{{goods.goods_price | tofixed}}</text>
					<uni-number-box min="1" :value="goods.goods_count" v-if="showNumbox" @change="changeCount"></uni-number-box>
				</view>
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
			},
			showRadio:{
				type:Boolean,
				default:false
			},
			radioChecked:{
				type:Boolean,
				default:false
			},
			showNumbox:{
				type:Boolean,
				default:false
			}
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		methods:{
			changeChecked(){
				this.$emit('changeChecked',this.goods)
			},
			changeCount(e){
				this.$emit('changeCount',this.goods,e)
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
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		width: 120px;
		height: 100px;
		margin-right: 5px;
		image{
			width: 120px;
			height: 100px;
			display: block;
		}
	}
	.right-content{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 5px;
		padding-right: 10px;
		.desc{
			font-size: 13px;
		}
		.goods-priceAndCount{
			display: flex;
			justify-content: space-between;
			.price{
				color: #c00000;
				font-size: 16px;
				font-weight: bold;
			}
		}
	}
}
</style>
