<template>
	<div class="nav_contents_wrap">
      <div class="contents_title"><span>카드</span> 업종 <span>광고주명</span> 광고주의 <span>3개월</span> 동안 <span>전환율 높은 순</span> 추천 데이터입니다.</div>
      <div class="nav_inner_contents">
        <div class="inner_title">
          <div class="title all">전체</div>
          <div class="btn"></div>
        </div>
        <div class="inner_contents">
          <div class="left">
            <ul>
              <li>전환율</li>
              <li>전환수</li>
              <li>광고비</li>
              <li>비율</li>
            </ul>
          </div>
          <div class="right">
            <ul>
              <li>44.3%</li>
              <li>00,000,000</li>
              <li>00,000,000</li>
              <li>50.0%</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="nav_inner_contents">
        <div class="inner_title">
          <div class="title man">남성</div>
          <div class="btn"></div>
        </div>
        <div class="inner_contents">
          <div class="left">
            <ul>
              <li>전환율</li>
              <li>전환수</li>
              <li>광고비</li>
              <li>비율</li>
            </ul>
          </div>
          <div class="right">
            <ul>
              <li>44.3%</li>
              <li>00,000,000</li>
              <li>00,000,000</li>
              <li>50.0%</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="nav_inner_contents last">
        <div class="inner_title">
          <div class="title woman">여성</div>
          <div class="btn"></div>
        </div>
        <div class="inner_contents">
          <div class="left">
            <ul>
              <li>전환율</li>
              <li>전환수</li>
              <li>광고비</li>
              <li>비율</li>
            </ul>
          </div>
          <div class="right">
            <ul>
              <li>44.3%</li>
              <li>00,000,000</li>
              <li>00,000,000</li>
              <li>50.0%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>
<style lang="scss" scoped>
.nav_contents_wrap{
	.nav_inner_contents{width:220px; float:left; margin-right:18px;
	  .inner_title{width:100%; display:table; margin-bottom:12px;
	    .title{height:39px; line-height:39px; float:left; padding-left:50px; float:left;
	      &.all{background:url(../../../assets/images/detarget/gender_i_01.png) 0 0 no-repeat;}
	      &.man{background:url(../../../assets/images/detarget/gender_i_02.png) 0 0 no-repeat;}
	      &.woman{background:url(../../../assets/images/detarget/gender_i_03.png) 0 0 no-repeat;}
	    }
	    .btn{float:right; width:30px; height:30px; background:url(../../../assets/images/detarget/gender_plus.png) 0 0 no-repeat; cursor:pointer; margin:4.5px 0px;}
	  }
	  .inner_contents{width:100%; display:table; border-top:2px solid #333; font-weight:bold;
	    .left{float:left;
	      ul{
	        li{width:98px; height:42px; line-height:42px; background:#ebeef4; font-size:14px; color:#333; text-align:center; border-bottom:1px solid #e3e5e9;}
	      }
	    }
	    .right{float:right;
	      ul{
	        li{width:122px; height:42px; line-height:42px; text-align:right; border-bottom:1px solid #e2e5e9; padding-right:10px;}
	      }
	    }
	  }
	}
	.nav_inner_contents.last{margin-right:0px;}
}
</style>
