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