<template>
	<view class="settle-container">
		<view>
			<label class="radio">
				<radio @click="changeAllChecked" :checked="isAllchecked" color="#C00000"/><text>全选</text>
			</label>
		</view>
		<view class="total">
			合计：<text class="price">￥{{TotalPrice}}</text>
		</view>
		<view class="settle">
			结算({{total}})
		</view>
	</view>
</template>
	background-color: gray;

<script>
	import {mapState,mapGetters} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		methods:{
			changeAllChecked(e){
				this.$store.commit('cart/AllcheckedOrNot',!this.isAllchecked)
			}
		},
		computed:{
			...mapState('cart',['cart']),
			...mapGetters('cart',['isAllchecked','TotalPrice','total'])
		}
	}
</script>

<style lang="scss">
.settle-container{
	position: fixed;
	width: 100%;
	height: 50px;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	padding: 0 5px;
	.radio{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.total{
		.price{
			color:#c00000;
		}
	}
	.settle{
		height: 50px;
		color: #fff;
		background-color: #c00000;
		line-height:50px;
		padding: 0 10px;
		min-width: 70px;
		text-align: center;
	}
}
</style>
