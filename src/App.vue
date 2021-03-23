<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h2>{{ page }}</h2>
    <button @click.prevent="openPage('page-01')">Open Page-01</button>
    <button @click.prevent="openPage('page-02')">Open Page-02</button>

    <div class="card" v-for="card in displayCards" :key="`${page}-${card.name}`">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data: function() {
    const page = 'page-01'
    this.$store.dispatch('UIStateModule/setCurrentPage', page)
    return {
      page
    }
  },
  methods: {
    openPage: function (pageName) {
      this.$store.dispatch('UIStateModule/setCurrentPage', pageName)
      this.page = pageName
    },
    completeCard: function(cardName, nextCard) {
      this.$store.dispatch('UIStateModule/completeCard', {
        cardName,
        nextCard
      })
    }
  },
  computed: {
    ...mapGetters(['displayCards'])
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.card {
  border: 1px solid black;
  border-radius: 3px;
  padding: 5px;
}
.card:not(:first-child) {
  margin-top: 10px;
}
</style>
