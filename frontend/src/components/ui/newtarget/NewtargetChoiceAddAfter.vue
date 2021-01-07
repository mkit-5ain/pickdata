<template>
	<div class="add_after">
		<ul>
			<li v-for="(item, index) in this.$parent.selectTargeting">
				<div>{{ item.object_path }}</div>
				<div class="delete_btn" @click="targetDelete(item)"><img src="../../../assets/images/common/delete_btn.png" alt=""></div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'NewtargetChoiceAddAfter',
	data () {
		return {
			targetContents: false,
			targetingArr: []
		}
	},
	methods: {
		targetDelete (item) {
			console.log(item)
			for(var i = 0; i<this.$parent.selectTargeting.length; i++){
				if ( this.$parent.selectTargeting[i] === item){
					this.$parent.selectTargeting.splice(i, 1)
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.add_after{
	ul{
		li{line-height:2; font-size:14px;
			span{font-weight:bold;}
			div{display:inline-block; vertical-align:middle;}
			.delete_btn{margin-left:5px; cursor:pointer;}
		}
	}
}
</style>
