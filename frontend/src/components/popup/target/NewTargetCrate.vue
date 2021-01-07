<template>
  <div class="target_contents_wrap clearfix" v-if="isShow">
    <!-- <transition name="modal">
      <ui-dialog :dialogData="dialogData" v-if="dialogShow" @ok="dialogOk()" @cancel="dialogCancel"></ui-dialog>
    </transition> -->
    <div class="target_contents_inner">
      <div class="target_thead">
        <div class="main_title">
          <div><img src="../../../assets/images/detarget/detaget.png" alt="newtarget"></div>
          <div class="title_info">
            <p>신규 고객 타겟</p>
            <p>추천된 데이터를 확인하고, 새로운 타겟을 만들어보세요.</p>
          </div>
        </div>
      </div>
      <div class="target_tbody">
        <div class="top_wrap">
          <div class="top_inner_wrap">
            <div class="nav_wrap" id="nav">
              <ul>
                <li><a href='#' @click="activate(0)" v-on:click="makeActive('age')" :class="{ on : active_el == 0 }">성별</a></li>
                <li><a href='#' @click="activate(1)" v-on:click="makeActive('gender')" :class="{ on : active_el == 1 }">연령</a></li>
                <li><a href='#' @click="activate(2)" v-on:click="makeActive('targeting')" :class="{ on : active_el == 2 }">상세타겟팅</a></li>
              </ul>
            </div>
            <div class="content">
              <div v-show="isActiveTab('age')">
                <DetargetGender/>
              </div>
              <div v-show="isActiveTab('gender')">
                <DetargetAge/>
              </div>
              <div v-show="isActiveTab('targeting')">
                <DetargetDetailTarget/>
              </div>
            </div>
          </div>
          <p class="top_text">선택 또는 추가 버튼 클릭 시 아래에 자동 입력됩니다.</p>
        </div>
        <div class="bottom_wrap">
          <div class="title">생성할 타겟 정보</div>
          <div class="bottom_inner_wrap">
            <div class="target_name layout_wrap">
              <div class="contents_title">타겟 이름</div>
              <div class="layout_right">
                <input type="text">
              </div>
            </div>
            <div class="target_quantity layout_wrap">
              <div class="contents_title">타겟 모수</div>
              <div class="layout_right">
                <div>
                  <span>12,000</span>명
                </div>
                <div class="input_wrap">
                  <input type="checkbox" id="quantity">
                  <label for="quantity">사이트 방문자(30일 내)를 제외합니다.</label>
                </div>
              </div>
            </div>
            <div class="target_gender layout_wrap">
              <div class="contents_title">성별</div>
              <div class="layout_right">
                <div class="all_select">
                  <ui-select/>
                </div>
                <div class="age_select">
                  <p>연령</p>
                  <ui-select/>
                  <p>-</p>
                  <ui-select/>
                </div>
              </div>
            </div>
            <!-- 상세타겟팅 영역 -->
            <!-- <DetargetDetail/> -->
            <!-- // 상세타겟팅 영역 -->
          </div>
          <p class="bottom_text">추천 데이터가 아닌 다른 상세 타겟팅을 추가하고 싶으시면 페이스북에서 진행해 주세요.</p>
        </div>
      </div>
    </div>
    <div v-if="makeType === 'modify'" class="modify_prologue">* 설정 수정시 기존 생성된 타겟과 병합되어 모수가 중복될 수 있습니다. 특별한 상황이 아니면 설정의 수정을 지양해주세요.</div>
    <div class="btn_wrap">
      <button @click="$emit('close')">취소</button>
      <button type="button" class="close_pop" @click="makeType === 'modify' ? $emit('close') : tabMove(0)">이전</button>
      <button type="button "class="next_btn">타겟생성</button>
    </div>
  </div>
</template>

<script>
import { numberFormatter } from '@/components/utils/Formatter'
import Select from '@/components/ui/Select'
import Dialog from '@/components/ui/Dialog'
import DetargetDetail from '@/components/ui/detarget/DetargetDetail'
import DetargetGender from '@/components/ui/detarget/DetargetGender'
import DetargetAge from '@/components/ui/detarget/DetargetAge'
import DetargetDetailTarget from '@/components/ui/detarget/DetargetDetailTarget'

export default {
  name: 'NewTarget',

  components: {
    'ui-select': Select,
    'ui-dialog': Dialog,
    DetargetDetail,
    DetargetGender,
    DetargetAge,
    DetargetDetailTarget,
    tabCheck: false
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
      choice: 'age',
      isActiveDate: 0,
      isNewtarget: 0,
      DetargetGender: {
        isActive: false
      },
      DetargetAge: {
        isActive: false
      },
      DetargetDetailTarget: {
        isActive: false
      },
      active_el: 0
    }
  },
  methods: {
    activate:function(el){
        this.active_el = el
    },
    makeActive: function(val) {
      this.choice = val
      // const El = document.getElementById("nav").children
      // console.log(El)
      // El.classList.add('on')
    },
    isActiveTab: function(val) {
      return this.choice === val
    },
    tabActive (activeNumber, beforeNumber) {
      this.isActiveNumber = activeNumber
      this.isBeforeNumber = beforeNumber
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
      .analysis_select_date{display:inline-block; vertical-align:middle;}
    }
  }
}
.target_tbody{
  .top_wrap{
    .top_inner_wrap{width:100%; display:table; border:1px solid #d0d0d0;
      .nav_wrap{float:left;
        ul{
          li{
            a{width:116px; height:110px; line-height:110px; text-align:center; background:#f2f2f2; border-bottom:1px solid #e1e1e1; font-size:16px; color:#999; font-weight:bold; cursor:pointer; display:block;
              &.on{background:#fff; color:#000;}
              &:last-child{border-bottom:0px;}
            }
          }
        }
      }
    }
    .top_text{text-align:right; padding-top:10px;}
  }
  .bottom_wrap{margin-top:20px;
    .title{width:auto; font-size:18px;}
    .bottom_inner_wrap{border:1px solid #d0d0d0; margin-top:10px; padding:18px;
      .layout_wrap{letter-spacing:-4px; margin-bottom:20px; position:relative;
        .contents_title{width:70px; text-align:right; display:inline-block; vertical-align:middle; letter-spacing:0px; margin-right:10px; font-size:14px; font-weight:bold;}
        .layout_right{display:inline-block; vertical-align:middle; letter-spacing:0px;}
      }
      .target_name{
        .contents_title{height:40px; line-height:40px;}
        .layout_right{
          input{width:733px; height:40px; line-height:40px; border:1px solid #d0d0d0; border-radius:2px;}
        }
      }
      .target_quantity{
        .contents_title{vertical-align:top;}
        .layout_right{font-weight:bold;
          span{color:#375b96;}
          .input_wrap{margin-top:10px;}
        }
      }
      .target_gender{width:100%; display:table;
        .all_select{float:left; margin-right:10px; height:40px; line-height:39px;}
        .age_select{float:left; height:40px; line-height:40px;
          .select_btn{margin-right:10px;}
          p{float:left; margin-right:10px; font-weight:bold;}
        }
      }
      .target_detail{
        .contents_title{vertical-align:top;}
        .layout_right{width:733px; height:150px; border:1px solid #d0d0d0; padding:15px; border-radius:2px;}
      }
    }
    .bottom_text{text-align:right; padding-top:10px;}
  }
}
</style>
