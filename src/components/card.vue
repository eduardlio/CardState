<template>
<div id="card">
  <p>{{ page }} {{ card.name }}: Complete? {{ card.complete }}</p>
  <p v-if="card.complete">The next option selected was: {{card.next}}</p>
  <div id="option-wrap" v-if="!card.complete">
    <div class="button-option" v-for="option in card.options" :key="option">
      <button @click.prevent="completeCard(card.name, option)">
        {{ option }}
      </button>
    </div>
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