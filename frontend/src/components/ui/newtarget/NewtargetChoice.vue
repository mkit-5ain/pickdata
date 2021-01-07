<template>
	<div class="inner_contents_wrap">
		<div class="title">선택 항목</div>
		<div class="section_widget">
			<div class="layout_wrap">
				<!-- 성별 -->
				<div>
					<div class="contents_title">성별</div>
					<div class="layout_right">
						<div class="age_select">
							<ui-select :selectData="this.genderSelectData" :onClick="selectGender"/>
							<p>연령</p>
							<ui-select :selectData="this.minAgeSelectData" :onClick="selectAgeMin"/>
							<p>-</p>
							<ui-select :selectData="this.maxAgeSelectData" :onClick="selectAgeMax"/>
						</div>
					</div>
				</div>
				<!-- 성별 -->
				<!-- 상세타겟팅  -->
				<div class="target_detail">
					<div class="contents_title">상세타겟팅</div>
					<div class="layout_right pop-scroll">
						<!-- 상세타겟팅 추가 전  -->
						<NewtargetChoiceAddBefore v-if="newTargetBeforeShow"/>
						<!-- 상세타겟팅 추가 후  -->
						<NewtargetChoiceAddAfter v-if="newTargetAfterShow"/>
					</div>
				</div>
				<!-- 상세타겟팅  -->
			</div>
			<div></div>
		</div>
	</div>
</template>

<script>
import Select from '@/components/ui/Select'
import NewtargetChoiceAddBefore from '@/components/ui/newtarget/NewtargetChoiceAddBefore'
import NewtargetChoiceAddAfter from '@/components/ui/newtarget/NewtargetChoiceAddAfter'
export default {
	name: 'TargetChoice',
	data () {
		return {
			newTargetBeforeShow: true,
			newTargetAfterShow: false,
			selectTargeting: [],
			genderSelectData: {
				emptyText: '전체',
				textList: [
					'전체',
					'남자',
					'여자'
				],
				keyList: [
					'0',
					'1',
					'2'
				]
			},

			minAgeSelectData: {
				emptyText: '13',
				textList: [
					13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
					31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
					49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65
				],
				keyList: [
					13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
					31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
					49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65
				]
			},

			maxAgeSelectData: {
				emptyText: '65',
				textList: [
					13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
					31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
					49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65
				],
				keyList: [
					13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
					31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
					49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65
				]
			}
		}
	},
	components : {
		'ui-select': Select,
		NewtargetChoiceAddBefore,
		NewtargetChoiceAddAfter
	},
	created () {
		this.$eventBus.$on('init_set_age_gender', this.initAgeGender)
		this.$eventBus.$on('set_new_target_gender', this.setGender)
		this.$eventBus.$on('set_new_target_age', this.setAge)
		this.$eventBus.$on('set_new_target_targeting', this.setTargeting)
	},
	beforeDestroy () {
		this.$eventBus.$off('init_set_age_gender', this.initTargeting)
		this.$eventBus.$off('set_new_target_gender', this.setGender)
		this.$eventBus.$off('set_new_target_age', this.setAge)
		this.$eventBus.$off('set_new_target_targeting', this.setTargeting)
	},
	methods : {
		initAgeGender () {
			console.log('initTargeting')
			this.genderSelectData.emptyText = '전체'
			this.minAgeSelectData.emptyText = '13'
			this.maxAgeSelectData.emptyText = '65'
		},
		setGender (item) {
			if (item == 'male') {
				this.genderSelectData.emptyText = '남자'
			} else if (item == 'female') {
				this.genderSelectData.emptyText = '여자'
			}
		},
		setAge (item) {
			if (item == '13-17') {
				this.minAgeSelectData.emptyText = '13'
				this.maxAgeSelectData.emptyText = '17'
			} else if (item == '18-24') {
				this.minAgeSelectData.emptyText = '18'
				this.maxAgeSelectData.emptyText = '24'
			} else if (item == '25-34') {
				this.minAgeSelectData.emptyText = '25'
				this.maxAgeSelectData.emptyText = '34'
			} else if (item == '35-44') {
				this.minAgeSelectData.emptyText = '35'
				this.maxAgeSelectData.emptyText = '44'
			} else if (item == '45-54') {
				this.minAgeSelectData.emptyText = '45'
				this.maxAgeSelectData.emptyText = '54'
			} else if (item == '55-64') {
				this.minAgeSelectData.emptyText = '55'
				this.maxAgeSelectData.emptyText = '64'
			} else if (item == '65+') {
				this.minAgeSelectData.emptyText = '65'
				this.maxAgeSelectData.emptyText = '65'
			}
		},
		setTargeting (targeting) {
			// console.log('setTargeting')
			// console.log(targeting)
			// console.log(targeting.length)
			// console.log(this.$parent.selectTargeting)
			this.selectTargeting = targeting

			if (this.selectTargeting.length > 0) {
				this.newTargetBeforeShow = false
				this.newTargetAfterShow = true
			} else {
				this.newTargetBeforeShow = true
				this.newTargetAfterShow = false
			}

			this.$eventBus.$emit('changeChoiceAddTargeting')
		},
		selectGender (item) {
			console.log(item)
			this.genderSelectData.emptyText = item
		},

		selectAgeMin (item) {
			console.log(item)
			this.minAgeSelectData.emptyText = item
		},

		selectAgeMax (item) {
			console.log(item)
			this.maxAgeSelectData.emptyText = item
		}
	}
}
</script>

<style lang="scss" scoped>
.inner_contents_wrap{margin-top:45px;
	.title{font-size:18px; font-weight:bold; padding-bottom:13px;}
	.layout_wrap{width:100%; display:table; letter-spacing:-4px;
		> div{margin-bottom:15px;
			&:last-child{margin-bottom:0px;}
		}
		.contents_title{width:8%; text-align:right; font-size:14px; font-weight:bold; padding-right:10px;display:inline-block; vertical-align:middle; letter-spacing:0px;}
		.layout_right{display:inline-block; vertical-align:middle; letter-spacing:0px;
			.all_select{float:left; margin-right:10px; height:40px; line-height:39px;}
			.age_select{float:left; height:40px; line-height:39px;
				.select_btn{width:105px; margin-right:10px;}
				p{float:left; margin-right:10px; font-weight:bold;}
			}
		}
		.target_detail{
			.layout_right{position:relative; width: 92%; height: 150px; border: 1px solid #d0d0d0; padding: 15px; border-radius: 2px; display: inline-block; vertical-align: middle; letter-spacing: 0px; overflow-y:scroll;
				.add_before_text{position:absolute; top:50%; left:50%; transform:translate(-50%,-50%)}
			}
		}
	}
}
</style>
