import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Tab, Grid, Statistic, Button, Label, Table, Dropdown, Card, Form } from 'semantic-ui-react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import areaDatas from '../area'
import photo from '../assets/photo.jpeg';
import LMap from './LMap'

function Content(props) {
  const [datas, setDatas] = useState([]);
  const [position, setPosition] = useState([
    23.5,
    122
  ]);
  const [activeItem, setActiveItem] = useState("tab1");
  const [city, setCity] = useState("");
  const [area, setArea] = useState([]);

  function handleItemClick(e, { name }) { setActiveItem(name) }

//   useEffect(() => {
//     fetch("https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json")
//       .then((response) => response.json())
//       .then((responseJson) => {
//         console.log(responseJson);
//         let data = filterData(responseJson.features);
//         setDatas(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(function (position) { setGeo(position) });
//     }
//   }, []);
  function filterData(datas) {
    // if (datas.features != null) {
    //   let returnDatas = datas.features.map(data => {
    //     return { id: data.properties.id, name: data.properties.name, phone: data.properties.phone, 
    //       address: data.properties.address, mask_adult: data.properties.mask_adult,mask_child:data.properties.mask_child,
    //       updated:data.properties.updated,available:data.properties.available,note:data.properties.note,

    //     };
    //   })
    // }
    return datas;
  }

  function onChangeCity(event, { name, value }) {
    setArea(value);
  }



  function setGeo(position) {
    console.log(position);
    setPosition([position.coords.latitude
      , position.coords.longitude
    ]);
  }

  return (
    <div >
      <Grid container>
        <Grid.Row>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label> 口罩地圖</label>
            <Card>
              <Card.Content>
                <Card.Header>
                  成人口罩數量顏色
        </Card.Header>
                <Card.Description>
                  <Label circular color="green" >> 50</Label>
                  <Label circular color="yellow"   >20~49</Label>
                  <Label circular color="orange"  >1~19</Label>
                  <Label circular color="red"  >0</Label>
                </Card.Description>
              </Card.Content>
            </Card>
            <Card image={photo} />

            {/* <Grid.Column width={6}>
              <Form>
                <Form.Field>
                  <label>縣市</label>
                  <Dropdown
                    selection
                    onChange={onChangeCity}
                    options={areaDatas.city} />
                  <label>區</label>
                  <Dropdown
                    selection
                    options={area} />
                </Form.Field>
              </Form>
            </Grid.Column> */}
            <Tab panes={panes} />
          </Grid.Column>
          <Grid.Column width={8}>
           <LMap data={datas}></LMap>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div >
  );
}

export default Content;

const resultRenderer = ({ name }) => <Label content={name} />

resultRenderer.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
}

const panes = [
  // {
  //   menuItem: '搜尋', render: () => <Tab.Pane>
  //     {/* <Grid.Column width={6}>
  //     <Search
  //       loading={isLoading}
  //       onResultSelect={handleResultSelect}
  //       onSearchChange={_.debounce(handleSearchChange, 500, {
  //         leading: true,
  //       })}
  //       results={searchResults}
  //       value={searchValue}
  //       resultRenderer={resultRenderer}
  //       {...this.props}
  //     />
  //     </Grid.Column> */}
  //   </Tab.Pane>
  // },
  {
    menuItem: '相關資訊', render: () => <Tab.Pane>
      ℹ️ 部分藥局因採發放號碼牌方式，方便民眾購買口罩，系統目前無法顯示已發送號碼牌數量。<br />
      ℹ️ 口罩數量以藥局實際存量為主，線上查詢之數量僅供參考。<br />
      ℹ️ 如果藥局的庫存或者備註有誤，可以禮貌提醒藥師確認系統資料：<br />
      庫存的部份，可請藥師瀏覽「防疫口罩管控系統VPN登錄作業使用者手冊」的第五頁，有說明負數的操作方式。<br />
      備註的部份，可請藥師一樣連線至 VPN 後進入「看診資料及掛號費」：<br />
      (1)每日固定看診時段 <br />
      (2)「固定看診時段備註欄」，可修正藥局販賣口罩起迄時間及相關欲通知民眾事項</Tab.Pane>
  },
]
