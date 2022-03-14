<template>
	<view>
		<view class="scoll-container-view">
			<!-- 左侧滑动区域 -->
			<scroll-view class="left-scroll" scroll-y="true" :style="{height: windowHeight + 'px'}">
				<view class="left-scroll-item" :class="{active:item.cat_id === active}" v-for="(item,index) in cateList" :key='item.cat_id' @click="changeCate(item)">{{item.cat_name}}</view>
			</scroll-view>
			
			<!-- 右侧滑动区域 -->
			<scroll-view class="right-scroll" scroll-y="true"  :style="{height: windowHeight + 'px'}" :scroll-top="scrollTop">
				<view class="cate-level2">
					<view class="cate-level2-item" v-for="(item,index) in cateLevel2" :key="index">
						<!-- 二级分类标题 -->
						<view  class="cate-level2-title">/ {{item.cat_name}} /</view>
						<!-- 三级分类列表盒子 -->
						<view class="cate-level2-list">
							<view class="cate-level3-item" v-for="(item3,i3) in item.children" :key="i3" @click="gotoGoodsList(item3)">
								<image :src="item3.cat_icon" mode="widthFix"></image>
								<text>{{item3.cat_name}}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>

import tabbarBadge from '@/mixins/tabbar-badge.js'
export default {
	mixins:[tabbarBadge],
	data() {
		return {
			windowHeight:0,
			cateList:[],
			active:0,
			cateLevel2:[],
			scrollTop:0
		};
	},
	onLoad(){
		const sysInfo = uni.getSystemInfoSync()
		this.windowHeight = sysInfo.windowHeight
		this.getCateList()
	},
	methods:{
		async getCateList(){
			const {data} = await uni.$http.get('/api/public/v1/categories')
			console.log(data)
			if(data.meta.status !== 200)return uni.$showMsg()
			this.cateList = data.message
			this.active = this.cateList[0].cat_id
			this.cateLevel2 = data.message[0].children
		},
		changeCate(item){
			this.active = item.cat_id
			this.cateLevel2 = item.children
			this.scrollTop = this.scrollTop===0?1:0
		},
		gotoGoodsList(item){
			uni.navigateTo({
				url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
			})
		}
	}
}
</script>

<style lang="scss">
.scoll-container-view{
	display: flex;
	.left-scroll{
		width: 120px;
		.left-scroll-item{
			background-color: #f7f7f7;
			font-size: 12px;
			line-height: 60px;
			text-align: center;
			&.active{
				background-color: #FFFFFF;
				position: relative;
				&::before{
					content: '';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #c00000;
					position: absolute;
					top: 50%;
					left: 0;
					// margin-top: -15px;
					transform: translateY(-50%);
				}
			}
		}
	}
	.right-scroll{
		background-color: #FFFFFF;
		.cate-level2-title{
			font-size: 12px;
			font-weight: bold;
			text-align: center;
			padding: 15px 0;
		}
		.cate-level2-list{
			display: flex;
			flex-wrap: wrap;
			.cate-level3-item{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 33.33%;
				margin-bottom: 10px;
				image{
					width: 60px;
					height: 60px;
				}
				text{
					font-size: 12px;
				}
			}
		}
	}
}
</style>
