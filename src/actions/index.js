export const maskSupply = (clicked) => {
    return {
        type: 'MASK_SUPPLY',
        clicked: clicked,
    };
};

export const howToBuyMask = (clicked) => {
    return {
        type: 'HOW_TO_BUY_MASK',
        clicked: clicked,
    };
};

//發送 口罩資訊request
export const fetchMaskInformation = (callback) => {
    return {
        type: 'FETCH_MASK_INFORMATION',
        callback
    };
}

//接收口罩資訊
export const recieveMaskInformation = (res, updateTime) => {
    return {
        type: 'RECIEVE_MASK_INFORMATION',
        res: res,
        updateTime: updateTime,
    };
}

export const initMaskInformation = (arr) => {
    return {
        type: 'INIT_MASK_INFORMATION',
        initMaskInformationLists: arr,
    }
}

export const maskInformationIsLoading = (isLoading) => {
    return {
        type: 'MASK_INFORMATION_IS_LOADING',
        isLoading: isLoading,
    }
}

export const handleDrugstoreClicked = (drugstoreId) => {
    return {
        type: 'HANDLE_DRUGSTORE_CLICKED',
        drugstoreId: drugstoreId,
    }
}

// 使用者查詢口罩資訊
export const searchMaskInformation = (searchText) => {
    return {
        type: 'SEARCH_MASK_INFORMATION',
        searchText: searchText,
    }
}

export const clearSearchMaskInformationLists = () => {
    return {
        type: 'CLEAR_SEARCH_MASK_INFORMATION_LISTS',
    }
}

export const recieveSearchMaskInformation = (res, updateTime) => {
    return {
        type: 'RECIEVE_SEARCH_MASK_INFORMATION',
        res: res,
        updateTime: updateTime,
    }
}