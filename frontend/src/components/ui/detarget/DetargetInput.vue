<template>
	<div class="target_input_result_wrap">
		<ul>
			<li v-if="detargetContents === false">
				<div>인구 통계학적 특성 > 중요 이벤트 > 다음 사용자의 친구 > <span>1개월 이내에 생일인 사람의 친한 친구</span></div>
				<div class="delete_btn" @click="detargetDelete()"><img src="../../../assets/images/common/delete_btn.png" alt=""></div>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: 'Detargetinput',

	data () {
		return {
			detargetContents: false
		}
	},
	components: {
	},
	methods: {
		detargetDelete () {
			 this.detargetContents = true
		}
	}
}
</script>
<style lang="scss" scoped>
.target_input_result_wrap{
	ul{
		li{line-height:2; font-size:14px;
			span{font-weight:bold;}
			div{display:inline-block; vertical-align:middle;}
			.delete_btn{margin-left:5px; cursor:pointer;}
		}
	}
}
</style>
