const state = {
	cart:JSON.parse(uni.getStorageSync('cart') || "[]")
}

const mutations = {
	addtoCart(state,goods){
		
		const isGoodsExist = state.cart.find(item=>item.goods_id === goods.goods_id)
		if(isGoodsExist){
			isGoodsExist.goods_count++
		}else{
			state.cart.unshift(goods)
		}
		
		this.commit('cart/saveToStorage')
	},
	deltoCart(state,id){
		const goodsIndex = state.cart.findIndex(item=>item.goods_id===id)
		state.cart.splice(goodsIndex,1)
		
		this.commit('cart/saveToStorage')
	},
	saveToStorage(state){
		uni.setStorageSync('cart',JSON.stringify(state.cart))
	},
	editSingleGoods(state,goods){
		const oldGoods = state.cart.find(g=>g.goods_id===goods.goods_id)
		for(const key in goods){
			oldGoods[key] = goods[key]
		}
		
		this.commit('cart/saveToStorage')
	},
	AllcheckedOrNot(state,bool){
		state.cart.forEach(item=>item.goods_state = bool)
		
		this.commit('cart/saveToStorage')
	}
}
const actions = {
	
}
const getters = {
	total(state){
		return state.cart.reduce((p,c)=>{
			if(c.goods_state)return p+c.goods_count
			return p
		},0)
	},
	isAllchecked(state){
		return state.cart.every(item=>item.goods_state===true)
	},
	TotalPrice(state){
		return state.cart.reduce((p,c)=>{
			if(c.goods_state)return p + c.goods_count*c.goods_price
			
			return p
		},0)
	}
}
export default {
	namespaced:true,
	state,
	mutations,
	actions,
	getters
}