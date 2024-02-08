<template>
	<view class="rank-list-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'网易严选热销百强榜'" :middle="true"></CustomHeader>
		<scroll-view scroll-y="true" :style="{marginBottom: footerHeight + 'px'}" class="rank-list-body">
			<view class="rank-bgc">
				<view class="top-rank">
					<view class="rank-sign">
						网易严选官方榜单
					</view>
				</view>
				<view class="tank-title">
					<text class="title">网易严选热销百强榜</text>
				</view>
				<view class="office-list flex">
					<view class="office-item flex-a" v-for="(item,index) in officeList" :key="index">
						<van-icon :name="item.icon" class="office-icon" />
						<text class="office-name">{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="rank-list-main">
				<view class="rank-list-nav flex-a fff">
					<scroll-view scroll-x="true" class="flex rank-scroll-x" >
						<block v-if="flag">
							<view class="rank-scroll-item" :class="{active: navIndex == index}" v-for="(item,index) in scrollNavList" @tap="tapNavItem(item,index)" :key="index">
								{{item.name}}
							</view>
						</block>
						<view v-else class="all">全部类目</view>
					</scroll-view>
					<view class="all-nav-list flex fff" v-show="!flag">
						<view class="all-list-item" :class="{active: navIndex == index}" v-for="(item,index) in scrollNavList" :key="index" @tap="tapNavItem(item,index)">
							{{item.name}}
						</view>
					</view>
					<view class="show-more-block">
						<van-icon class="show-more-icon" :name="flag ? 'arrow-down' : 'arrow-up'" @tap="onShowNavItem"/>
					</view>
				</view>
				<view class="scroll-item-block">
					<view class="rank-list-item flex-c fff" v-for="i in 6" :key="i">
						<view class="top-goods-info flex">
							<view class="goods-img-block">
								<image src="https://yanxuan-item.nosdn.127.net/712e114f766a31d9b8e1ab22dde10574.jpg" class="goods-img"></image>
								<view class="rank-top"></view>
							</view>
							<view class="goods-info-block flex-c">
								<view class="goods-name-block">
									<text class="goods-name">
										<text class="sign">自营</text>秘语女士背心式无钢圈文胸上薄下厚无痕内衣
									</text>
								</view>
								<view class="good-rate flex-a">
									<view class="icon-block flex-a fff">
										<van-icon size="24rpx" name="good-job" color="#f9754e" />
									</view>
									<text class="rate">好评率 99.7%</text>
								</view>
								<view class="goods-price">
									<text class="retail-price">￥399</text>
									<text class="real-price">￥599</text>
								</view>
							</view>
							<view class="right-pay">
								<text class="text">马上抢</text>
								<van-icon name="arrow" size="26rpx" />
							</view>
						</view>
						<view class="user-comment flex-a">
							<image src="http://127.0.0.1:3000/upload/QIwNRdjgjNSU0f93370b9ab43a78e6a00cbd791d4b7a.jpg" class="user-img"></image>
							<text class="comment">吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</text>
						</view>
					</view>
				</view>
				<view class="rank-other-item fff flex-c">
					<view class="title">
						更多榜单
					</view>
					<view class="other-item-block flex">
						<view class="other-item flex-a" v-for="i in 9" :key="i">
							<view class="item-left flex-c">
								<view class="item-name">
									床品榜
								</view>
								<view class="enter">
									<text class="text">进入榜单</text>
									<van-icon name="arrow" size="12rpx" />
								</view>
							</view>
							<view class="item-right">
								<image src="https://yanxuan-item.nosdn.127.net/f1ddf9c5e8edaf6e32db7dfc2a85e26a.png?type=webp&imageView&quality=65&thumbnail=330x330" class="item-right-img"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="rank-list-footer flex fff">
			<view class="footer-item flex-a" :class="{active: footerId == item.id}" @tap="tapFooterItem(item)" v-for="(item) in footerList" :key="item.id">
				<van-icon :name="item.icon" class="rank-icon" />
				<text class="rank-name">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue"
import {onLoad, onReady} from '@dcloudio/uni-app'
import {getRankListAPI} from '../../api/rank.js'
const {safeAreaInsets} = uni.getSystemInfoSync()

const rank = ref({
	1: 'https://yanxuan.nosdn.127.net/f1566323de5e538cfd1c1845685285f2.png?quality=75&type=webp&imageView',
	2: 'https://yanxuan.nosdn.127.net/5d91018eda410767b27ec57b8bf9b929.png?quality=75&type=webp&imageView',
	3: 'https://yanxuan.nosdn.127.net/89748e835b8ffb8a328d945bc2b9de93.png?quality=75&type=webp&imageView'
})

const footerList = ref([
	{ name: '热销榜', icon: 'fire', id: 1 },
	{ name: '特惠榜', icon: 'good-job', id: 2 },
	{ name: '新品榜', icon: 'new', id: 3 },
	{ name: '好评榜', icon: 'award', id: 4 }
])

const officeList = ref([
	{ name: '官方销售数据', icon: 'medal-o' },
	{ name: '每小时更新', icon: 'clock-o' },
	{ name: '覆盖在售商品', icon: 'bag-o' }
])

const scrollNavList = ref([
	{ name: '全部', id: 'all' },
	{ name: '呵呵', id: '1' },
	{ name: '还会', id: '2' },
	{ name: '画画', id: '3' },
	{ name: '画画', id: '4' },
	{ name: '画画', id: '5' },
	{ name: '画画', id: '6' },
	{ name: '画画', id: '7' },
	{ name: '画画', id: '8' },
	{ name: '画画', id: '9' },
	{ name: '画画', id: '10' },
])

const footerId = ref(1)
const tapFooterItem = (item) => {
	footerId.value = item.id
}
//nav列表逻辑
const navIndex = ref(0)
const tapNavItem = (item,index) => {
	if(!flag.value) flag.value = true
	navIndex.value = index
}
const flag = ref(true)
const onShowNavItem = () => {
	flag.value = !flag.value
}

const getRankList = async () => {
	const res = await getRankListAPI(footerId.value)
}

const footerHeight = ref(0)
onReady(() => {
	const footer = uni.createSelectorQuery().select('.rank-list-footer')
	const navItems = uni.createSelectorQuery().select('.rank-scroll-item')
	footer.boundingClientRect(data => {
		footerHeight.value = data.height
	}).exec()
	navItems.boundingClientRect(data => {
		console.log(data);
	}).exec()
})

onLoad(() => {
	getRankList()
})
</script>

<style lang="scss">
page {
	height: 100vh;
}
.rank-list-block {
	position: relative;
	height: 100%;
	box-sizing: border-box;
	background-color: #f0efef;
	.rank-list-body {
		flex: 1;
		overflow: scroll;
		.rank-bgc {
			position: relative;
			height: 530rpx;
			border-radius: 0 0 0 48rpx;
			background: linear-gradient(to bottom, #d34433,#d13e43);
			.top-rank {
				position: absolute;
				left: 20rpx;
				top: 0;
				width: 82rpx;
				height: 74rpx;
				border-radius: 0 0 36rpx 36rpx;
				background-color: #ecab6c;
				.rank-sign {
					margin-top: 8rpx;
					padding: 0 4rpx;
					font-size: 18rpx;
					color: #fff1db;
				}
			}
			.tank-title {
				position: absolute;
				top: 72rpx;
				width: 100%;
				text-align: center;
				.title {
					color: #fffcfb;
					font-size: 58rpx;
					font-weight: 600;
					letter-spacing: 6rpx;
				}
			}
			.office-list {
				position: absolute;
				top: 138rpx;
				width: 100%;
				padding: 26rpx 94rpx;
				box-sizing: border-box;
				color: #feeada;
				.office-item {
					flex: 1;
					justify-content: center;
					font-size: 22rpx;
					.office-name {
						margin-left: 4rpx;
					}
				}
			}
		}
		.rank-list-main {
			position: absolute;
			top: 288rpx;
			width: 100%;
			padding: 0 20rpx;
			box-sizing: border-box;
			.rank-list-nav {
				position: relative;
				padding: 26rpx;
				border-radius: 12rpx;
				.rank-scroll-x {
					width: 88%;
					white-space: nowrap;
					font-size: 26rpx;
					.all {
						padding: 10rpx 0;
					}
					.rank-scroll-item {
						display: inline-block;
						padding: 10rpx 26rpx;
						border-radius: 28rpx;
						&.active {
							color: #fff;
							background-color: #de3133;
						}
					}
					&::after {
						content: '';
						display: block;
						height: 100%;
						width: 2rpx;
						background-color: #bf2822;
					}
				}
				.show-more-block {
					margin-left: 32rpx;
				}
				.all-nav-list {
					position: absolute;
					top: 100rpx;
					left: 0;
					flex-wrap: wrap;
					width: 100%;
					padding: 24rpx 20rpx;
					border-top: 1px solid #d9d9d9;
					border-radius: 0 0 12rpx 12rpx;
					// box-shadow: 0 10rpx 10rpx #e8e8e8;
					z-index: 1000;
					box-sizing: border-box;
					.all-list-item {
						width: 154rpx;
						padding: 8rpx 0 10rpx;
						margin-bottom: 12rpx;
						text-align: center;
						border-radius: 32rpx;
						font-size: 28rpx;
						&.active {
							color: #fff;
							background-color: #df1923;
						}
					}
				}
			}
			.scroll-item-block {
				margin-top: 12rpx;
				.rank-list-item {
					padding: 12rpx;
					margin-bottom: 16rpx;
					border-radius: 16rpx;
					.top-goods-info {
						position: relative;
						.goods-img-block {
							position: relative;
							margin-right: 20rpx;
							.goods-img {
								width: 240rpx;
								height: 240rpx;
								border-radius: 12rpx;
							}
							.rank-top {
								position: absolute;
								top: 0;
								left: 0;
								background: url('https://yanxuan.nosdn.127.net/f1566323de5e538cfd1c1845685285f2.png?quality=75&type=webp&imageView');
							}
						}
						.goods-info-block {
							justify-content: space-around;
							.goods-name-block {
								padding-right: 64rpx;
								.goods-name {
									display: -webkit-box;
									-webkit-box-orient: vertical;
									//要显示的行数 2
									-webkit-line-clamp: 2;
									overflow: hidden;
									text-overflow: ellipsis;
									font-size: 24rpx;
									line-height: 42rpx;
									.sign {
										margin-right: 10rpx;
										padding: 8rpx;
										border-radius: 4rpx;
										background-color: #f9cc6a;
										font-size: 22rpx;
									}
								}
							}
							.good-rate {
								height: 30rpx;
								width: fit-content;
								padding: 2rpx 4rpx 2rpx 0;
								margin-top: -20rpx;
								background: linear-gradient(to right, #e54e38, #fca37c);
								border-radius: 24rpx;
								.icon-block {
									justify-content: center;
									width: 30rpx;
									height: 30rpx;
									border-radius: 50%;
								}
								.rate {
									margin-left: 6rpx;
									font-size: 20rpx;
									color: #fff;
								}
							}
							.goods-price {
								// margin-top: -10rpx;
								.retail-price {
									font-size: 24rpx;
									color: #bf2822;
								}
								.real-price {
									font-size: 18rpx;
									color: #9a9a9a;
									text-decoration: line-through;
								}
							}
						}
						.right-pay {
							position: absolute;
							bottom: 10rpx;
							right: 26rpx;
							padding: 10rpx 12rpx 10rpx 16rpx;
							border-radius: 32rpx;
							background: linear-gradient(to right, #fc5659, #d12826);
							font-size: 28rpx;
							color: #fff;
						}
					}
					.user-comment {
						padding-right: 40rpx;
						margin-top: 20rpx;
						border-radius: 30rpx;
						background-color: #f6f6f6;
						.user-img {
							width: 36rpx;
							height: 36rpx;
							margin: 6rpx;
							border-radius: 50%;
						}
						.comment {
							font-size: 24rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}
			}
			.rank-other-item {
				padding: 20rpx;
				border-radius: 12rpx;
				.title {
					padding: 18rpx 0;
					font-size: 32rpx;
					text-align: center;
				}
				.other-item-block {
					margin-top: 20rpx;
					flex-wrap: wrap;
					.other-item {
						justify-content: space-between;
						width: 330rpx;
						height: 168rpx;
						margin-right: 8rpx;
						margin-bottom: 10rpx;
						background: linear-gradient(to right, #edf8fd, #f6fbfc);
						border-radius: 4rpx;
						&:nth-child(2n) {
							margin-right: 0;
						}
						.item-left {
							margin-left: 20rpx;
							.item-name {
								font-size: 28rpx;
							}
							.enter {
								.text {
									font-size: 22rpx;
								}
							}
						}
						.item-right {
							.item-right-img {
								height: 168rpx;
								width: 154rpx;
							}
						}
					}
				}
			}
		}
	}
	.rank-list-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		border-top: 1px solid #d9d9d9;
		z-index: 999;
		.footer-item {
			flex: 1;
			justify-content: center;
			padding: 30rpx 0;
			&.active {
				background-color: #fee8e6;
				color: #cd3535;
				.rank-icon {
					color: #cd3535;
				}
			}
			.rank-name {
				margin-left: 4rpx;
				font-size: 26rpx;
			}
			.rank-icon {
				color: #b2acae;
			}
		}
	}
}
</style>
