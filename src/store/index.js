import Vue from 'vue'
import Vuex from 'vuex';
import DataModule from './DataModule'
import UIStateModule from './UIStateModule'
import ConfigModule from './ConfigModule'

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		UIStateModule,
		DataModule,
		ConfigModule,
	},
	getters: {
		displayCards: function(state){
			if(!state.UIStateModule.currentPage) return [];
			const { currentPage } = state.UIStateModule;

			const pageConfig = state.ConfigModule.config.pages[currentPage];
			const cardStates = state.UIStateModule.cards;

			const pageSequence = [];
			let cursor = cardStates[pageConfig.start];
      const cardWillShow = (cardState) => {
        return !!cardState
        && (pageConfig.start === cardState.name || !!cardState.back)
      }
			while(cardWillShow(cursor)) {
				cursor.options = pageConfig.cards[cursor.name].nextOptions
				pageSequence.push(cursor);
				cursor = cardStates[cursor.next];
			}
			return pageSequence
		}
	}
})

store.dispatch('ConfigModule/fetchAndSetConfig', 'config');

export default store