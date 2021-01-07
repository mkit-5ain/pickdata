<template>
	<div class="nav_contents_wrap">
		<div class="contents_title"><span>카드</span> 업종 <span>광고주명</span> 광고주의 <span>3개월</span> 동안 <span>전환율 높은 순</span> 추천 데이터입니다.</div>
		<div class="table_wrap">
			<div class="table_inner_wrap scroll">
				<div class="thead">
					<ul>
						<li class="line-1">
							<div>연령대</div>
							<div class="sorting_btn">
								<span><a href="javascript:void(0)" v-on:click="listSort('ASC')" class="asc_sort sort_btn"></a></span>
								<span><a href="javascript:void(0)" v-on:click="listSort('spend','DESC')" class="desc_sort sort_btn"></a></span>
							</div>
						</li>
						<li class="line-2">
							<div>전환율</div>
							<div class="sorting_btn">
								<span><a href="javascript:void(0)" v-on:click="listSort('ASC')" class="asc_sort sort_btn"></a></span>
								<span><a href="javascript:void(0)" v-on:click="listSort('spend','DESC')" class="desc_sort sort_btn"></a></span>
							</div>
						</li>
						<li class="line-3">
							<div>전환수</div>
							<div class="sorting_btn">
								<span><a href="javascript:void(0)" v-on:click="listSort('ASC')" class="asc_sort sort_btn"></a></span>
								<span><a href="javascript:void(0)" v-on:click="listSort('spend','DESC')" class="desc_sort sort_btn"></a></span>
							</div>
						</li>
						<li class="line-4">
							<div>광고비</div>
							<div class="sorting_btn">
								<span><a href="javascript:void(0)" v-on:click="listSort('ASC')" class="asc_sort sort_btn"></a></span>
								<span><a href="javascript:void(0)" v-on:click="listSort('spend','DESC')" class="desc_sort sort_btn"></a></span>
							</div>
						</li>
						<li class="line-5">
							<div>비율</div>
							<div class="sorting_btn">
								<span><a href="javascript:void(0)" v-on:click="listSort('ASC')" class="asc_sort sort_btn"></a></span>
								<span><a href="javascript:void(0)" v-on:click="listSort('spend','DESC')" class="desc_sort sort_btn"></a></span>
							</div>
						</li>
						<li class="line-6">

						</li>
					</ul>
				</div>
				<div class="tbody">
					<ul>
						<li class="line-1">10-65</li>
						<li class="line-2">84.5%</li>
						<li class="line-3">00,000,000</li>
						<li class="line-4">00,000,000</li>
						<li class="line-5">15.8%</li>
						<li class="line-6 btn">선택</li>
					</ul>
					<ul>
						<li class="line-1">30-55</li>
						<li class="line-2">12.5%</li>
						<li class="line-3">00,000,000</li>
						<li class="line-4">00,000,000</li>
						<li class="line-5">25.8%</li>
						<li class="line-6 btn">선택</li>
					</ul>
					<ul>
						<li class="line-1">30-45</li>
						<li class="line-2">2.5%</li>
						<li class="line-3">00,000,000</li>
						<li class="line-4">00,000,000</li>
						<li class="line-5">31.3%</li>
						<li class="line-6 btn">선택</li>
					</ul>
					<ul>
						<li class="line-1">61-65</li>
						<li class="line-2">84.5%</li>
						<li class="line-3">00,000,000</li>
						<li class="line-4">00,000,000</li>
						<li class="line-5">12.4%</li>
						<li class="line-6 btn">선택</li>
					</ul>
					<ul>
						<li class="line-1">30-55</li>
						<li class="line-2">11.5%</li>
						<li class="line-3">00,000,000</li>
						<li class="line-4">00,000,000</li>
						<li class="line-5">81.1%</li>
						<li class="line-6 btn">선택</li>
					</ul>
					<ul>
						<li class="line-1">30-45</li>
						<li class="line-2">2.5%</li>
						<li class="line-3">00,000,000</li>
						<li class="line-4">00,000,000</li>
						<li class="line-5">51.3%</li>
						<li class="line-6 btn">선택</li>
					</ul><ul>
						<li class="line-1">23-43</li>
						<li class="line-2">83.5%</li>
						<li class="line-3">00,000,000</li>
						<li class="line-4">00,000,000</li>
						<li class="line-5">15.8%</li>
						<li class="line-6 btn">선택</li>
					</ul>
					<ul>
						<li class="line-1">17-28</li>
						<li class="line-2">12%</li>
						<li class="line-3">00,000,000</li>
						<li class="line-4">00,000,000</li>
						<li class="line-5">82%</li>
						<li class="line-6 btn">선택</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'DetargetAge',
	component: {

	},
	data () {
		return {

		}
	},
	methods: {
		listSort(key, type) {
			//숫자 형식 소팅(String,Text 형식 지원 X)
			const me = this
			const $el = event.target
			const $btns = document.querySelectorAll('.sort_btn')
			const onCheck = event.target.classList.contains('on')
			const beforeType = this.beforeType

			//sort arrow element class Add and Remove Actions
			for (var i = 0; i < $btns.length; i++) {
			   $btns[i].classList.remove('on')
			}
			$el.classList.add('on')
		}
	}
}
</script>
<style lang="scss" scoped>
.nav_contents_wrap{
	.contents_title{font-size:18px;}
	.table_wrap{width:100%; display:table;
		.table_inner_wrap{height: 253px; overflow-y: scroll; padding-right:15px;
			ul{
				li{position:relative; float:left; text-align:center; height:44px; line-height:44px; border-right:1px solid #f1f1f1; border-bottom:1px solid #f1f1f1;
					&:last-child{border-right:0px;}
					.sorting_btn{position:absolute; top:14px; right:5px; z-index:10;
						a{margin:1px 0px; cursor:pointer;}
					}
				}
				.line-1{width:85px;}
				.line-2{width:85px;}
				.line-3{width:140px;}
				.line-4{width:140px;}
				.line-5{width:90px;}
				.line-6{width:130px;}
			}
			.thead{width:100%; display:table; border-top: 2px solid #333;
				ul{
					li{background:#fdfdfd; font-size:14px; font-weight:bold;}
				}
			}
			.tbody{width:100%; display:table; clear:both; border-bottom: 1px solid #f1f1f1;
				.btn{color:#0066cf; text-decoration:underline; cursor:pointer;}
			}
		}
	}
}
.scroll::-webkit-scrollbar{width:10px;}
.scroll::-webkit-scrollbar-thumb{height:20px; border-radius: 10px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3); background-color: #ebebeb;}
</style>
