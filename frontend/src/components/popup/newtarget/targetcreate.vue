<template>
	<div class="contents_widget" v-if="isShow">
		<transition name="modal">
			<ui-dialog :dialogData="dialogData" v-if="dialogShow" @ok="dialogOk()" @cancel="dialogCancel"></ui-dialog>
		</transition>
		<!-- 픽데이터 광고세트 생성 -->
		<div class="contents_section">
			<h3>픽데이터 광고 세트 생성</h3>
			<div class="contents_info">
				<p>입력하신 <span>[광고 세트 이름]</span>과 선택 <span>[성별], [연령], [상세타겟]</span> 항목으로 새로운 광고 세트가 생성됩니다.</p>
				<p>새로운 광고세트는 <span>[중단된 상태]</span>로 생성되며,</p>
				<p>선택한 구성요소 이외의 설정은 페이스북에서 직접 변경을 진행해 주세요.</p>
			</div>
		</div>
		<!-- // 픽데이터 광고세트 생성 -->
		<!-- 광고세트 이름 및 선택항목  -->
		<div class="contents_section">
			<h3>광고 세트 이름 및 선택항목 <span>- 광고 세트 이름 변경이 가능합니다.</span></h3>
			<div class="ad_contents_wrap">
				<div class="ad_contents_inner_wrap">
					<!-- 캠페인  -->
					<div class="layout_wrap">
						<div class="contents_title">캠페인</div>
						<div class="layout_right" ref='target_adset_name'>
							<b>{{ this.$parent.selectCampaign.name }}</b>
						</div>
					</div>
					<!-- // 캠페인  -->
					<!-- 광고 세트 이름 -->
					<div class="layout_wrap">
						<div class="contents_title">광고 세트 이름</div>
						<div class="layout_right">
							<!--<p class="set_name">[픽데이터]추천 타겟 광고 세트</p>-->
							<input class="set_name" type="text" v-model="adsetName">
							<p class="set_prologue">*&nbsp;광고 세트 이름 앞에 [픽데이터] 텍스트는 유지해 주세요.</p>
						</div>
					</div>
					<!-- // 광고 세트 이름 -->
					<!-- 타겟 -->
					<div class="layout_wrap">
						<div class="contents_title">타겟</div>
						<div class="layout_right">
							<p>선택하신 추천 타겟 항목들 입니다.</p>
							<div class="gender_info">
								<div>
									<p>성별</p>
									<p><span>{{ this.$parent.genderSelectData}}</span></p>
								</div>
								<div>
									<p>연령</p>
									<p><span>{{ this.$parent.minAgeSelectData}}</span></p>
									<p><span>{{ this.$parent.maxAgeSelectData}}</span></p>
								</div>
							</div>
							<div class="pick_section pop-scroll">
								<p v-for="(item, index) in this.$parent.selectTargeting"> {{item.object_path}} </p>
							</div>
						</div>
					</div>
					<!-- // 타겟 -->
				</div>
			</div>
		</div>
		<!-- // 광고세트 이름 및 선택항목  -->
		<!-- 기본 설정 항목 -->
		<div class="contents_section">
			<h3>기본 설정 항목 <span>- 세트 생성 후 페이스북으로 이동하여 변경해 주세요</span></h3>
			<div class="basic_contents_wrap">
				<div>
					<span class="basic_title">트래픽</span>
					<span class="basic_input_i">웹사이트</span>
				</div>
				<div>
					<span class="basic_title">노출위치</span>
					<span class="basic_input_i">Facebook > 피드</span>
				</div>
				<div>
					<span class="basic_title">예산</span>
					<span class="basic_box">일일예산</span>
					<span class="basic_box money">1,000</span>
				</div>
				<div>
					<span class="basic_title">일정</span>
					<span class="basic_input_i">오늘부터 계속 게제</span>
				</div>
			</div>
		</div>
		<!-- // 기본 설정 항목 -->
		<div class="btn_wrap">
			<button @click="$emit('close')">취소</button>
			<button class="close_pop" @click="tabMove(1, 0)">이전</button>
			<button class="next_btn"  @click="clickCreateAdSet">픽데이터광고세트 생성</button>
		</div>
	</div>
</div>
</template>

<script>
import Select from '@/components/ui/Select'
import Dialog from '@/components/ui/Dialog'

export default {
	name: 'targetcreate',
	data () {
		return {
			dialogShow: false,
			dialogData: {
				emptyText: 'sample',
				type: 'confirm',
				mode: 'sample'
			},
			adsetName:'[픽데이터] 추천 타겟 광고 세트'
		}
	},
	components: {
		'ui-select': Select,
		'ui-dialog': Dialog
	},
	updated () {
		console.log('updated')
		this.$parent.headerText = '광고 세트 생성'
	},
	methods: {
		dialogOpen (emptyText, type, mode) {
			this.dialogData['emptyText'] = emptyText
			this.dialogData['type'] = type
			this.dialogData['mode'] = mode
			this.dialogShow = true;
		},
		clickCreateAdSet(){
			let paramGender = 0
			if(this.$parent.genderSelectData === "전체"){
				paramGender = 0
			}else if(this.$parent.genderSelectData === "남자"){
				paramGender = 1
			}else if(this.$parent.genderSelectData === "여자"){
				paramGender = 2
			}

			// fb_ad_account_id = request.data.get('fb_ad_account_id', '')
			// act_account_id = request.data.get('act_account_id', '')
			// campaign_id = request.data.get('campaign_id', '')
			// name = request.data.get('name', '')
			// age_min = request.data.get('age_min', 18)
			// age_max = request.data.get('age_max', 65)
			// gender = request.data.get('gender', 0)

			let params = {
				act_account_id: "act_"+localStorage.getItem('account_id'),
				fb_ad_account_id: localStorage.getItem('fb_ad_account_id'),
				campaign_id: this.$parent.selectCampaign.id,
				name: this.adsetName,
				age_min: this.$parent.minAgeSelectData,
				age_max: this.$parent.maxAgeSelectData,
				gender: paramGender,
				targetings: this.$parent.selectTargeting
			}

			this.$http.post('/ad_sets/create_target', params)
			.then((response) => {
				var success = response.data.success;
				if (success == "YES") {
					// success
				} else {
					alert('광고세트 생성 실패')
					// throw('success: ' + success)
				}
				// this.$emit('close')
			})
			.catch(err => {
				// this.$emit('close')
				console.log('/ad_sets: ', err)
			})
		},
		clickCancel() {
			this.makeType === 'modify' ? $emit('close') : this.tabMove(0)
		}
	},
	watch: {
		adsetName (name) {
			this.adsetName = name
		}
	},
	props: {
		isShow: {
			type: Boolean,
			default () {
				return false
			}
		},

		tabActive (activeNumber, beforeNumber) {
			this.isActiveNumber = activeNumber
			this.isBeforeNumber = beforeNumber
		},
		tabMove (activeNumber, beforeNumber) {
			if ( activeNumber === 0 && this.selectCampaign.id === undefined ) {
				alert('캠페인을 선택해 주세요.')
			}else{
				const me = this
				let tabArray = ['tabActive1','tabActive2']

				for(let i = 0; i < tabArray.length; i++) {
					if(i == activeNumber) {
						this.tabAction[tabArray[i]].show = false
					}else{
						this.tabAction[tabArray[i]].show = true
					}
				}
				setTimeout(function() {
					me.scrollPop()
				}, 100)
			}
		},

		makeType: {
			type: String
		},

		makeItem: {
			type: Object
		}
	}
}
</script>

<style lang="scss" scoped>
$default-color:#fff;
$basic-color:#d0d0d0;
// @mixin display_i{
// 	display:inline-block; vertical-align:middle;
// }
.popup-widget{
	.contents_widget{background:$default-color; padding:22px 33px; width:100%; display:table;
		.contents_section{margin-bottom:24px;
			h3{padding-bottom:14px;
				span{font-weight:normal;}
			}
			.contents_info{border:1px solid $basic-color; padding:18px;
				p{line-height:25px;
					span{font-weight:bold;}
				}
			}
			/* 광고 세트 이름 및 선택항목*/
			.ad_contents_wrap{
				.ad_contents_inner_wrap{background:#f5f5f5; padding:18px;
					.layout_wrap{letter-spacing:-4px; margin-bottom:20px; position:relative;
						.contents_title{width:100px; display:inline-block; vertical-align:top; letter-spacing:0px; margin-right:10px; font-size:14px; font-weight:bold;}
						.layout_right{display:inline-block; vertical-align:top; letter-spacing:0px; font-size:14px;
							.set_name{width: 683px; height: 40px; line-height: 40px; border: 1px solid $basic-color; background: $default-color; font-weight:normal;background:$default-color; border:1px solid $basic-color; text-indent:10px;}
							.set_prologue{padding-top:6px; font-size:12px;}
							/* 선택된 성별,연령 */
							.gender_info{margin:12px 0px; letter-spacing:-4px;
								div{display:inline-block; vertical-align:middle;
									p{display:inline-block; vertical-align:middle; height:40px; line-height:39px; margin-right:10px; letter-spacing:0px;
										span{width:105px; background:$default-color; border:1px solid $basic-color; display:block; text-indent:10px;}
									}
								}
							}
							/* 선택된 타겟 정보*/
							.pick_section{width:683px; height:188px; overflow-y:scroll; background:$default-color; border:1px solid $basic-color; padding:15px;
								p{padding-bottom:10px;
									span{font-weight:bold; text-decoration:underline;}
								}
							}
						}
					}
				}
			}
			/* // 광고 세트 이름 및 선택항목*/
			/* 기초 설정 항목 */
			.basic_contents_wrap{width: 100%; display: table; background: #f8f8f8; padding: 18px; opacity:0.5;
				> div{width:50%; font-size:14px; display:inline-block; vertical-align:middle;
					&:nth-child(1){margin-bottom:24px;}
					&:nth-child(2){margin-bottom:24px;}
					&:nth-child(3){letter-spacing:-4px;}
					.basic_title{width:72px; font-weight:bold; display:inline-block; letter-spacing:0px;}
				}
				/* checkbox 아이콘*/
				.basic_input_i{background:url("../../../assets/images/newtarget/disable_i.png") 0 0 no-repeat; padding-left:20px;}
				.basic_box{width:105px; height:40px; line-height:39px; text-indent:10px; border:1px solid $basic-color; display:inline-block; vertical-align:middle; letter-spacing:0px; margin-right:5px;
					&.money{background:url("../../../assets/images/newtarget/money_i.png") 5px 13px no-repeat; padding-left:10px;}
				}
			}
			/* // 기초 설정 항목 */
		}
	}
}

/* 팝업 수정 */
.layer-pop-widget{
	.btn_wrap{margin-top:0px;}
}
</style>
