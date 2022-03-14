<template>
	<view v-if="goodsInfo.goods_name"  class="goods-detail-box">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in goodsInfo.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息 -->
		<view class="goods-info-box">
			<view class="price">￥{{goodsInfo.goods_price}}</view>
			<view class="content">
				<view class="name">{{goodsInfo.goods_name}}</view>
				<view class="collect">
					<uni-icons type="star" size="20" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="express">快递：免运费</view>
		</view>
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		
		<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
	</view>
</template>

<script>
	import {mapState,mapGetters} from 'vuex'
	
	export default {
		computed:{
			...mapState('cart',['cart']),
			...mapGetters('cart',['total'])
		},
		watch:{
			total:{
				handler(newVal){
					const options = this.options.find(x=>x.text==='购物车')
					options.info = newVal
				},
				immediate:true
			}
		},
		data() {
			return {
				goodsInfo:{},
				options: [{
							icon: 'shop',
							text: '店铺',
							infoColor:"red"
						}, {
							icon: 'cart',
							text: '购物车',
							info: 0 
						}],
					    buttonGroup: [{
					      text: '加入购物车',
					      backgroundColor: '#ff0000',
					      color: '#fff'
					    },
					    {
					      text: '立即购买',
					      backgroundColor: '#ffa200',
					      color: '#fff'
					    }
					    ]
			};
		},
		onLoad(options){
			const goodsId = options.goods_id
			this.getGoodsInfo(goodsId)
		},
		methods:{
			async getGoodsInfo(id){
				const {data} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id:id})
				if(data.meta.status !== 200)return uni.$showMsg()
				
				data.message.goods_introduce.replace(/<img /g,"<img style='display:block;' ").replace(/.webp/g,'.jpg')
				
				this.goodsInfo = data.message
			},
			preview(index){
				uni.previewImage({
					current:index,
					urls:this.goodsInfo.pics.map(item=>item.pics_big)
				})
			},
			onClick(e){
				if(e.content.text === '购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			buttonClick(e){
				console.log(e)
				if(e.content.text === '加入购物车'){
					const {goods_id,goods_name,goods_price,goods_small_logo} = this.goodsInfo
					const goods = {
						goods_id,
						goods_name,
						goods_price,
						goods_small_logo,
						goods_count:1,
						goods_state:true
					}
					this.$store.commit('cart/addtoCart',goods)
					uni.$showMsg('加入购物车成功，快去看看吧！')
					
				}
				
			}
		}
	}
</script>

<style lang="scss">
.goods-detail-box{
	padding-bottom: 50px;
}
swiper{
	height: 750rpx;
	image{
		width: 100%;
		height: 100%;
	}
}
.goods-info-box{
	display: flex;
	flex-direction: column;
	padding: 10px 0 10px 10px;
	.price{
		color: #c00000;
		font-size: 20px;
	}
	.content{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px 0;
		.collect{
			width: 80px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text{
				font-size: 12px;
			}
		}
		.name{
			font-size: 15px;
			border-right: 1px solid #efefef;
			padding-right: 10px;
		}
	}
	.express{
		color: gray;
		font-size: 12px;
	}
}
.uni-goods-nav{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
</style>
