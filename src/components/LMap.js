import React, { useState, useEffect, useCallback } from 'react';
import {
    Map,
    Popup,
    TileLayer,
    Marker
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Statistic, Button, Table, Loader, Dimmer, Form } from 'semantic-ui-react'
import L from 'leaflet';
import greenSvg from '../assets/marker/pinGreen.svg'
import oSvg from '../assets/marker/pinOrange.svg';
import ySvg from '../assets/marker/pinYellow.svg';
import rSvg from '../assets/marker/pinRed.svg';
import { useSelector, useDispatch, useStore } from 'react-redux'

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

function LMap(props) {
    const dispatch = useDispatch()
    const maskInformationLists = useSelector(state => state.maskInformationLists)
    const isLoading = useSelector(state => state.isLoading);

    const [position, setPosition] = useState([
        23.5,
        122
    ]);
    const [zoom, setZoom] = useState(15);

    useEffect(() => {
        dispatch({ type: 'FETCH_MASK_INFORMATION' });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) { setGeo(position) });
        }
    }, []);

    function setGeo(position) {
        console.log(position);
        setPosition([position.coords.latitude
            , position.coords.longitude
        ]);
    }
    function addMaker(data) {
        return (<Marker key={data.properties.id} icon={getColor(data.properties.mask_adult)} position={[data.geometry.coordinates[1], data.geometry.coordinates[0]]}>
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
        </Marker>)
    }

    function getColor(num) {
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
            <Map center={position} zoom={zoom} maxZoom={20}>
                <Dimmer active={isLoading}>
                    <Loader size='large'>載入中</Loader>
                </Dimmer>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>你的位置</Popup>
                </Marker>
                <MarkerClusterGroup>
                    {maskInformationLists.map((data, index) =>
                        addMaker(data)
                    )}
                </MarkerClusterGroup>
            </Map>

        </div >
    );
}

export default LMap;
