let DB = {
	configName: '',
	pages: {}
}

const generateStateFromConfig = (config) => {
	const uiState = {
		configName: config.name,
		pages: {}
	}
	for (let [pageName, page] of Object.entries(config.pages)) {
		const pageDetails = {
			key: pageName,
			cards: {}
		}
		for(let cardName of Object.keys(page.cards)) {
			pageDetails.cards[cardName] = {
				name: cardName,
				complete: false,
				back: null,
				next: null,
			}
		}

		uiState.pages[pageName] = pageDetails;
	}
	return uiState;
}

const UIStateModule = {
	namespaced: true,
	state: () => {
		return {
			cards: {},
			currentPage: ''
		}
	},
	actions: {
		setCurrentPage({ state, commit }, pageName) {
			if(state.currentPage === pageName) return;
			const fetchedCards = DB.pages[pageName]?.cards || {};
			if(fetchedCards) {
				commit('SET_CURRENT_PAGE', pageName)
				commit('LOAD_CARDS', fetchedCards);
			}
		},
		completeCard({ state, commit }, payload) {
			const { cardName, nextCard } = payload;
			DB.pages[state.currentPage].cards[cardName].complete = true;
			DB.pages[state.currentPage].cards[cardName].next = nextCard;
			DB.pages[state.currentPage].cards[nextCard].back = cardName;
			commit('COMPLETE_CARD', payload)
		},
		generateStateFromConfig(_, config) {
			DB = generateStateFromConfig(config);
		}
	},
	mutations: {
		LOAD_CARDS (state, cards) {
			state.cards = cards;
		},
		SET_CURRENT_PAGE (state, pageName) {
			state.currentPage = pageName
		},
		COMPLETE_CARD(state, payload) {
			const { cardName, nextCard } = payload
			const card = state.cards[cardName];
			const next = state.cards[nextCard];
			state.cards[cardName] = {
				...card,
				complete: true,
				next: nextCard
			}
			state.cards[nextCard] = {
				...next,
				back: cardName
			}
		},
	},
}


export default UIStateModule