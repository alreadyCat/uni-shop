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
		<view class="settle" @click="settle">
			结算({{total}})
		</view>
	</view>
</template>

<script>
	import {mapState,mapGetters} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				timeout:3,
			};
		},
		methods:{
			changeAllChecked(e){
				this.$store.commit('cart/AllcheckedOrNot',!this.isAllchecked)
			},
			settle(){
				if(!this.address.provinceName)return uni.$showMsg('请选择地址')
				
				if(!this.total)return uni.$showMsg('请选择至少一件商品')
				
				if(!this.userInfo.token)return this.delayNavigate()
			},
			delayNavigate(){
				
				this.timeout = 3
				
				this.showUniToast(this.timeout)
				
				let timer = setInterval(()=>{
					this.timeout--
					this.showUniToast(this.timeout)
					
					if(this.timeout <= 0){
						clearInterval(timer)
						uni.switchTab({
							url:'/pages/my/my?redirect=',
							success:()=>{
								this.$store.commit('user/updateRedirect',{
									openType: 'switchTab',
									from:'/pages/cart/cart'
								})
							}
						})
					}
				},1000)
				
				
				
			},
			showUniToast(n){
				uni.showToast({
					icon:'none',
					title:`当前处于未登录状态，请先登录再进行操作，${n}秒后跳转到登录页`,
					duration:1500
				})
			}
		},
		computed:{
			...mapState('cart',['cart']),
			...mapState('user',['address','userInfo']),
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
