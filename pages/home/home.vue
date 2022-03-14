<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular='true'>
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航 -->
		<view class="navigation">
			<view v-for="(item,index) in navList" :key='index' class="nav-item" @click="navClickHandler(item)">
				<image :src="item.image_src" mode="widthFix"></image>
			</view>
		</view>
		<!-- 楼层 -->
		<view class="floorList">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 楼层title -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				
				<!-- 图片盒子 -->
				<view class="img-box">
					<!-- 楼层左侧图片 -->
					<view class="left-box">
						<navigator open-type="navigate" :url="item.product_list[0].url" class="left-item">
							<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
					<!-- 楼层右侧图片 -->
					<view class="right-box">
						<navigator open-type="navigate" :url="fourImg.url" class="right-item" v-for="(fourImg,ind) in item.product_list" :key='ind' v-if="ind!==0" >
							<image :src="fourImg.image_src"  :style="{width:fourImg.image_width + 'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import tabbarBadge from '@/mixins/tabbar-badge.js'
export default {
	mixins:[tabbarBadge],
	data() {
		return {
			swiperList: [],
			navList: [],
			floorList: []
		};
	},
	onLoad() {
		this.getSwiperList()
		this.getNavList()
		this.getFloorList()
	},
	methods: {
		async getSwiperList() {
			const {
				data
			} = await uni.$http.get('/api/public/v1/home/swiperdata')
			if (data.meta.status !== 200) {
				return uni.$showMsg()
			}
			this.swiperList = data.message
		},
		async getNavList() {
			const {
				data
			} = await uni.$http.get('/api/public/v1/home/catitems')
			if (data.meta.status !== 200) return uni.$showMsg()
			this.navList = data.message
		},
		async getFloorList() {
			const {
				data
			} = await uni.$http.get('/api/public/v1/home/floordata')
			if (data.meta.status !== 200) return uni.$showMsg()
			data.message.forEach(item=>{
				item.product_list.forEach(n=>{
					n.url = '/subpkg/goods_list/goods_list?' + n.navigator_url.split('?')[1]
				})
			})
			this.floorList = data.message
		},
		navClickHandler(item) {
			if (item.name === '分类') {
				uni.switchTab({
					url: '/pages/cate/cate'
				})
			}
		}
	}
}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.navigation {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-item {
			width: 128rpx;
			height: 140rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.floorList {
		.floor-item {
			.floor-title {
				width: 100%;
				height: 60rpx;
				display: flex;
			}
			.img-box{
				display: flex;
				padding-left: 10rpx;
				.left-box{
				}
				.right-box{
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
				}
			}
		}
	}
</style>
