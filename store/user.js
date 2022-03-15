const state = {
	address:JSON.parse(uni.getStorageSync('address')||"{}"),
	userInfo:JSON.parse(uni.getStorageSync('userInfo') || "{}"),
	token:uni.getStorageSync('token') || '22',
	redirect:()=>{}
}
const mutations = {
	updateAddress(state,address){
		state.address = address
		uni.setStorageSync('address',JSON.stringify(address))
	},
	setUserInfo(state,userInfo){
		state.userInfo = userInfo
		this.commit('user/setUserInfoStorage',userInfo)
	},
	setUserInfoStorage(state,userInfo){
		uni.setStorageSync('userInfo',JSON.stringify(userInfo))
	},
	updateToken(state,token){
		state.token = token
		uni.setStorageSync('token',JSON.stringify(token))
	},
	updateRedirect(state,info){
		state.redirect = info
	}
}
const getters = {
	addressStr(state){
		if(!state.address.userName)return ''
		return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
	}
}
export default {
	namespaced:true,
	state,
	mutations,
	getters
}