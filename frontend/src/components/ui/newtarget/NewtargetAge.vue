<template>
	<div class="table_wrap pop-scroll">
		<table>
			<colgroup>
				<col width="50px">
				<col width="">
				<col width="140px">
				<col width="120px" v-if="avgConversionRateShow">
				<col width="120px" v-if="sumConversionShow">
				<col width="120px" v-if="sumClickShow">
				<col width="120px" v-if="avgCpcShow">
				<col width="120px" v-if="sumActionsLikeShow">
				<col width="120px" v-if="sumActionsCommentShow">
				<col width="120px" v-if="sumActionsPostShow">
				<col width="120px" v-if="sumVideoActionsShow">
				<col width="120px" v-if="avgVideoActionsShow">
				<col width="120px" v-if="sumSpendShow">
				<col width="162px">
			</colgroup>
			<thead>
				<tr>
					<th class="align_center">추가</th>
					<th>명칭</th>
					<th>구분</th>
					<th class="important_area" v-if="avgConversionRateShow">
						<span>전환율</span>
						<span class="sort_type_01">
							<div>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','ASC')" class="asc_sort sort_btn"></a></p>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','DESC')" class="desc_sort sort_btn"></a></p>
							</div>
						</span>
					</th>
					<th class="important_area" v-if="sumConversionShow">
						<span>전환수</span>
						<span class="sort_type_01">
							<div>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','ASC')" class="asc_sort sort_btn"></a></p>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','DESC')" class="desc_sort sort_btn"></a></p>
							</div>
						</span>
					</th>
					<th class="important_area" v-if="sumClickShow">
						<span>클릭수</span>
						<span class="sort_type_01">
							<div>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','ASC')" class="asc_sort sort_btn"></a></p>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','DESC')" class="desc_sort sort_btn"></a></p>
							</div>
						</span>
					</th>
					<th class="important_area" v-if="avgCpcShow">
						<span>CPC</span>
						<span class="sort_type_01">
							<div>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','ASC')" class="asc_sort sort_btn"></a></p>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','DESC')" class="desc_sort sort_btn"></a></p>
							</div>
						</span>
					</th>
					<th class="important_area" v-if="sumActionsLikeShow">
						<span>좋아요</span>
						<span class="sort_type_01">
							<div>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','ASC')" class="asc_sort sort_btn"></a></p>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','DESC')" class="desc_sort sort_btn"></a></p>
							</div>
						</span>
					</th>
					<th class="important_area" v-if="sumActionsCommentShow">
						<span>댓글수</span>
						<span class="sort_type_01">
							<div>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','ASC')" class="asc_sort sort_btn"></a></p>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','DESC')" class="desc_sort sort_btn"></a></p>
							</div>
						</span>
					</th>
					<th class="important_area" v-if="sumActionsPostShow">
						<span>공유수</span>
						<span class="sort_type_01">
							<div>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','ASC')" class="asc_sort sort_btn"></a></p>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','DESC')" class="desc_sort sort_btn"></a></p>
							</div>
						</span>
					</th>
					<th class="important_area" v-if="sumVideoActionsShow">
						<span>조회수</span>
						<span class="sort_type_01">
							<div>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','ASC')" class="asc_sort sort_btn"></a></p>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','DESC')" class="desc_sort sort_btn"></a></p>
							</div>
						</span>
					</th>
					<th class="important_area" v-if="avgVideoActionsShow">
						<span>CPV</span>
						<span class="sort_type_01">
							<div>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','ASC')" class="asc_sort sort_btn"></a></p>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','DESC')" class="desc_sort sort_btn"></a></p>
							</div>
						</span>
					</th>
					<th class="important_area" v-if="sumSpendShow">
						<span>광고비</span>
						<span class="sort_type_01">
							<div>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','ASC')" class="asc_sort sort_btn"></a></p>
								<p><a href="javascript:void(0)" v-on:click="listSort('spend','DESC')" class="desc_sort sort_btn"></a></p>
							</div>
						</span>
					</th>
					<th>비율</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in listData.data">
					<td class="align_center text_effect" @click="clickSelect(item)">선택</td>
					<td>{{ item.age }}</td>
					<td>나이</td>
					<td class="important_area" v-if="avgConversionRateShow">{{ item.avg_conversion_rate }}</td>
					<td class="important_area" v-if="sumConversionShow">{{ item.sum_conversion }}</td>
					<td class="important_area" v-if="sumClickShow">{{ item.sum_click }}</td>
					<td class="important_area" v-if="avgCpcShow">{{ item.avg_cpc }}</td>
					<td class="important_area" v-if="sumActionsLikeShow">{{ item.sum_actions_like }}</td>
					<td class="important_area" v-if="sumActionsCommentShow">{{ item.sum_actions_comment }}</td>
					<td class="important_area" v-if="sumActionsPostShow">{{ item.sum_actions_post }}</td>
					<td class="important_area" v-if="sumVideoActionsShow">{{ item.sum_video_10_sec_watched_actions }}</td>
					<td class="important_area" v-if="avgVideoActionsShow">{{ item.avg_cost_per_10_sec_video_view }}</td>
					<td class="important_area" v-if="sumSpendShow">{{ item.sum_spend }}</td>
					<td>88.5%</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'NewTargetAge',
	data () {
		return {
			listData:{
				data: []
			},
			avgConversionRateShow: true,
			sumConversionShow: true,
			sumClickShow: false,
			avgCpcShow: false,
			sumActionsLikeShow: false,
			sumActionsCommentShow: false,
			sumActionsPostShow: false,
			sumVideoActionsShow: false,
			avgVideoActionsShow: false,
			sumSpendShow: true
		}
	},
	created () {
		this.$eventBus.$on('set_age_insights', this.setAgeInsights)
	},
	beforeDestroy () {
		this.$eventBus.$off('set_age_insights', this.setAgeInsights)
	},
	methods: {
		setAgeInsights (data, kpi_base) {
			this.listData.data = []
			data.forEach(item => {
				this.listData.data.push(item)
			})

			if (kpi_base == 'conversion') {
				this.avgConversionRateShow = true
				this.sumConversionShow = true
				this.sumClickShow = false
				this.avgCpcShow = false
				this.sumActionsLikeShow = false
				this.sumActionsCommentShow = false
				this.sumActionsPostShow = false
				this.sumVideoActionsShow = false
				this.avgVideoActionsShow = false
				this.sumSpendShow = true
			} else if (kpi_base == 'click'){
				this.avgConversionRateShow = false
				this.sumConversionShow = false
				this.sumClickShow = true
				this.avgCpcShow = true
				this.sumActionsLikeShow = false
				this.sumActionsCommentShow = false
				this.sumActionsPostShow = false
				this.sumVideoActionsShow = false
				this.avgVideoActionsShow = false
				this.sumSpendShow = true
			} else if (kpi_base == 'reaction'){
				this.avgConversionRateShow = false
				this.sumConversionShow = false
				this.sumClickShow = false
				this.avgCpcShow = false
				this.sumActionsLikeShow = true
				this.sumActionsCommentShow = true
				this.sumActionsPostShow = true
				this.sumVideoActionsShow = false
				this.avgVideoActionsShow = false
				this.sumSpendShow = false
			} else if (kpi_base == 'view'){
				this.avgConversionRateShow = false
				this.sumConversionShow = false
				this.sumClickShow = false
				this.avgCpcShow = false
				this.sumActionsLikeShow = false
				this.sumActionsCommentShow = false
				this.sumActionsPostShow = false
				this.sumVideoActionsShow = true
				this.avgVideoActionsShow = true
				this.sumSpendShow = true
			}
		},
		clickSelect(item) {
			this.$eventBus.$emit('set_new_target_age', item.age)
		},
		listSort(key, type) {
			const item = this.listData.data
			//숫자 형식 소팅(String,Text 형식 지원 X)
			const byNum = item.slice(0)
			const me = this
			const $el = event.target
			const $btns = document.querySelectorAll('.sort_btn')
			const onCheck = event.target.classList.contains('on')
			const beforeType = this.beforeType

			if(beforeType !== type || onCheck === false) {
				byNum.sort(function(a,b) {
					if(type == 'ASC') {
							return me.checkObject(parseFloat(a[key])) - me.checkObject(parseFloat(b[key]))
					}else{
							return me.checkObject(parseFloat(b[key])) - me.checkObject(parseFloat(a[key]))
					}
				})
			}

			this.beforeType = type
			this.listData.data = byNum
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

.table_wrap{height:317px; overflow-y:scroll;
	table{width:100%; border-top:2px solid #000;
		tr{
			&:nth-child(odd){background:#fff;}
			&:nth-child(even){background:#f9fafc;
				.important_area{background:#e4ecfa;}
			}
		}
		th{height:44px; line-height:44px; background:#fafafa; color:#333; font-size:14px; font-weight:bold; border-right:1px solid #f1f1f1; border-bottom:1px solid #f1f1f1; padding-left:15px;
			&:last-child{border-right:0px;}
		}
		td{height:44px; line-height:44px; padding-left:15px; border-right:1px solid #f1f1f1; border-bottom:1px solid #f1f1f1; font-size:12px;
			&:last-child{border-right:0px;}
			button{width:28px; height:28px; margin:8px 0px;}
		}
		.important_area{background:#edf2fb; border-right:1px solid #fff; border-bottom:1px solid #fff;
			/* 소팅 버튼 */
			span{display:inline-block; vertical-align:middle;
				&.sort_type_01{margin-left:2px;}
			}
			.asc_sort { background:url('../../../assets/images/icon/target2_up.png') no-repeat left top;}
			.desc_sort { background:url('../../../assets/images/icon/target2_down.png') no-repeat left top; }
			.asc_sort.on { background:url('../../../assets/images/icon/target2_up_on.png') no-repeat left top; }
			.desc_sort.on { background:url('../../../assets/images/icon/target2_down_on.png') no-repeat left top; }
		}
	}
}
/* 게시판 선택버튼 */
.text_effect{text-decoration:underline; cursor:pointer;}
</style>
