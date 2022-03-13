<template>
	<view class="my-search-container" :style="{'background-color':bgColor}" @click="gotoSearch">
		<view class="my-search-box" :style="{'border-radius':borderRadius + 'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
			// 背景颜色
			bgColor: {
				type: String,
				default: '#c00000'
			},
			// 圆角
			borderRadius: {
				type: Number,
				default: 18
			}
		},
		methods:{
			gotoSearch(){
				this.$emit('click')
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		// background-color: #c00000;
		height: 50px;
		line-height: 50px;
		text-align: center;
		display: flex;
		align-items: center;
		padding: 0 10px;
		.my-search-box {
			background-color: #fff;
			// border-radius: 18px;
			width: 100%;
			height: 36px;
			margin: 0 auto;
			line-height: 36px;

			text {
				margin-left: 5px;
				font-size: 15px;
			}
		}
	}
</style>
