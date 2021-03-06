let CONFIGS = [{
	name: "config",
	pages: {
		"page-01": {
			key: "page-01",
			"start": "a",
			cards: {
				"a": {
					name: "a",
					nextOptions: ["b"],
				},
				"b": {
					name: "b",
					nextOptions: ["c"]
				},
				"c": {
					name: "c",
					nextOptions: []
				}
			},
			next: "page-02"
		},
		"page-02": {
			key: "page-02",
			"start": "a",
			next: "finance",
			cards: {
				"a": {
					name: "a",
					nextOptions: ["b", "c"]
				},
				"b": {
					name: "b",
					nextOptions: ["c"]
				},
				"c": {
					name: "c",
					nextOptions: ["d"]
				},
				"d": {
					name: "d",
					nextOptions: []
				}
			}
		},
		"finance": {
			key: "finance",
			start: "FinanceBasicDetails",
			next: null,
			cards: {
				"FinanceBasicDetails": {
					name: "FinanceBasicDetails",
					nextOptions: ["RepaymentOptions", "ThankYou"]
				},
				"RepaymentOptions": {
					name: "RepaymentOptions",
					nextOptions: ["IncomeExpenses"]
				},
				"IncomeExpenses": {
					name: "IncomeExpenses",
					nextOptions: ["ThankYou"]
				},
				"ThankYou": {
					name: "ThankYou",
					nextOptions: []
				}
			}
		}
	}
}]
const ConfigModule = {
	namespaced: true,
	state: () => {
		return  {
			config: {},
		}
	},
	actions: {
		fetchAndSetConfig: function({commit, dispatch}, configName) {
			const fetched = CONFIGS.find(cfg => {
				return cfg.name === configName
			})
			if(fetched) {
				commit('SET_CONFIG', fetched)
				dispatch('UIStateModule/generateStateFromConfig', fetched, { root: true })
			} else {
				console.warn('error fetching config');
			}
		}
	},
	mutations: {
		SET_CONFIG: function(state, config) {
			state.config = config;
		}
	}
}
export default ConfigModule;