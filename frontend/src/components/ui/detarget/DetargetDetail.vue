<template>
	<div class="target_detail layout_wrap">
		<div class="contents_title">상세 타겟팅</div>
		<div class="layout_right">
			<!-- 타겟 추가 전 -->
			<!-- <DetargetBefore/> -->
			<!-- // 타겟 추가 전 -->
			<!-- 타겟 추가 후 -->
			<DetargetInput/>
			<!-- // 타겟 추가 후 -->
		</div>
	</div>
</template>
<script>
import DetargetBefore from '@/components/ui/detarget/DetargetBefore'
import DetargetInput from '@/components/ui/detarget/DetargetInput'
export default {
	name: 'DetargetDetail',

	components: {
		DetargetBefore,
		DetargetInput
	}
}
</script>
<style lang="scss" scoped>
.target_detail{
	.contents_title{width: 70px; text-align: right; display: inline-block; vertical-align: top; letter-spacing: 0px; margin-right: 10px; font-size: 14px; font-weight: bold;}
	.layout_right{width:723px; height:150px; border:1px solid #d0d0d0; padding:15px; border-radius:2px; display: inline-block; vertical-align: middle; letter-spacing: 0px;}
}
</style>
