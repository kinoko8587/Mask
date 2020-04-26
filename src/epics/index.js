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
            // of(actions.maskInformationIsLoading(true)),
            ajax.getJSON(`https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json`).pipe(
                mergeMap(response => {
                    // console.log('res:', response.features);
                    if(callback) callback(response.features);
                    const initmaskInformationLists = response.features.slice(0,20);
                    console.log(initmaskInformationLists)
                    const updateTime = response.features[0].properties.updated;
                    // console.log(initmaskInformationLists);
                    // console.log(response.features);
                    return of(
                        actions.recieveMaskInformation(response.features, updateTime),
                        actions.initMaskInformation(initmaskInformationLists),
                        actions.maskInformationIsLoading(false),
                    );
                })
            )
        )
    })
  );

const maskGetSearchList = (action$) => 
    action$.ofType('SEARCH_MASK_INFORMATION').pipe(
    mergeMap(({searchText}) => { 
        return merge(
            of(
                actions.maskInformationIsLoading(true),
                actions.clearSearchMaskInformationLists(),
            ),
            ajax.getJSON(`https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json`).pipe(
                mergeMap(response => {
                    // console.log(searchText);
                    // console.log('res:', response.features);
                    const lists = response.features;
                    const updateTime = response.features[0].properties.updated;
                    const matchLists = lists.filter(list => list.properties.address.indexOf(searchText) !== -1 || list.properties.name.indexOf(searchText) !== -1);
                    if(matchLists.length === 0) {
                        matchLists.push({error: 'error'});
                    }
                    console.log(matchLists);
                    return of(
                        actions.recieveSearchMaskInformation(matchLists, updateTime),
                        actions.maskInformationIsLoading(false),
                    );
                })
            )
        )
    })
  );

// combineEpics會將參數中的epic函數合併在一起
export default combineEpics(
    maskGetList,
    maskGetSearchList
);