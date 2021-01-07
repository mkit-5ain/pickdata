<template>
	<div class="contents_widget" v-if="isShow">
		<transition name="modal">
			<ui-dialog :dialogData="dialogData" v-if="dialogShow" @ok="dialogOk()" @cancel="dialogCancel"></ui-dialog>
		</transition>
		<div class="text_wrap">
			<div class="text_box">
				<span>선택한 캠페인명</span>캠페인에<span>생성한 광고세트명</span> 광고세트가 생성되었습니다.
			</div>
			<p class="text_prologue">지금 페이스북으로 이동하여, 생성된 광고세트를 확인하고 수정해 보세요.</p>
		</div>
		<!-- // 기본 설정 항목 -->
		<div class="btn_wrap">
			<button @click="$emit('close')">닫기</button>
			<button class="close_pop">페이스북으로 이동</button>
		</div>
	</div>
</div>
</template>

<script>
import Select from '@/components/ui/Select'
import Dialog from '@/components/ui/Dialog'

export default {
	name: 'targetcreate',
	data () {
		return {
			dialogShow: false,
			dialogData: {
				emptyText: 'sample',
				type: 'confirm',
				mode: 'sample'
			}
		}
	},
	components: {
		'ui-select': Select,
		'ui-dialog': Dialog
	},
	methods: {
		clickCancel() {
			this.makeType === 'modify' ? $emit('close') : this.tabMove(0)
		}
	},
	props: {
		isShow: {
			type: Boolean,
			default () {
				return false
			}
		},

		tabMove: {
			type: Function
		}
	}
}
</script>

<style lang="scss" scoped>
.text_wrap{
	.text_box{background:#f5f5f5; padding:27px 20px;
		span{color:#375b96; fon-size:18px; font-weight:bold; padding:0 5px;}
	}
	.text_prologue{font-size:16px; color:#333; text-align:center; padding-top:20px;}
}
.close_pop{background:#375b96; border:0px!important; color:#fff;}
</style>
