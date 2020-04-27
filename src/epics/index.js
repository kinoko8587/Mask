import { of, merge } from 'rxjs';
import { ajax } from 'rxjs/ajax';
// 引入combineEpics方法
import { combineEpics } from 'redux-observable';
// catchError
import { mergeMap } from 'rxjs/operators';

import * as actions from '../actions';

const maskGetList = (action$) => 
    action$.ofType('FETCH_MASK_INFORMATION').pipe(
    mergeMap(({callback}) => { 
        return merge(
            of(
                actions.maskInformationIsLoading(true),
            ),
            ajax.getJSON(`https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json`).pipe(
                mergeMap(response => {
                    if(callback) callback(response.features);
                    const initmaskInformationLists = response.features.slice(0,20);
                    // console.log(initmaskInformationLists)
                    const updateTime = response.features[0].properties.updated;
                    console.log('updateTime:', updateTime);
                    return of(
                        actions.recieveMaskInformation(response.features, updateTime),
                        actions.maskInformationIsLoading(false),
                    );
                })
            )
        )
    })
  );

// combineEpics會將參數中的epic函數合併在一起
export default combineEpics(
    maskGetList
);