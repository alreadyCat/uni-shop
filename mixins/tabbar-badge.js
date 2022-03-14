import { mapGetters } from "vuex"
export default {
	// onShow(){
	// 	this.setBadge()
	// },
	// methods:{
	// 	setBadge(){
	// 		uni.setTabBarBadge({
	// 			index:2,
	// 			text: this.$store.getters['cart/total'] ===0 ? null : `${this.$store.getters['cart/total']}`
	// 		})
	// 	}
	// }
	computed:{
		...mapGetters('cart',['total'])
	},
	watch:{
		total:{
			immediate:true,
			deep:true,
			handler(newVal){
				uni.setTabBarBadge({
					index:2,
					text: newVal === 0 ? null : `${newVal}`
				})
			}
		}
	}
}