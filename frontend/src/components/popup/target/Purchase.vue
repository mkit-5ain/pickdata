<template>
  <div class="target_contents_wrap clearfix" v-if="isShow">
    <transition name="modal">
      <ui-dialog :dialogData="dialogData" v-if="dialogShow" @ok='dialogOk()' @cancel="dialogCancel()"></ui-dialog>
    </transition>
    <div class="target_contents_inner">
      <div class="target_thead">
        <div class="main_title">
          <div><img src="../../../assets/images/target/target_logo_05.png" alt="buy"></div>
          <div class="title_info">
            <p>구매</p>
            <p>타겟의 속성을 정의하세요</p>
          </div>
        </div>
        <div class="use_wrap">
          <div class="use_select">
            <div class="contents_title">사용 픽셀</div>
            <ui-select :selectData="adAccountPixels" data-key="adAccountPixels" :onClick="selectOnClick"></ui-select>
          </div>
          <div class="use_date">
            <div>수집 기간 : 최근</div>
            <div><input type="text" v-model="collectionPeriod"><span>일</span></div>
          </div>
        </div>
        <div class="target_name">
          <div class="contents_title">타겟 이름</div>
          <div><input type="text" v-model="targetName"></div>
        </div>
        <div class="target_data">
          <div class="contents_title">타겟 모수</div>
          <div>
            <span>{{ this.audienceSize }}</span>
            <span v-show="isNumber">명</span>
          </div>
        </div>
      </div>
      <div class="target_tbody">
        <div class="target_inner_tbody clearfix">
          <div class="target_generate">
            <div class="account_info">
              <div class="account_title">"구매한 사람" 중</div>
              <div>
                <ui-select :selectData="this.selectCustomer" data-key="selectCustomer" :onClick="selectOnClick"></ui-select>
              </div>
              <div class="account_date" v-if="subInputPurchaseCount">
                <input type="text" v-model="purchaseCount"><span>회</span>
              </div>
              <div class="account_date" v-if="subInputPurchaseAmount">
                <input type="text" v-model="purchaseAmount"><span>원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="makeType === 'modify'" class="modify_prologue">* 설정 수정시 기존 생성된 타겟과 병합되어 모수가 중복될 수 있습니다. 특별한 상황이 아니면 설정의 수정을 지양해주세요.</div>
    <div class="btn_wrap">
      <button type="button" class="close_pop" @click="$emit('close')">취소</button>
      <button type="button" class="close_pop" v-if="makeType == add" @click="makeType === 'modify' ? $emit('close') : tabMove(0)">이전</button>
      <button type="button" class="next_btn" @click="createPurchaseTarget()" v-if="makeType === 'add'">타겟 만들기</button>
      <button type="button" class="delete_btn" @click="deletePurchaseTarget()" v-if="makeType === 'modify'">삭제</button>
      <button type="button" class="next_btn" @click="updatePurchaseTarget()" v-if="makeType === 'modify'">타겟 수정하기</button>
    </div>
  </div>
</template>

<script>
import { numberFormatter } from '@/components/utils/Formatter'
import Select from '@/components/ui/Select'
import Dialog from '@/components/ui/Dialog'

export default {
  name: 'Purchase',

  components: {
    'ui-select': Select,
    'ui-dialog': Dialog
  },

  props: {
    isShow: {
      type: Boolean,
      default () {
        return false
      }
    },
    adAccountPixels: {
      type: Object,
      default () {
        return {
          emptyText: '불러오는 중 입니다.',
          textList: [ '불러오는 중 입니다.' ]
        }
      }
    },
    tabMove: {
      type: Function
    },
    makeType: {
      type: String
    },
    makeItem: {
      type: Object
    }
  },

  created () {
    this.$eventBus.$on('modifyPurchaseTarget', this.modifyPurchaseTarget)
  },

  beforeDestroy () {
    this.$eventBus.$off('modifyPurchaseTarget', this.modifyPurchaseTarget)
  },

  data () {
    return {
      collectionPeriod: 30,
      targetName: '',
      audienceSize: '-',
      isNumber: false,

      purchaseCount: '0',
      purchaseAmount: '0',

      subInputPurchaseCount: false,
      subInputPurchaseAmount: false,

      dialogShow: false,
      dialogData:{
        emptyText: 'sample',
        type: 'confirm',
        mode: 'sample'
      },
      nextStage:false,

      selectCustomer: this.$store.state.purchaseDetails
    }
  },

  watch: {
    collectionPeriod (day) {
      if (day > 180) {
        this.dialogOpen('수집 기간은 최대 180일까지만 가능합니다.', 'alert')
        this.collectionPeriod = 180
      } else if (this.collectionPeriod === '0') {
        alert('수집 기간은 최소 1일입니다.')
        this.collectionPeriod = 1
      }
    },

    targetName (name) {
      if (name.length > 48) {
        this.dialogOpen('타겟 이름은 최대 48자까지만 가능합니다.', 'alert')
        this.targetName = name.substr(0,48)
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

    dialogOk () {
      const mode = this.dialogData.mode

      if(mode === 'createPurchaseTarget') {
        // Create Target -----------------------------------------------------------------
        let params = {
          fb_ad_account_id: localStorage.getItem('fb_ad_account_id'),
          target_type: 'purchase',
          pixel_id: this.findSelectKey('adAccountPixels'),
          name: this.targetName,
          retention_days: this.collectionPeriod,

          detail: this.findSelectKey('selectCustomer'),
          purchase_count: this.purchaseCount,
          purchase_amount: this.purchaseAmount
        }

        this.$http.post('/pickdata_account_target/custom_target', params)
        .then((response) => {
          var success = response.data.success
          if (success == "YES") {
            // success
            this.$eventBus.$emit('getAccountTarget')
          } else {
            //컨펌,얼럿 텍스트 - 메세지창 타입(confirm,alert) - 독립적모드이름(alert 메세지시 사용 X)
            this.dialogOpen('구매 타겟 생성 실패', 'alert')
            throw('success: ' + success)
          }
          this.$emit('close')
        })
        .catch(err => {
          this.$emit('close')
          console.log('/pickdata_account_target/custom_target: ', err)
        })

      } else if (mode === 'deletePurchaseTarget') {
        // Delete Target -----------------------------------------------------------------
        this.$emit('deleteCustomTarget', this.makeItem.id)

      } else if (mode === 'updatePurchaseTarget') {
        // Update Target -----------------------------------------------------------------
        let params = {
          pickdata_account_target_id: this.makeItem.id,
          fb_ad_account_id: localStorage.getItem('fb_ad_account_id'),
          target_type: 'purchase',
          pixel_id: this.findSelectKey('adAccountPixels'),
          name: this.targetName,
          retention_days: this.collectionPeriod,
          exclusion_retention_days: this.unvisitedPeriod,

          detail: this.findSelectKey('selectCustomer'),
          purchase_count: this.purchaseCount,
          purchase_amount: this.purchaseAmount
        }

        this.$http.put('/pickdata_account_target/custom_target', params)
        .then((response) => {
          var success = response.data.success
          if (success == "YES") {
            // success
            this.$eventBus.$emit('getAccountTarget')
          } else {
            this.dialogOpen('구매 타겟 수정 실패', 'alert')
            throw('success: ' + success)
          }
          this.$emit('close')
        })
        .catch(err => {
          this.$emit('close')
          console.log('/pickdata_account_target/custom_target delete: ', err)
        })
      }

      // 모드별 동작
      this.nextStage = true
      this.dialogShow = false;
    },
    dialogCancel () {
      this.nextStage = false;
      this.dialogShow = false;
    },

    selectOnClick (item) {
      const key = event.target.closest('.select_btn').getAttribute('data-key')
      const textCheck = item.replace(/\s/gi, "")

      this.subInputPurchaseCount = false
      this.subInputPurchaseAmount = false

      // 서브 입력창 체크
      if (textCheck === '특정구매횟수이상구매고객') {
        this.subInputPurchaseCount = true
      } else if (textCheck === '특정구매금액이상구매고객') {
        this.subInputPurchaseAmount = true
      }
      this[key].emptyText = item
    },

    findSelectText (selectName, key) {
      // Select Text 가져오기
      const textList = this[selectName].textList
      const keyList = this[selectName].keyList
      return textList[keyList.indexOf(key)]
    },

    findSelectKey (selectName) {
      // Select Key 가져오기
      console.log('selectName', selectName, this[selectName])
      const emptyText = this[selectName].emptyText
      const textList = this[selectName].textList
      const keyList = this[selectName].keyList
      return keyList[textList.indexOf(emptyText)]
    },

    // Create Target Dialog
    createPurchaseTarget () {
      if (this.collectionPeriod.length === 0) {
        this.dialogOpen('수집 기간을 입력해주세요.', 'alert')
      } else if (this.targetName.length === 0) {
        this.dialogOpen('타겟 이름을 입력해주세요.', 'alert')
      } else {
        this.dialogOpen('입력한 내용으로 타겟을 생성하겠습니까?', 'confirm', 'createPurchaseTarget')
      }
    },

    // Delete Target Dialog
    deletePurchaseTarget () {
      this.dialogOpen('삭제하시겠습니까?', 'confirm', 'deletePurchaseTarget')
    },

    // Update Target Dialog
    updatePurchaseTarget () {
      if (this.collectionPeriod.length === 0) {
        this.dialogOpen('수집 기간을 입력해주세요.', 'alert')
      } else if (this.targetName.length === 0) {
        this.dialogOpen('타겟 이름을 입력해주세요.', 'alert')
      } else {
        this.dialogOpen('수정하시겠습니까?', 'confirm', 'updatePurchaseTarget')
      }
    },

    // 수정 클릭시 타겟 생성 팝업 데이터 초기화 (/fb_ad_accounts/ad_account_pixels call after)
    modifyPurchaseTarget () {
      const description = this.makeItem.description
      const params = description.params
      const detail = params.detail

      // 사용 픽셀
      this.adAccountPixels.emptyText = this.findSelectText('adAccountPixels', params.pixel_id)

      // 수집 기간
      this.collectionPeriod = numberFormatter(description.retention_days)

      // 타겟 이름
      this.targetName = this.makeItem.name

      // 타겟 모수
      const displayCount = this.makeItem.display_count

      if (displayCount === '규모가 적음') {
        this.audienceSize = displayCount
        this.isNumber = false
      } else if (displayCount === '생성중') {
        this.audienceSize = displayCount
        this.isNumber = false
      } else {
        this.audienceSize = numberFormatter(this.makeItem.display_count)
        this.isNumber = true
      }

      // 구매한 사람중 @
      if (detail === 'total') {
        // 전체 고객
        this.selectCustomer.emptyText = '전체 고객'
      } else if (detail === 'purchase_count') {
        // 특정 구매횟수 이상 구매 고객
        this.selectCustomer.emptyText = '특정 구매횟수 이상 구매 고객'
        this.purchaseCount = params.purchase_count
        this.subInputPurchaseCount = true
      } else if (detail === 'purchase_amount') {
        // 특정 구매금액 이상 구매 고객
        this.selectCustomer.emptyText = '특정 구매금액 이상 구매 고객'
        this.purchaseAmount = params.purchase_amount
        this.subInputPurchaseAmount = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
