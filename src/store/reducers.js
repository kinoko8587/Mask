const model = {
    maskInformationLists: [],
    updateTime: '',
};

const Reducer = (state = model, action) => {
    switch (action.type) {
        case 'RECIEVE_MASK_INFORMATION':
            return {
                ...state,
                maskInformationLists: action.res,
                updateTime: action.updateTime,
            }
            
        default:
            return state;
    }
};

export default Reducer;