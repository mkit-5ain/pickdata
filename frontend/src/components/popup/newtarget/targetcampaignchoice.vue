<template>
	<div class="contents_inner_widget">
		<div class="contents_section">
			<div class="contents_title">
				<p>광고세트를 만들 캠페인을 선택해 주세요.</p>
				<p>리스트에는 마케팅 목표가 [트래픽]인 캠페인만 노출됩니다.</p>
			</div>
		</div>
		<div class="contents_section">
			<div class="table_wrap pop-scroll">
				<table>
					<colgroup>
						<col width="40px">
						<col width="*">
						<col width="92px">
						<col width="92px">
						<col width="92px">
						<col width="92px">
					</colgroup>
					<thead>
						<tr>
							<td></td>
							<td>캠페인 이름</td>
							<td>게재</td>
							<td>클릭</td>
							<td>도달</td>
							<td>노출</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in this.$parent.campaignList">
							<td>
								<input type="radio" v-bind:id="index" name="choice" v-bind:value="item.id" @click="selectCampaign(item)">
								<label v-bind:for="index"></label>
							</td>
							<td>{{ item.name }}</td>
							<td v-bind:class="{ 'active': 'ACTIVE' === item.effective_status, 'inactive': 'PAUSED' === item.effective_status }">{{ item.status_kr }}</td>
							<td>{{ item.clicks }}</td>
							<td>{{ item.reach }}</td>
							<td>{{ item.impressions }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'targetcampaignchoice',
	data () {
		return {
		}
	},
	methods: {
		selectCampaign ( item ) {
			this.$parent.selectCampaign = item
		}
	},
	components: {
	}
}
</script>

<style lang="scss" scoped>
.contents_inner_widget{
	.contents_title{text-align:center; font-size:21px; color:#333; font-weight:bold;
		p{
			&:last-child{font-size:15px; color:#666; font-weight:normal; padding-top:5px;}
		}
	}
	.table_wrap{height:464px; border-top:2px solid #373737; margin-top:35px;
		table{width:100%;
			td{height:42px; border-right:1px solid #f1f1f1; border-bottom:1px solid #f1f1f1; padding-left:12px;
				&:last-child{border-right:0px;}
			}
			thead{background:#fafafa;
				td{font-weight:bold;}
			}
			tbody{
				tr{
					&:nth-child(even){background:#f9fafc;}
					.active{background:url(../../../assets/images/newtarget/active_on.png) 10px 15px no-repeat; padding-left:25px;}
					.inactive{background:url(../../../assets/images/newtarget/active_off.png) 10px 15px no-repeat; padding-left:25px;}
					td{font-size:12px;
						label:before{background:url(../../../assets/images/newtarget/campaign_off.png) 0 0 no-repeat;}
						input:checked + label:before{ background: url(../../../assets/images/newtarget/campaign_on.png)  0 0 no-repeat;}
					}
				}
			}
		}
	}
}
</style>
