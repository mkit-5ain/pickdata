<template>
	<div class="contents_inner_widget">
		<div class="contents_section">
			<div class="contents_title">
				<p>해당 광고 계정에 선택 가능한 [트래픽] 캠페인이 없습니다.</p>
				<p>페이스북에서 마케팅 목표가 [트래픽]인 캠페인을 생성해 주세요.</p>
			</div>
		</div>
	</div>
</template>

<script>

export default {
  name: 'targetcampaignone',
  data () {
    return {
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
}
</style>
