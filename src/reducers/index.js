const model = {
    maskSupplyClicked: true,
    howToBuyMaskClicked: false,
    maskInformationLists: [],
    updateTime: '',
    initMaskInformationLists: [],
    searchMaskInformationLists: [],
    isLoading: false,
    drugstoreId: '',
};

const Reducer = (state = model, action) => {
    switch (action.type) {
        case 'RECIEVE_MASK_INFORMATION':
            return {
                ...state,
                maskInformationLists: action.res,
                updateTime: action.updateTime,
                isLoading: false,
            }

        case 'MASK_INFORMATION_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading,
            }

        case 'RECIEVE_SEARCH_MASK_INFORMATION':
            return {
                ...state,
                searchMaskInformationLists: action.res,
                updateTime: action.updateTime,
            }

        default:
            return state;
    }
};

export default Reducer;