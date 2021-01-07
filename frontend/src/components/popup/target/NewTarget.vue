<template>
  <div class="target_contents_wrap clearfix" v-if="isShow">
    <!-- <transition name="modal">
      <ui-dialog :dialogData="dialogData" v-if="dialogShow" @ok="dialogOk()" @cancel="dialogCancel"></ui-dialog>
    </transition> -->
    <div class="target_contents_inner">
      <div class="target_thead">
        <div class="main_title">
          <div><img src="../../../assets/images/target/target_logo_03.png" alt="neo"></div>
          <div class="title_info">
            <p>신규 고객 타겟</p>
            <p>추천된 데이터를 확인하고, 새로운 타겟을 만들어보세요.</p>
          </div>
        </div>
        <div class="analysis_data_wrap">
          <div class="analysis_select_wrap">
            <div class="title">분석 데이터 기준</div>
            <div class="analysis_type">
              <span>업종</span>
              <ui-select></ui-select>
            </div>
            <div class="analysis_advertiser">
              <span>광고주</span>
              <ui-select></ui-select>
            </div>
          </div>
          <div class="analysis_date">
            <div class="title">분석 데이터 기간</div>
            <div class="analysis_select_date">
              <ul>
                <li @click="selectDateActive(1)" :class="isActiveDate === 1 ? 'date_on':''">1년</li>
                <li @click="selectDateActive(2)" :class="isActiveDate === 2 ? 'date_on':''">6개월</li>
                <li @click="selectDateActive(3)" :class="isActiveDate === 3 ? 'date_on':''">3개월</li>
                <li @click="selectDateActive(4)" :class="isActiveDate === 4 ? 'date_on':''">1개월</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="target_tbody">
        <div class="title">KPI 기준</div>
        <div class="kpi_data_wrap">
          <ul>
            <li @click="selectContentsActive(1)" :class="isActiveContents === 1 ? 'select_on':''">
              <div class="inner_top">
                <div class="inner_title">전환율</div>
                <div>
                  <span>전환율이 높은 순으로</span>
                  <span>타겟팅 속성을 추천합니다.</span>
                </div>
              </div>
              <div class="inner_bottom">
                <span>기준지표</span>
                <span>전환율,전환수,광고비</span>
              </div>
            </li>
            <li @click="selectContentsActive(2)" :class="isActiveContents === 2 ? 'select_on':''">
              <div class="inner_top">
                <div class="inner_title">클릭수</div>
                <div>
                  <span>광고 링크 클릭 효과순으로</span>
                  <span>타겟팅 속성을 추천합니다.</span>
                </div>
              </div>
              <div class="inner_bottom">
                <span>기준지표</span>
                <span>클릭수,CPC,광고비</span>
              </div>
            </li>
            <li @click="selectContentsActive(3)" :class="isActiveContents === 3 ? 'select_on':''">
              <div class="inner_top">
                <div class="inner_title">노출수</div>
                <div>
                  <span>광고 노출수 효과 순으로</span>
                  <span>타겟팅 속성을 추천합니다.</span>
                </div>
              </div>
              <div class="inner_bottom">
                <span>기준지표</span>
                <span>노출수,CPM,광고비</span>
              </div>
            </li>
            <li @click="selectContentsActive(4)" :class="isActiveContents === 4 ? 'select_on':''">
              <div class="inner_top">
                <div class="inner_title">공감수</div>
                <div>
                  <span>광고 공감수</span>
                  <span>타겟팅 속성을 추천합니다.</span>
                </div>
              </div>
              <div class="inner_bottom">
                <span>기준지표</span>
                <span>좋아요,댓글수,공유수</span>
              </div>
            </li>
            <li @click="selectContentsActive(5)" :class="isActiveContents === 5 ? 'select_on':''">
              <div class="inner_top">
                <div class="inner_title">조회수</div>
                <div>
                  <span>광고 영상 조회 효과 순으로</span>
                  <span>타겟팅 속성을 추천합니다.</span>
                </div>
              </div>
              <div class="inner_bottom">
                <span>기준지표</span>
                <span>조회수,CPV,광고비</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="makeType === 'modify'" class="modify_prologue">* 설정 수정시 기존 생성된 타겟과 병합되어 모수가 중복될 수 있습니다. 특별한 상황이 아니면 설정의 수정을 지양해주세요.</div>
    <div class="btn_wrap">
      <button type="button" @click="$emit('close')">취소</button>
      <button type="button" class="close_pop" @click="makeType === 'modify' ? $emit('close') : tabMove(0)">이전</button>
      <button type="button" @click="tabMove(isActiveNumber)" :class="isActiveDate ? 'next_btn':''">다음</button>
    </div>
  </div>
</template>

<script>
import { numberFormatter } from '@/components/utils/Formatter'
import Select from '@/components/ui/Select'
import Dialog from '@/components/ui/Dialog'
import NewTargetCrate from '@/components/popup/target/NewTargetCrate'

export default {
  name: 'NewTarget',

  components: {
    'ui-select': Select,
    'ui-dialog': Dialog,
    NewTargetCrate
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

  data () {
    return {
      isActiveNumber: 10,
      isActiveContents: 0,
      isActiveDate: 0
    }
  },
  methods: {
    tabActive (activeNumber, beforeNumber) {
      this.isActiveNumber = activeNumber
    },
    selectDateActive (activeDate) {
      this.isActiveDate = activeDate
    },
    selectContentsActive (activeContents) {
      this.isActiveContents = activeContents
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.title{width:110px; font-size: 14px; font-weight: bold; display:inline-block; vertical-align:middle; letter-spacing:0px;}
.target_thead{
  .analysis_data_wrap{
    > div{display:inline-block; vertical-align:middle; letter-spacing: 0px;}
    .select_btn{display:inline-block; vertical-align:middle; float:none;}
    .analysis_select_wrap{width:100%; letter-spacing: -4px; margin-bottom:15px;
      .analysis_type{display:inline-block; vertical-align:middle; letter-spacing:0px; margin-right:10px;
        span{margin-right:10px;}
      }
      .analysis_advertiser{display:inline-block; vertical-align:middle; letter-spacing:0px;
        span{margin-right:10px;}
      }
    }
    .analysis_date{
      ul{width:100%; display:table;
        li{width:87px; height:40px; line-height:40px; text-align:center; border:1px solid #d0d0d0; float:left; border-radius:2px; color:#d0d0d0; margin-right:10px;
          &:last-child{margin-right:0px;}
        }
      }
      .analysis_select_date{display:inline-block; vertical-align:middle; cursor:pointer;
        .date_on{color:#375b96; font-weight:bold; border:1px solid #375b96;}
      }
    }
  }
}
.target_tbody{
  .kpi_data_wrap{margin-top:15px;
    ul{width:100%; overflow:hidden;
      li{width:167px; float:left; border:1px solid #999; margin-right:4px; border-radius:2px; text-align:center; color:#999; padding:10px; font-size:12px; min-height:274px; font-size:13px; cursor:pointer;
        .inner_top{padding-top:98px; padding-bottom:30px; text-align:center;
          span{display:block; line-height:1.5;
            &:first-child{font-weight:bold;}
          }
          .inner_title{font-size:18px; font-weight:bold; padding-bottom:18px;}
        }
        .inner_bottom{padding-top:13px; border-top:1px solid #999;
          span{display:block; line-height:1.5;
            &:first-child{font-weight:bold;}
          }
        }
        &.select_on{border:1px solid #375b96;
          .inner_top{
            span{color:#000;}
            .inner_title{color:#375b96;}
          }
          .inner_bottom{
            span{color:#000;
              &:first-child{color:#375b96;}
            }
          }
        }
        &:nth-child(1){
          .inner_top{background:url(../../../assets/images/target/kpi_logo_01.png) center 17px no-repeat;}
          &.select_on{border:1px solid #375b96;
            .inner_top{background:url(../../../assets/images/target/kpi_logo_01_on.png) center 17px no-repeat;}
          }
        }
        &:nth-child(2){
          .inner_top{background:url(../../../assets/images/target/kpi_logo_02.png) center 17px no-repeat;}
          &.select_on{border:1px solid #375b96;
            .inner_top{background:url(../../../assets/images/target/kpi_logo_02_on.png) center 17px no-repeat;}
          }
        }
        &:nth-child(3){
          .inner_top{background:url(../../../assets/images/target/kpi_logo_03.png) center 17px no-repeat;}
          &.select_on{border:1px solid #375b96;
            .inner_top{background:url(../../../assets/images/target/kpi_logo_03_on.png) center 17px no-repeat;}
          }
        }
        &:nth-child(4){
          .inner_top{background:url(../../../assets/images/target/kpi_logo_04.png) center 17px no-repeat;}
          &.select_on{border:1px solid #375b96;
            .inner_top{background:url(../../../assets/images/target/kpi_logo_04_on.png) center 17px no-repeat;}
          }
        }
        &:nth-child(5){margin-right:0px;
          .inner_top{background:url(../../../assets/images/target/kpi_logo_05.png) center 17px no-repeat;}
          &.select_on{border:1px solid #375b96;
            .inner_top{background:url(../../../assets/images/target/kpi_logo_05_on.png) center 17px no-repeat;}
          }
        }
      }
    }
  }
}
</style>
