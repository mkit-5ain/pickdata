<template>
	<div class="modal-mask">
		<transition name="modal">
			<ui-dialog :dialogData="dialogData" v-if="dialogShow" @ok="dialogOk()" @cancel="dialogCancel()"></ui-dialog>
		</transition>
		<div class="modal-wrapper">
			<div class="modal-container">
				<div class="layer-pop-widget">
					<div class="popup-widget" id="target_pop_01">
						<div class="popup-contents clearfix">
							<div class="pop_title_wrap">
								<div class="pop_title">{{this.headerText}}</div>
								<p class="popup-btn"><button type="button" id="close-btn" class="close-btn close_pop" @click="$emit('close')"><img src="../../../assets/images/target/white_close_i.png" alt=""></button></p>
							</div>
							<div class="contents_widget" v-if="tabAction.tabActive1.show">
								<!-- 캠페인이 선택되지 않았을 경우 --><targetcampaignone v-if="targetcampaignoneShow"/><!-- //캠페인이 선택되지 않았을 경우 -->
								<!-- 캠페인이 선택되었을 경우 --><targetcampaignchoice v-if="targetcampaignchoiceShow"/><!-- //캠페인이 선택되었을 경우 -->
								<div class="btn_wrap">
									<button type="button" @click="$emit('close')">취소</button>
									<button type="button" v-bind:class="{ 'next_btn disable_btn': true === isLoading, 'next_btn': false === isLoading }" @click="tabMove(isActiveNumber, isBeforeNumber)">다음</button>
								</div>
							</div>
							<target-create
							:isShow="tabAction.tabActive2.show"
							:tabMove="tabMove"
							:makeType="this.makeType"
							:makeItem="this.makeItem"
							@close="$emit('close')">
							</target-create>
							<!-- <target-createcomplete
							:isShow="tabAction.tabActive2.show"
							:tabMove="tabMove"
							@close="$emit('close')">
							</target-createcomplete> -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import targetcampaignone from '@/components/popup/newtarget/targetcampaignone'
import targetcampaignchoice from '@/components/popup/newtarget/targetcampaignchoice'
import targetcreate from '@/components/popup/newtarget/targetcreate'
import targetcreatecomplete from '@/components/popup/newtarget/targetcreatecomplete'
import Dialog from '@/components/ui/Dialog'
import Loading from '@/components/ui/Loading'

export default {
	name: 'targetcampaign',
	data () {
		return {
			headerText: '캠페인 선택',
			isLoading: false,
			loadingTitle: 'Creative Library를 가져옵니다.',
			loadingDescription: '조금만 기다려 주시면 완료됩니다.',
			targetcampaignoneShow: false,
			targetcampaignchoiceShow: true,
			isActiveNumber: 0,
			isBeforeNumber: 0,
			campaignList: [],
			genderSelectData: '',
			maxAgeSelectData: 13,
			minAgeSelectData: 65,
			selectTargeting: [],
			selectCampaign: {},
			targetActive: {
				targetcreate: {
					isActive: false
				}
			},
			tabAction: {
				tabActive1:{
					show:true
				},
				tabActive2:{
					show:false
				}
			},
			dialogShow: false,
			nextStage:false,
			dialogData: {
				emptyText:'sample',
				type:'confirm',
				mode:'sample'
			}
		}
	},
	props: {
		makeType: {
			type: String
		},
		makeItem: {
			type: Object
		},
		scrollPop: {
			type: Function,
			default () {
				return false
			}
		}
	},
	created () {
		this.isLoading = true
		this.loadCampaigns()
		this.genderSelectData = this.$parent.genderSelectData
		this.maxAgeSelectData = this.$parent.maxAgeSelectData
		this.minAgeSelectData = this.$parent.minAgeSelectData
		this.selectTargeting = this.$parent.selectTargeting
	},
	updated () {
		this.selectCampaign = {}
	},
	components: {
		targetcampaignone,
		targetcampaignchoice,
		'target-create': targetcreate,
		'target-createcomplete': targetcreatecomplete
	},
	methods: {
		loadCampaigns () {
			let url = '/fb_ad_accounts/campaigns'
			this.$http.get(url, {
				params: {
					act_account_id: "act_"+localStorage.getItem('account_id')
				}
			})
			.then(res => {
				const response = res.data
				const data = response.data
				const success = response.success
				const count = response.count

				if(count > 0){
						this.targetcampaignoneShow = false
						this.targetcampaignchoiceShow  = true
				}else{
					this.targetcampaignoneShow = true
					this.targetcampaignchoiceShow  = false
				}
				this.campaignList = data
				this.isLoading = false
			})
			.catch(err => {
				console.error('/fb_ad_accounts/campaigns', err)
			})
		},
		dialogOpen (emptyText, type, mode) {
			console.log('targetcampaign dialogOpen')
			this.dialogData['emptyText'] = emptyText
			this.dialogData['type'] = type
			this.dialogData['mode'] = mode
			this.dialogShow = true;
		},
		// 다이얼로그 확인 클릭시
		dialogOk () {
			const mode = this.dialogData.mode
			// 모드별 동작
			this.nextStage = true
			this.dialogShow = false;
		},
		// 다이얼로그 취소 클릭시
		dialogCancel () {
			this.nextStage = false;
			this.dialogShow = false;
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
		}
	}
}
</script>

<style lang="scss" scoped>
$default-color:#fff;
$basic-color:#d0d0d0;
/*@mixin display_i{
	display:inline-block; vertical-align:middle;
}*/
.popup-widget{
	.contents_widget{background:$default-color; padding:38px 58px; width:100%; display:table;}
}
</style>
