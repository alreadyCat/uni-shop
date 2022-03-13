<template>
	<view>
		<view class="goods-list">
			<view v-for="(item,index) in goodsList" :key="index" @click="gotoDetail(item)">
				<my-goods :goods="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				goodsList:[],
				total:0,
				isLoading:false
				
			};
		},
		onLoad(options){
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			
			this.getGoodsList()
		},
		methods:{
			async getGoodsList(cb){
				this.isLoading = true
				const {data} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				if(data.meta.status!==200)return uni.$showMsg()
				cb && cb()
				this.goodsList = [...this.goodsList,...data.message.goods]
				this.total = data.message.total
				this.isLoading = false
			},
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},
		onReachBottom(){
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total)return uni.$showMsg("没有数据了...")
			
			if(this.isLoading)return
			
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh(){
			this.queryObj.pagenum = 1
			this.isLoading = false
			this.goodsList = []
			this.getGoodsList(()=>uni.stopPullDownRefresh())
			
		}
		
	}
</script>

<style lang="scss">
.goods-list{
	
}
</style>
