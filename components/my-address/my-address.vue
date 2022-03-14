<template>
	<view>
		<!-- 选择收货地址 -->
		<view class="address-choose-box" v-if="!addressInfo.address">
			<button type="primary" size="mini" @click="chooseAddress">选择收货地址+</button>
		</view>
		<!-- 地址 -->
		<view class="address-box" v-else @click="chooseAddress">
			<view class="person">
				<text>收货人：{{addressInfo.name}}</text>
				<view class="telephone">
					<text>电话：{{addressInfo.phoneNum}}</text>
					<uni-icons type="arrowright" size="20"></uni-icons>
				</view>
			</view>
			<view class="address">
				<text>收货地址：{{addressInfo.address}}</text>
			</view>
		</view>
		<!-- 底部边框线 -->
		<view class="bottom-image">
			<image src="/static/cart_border@2x.png"></image>
		</view>
	</view>
</template>

<script>
	import {mapState,mapGetters} from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				// address:{
				// }
			};
		},
		methods:{
			async chooseAddress(){
				const [err,succ] = await uni.chooseAddress().catch(()=>{})
				if(!err && succ.errMsg === 'chooseAddress:ok'){
					// this.address = succ
					this.$store.commit('user/updateAddress',succ)
				}
				if(err && (succ.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')){
					// this.address = succ
					this.reAuth()
				}
			},
			async reAuth(){
				const [err,confirmRes] = await uni.showModal({
					content:'检测到您没有打开地址权限，是否去设置打开？',
					confirmText:'确认',
					cancelText:'取消'
				})
				if(err)return
				
				if(confirmRes.cancel) return uni.$showMsg('您取消了授权')
				if(confirmRes.confirm) return uni.openSetting({
					success:(settingRes)=>{
						if(!settingRes.authSetting['scope.address'])return uni.$showMsg('您取消了授权')
						if(settingRes.authSetting['scope.address'])return uni.$showMsg('授权成功!请选择收货地址')
										
					}
				})
			}
		},
		computed:{
			...mapState('user',['address']),
			...mapGetters('user',['addressStr']),
			addressInfo(){
				if(!this.address.userName)return {}
				const ads = this.address
				return {
					address:ads.provinceName + ads.cityName + ads.countyName + ads.detailInfo,
					name:ads.userName,
					phoneNum:ads.telNumber
				}
			}
		}
	}
</script>

<style lang="scss">
.address-choose-box{
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.address-box{
	height: 90px;
	display: flex;
	flex-direction: column;
	padding: 15px 5px;
	font-size: 13px;
	box-sizing: border-box;
	.person{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		.telephone{
			display: flex;
			align-items: center;
		}
	}
	.address{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
.bottom-image{
	width: 100%;
	height: 5px;
	image{
		width: 100%;
		height: 5px;
		display: block;
	}
}
</style>
