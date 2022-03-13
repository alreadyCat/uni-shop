<template>
	<view>
		<view class="search-box">
			<uni-search-bar@input="input" :radius="100" cancelButton="none" placeholder="搜索" v-model="kw"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugList" v-if="searchResult.length!==0">
			<view class="sugItem" v-for="(item,index) in searchResult" :key="index" @click="gotoDetail(item)">
				<view class="itemName">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag  :text="item" v-for="(item,index) in historyList" :key="index" @click="searchTag(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				kw:'',
				searchResult:[],
				historyList:[]
			};
		},
		onLoad(){
			this.historyList = JSON.parse(uni.getStorageSync('kw') || "[]")
		},
		methods:{
			input(e){
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.kw = e
					this.getSearchResult()
				},500)
			},
			async getSearchResult(){
				if(this.kw === ''){
					this.searchResult = []
					return 
				}
				
				const {data} = await uni.$http.get('/api/public/v1/goods/search',{query:this.kw})
				if(data.meta.status!==200)return uni.$showMsg()
				this.searchResult = data.message.goods
				
				this.saveSearchHistory()
			},
			gotoDetail(item){
				uni.navigateTo({
					url:"/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
				})
			},
			saveSearchHistory(){
				const index =  this.historyList.findIndex(item=>item===this.kw)
				if(index !== -1){
					this.historyList.splice(index,1)
				}
				this.historyList.unshift(this.kw)
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			cleanHistory(){
				uni.clearStorageSync('kw')
				this.historyList = []
			},
			searchTag(item){
				// console.log(this.$refs.searchBar)
				// this.kw = item
				// this.$refs.searchBar.value = item
				// this.getSearchResult()
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query=' + item
				})
				
			}
		}
	}
</script>

<style lang="scss">
/deep/ .search-box{
	position: sticky;
	top: 0;
	z-index: 999;
	.uni-searchbar{
		background-color: #c00000;
	}
}
.sugList{
	.sugItem{
		display: flex;
		justify-content: space-between;
		padding: 10px 10px;
		border-bottom: 2px solid #efefef;
		.itemName{
			font-size: 15px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
.history-box{
	.history-title{
		display: flex;
		justify-content: space-between;
		padding: 10px 5px;
		border-bottom: 1px solid #efefef;
		text{
			font-size: 15px;
		}
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		.uni-tag{
			display: block;
			color: #000000;
			background-color: #efefef;
			margin-top: 5px;
			margin-right: 10px;
		}
	}
}
</style>
