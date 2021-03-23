<template>
<div id="card">

  <div class="card">
    <p>{{ page }} {{ card.name }}: Complete? {{ card.complete }}</p>
    <button @click.prevent="completeCard(card.name)">Complete Card</button>
  </div>

</div>
</template>
<script>
export default {
	name: 'CardComponent',
	props: {
		
	},
	computed: {
		page: {
			return this.$store.state.CardModule.currentPage
		}
	}
}
</script>