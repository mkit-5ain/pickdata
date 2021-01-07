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
              <div class="pop_title"><span v-if="makeType !== 'modify'">Re-Target</span><span v-if="makeType === 'modify'">수정하기</span> <span v-bind:class="makeType === 'modify' ? 'hide' : ''"><span id="page-number"></span></span></div>
              <p class="popup-btn"><button type="button" id="close-btn" class="close_pop close-btn" @click="$emit('close')"><img src="../../assets/images/target/white_close_i.png" alt=""></button></p>
            </div>

            <!-- 카테고리 선택 탭 -->
            <div class="pop_tab_wrap_widget">
              <div class="pop_tab_wrap clearfix" v-if="tabAction.tabActive1.show">
                <p class="target_prologue">만들고 싶은 타겟의 종류를  선택해주세요.</p>
                <div class="cate_contents_widget">
                  <ul class="target_pick_01">
                    <!-- <li @click="tabActive(9)" :class="isActiveNumber === 9 ? 'Click_on':''"><span>신규고객 타겟</span></li> -->
                    <li v-if="this.targetActive.visitSite.isActive" @click="tabActive(1)" :class="isActiveNumber === 1 ? 'Click_on':''"><span>사이트방문</span></li>
                    <li v-else class='disabled'><span>사이트방문</span></li>

                    <li v-if="this.targetActive.visitSpecificPages.isActive" @click="tabActive(2)" :class="isActiveNumber === 2 ? 'Click_on':''"><span>특정페이지 방문</span></li>
                    <li v-else class='disabled'><span>특정페이지 방문</span></li>

                    <li v-if="this.targetActive.neoTarget.isActive" @click="tabActive(3)":class="isActiveNumber === 3 ? 'Click_on':''"><span>NEO 타겟</span></li>
                    <li v-else class='disabled'><span>NEO 타겟</span></li>

                    <li v-if="this.targetActive.utmTarget.isActive" @click="tabActive(4)" :class="isActiveNumber === 4 ? 'Click_on':''"><span>구글애널리틱스</span></li>
                    <li v-else class='disabled'><span>구글애널리틱스</span></li>
                  </ul>
                  <ul class="target_pick_02">
                    <li v-if="this.targetActive.purchase.isActive" @click="tabActive(5)" :class="isActiveNumber === 5 ? 'Click_on':''"><span>구매</span></li>
                    <li v-else class='disabled'><span>구매</span></li>

                    <li v-if="this.targetActive.addToCart.isActive" @click="tabActive(6)" :class="isActiveNumber === 6 ? 'Click_on':''"><span>장바구니</span></li>
                    <li v-else class='disabled'><span>장바구니</span></li>

                    <li v-if="this.targetActive.registration.isActive" @click="tabActive(7)" :class="isActiveNumber === 7 ? 'Click_on':''"><span>회원가입</span></li>
                    <li v-else class='disabled'><span>회원가입</span></li>

                    <li v-if="this.targetActive.conversion.isActive" @click="tabActive(8)" :class="isActiveNumber === 8 ? 'Click_on':''"><span>단계별 전환</span></li>
                    <li v-else class='disabled'><span>단계별 전환</span></li>
                  </ul>
                </div>
                <div class="tab_prologue">
                  <ul>
                    <li :class="isActiveNumber === 9 ? 'Click_on':''">
                      <div class="tab_title">신규고객 타겟</div>
                      <p>pickdata 내 누적된 데이터를 분석하여</p>
                      <p>고객사 KPI에 따른 최적의 신규고객 타겟을 추천 합니다.</p>
                    </li>
                    <li :class="isActiveNumber === 1 ? 'Click_on':''">
                      <div class="tab_title">사이트 방문</div>
                      <p>고객사의 사이트 단위 기준으로 조합 리타겟팅을 생성 합니다.</p>
                      <p>(Facebook Pixel 기반)</p>
                    </li>
                    <li :class="isActiveNumber === 2 ? 'Click_on':''">
                      <div class="tab_title">특정페이지 방문</div>
                      <p>고객사의 URL 단위 기준으로 조합 리타겟팅을 생성 합니다.</p>
                      <p>(Facebook Pixel 기반)</p>
                    </li>
                    <li :class="isActiveNumber === 3 ? 'Click_on':''">
                      <div class="tab_title">NEO타겟</div>
                      <p>엠포스 NEO 솔루션을 활용중인 고객사를 기준으로 광고매체, 그룹, 키워드로 유입된 고객을</p>
                      <p>리타겟팅 모수로 생성 합니다. (Facebook Pixel 기반)</p>
                    </li>
                    <li :class="isActiveNumber === 4 ? 'Click_on':''">
                      <div class="tab_title">구글애널리틱스</div>
                      <p>구글 애널리틱스를 활용중인 고객사를 기준으로 UTM 파라미터 별 유입된 고객을</p>
                      <p>리타겟팅 모수로 생성 합니다. (Facebook Pixel 기반)</p>
                    </li>
                    <li :class="isActiveNumber === 5 ? 'Click_on':''">
                      <div class="tab_title">구매</div>
                      <p>이용 고객의 구매단위 기준으로 조합 리타겟팅 생성합니다.</p>
                      <p>(Facebook Pixel 기반)</p>
                    </li>
                    <li :class="isActiveNumber === 6 ? 'Click_on':''">
                      <div class="tab_title">장바구니</div>
                      <p>이용 고객의 장바구니 단위 기준으로 조합 리타겟팅을 생성합니다.</p>
                      <p>(Facebook Pixel 기반)</p>
                    </li>
                    <li :class="isActiveNumber === 7 ? 'Click_on':''">
                      <div class="tab_title">회원가입</div>
                      <p>이용 고객의 회원가입 단위 기준으로 조합 리타겟팅을 생성합니다.</p>
                      <p>(Facebook Pixel 기반)</p>
                    </li>
                    <li :class="isActiveNumber === 8 ? 'Click_on':''">
                      <div class="tab_title">단계별 전환</div>
                      <p>단계별로 설정한 Facebook Pixel 이벤트를 기반으로</p>
                      <p>고객을 리타겟팅 생성 합니다.</p>
                    </li>
                  </ul>
                </div>
                <div class="btn_wrap">
                  <button type="button" class="close_pop" @click="$emit('close')">취소</button>
                  <button type="button" class="next_btn" @click="tabMove(isActiveNumber, isBeforeNumber)">다음</button>
                </div>
              </div>
            </div>

            <!-- 사이트 방문 탭 -->
            <visit-site
            :isShow="tabAction.tabActive2.show"
            :adAccountPixels="this.adAccountPixels"
            :tabMove="tabMove"
            :makeType="this.makeType"
            :makeItem="this.makeItem"
            @close="$emit('close')"
            @deleteCustomTarget="deleteCustomTarget"></visit-site>

            <!-- 특정 페이지 방문 탭 -->
            <visit-specific-pages
            :isShow="tabAction.tabActive3.show"
            :adAccountPixels="this.adAccountPixels"
            :tabMove="tabMove"
            :makeType="this.makeType"
            :makeItem="this.makeItem"
            @close="$emit('close')"
            @deleteCustomTarget="deleteCustomTarget"></visit-specific-pages>

            <!-- 네오 탭 -->
            <neo-target
            :isShow="tabAction.tabActive4.show"
            :adAccountPixels="this.adAccountPixels"
            :tabMove="tabMove"
            :makeType="this.makeType"
            :makeItem="this.makeItem"
            :scrollPop="scrollPop"
            @close="$emit('close')"
            @deleteCustomTarget="deleteCustomTarget"></neo-target>

            <!-- 구글애널리틱스 탭 -->
            <utm-target
            :isShow="tabAction.tabActive5.show"
            :adAccountPixels="this.adAccountPixels"
            :tabMove="tabMove"
            :makeType="this.makeType"
            :makeItem="this.makeItem"
            @close="$emit('close')"
            @deleteCustomTarget="deleteCustomTarget"></utm-target>

            <!-- 구매 탭 -->
            <purchase
            :isShow="tabAction.tabActive6.show"
            :adAccountPixels="this.adAccountPixels"
            :tabMove="tabMove"
            :makeType="this.makeType"
            :makeItem="this.makeItem"
            @close="$emit('close')"
            @deleteCustomTarget="deleteCustomTarget"></purchase>

            <!-- 장바구니 탭 -->
            <add-to-cart
            :isShow="tabAction.tabActive7.show"
            :adAccountPixels="this.adAccountPixels"
            :tabMove="tabMove"
            :makeType="this.makeType"
            :makeItem="this.makeItem"
            @close="$emit('close')"
            @deleteCustomTarget="deleteCustomTarget"></add-to-cart>

            <!-- 회원가입 탭 -->
            <registration
            :isShow="tabAction.tabActive8.show"
            :adAccountPixels="this.adAccountPixels"
            :tabMove="tabMove"
            :makeType="this.makeType"
            :makeItem="this.makeItem"
            @close="$emit('close')"
            @deleteCustomTarget="deleteCustomTarget"></registration>

            <!-- 단계별 전환 -->
            <conversion
            :isShow="tabAction.tabActive9.show"
            :adAccountPixels="this.adAccountPixels"
            :tabMove="tabMove"
            :makeType="this.makeType"
            :makeItem="this.makeItem"
            @close="$emit('close')"
            @deleteCustomTarget="deleteCustomTarget"></conversion>

            <NewTarget
            :isShow="tabAction.tabActive10.show"
            :tabMove="tabMove"
            @close="$emit('close')"
            @deleteCustomTarget="deleteCustomTarget"></NewTarget>

            <NewTargetCrate
            :isShow="tabAction.tabActive11.show"
            :tabMove="tabMove"
            @close="$emit('close')"
            @deleteCustomTarget="deleteCustomTarget"></NewTargetCrate>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { numberFormatter } from '@/components/utils/Formatter'

// Popup
import VisitSite from '@/components/popup/target/VisitSite'
import VisitSpecificPages from '@/components/popup/target/VisitSpecificPages'
import NeoTarget from '@/components/popup/target/NeoTarget'
import UtmTarget from '@/components/popup/target/UtmTarget'
import Purchase from '@/components/popup/target/Purchase'
import AddToCart from '@/components/popup/target/AddToCart'
import Registration from '@/components/popup/target/Registration'
import Conversion from '@/components/popup/target/Conversion'
import NewTarget from '@/components/popup/target/NewTarget'
import NewTargetCrate from '@/components/popup/target/NewTargetCrate'


// UI
import Select from '@/components/ui/Select'
import Dialog from '@/components/ui/Dialog'

export default {
  name: 'CreateTarget',

  components:{
    VisitSite,
    VisitSpecificPages,
    NeoTarget,
    UtmTarget,
    Purchase,
    AddToCart,
    Registration,
    Conversion,
    NewTarget,
    NewTargetCrate,
    'ui-select': Select,
    'ui-dialog': Dialog
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
    this.$http.get('/pickdata_account_target/target_check', {
      params: {
        fb_ad_account_id: localStorage.getItem('fb_ad_account_id')
      }
    })
    .then(res => {
      const data = res.data.data

      this.targetActive.addToCart.isActive = data.add_to_cart
      this.targetActive.conversion.isActive = data.conversion
      this.targetActive.neoTarget.isActive = data.neo_target
      this.targetActive.purchase.isActive = data.purchase
      this.targetActive.registration.isActive = data.registration
      this.targetActive.utmTarget.isActive = data.utm_target
      this.targetActive.visitSite.isActive = data.visit_site
      this.targetActive.visitSpecificPages.isActive = data.visit_specific_pages
    })
  },

  mounted () {
    const me = this


    // 수정인 경우 해당 탭으로 이동 해야한다.
    if (this.makeType === 'modify') {
      const modifyItem = this.makeItem
      this.moveModifyTab(modifyItem)
    }
    let emptyText = ''
    let textList = []
    let keyList = []

    this.$http.get('/fb_ad_accounts/ad_account_pixels', {
      params: {
        'fb_ad_account_id': localStorage.getItem('fb_ad_account_id')
      }
    })
    .then(res => {
      const response = res.data
      const data = response.data
      const success = response.success
      if (success === 'YES') {
        data.forEach(function(item, index) {
          textList.push(item.name)
          keyList.push(item.id)
          if (index === 0) {
            emptyText = item.name
          }
        })

        this.adAccountPixels.emptyText = emptyText
        this.adAccountPixels.textList = textList
        this.adAccountPixels.keyList = keyList

        if (this.makeType === 'modify') {
          console.log('ME: ', me.makeItem.description.params.target_type)
          const targetType = me.makeItem.description.params.target_type

          if(targetType === 'visit_site') {
            this.$eventBus.$emit('modifyVisitSiteTarget', this.adAccountPixels)
          } else if (targetType === 'visit_specific_pages') {
            this.$eventBus.$emit('modifyVisitSepcificPagesTarget', this.adAccountPixels)
          } else if (targetType === 'neo_target') {
            this.$eventBus.$emit('modifyNeoTarget', this.adAccountPixels)
          } else if (targetType === 'utm_target') {
            this.$eventBus.$emit('modifyUtmTarget', this.adAccountPixels)
          } else if (targetType === 'purchase') {
            this.$eventBus.$emit('modifyPurchaseTarget', this.adAccountPixels)
          } else if (targetType === 'add_to_cart') {
            this.$eventBus.$emit('modifyAddToCartTarget', this.adAccountPixels)
          } else if (targetType === 'registration') {
            this.$eventBus.$emit('modifyRegistrationTarget', this.adAccountPixels)
          } else if (targetType === 'conversion') {
            this.$eventBus.$emit('modifyConversionTarget', this.adAccountPixels)
          }
        }
      } else {
        console.log('/fb_ad_accounts/ad_account_pixels fail')
      }
    })
  },

  data () {
  return {
    targetActive: {
      addToCart: {
        isActive: false
      },
      conversion: {
        isActive: false
      },
      neoTarget: {
        isActive: false
      },
      purchase: {
        isActive: false
      },
      registration: {
        isActive: false
      },
      utmTarget: {
        isActive: false
      },
      visitSite: {
        isActive: false
      },
      visitSpecificPages: {
        isActive: false
      },
    },

    tabAction: {
      tabActive1:{
        show:true
      },
      tabActive2:{
        show:false
      },
      tabActive3:{
        show:false
      },
      tabActive4:{
        show:false
      },
      tabActive5:{
        show:false
      },
      tabActive6:{
        show:false
      },
      tabActive7:{
        show:false
      },
      tabActive8:{
        show:false
      },
      tabActive9:{
        show:false
      },
      tabActive10:{
        show:false
      },
      tabActive11:{
        show:false
      }
    },
    isActiveNumber: 0,
    isBeforeNumber: 0,
    nextStage:false,
    dialogShow: false,
      dialogData: {
        emptyText:'sample',
        type:'confirm',
        mode:'sample'
      },

    //싱글 셀렉트
    adAccountPixels: {
      emptyText: '불러오는 중 입니다.',
      textList: [
        '불러오는 중 입니다.'
      ]
    }
  }
  },

  methods: {
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
    },
    // 다이얼로그 취소 클릭시
    dialogCancel () {
      this.nextStage = false;
      this.dialogShow = false;
    },

  moveModifyTab (item) {
    let categoryName = item.pixel_mapping_category.category_label_en
    categoryName = categoryName.replace(/\s/gi, "")

    if (categoryName === 'visitpages') {
    // 사이트 방문
    this.tabMove(1)
    } else if (categoryName === 'visitspecificpages') {
    // 특정페이지 방문
    this.tabMove(2)
    } else if (categoryName === 'neotarget') {
    // NEO 타겟
    this.tabMove(3)
    } else if (categoryName === 'utmtarget') {
    // 구글애널리틱스
    this.tabMove(4)
    } else if (categoryName === 'purchase') {
    // 구매
    this.tabMove(5)
    } else if (categoryName === 'addtocart') {
    // 장바구니
    this.tabMove(6)
    } else if (categoryName === 'registration') {
    // 회원가입
    this.tabMove(7)
    } else {
    // 단계별 전환

    this.tabMove(8)
    }
  },

  tabActive (activeNumber, beforeNumber) {
    this.isActiveNumber = activeNumber
    this.isBeforeNumber = beforeNumber
  },

  //타겟만들기 카테고리 탭
  tabMove (activeNumber, beforeNumber) {
    const me = this
    let tabArray = ['tabActive1','tabActive2','tabActive3','tabActive4','tabActive5','tabActive6','tabActive7','tabActive8','tabActive9','tabActive10','tabActive11']
    let pageNum = (activeNumber == 0) ? '종류 선택':'생성'

    document.getElementById('page-number').innerText = pageNum

    for(let i = 0; i < tabArray.length; i++) {
      if(i == activeNumber) {
        this.tabAction[tabArray[i]].show = true
      }else{
        this.tabAction[tabArray[i]].show = false
      }
    }
    setTimeout(function() {
      me.scrollPop()
    }, 100)
  },

  // Custom Target 삭제
  deleteCustomTarget (id) {
    console.log('custom target ID: ' + id)

    this.$http.delete('/pickdata_account_target/custom_target', {
    data: {
      pickdata_account_target_id: id
    }
    })
    .then((response) => {
    const success = response.data.success
    if (success == "YES") {
      // success
      this.$eventBus.$emit('getAccountTarget')
    } else {
      //컨펌,얼럿 텍스트 - 메세지창 타입(confirm,alert) - 독립적모드이름(alert 메세지시 사용 X)
      this.dialogOpen('사이트방문 타겟 삭제 실패', 'alert')
      throw('success: ' + success)
    }
    this.$emit('close')
    })
    .catch(err => {
    this.$emit('close')
    console.log('/pickdata_account_target/custom_target delete: ', err)
    })
  }
  }
}
</script>

<style lang="scss" scoped>
.tab_prologue{width:623px; margin:0 auto; margin-top:12px; background:#f5f5f5;
  ul{
    li{display:none; padding:34px 0px 34px 95px;
      &:nth-child(1){background:url(../../assets/images/target/target_tab_01.png) 30px center no-repeat;}
      &:nth-child(2){background:url(../../assets/images/target/target_tab_02.png) 27px center no-repeat;}
      &:nth-child(3){background:url(../../assets/images/target/target_tab_03.png) 25px center no-repeat;}
      &:nth-child(4){background:url(../../assets/images/target/target_tab_04.png) 30px center no-repeat;}
      &:nth-child(5){background:url(../../assets/images/target/target_tab_05.png) 25px center no-repeat;}
      &:nth-child(6){background:url(../../assets/images/target/target_tab_06.png) 30px center no-repeat;}
      &:nth-child(7){background:url(../../assets/images/target/target_tab_07.png) 25px center no-repeat;}
      &:nth-child(8){background:url(../../assets/images/target/target_tab_08.png) 30px center no-repeat;}
      &:nth-child(9){background:url(../../assets/images/target/target_tab_09.png) 30px center no-repeat;}
    }
    p{line-height:1.5; color:#666; font-size:12px;}
    .Click_on{display:block;}
    .tab_title{font-weight:bold; padding-bottom:8px; font-size:14px;}
  }
}
.pop_tab_wrap{
  .cate_contents_widget{width:623px; margin:0 auto;}
  .target_prologue{font-size:21px; color:#333; margin-bottom:33px;}
}
.btn_wrap{width:623px; margin:0 auto; float:none; margin-top:25px; text-align:center;
  button{float:none;}
}
</style>
