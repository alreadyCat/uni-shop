<template>
	<view class="cart-container" v-if="cart.length!==0">
		<!-- 收货地址 -->
		<my-address></my-address>
		<!-- 购物车title -->
		<view class="title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text>购物车</text>
		</view>
		<!-- 商品列表 -->
		<uni-swipe-action class="goods-list">
			<block v-for="(item,goods) in cart" :key='item.goods_id'>
				<uni-swipe-action-item :right-options="options" @click="delHandler(item)">
						<my-goods :goods='item' showRadio="true" :radioChecked="item.goods_state" @changeChecked="changeChecked" showNumbox="true" @changeCount="changeCount"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<!-- 结算 -->
		<my-settle></my-settle>
	</view>
	
	<view class="cart-empty" v-else>
		<image src="/static/cart_empty@2x.png"></image>
		<text class="tips">空空如也~</text>
	</view>
</template>

<script>
	import tabbarBadge from '@/mixins/tabbar-badge.js'
	import {mapState} from 'vuex'
	export default {
		computed:{
			...mapState('cart',['cart'])
		},
		data() {
			return {
				options:[{
					text:'删除',
					style:{
						backgroundColor:'#c00000'
					}
				}]
			};
		},
		mixins:[tabbarBadge],
		methods:{
			changeChecked(goods){
				goods.goods_state = !goods.goods_state
				this.$store.commit('cart/editSingleGoods',goods)
			},
			changeCount(goods,count){
				goods.goods_count = count
				this.$store.commit('cart/editSingleGoods',goods)
			},
			delHandler(goods){
				console.log(goods)
				this.$store.commit('cart/deltoCart',goods.goods_id)
			}
		}
	}
</script>

<style lang="scss">
.cart-container{
	padding-bottom: 50px;
}
.title{
	display: flex;
	align-items: center;
	height: 40px;
	border-bottom: 1px solid #efefef;
	text{
		margin-left: 10px;
	}
}
.goods-list{
	.goods-item{
		display: flex;
		.goods-image{
			image{
				
			}
		}
		.goods-info{
			display: flex;
			flex-direction: column;
			
		}
	}
}
.cart-empty{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 150px;
	image{
		width: 90px;
		height: 90px;
	}
	text{
		font-size: 12px;
		color: gray;
		margin-top: 15px;
	}
}
</style>
