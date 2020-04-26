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
        case 'MASK_SUPPLY':
            return {
                ...state,
                maskSupplyClicked: action.clicked,
                howToBuyMaskClicked: false,
            }

        case 'HOW_TO_BUY_MASK': 
            return {
                ...state,
                maskSupplyClicked: false,
                howToBuyMaskClicked: action.clicked,
            };  

        case 'RECIEVE_MASK_INFORMATION':
            return {
                ...state,
                maskInformationLists: action.res,
                updateTime: action.updateTime,
            }

        case 'INIT_MASK_INFORMATION':
            return {
                ...state,
                initMaskInformationLists: action.initMaskInformationLists,
            }
        
        case 'MASK_INFORMATION_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading,
            }

        case 'HANDLE_DRUGSTORE_CLICKED':
            return {
                ...state,
                drugstoreId: action.drugstoreId,
            }
        
        case 'CLEAR_SEARCH_MASK_INFORMATION_LISTS':
            return {
                ...state,
                searchMaskInformationLists: [],
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