import { empty } from 'rxjs';
import { ajax } from 'rxjs/ajax';
// 引入combineEpics方法
import { combineEpics } from 'redux-observable';
import { mergeMap, catchError } from 'rxjs/operators';

const maskGetList = (action$) =>
    action$.ofType('FETCH_MASK_INFORMATION').pipe(
        mergeMap(({ callback }) => {
            return merge(
                //發送request時設定isLoading為true來告知使用者正在抓取資料
                of(actions.maskInformationIsLoading(true)),
                ajax.getJSON(`網址`).pipe(
                    mergeMap(response => {
                        // console.log(response.features);
                        // 傳入callback function
                        if (callback) callback(response.features);
                        // 更新時間
                        const updateTime = response.features[0].properties.updated;
                        return of(
                            // fetch完之後再次發送action將資料存到reducer
                            actions.recieveMaskInformation(response.features, updateTime),
                            // 收到response後設定isLoading為false告知使用者抓取資料完成
                            actions.maskInformationIsLoading(false),
                        );
                    })
                )
            )
        })
    );
// combineEpics會將參數中的epic函數合併在一起
export default combineEpics(maskGetList);