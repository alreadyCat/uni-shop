const state = {
	address:JSON.parse(uni.getStorageSync('address')||"{}")
}
const mutations = {
	updateAddress(state,address){
		state.address = address
		
		uni.setStorageSync('address',JSON.stringify(state.address))
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