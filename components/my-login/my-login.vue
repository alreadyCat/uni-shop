<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<text>登录后尽享更多权益</text>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name:"my-login",
		computed:{
			...mapState('user',['redirect'])
		},
		data() {
			return {
				
			};
		},
		methods:{
			getUserInfo(e){
				if(e.detail.errMsg === 'getUserInfo:fail auth deny')return uni.$showMsg('您取消了授权')
				console.log(e)
				this.$store.commit('user/setUserInfoStorage',e.detail.userInfo)
				
				this.getToken(e.detail)
			},
			async getToken(info){
				const [err,res] = await uni.login().catch(err=>err)
				if(err || res.errMsg !== 'login:ok')return uni.$showMsg('登录失败')
				
				const query = {
					code:res.code,
					encryptedData:info.encryptedData,
					iv:info.iv,
					rawData:info.rawData,
					signature:info.signature
				}
				
				const {data:loginRes} = await uni.$http.post('/api/public/v1/users/wxlogin',query)
				if(loginRes.meta.status!==200)return uni.$showMsg('登录失败')
				
				this.$store.commit('user/updateToken',loginRes.message.token)
				if(this.redirect && this.redirect.openType === 'switchTab'){
					uni.switchTab({
						url:this.redirect.from,
						success:()=>{
							this.$store.commit('user/updateRedirect',null)
						}
					})
				}else{
					uni.navigateTo({
						url:this.redirect.from,
						success:()=>{
							this.$store.commit('user/updateRedirect',null)
						}
					})
				}
				uni.$showMsg('登录成功')
			}
		}
	}
</script>

<style lang="scss">
.login-container{
	height: 750rpx;
	background-color: #F8F8F8;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	&::after{
		content: ' ';
		width: 100%;
		height: 50px;
		background-color: #fff;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform: translateY(50%);
	}
	.btn-login{
		background-color: #c00000;
		width: 90%;
		height: 40px;
		margin: 15px 0;
		border-radius: 20px;
		line-height: 40px;
	}
}
</style>
