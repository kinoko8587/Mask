import React, { useState, useEffect,Component } from 'react';
import './App.css';
import {
  Map,
  Popup,
  TileLayer,
  Marker
} from 'react-leaflet';
import 'semantic-ui-css/semantic.min.css'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Tab, Input, Grid, Icon, Statistic, Button, Label, Table, Search, Card } from 'semantic-ui-react'
import L from 'leaflet';
import greenSvg from './marker/pinGreen.svg';
import oSvg from './marker/pinOrange.svg';
import ySvg from './marker/pinYellow.svg';
import rSvg from './marker/pinRed.svg';
import _ from 'lodash'
import PropTypes from 'prop-types'

let pinGreen = new L.Icon({
  iconUrl: greenSvg,
  iconSize: [48, 48], iconAnchor: [24, 48], popupAnchor: [0, -48]
})

let pinOrange = new L.Icon({
  iconUrl: oSvg,
  iconSize: [48, 48], iconAnchor: [24, 48], popupAnchor: [0, -48]
})

let pinYellow = new L.Icon({
  iconUrl: ySvg,
  iconSize: [48, 48], iconAnchor: [24, 48], popupAnchor: [0, -48]
})
let pinRed = new L.Icon({
  iconUrl: rSvg,
  iconSize: [48, 48], iconAnchor: [24, 48], popupAnchor: [0, -48]
})

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature: ''};
      }
  const [datas, setDatas] = useState([]);
  const [position, setPosition] = useState([
    23.5,
    122
  ]);
  const [zoom, setZoom] = useState(15);
  const [activeItem, setActiveItem] = useState("tab1");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");

handleItemClick(e, { name }){ setActiveItem(name) }

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        let data = filterData(responseJson.features);
        setDatas(data);
      })
      .catch((error) => {
        console.error(error);
      });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) { setGeo(position) });
    }
  }, []);
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

   handleResultSelect(e, { result }) { setSearchValue(result.title) }

   handleSearchChange(e, { value }) {
    setIsLoading(true);
    setSearchValue(value);
    // this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (searchValue.length < 1) return;
      const re = new RegExp(_.escapeRegExp(setSearchValue), 'i')
      const isMatch = (result) => re.test(result.title)
      setIsLoading(false);
      setSearchResults(_.filter(datas, isMatch))
      // this.setState({
      //   isLoading: false,
      //   results: _.filter(source, isMatch),
      // })
    }, 300)
  }

   setGeo(position){
    console.log(position);
    setPosition([position.coords.latitude
      , position.coords.longitude
    ]);
  }

   getColor(num) {
    if (num === 0) {
      return pinRed;
    } else if (num < 20) {
      return pinOrange;
    } else if (num < 50) {
      return pinYellow;
    } else {
      return pinGreen
    }
  }

  return (
    <div >
      <Grid container>
        <Grid.Row>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
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
            <Search
              loading={isLoading}
              onResultSelect={handleResultSelect}
              onSearchChange={_.debounce(handleSearchChange, 500, {
                leading: true,
              })}
              results={searchResults}
              value={searchValue}
              resultRenderer={resultRenderer}
              {...this.props}
            />
            {/* <Tab panes={panes} /> */}
          </Grid.Column>
          <Grid.Column width={8}>
            <Map center={position} zoom={zoom} maxZoom={20}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>你的位置</Popup>
              </Marker>
              <MarkerClusterGroup>
                {datas.map((data, index) =>
                  <Marker key={data.properties.id} icon={getColor(data.properties.mask_adult)} position={[data.geometry.coordinates[1], data.geometry.coordinates[0]]}>
                    <Popup>
                      <h2>{data.properties.name}</h2>
                      <Statistic.Group size="mini">
                        <Statistic color={data.properties.mask_adult == 0 ? "red" : "black"}>
                          <Statistic.Value>{data.properties.mask_adult}</Statistic.Value>
                          <Statistic.Label>成人</Statistic.Label>
                        </Statistic>
                        <Statistic color={data.properties.mask_child == 0 ? "red" : "black"}>
                          <Statistic.Value>{data.properties.mask_child}</Statistic.Value>
                          <Statistic.Label>兒童</Statistic.Label>
                        </Statistic>
                      </Statistic.Group>
                      <br />
                      地址：{data.properties.address}<br />
                      電話：{data.properties.phone}<br />
                      備註：{data.properties.note}<br />
                      更新時間：{data.properties.updated}<br />
                      營業時間
                      <Table basic='very' celled collapsing>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>一</Table.HeaderCell>
                            <Table.HeaderCell>二</Table.HeaderCell>
                            <Table.HeaderCell>三</Table.HeaderCell>
                            <Table.HeaderCell>四</Table.HeaderCell>
                            <Table.HeaderCell>五</Table.HeaderCell>
                            <Table.HeaderCell>六</Table.HeaderCell>
                            <Table.HeaderCell>日</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>上午</Table.Cell>
                            <Table.Cell textAlign='center'>{data.properties.available.includes("星期一上午看診") ? "O" : "X"}</Table.Cell>
                            <Table.Cell textAlign='center'>{data.properties.available.includes("星期二上午看診") ? "O" : "X"}</Table.Cell>
                            <Table.Cell textAlign='center'>{data.properties.available.includes("星期三上午看診") ? "O" : "X"}</Table.Cell>
                            <Table.Cell textAlign='center'>{data.properties.available.includes("星期四上午看診") ? "O" : "X"}</Table.Cell>
                            <Table.Cell textAlign='center'>{data.properties.available.includes("星期五上午看診") ? "O" : "X"}</Table.Cell>
                            <Table.Cell textAlign='center'>{data.properties.available.includes("星期六上午看診") ? "O" : "X"}</Table.Cell>
                            <Table.Cell textAlign='center'>{data.properties.available.includes("星期日上午看診") ? "O" : "X"}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>下午</Table.Cell>
                            <Table.Cell textAlign='center'>{data.properties.available.includes("星期一下午看診") ? "O" : "X"}</Table.Cell>
                            <Table.Cell textAlign='center'>{data.properties.available.includes("星期二下午看診") ? "O" : "X"}</Table.Cell>
                            <Table.Cell textAlign='center'>{data.properties.available.includes("星期三下午看診") ? "O" : "X"}</Table.Cell>
                            <Table.Cell textAlign='center'>{data.properties.available.includes("星期四下午看診") ? "O" : "X"}</Table.Cell>
                            <Table.Cell textAlign='center'>{data.properties.available.includes("星期五下午看診") ? "O" : "X"}</Table.Cell>
                            <Table.Cell textAlign='center'>{data.properties.available.includes("星期六下午看診") ? "O" : "X"}</Table.Cell>
                            <Table.Cell textAlign='center'>{data.properties.available.includes("星期日下午看診") ? "O" : "X"}</Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                      <Button primary target="_blank" href={"https://www.google.com.tw/maps/search/" + data.properties.name}>
                        GO!前往
                </Button>
                    </Popup>
                  </Marker>
                )}
              </MarkerClusterGroup>
            </Map>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div >
  );
}

const resultRenderer = ({ name }) => <Label content={name} />

resultRenderer.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
}

const panes = [
  {
    menuItem: '搜尋', render: () => <Tab.Pane>
    </Tab.Pane>
  },
  {
    menuItem: '相關資訊', render: () => <Tab.Pane>
      ℹ️ 部分藥局因採發放號碼牌方式，方便民眾購買口罩，系統目前無法顯示已發送號碼牌數量。<br />
      ℹ️ 口罩數量以藥局實際存量為主，線上查詢之數量僅供參考。<br />
      ℹ️ 如果藥局的庫存或者備註有誤，可以禮貌提醒藥師確認系統資料：<br />

      庫存的部份，可請藥師瀏覽「防疫口罩管控系統VPN登錄作業使用者手冊」的第五頁，有說明負數的操作方式。
  備註的部份，可請藥師一樣連線至 VPN 後進入「看診資料及掛號費」：(1)每日固定看診時段 (2)「固定看診時段備註欄」，可修正藥局販賣口罩起迄時間及相關欲通知民眾事項</Tab.Pane>
  },
]
