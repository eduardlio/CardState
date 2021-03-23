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
	}
})

store.dispatch('ConfigModule/fetchAndSetConfig', 'config');

export default store