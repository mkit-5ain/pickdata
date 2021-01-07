<template>
	<div id="main_wrap" class="clearfix">
		<transition name='modal'>
			<targetcampaign v-if="makeModal" :makeType="this.makeType" :makeItem="this.makeItem" :scrollPop="popupScroll" @close="popupClose(); makeModal = false"></targetcampaign>
			<ui-dialog :dialogData="dialogData" v-if="dialogShow" @ok="dialogOk()" @cancel="dialogCancel()"></ui-dialog>
		</transition>
		<div id="container">
			<div id="container_wrap">
				<div id="new_target_pick">
					<div class="target_contents_wrap">
						<div class="target_search_wrap clearfix">
							<div class="cate_select">
								<p>카테고리</p>
								<ui-select :selectData="this.categorySelectData" :onClick="selectCategory"></ui-select>
							</div>
							<div class="admin_select">
								<p>광고계정</p>
								<ui-select :selectData="this.accountSelectData" :onClick="selectAccount"></ui-select>
							</div>
							<div class="cate_select">
								<p>분석기간</p>
								<ui-select :selectData="this.dateTypeSelectData" :onClick="selectDateType"></ui-select>
							</div>
							<div class="cate_select">
								<p>분석기준</p>
								<ui-select :selectData="this.kpiBaseSelectData" :onClick="selectKpiBase"></ui-select>
							</div>
							<button class="blue_btn" @click="clickRecommend">타겟항목 추천</button>
						</div>
						<div class="inner_contents_wrap clearfix">
							<!-- 상세 타겟팅 , 연령 , 성별 탭 -->
							<div class="target_tab_navi_wrap">
								<div class="inner_tab_navi">
									<ul>
										<li>
											<a href='#' @click="activate(0)" v-on:click="makeActive('targeting')" :class="{ on : active_el === 0 }">상세타겟팅</a>
										</li>
										<li>
											<a href='#' @click="activate(1)" v-on:click="makeActive('age')" :class="{ on : active_el === 1 }">연령</a>
										</li>
										<li>
											<a href='#' @click="activate(2)" v-on:click="makeActive('genter')" :class="{ on : active_el === 2 }">성별</a>
										</li>
									</ul>
								</div>
								<button class="excel_btn" @click="clickExcelDownload">
									<span>
										<img src="../../assets/images/icon/excel_icon.png" alt="">
									</span>
									<span>엑셀로 내보내기</span>
								</button>
							</div>
							<div class="section_widget">
								<div class="target_tab_wrap">
									<div class="content">
										<div v-show="isActiveTab('targeting')">
											<!-- 탭 상세 타겟팅 pages > newtarget > newtargettargeing -->
											<NewtargetTargeting/>
										</div>
										<div v-show="isActiveTab('age')">
											<!-- 탭 연령 pages > newtarget > newtargetage -->
											<NewtargetAge/>
										</div>
										<div v-show="isActiveTab('genter')">
											<!-- 탭 성별 pages > newtarget > newtargetgender -->
											<NewtargetGender/>
										</div>
									</div>
								</div>
							</div>
							<!-- // 상세 타겟팅 , 연령 , 성별 탭 -->
							<NewtargetChoice ref='newtargetChoice'/>
							<div class="set_create_btn">
								<button class="blue_btn" @click="popupOpenBtn('makeModal')">선택항목으로 <span>픽데이터 광고 세트 생성</span></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// UI
import Loading from '@/components/ui/Loading'
import Select from '@/components/ui/Select'
import NewtargetTargeting from '@/components/ui/newtarget/NewtargetTargeting'
import NewtargetAge from '@/components/ui/newtarget/NewtargetAge'
import NewtargetGender from '@/components/ui/newtarget/NewtargetGender'
import NewtargetChoice from '@/components/ui/newtarget/NewtargetChoice'
import targetcreate from '@/components/popup/newtarget/targetcreate'
import targetcampaign from '@/components/popup/newtarget/targetcampaign'



export default {
	name: 'NewTargetPick',
	created () {
		this.loadFbAdAccounts()
	},
	components: {
		'ui-loading': Loading,
		'ui-select': Select,
		NewtargetTargeting,
		NewtargetAge,
		NewtargetGender,
		NewtargetChoice,
		targetcreate,
		targetcampaign
	},
	data () {
		return {
			categorySelectData: {
				emptyText: '전체',
				textList: [
					'전체',
					'대출',
					'카드',
					'보험',
					'뷰티',
					'NGO',
					'여행',
					'쇼핑몰',
					'기타'
				],
				keyList: [
					'all',
					'loan',
					'card',
					'insurance',
					'beauty',
					'ngo',
					'travel',
					'shoppingmall',
					'etc'
				]
			},

			dateTypeSelectData: {
				emptyText: '3개월',
				textList: [
					'1개월',
					'3개월',
					'6개월',
					'1년'
				],
				keyList: [
					'month_1',
					'month_3',
					'month_6',
					'year_1'
				]
			},

			kpiBaseSelectData: {
				emptyText: '전환율',
				textList: [
					'전환율',
					'클릭수',
					'공감수',
					'조회수'
				],
				keyList: [
					'conversion',
					'click',
					'reaction',
					'view'
				]
			},

			accountSelectData: {
				emptyText: '전체',
				textList: [
				],
				keyList: [
				]
			},

			choice: 'targeting',
			NewtargetTargeting: {
				isActive: false
			},
			NewtargetAge: {
				isActive: false
			},
			NewtargetGender: {
				isActive: false
			},
			active_el: 0,
			makeModal: false,
			dialogShow: false,
			dialogData: {
				emptyText:'sample',
				type:'confirm',
				mode:'sample'
			},
			makeItem: {},
			makeType:'add',
			genderSelectData: '',
			maxAgeSelectData: 13,
			minAgeSelectData: 65,
			selectTargeting: []
		}
	},
	methods: {
		activate:function(el){
			this.active_el = el
		},
		makeActive: function(val) {
			this.choice = val
		},
		isActiveTab: function(val) {
			return this.choice === val
		},
		dialogOpen (emptyText, type, mode) {
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

			const body = document.getElementsByTagName('body')
			body[0].classList.remove('default')
		},
		// 다이얼로그 취소 클릭시
		dialogCancel () {
			this.nextStage = false;
			this.dialogShow = false;

			const body = document.getElementsByTagName('body')
			body[0].classList.remove('default')
		},
		popupOpenBtn (popupName, type, item) {
			//팝업 오픈
			//popupName = 팝업컴포넌트명, type = add,modify,delete
			const scrollPop = this
			const body = document.getElementsByTagName('body')
			body[0].classList.add('default')

			this.genderSelectData = this.$refs.newtargetChoice.genderSelectData.emptyText
			this.maxAgeSelectData = this.$refs.newtargetChoice.maxAgeSelectData.emptyText
			this.minAgeSelectData = this.$refs.newtargetChoice.minAgeSelectData.emptyText
			this.selectTargeting = this.$refs.newtargetChoice.selectTargeting

			if(item === undefined) {
				// 타겟 만들기
				this[popupName] = true
				this.makeType = type
			}
			setTimeout(function() {
				scrollPop.popupScroll()
			}, 100)
		},
		popupScroll () {
			let addEl = document.getElementsByClassName('popup-widget')
			let widgetEl = document.getElementsByClassName('popup-contents')
			if (widgetEl.length !== 0) {
				let widgetHeight = widgetEl[0].offsetHeight + 60
				let windowHeight = window.innerHeight
				let scrollClass = 'add_scroll'
				let display_table = 'display_table'
				if(widgetHeight > windowHeight) {
					addEl[0].classList.add(scrollClass)
					addEl[0].classList.remove(display_table)
				}else{
					addEl[0].classList.remove(scrollClass)
					addEl[0].classList.add(display_table)
				}
			}
		},
		popupClose () {
			const body = document.getElementsByTagName('body')
			body[0].classList.remove('default')
		},

		selectCategory (item) {
			this.categorySelectData.emptyText = item
			this.loadFbAdAccounts()
		},

		selectAccount (item) {
			this.accountSelectData.emptyText = item
		},

		selectDateType (item) {
			this.dateTypeSelectData.emptyText = item
		},

		selectKpiBase (item) {
			this.kpiBaseSelectData.emptyText = item
		},

		loadFbAdAccounts () {
			let url = '/fb_ad_accounts/accounts_by_category'
			this.$http.get(url, {
				params: {
					account_category: this.findSelectKey('categorySelectData')
				}
			})
			.then(res => {
				const response = res.data
				const data = response.data
				const success = response.success

				if (success === "YES") {
					if (data.length > 0) {
						var accountNameList = []
						var acountIdList = []
						data.forEach(item => {
							accountNameList.push(item.name)
							acountIdList.push(item.ad_account_id)
						})
						this.accountSelectData.textList = accountNameList
						this.accountSelectData.keyList = acountIdList
						this.accountSelectData.textList.splice(0, 0, "전체")
						this.accountSelectData.keyList.splice(0, 0, 0)
						this.accountSelectData.emptyText = accountNameList[0]
					} else {
						this.accountSelectData.emptyText = '광고주 없음'
						this.accountSelectData.textList = []
						this.accountSelectData.keyList = []
					}
				}
			})
			.catch(err => {
				console.error('/fb_ad_accounts/accounts_by_category', err)
			})
		},
		findSelectKey (selectName) {
			/*
			Select Key 가져오기
			*/
			const emptyText = this[selectName].emptyText
			const textList = this[selectName].textList
			const keyList = this[selectName].keyList
			return keyList[textList.indexOf(emptyText)]
		},
		clickRecommend () {
			console.log("clickRecommend")
			const category = this.findSelectKey('categorySelectData')
			const account_id = this.findSelectKey('accountSelectData')
			const date_type = this.findSelectKey('dateTypeSelectData')
			const kpi_base = this.findSelectKey('kpiBaseSelectData')

			let url = '/ad_set_summary_insight?date_type=' + date_type + '&kpi_base=' + kpi_base
			if(category != 'all'){
				url += '&category=' + category
			}
			if(account_id != 0){
				url += '&account_id=' + account_id
			}

			this.$http.get(url, {
				params: {}
			})
			.then(res => {
				const response = res.data
				const success = response.success
				if (success === "YES") {
					const age_insights = response.age_insights
					const gender_insights = response.gender_insights
					const targeting_insights = response.targeting_insights

					this.$eventBus.$emit('init_set_age_gender')
					this.$eventBus.$emit('init_set_targeting')
					this.$eventBus.$emit('set_age_insights', age_insights, kpi_base)
					this.$eventBus.$emit('set_gender_insights', gender_insights, kpi_base)
					this.$eventBus.$emit('set_targeting_insights', targeting_insights, kpi_base)
				} else {
					throw('success', success)
				}
			})
			.catch(err => {
				console.error('/ad_set_summary_insight', err)
			})
		},
		clickExcelDownload () {
			// console.log("clickExcelDownload")

			const category = this.findSelectKey('categorySelectData')
			const account_id = this.findSelectKey('accountSelectData')
			const date_type = this.findSelectKey('dateTypeSelectData')
			const kpi_base = this.findSelectKey('kpiBaseSelectData')

			let url = '/ad_set_summary_insight/excel?date_type=' + date_type + '&kpi_base=' + kpi_base
			if(category != 'all'){
				url += '&category=' + category
			}
			if(account_id != 0){
				url += '&account_id=' + account_id
			}

			// console.log(url)
			window.open(url, '_blank')
		}
	}
}
</script>

<style lang="scss" scoped>
#new_target_pick{
	.target_contents_wrap{
		/* 상단 검색바 */
		.target_search_wrap{
			.cate_select{width:18.5%;}
			.admin_select{width:28%;}
			.blue_btn{width:160px; height:40px; line-height:40px; color:#fff; background:#375b96; margin-top:24px; float:right; font-size:14px; border-radius:2px;}
		}
		/* 타겟 컨텐츠 게시판 네비 */
		.target_tab_navi_wrap{position:relative;
			.inner_tab_navi{width:100%; display:table;
				ul{
					li{
						a{width:121px; height:51px; line-height:51px; text-align:center; background:#e8e8e8; color:#999; float:left; border-right:1px solid #f3f3f3; font-size:14px;
							&.on{background:#fff; color:#000; font-weight:bold;}
						}
					}
				}
			}
			.excel_btn{position:absolute; top:0px; right:0px; z-index:10;}
		}
		.set_create_btn{background: #375b96; margin-top: 18px; float: right; border-radius:2px;
			button{color:#fff; font-size:14px; border-radius:2px; padding:17px; display:block;
				span{font-weight:bold;}
			}
		}
	}
}
</style>
