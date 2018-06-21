import React, { Component } from 'react'
import { connect } from 'react-redux';
import WFS from 'ol/format/wfs';
import Map from 'ol/map';
import Zoom from 'ol/control/zoom';
import Scale from 'ol/control/scaleline';
import MousePosition from 'ol/control/mouseposition';

import View from 'ol/view';
import WMSCapabilitiesFormat from 'ol/format/wmscapabilities';
import TileLayer from 'ol/layer/tile';
import TileWMS from 'ol/source/tilewms';
import OSM from 'ol/source/osm';
import Proj from 'ol/proj';
import Coordinate from 'ol/coordinate';
import Overlay from 'ol/overlay';
import Projection from 'ol/proj/projection';
import Menu from './MenuMapa'
import FilterQuery from './FilterQuery'
import { Switch, Route } from 'react-router-dom';
import Clasificadoras from './../dashboard/proccess/Clasificadoras';
import Mallas from './../dashboard/proccess/Mallas';
import Trituradoras from './../dashboard/proccess/Trituradoras';
import Select from 'react-select'

import {
    Grid,
    Header,
    Segment,
    Dimmer,
    Loader,
    Container,
    Button
} from "semantic-ui-react";

class MapComponent extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {

        // const placeSrcOptions = { features: (new GeoJSON()).readFeatures(obj) }
        // const placeSrc = new VectorSource(placeSrcOptions)
        // const olPlaceLayer = new VectorLayer({ source: placeSrc, style: styleFunction })
        var container = document.getElementById('popup');
        var content = document.getElementById('popup-content');
        var closer = document.getElementById('popup-closer');


        /**
         * Create an overlay to anchor the popup to the map.
         */
        var overlay = new Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });


        /**
         * Add a click handler to hide the popup.
         * @return {boolean} Don't follow the href.
         */
        closer.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };


        const projCenter = Proj.fromLonLat([-76.52563361025985, 3.5077020719791223])
        // const olView = new View({ center: projCenter, zoom: 16 })
        var mLayers = [];
        var layersName = [];
        var bounds = [1060051, 879589, 1061860, 880613]

        const olView = new View({ zoom: 16, center: projCenter })


        const url = 'http://localhost:8080/geoserver/my_web_app/wms?service=WMS&request=GetCapabilities';
        fetch(url).then(
            response => response.text(),
            error => console.error('An error occured.', error
            ))
            .then((xml) => {
                const info = new WMSCapabilitiesFormat().read(xml);
                const root = info.Capability.Layer.Layer;
                console.log('ROOT WMS', root)
                root.map((layer) => {
                    console.log('layer', layer)
                    if (layer.Title === 'clasificadoras' || layer.Title === 'cantera' || layer.Title === 'bandas'
                        || layer.Title === 'trituradoras' || layer.Title === 'procrudo' || layer.Title === 'profinal' || layer.Title === 'mallas') {
                        const layerUrl = `http://localhost:8080/geoserver/my_web_app/wms?service=WMS&version=1.1.0&request=GetMap&layers=my_web_app:${layer.Name}&styles=&bbox=1061364.75,879657.0625,1061460.375,879702.5&width=768&height=364&srs=EPSG:3115&format=image%2Fpng`

                        let superlayer = new TileLayer({
                            source: new TileWMS({
                                url: 'http://localhost:8080/geoserver/my_web_app/wms',
                                params: {
                                    'FORMAT': "image/png",
                                    'LAYERS': `my_web_app:${layer.Title}`,
                                    tiled: true,
                                },
                                serverType: 'geoserver',
                                crossOrigin: 'anonymous'
                                // transition: 0
                            })
                        })
                        layersName.push(superlayer);
                    }
                })
                return layersName
            })
            .then(layers => {

                var map = new Map({
                    projection: 'EPSG:3115',
                    controls: [new Zoom(), new Scale({ units: 'metric' }), new MousePosition()],
                    target: 'map',
                    layers: [
                        new TileLayer({
                            source: new OSM()
                        }),
                        ...layers
                    ],
                    view: olView,
                    overlays: [overlay]
                });

                map.on('singleclick', function (evt) {
                    var coordinate = evt.coordinate;
                    var hdms = Coordinate.toStringHDMS(Proj.transform(
                        coordinate, 'EPSG:3857', 'EPSG:4326'));

                    content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
                        '</code>';
                    overlay.setPosition(coordinate);

                    document.getElementById('info').innerHTML = '';
                    var viewResolution = /** @type {number} */ (olView.getResolution());
                    var url = layers[1].getSource().getGetFeatureInfoUrl(
                        evt.coordinate, viewResolution, 'EPSG:3857',
                        { 'INFO_FORMAT': 'text/html' });
                    if (url) {
                        document.getElementById('info').innerHTML =
                            '<iframe seamless src="' + url + '"></iframe>';
                    }
                });
                console.log('layers', layers)
                console.log('map', map)
            })
    }


    render() {
        return (
            <section className="panel-map">
                <div id="map" className="map" ref="olmap"></div>
                <div id="popup" class="ol-popup">
                    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
                    <div id="popup-content"></div>
                    <div id="info">&nbsp;</div>
                </div>
            </section>
        );
    }
}

class OpenMap extends Component {

    render() {
        const mBorder = { borderStyle: 'solid', borderColor: '#3BA2FB' };
        const { match } = this.props;

        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Grid.Row>
                                <Grid.Column>
                                    <Menu />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Switch>
                                        <Route path={match.url + "/sql"} component={FilterQuery} />
                                        <Route path={match.url + "/mallas"} render={() => {
                                            var options = [
                                                { value: '10/3/2016', label: '10/3/2016' },
                                                { value: '10/5/2016', label: '10/5/2016' }
                                            ]
                                            return (

                                                <Segment>
                                                    
                                                    <Grid.Row>

                                                        <Grid.Column width={4}>
                                                            Desde
                                                      <Select
                                                                name="desde"
                                                                options={options}
                                                                defaultValue='10/3/2016'
                                                                // onChange={this.handleChange}
                                                                isSearchable={true}

                                                            />
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row>

                                                        <Grid.Column width={4}>
                                                            Hasta
                                                      <Select
                                                                name="hasta"
                                                                options={options}
                                                                defaultValue='10/5/2016'
                                                                // onChange={this.handleChange}
                                                                isSearchable={true}
                                                            />
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Column width={4}>
                                                        <Button style={{ marginTop: '20px' }} primary >Consultar</Button>
                                                    </Grid.Column>
                                                </Segment>
                                            )
                                        }} />

                                    </Switch>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={10} style={mBorder}>
                            <MapComponent></MapComponent>
                        </Grid.Column>
                        <Grid.Column width={2} style={mBorder}>

                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Switch>
                            <Route path={match.url + "/mallas"} component={Mallas} />
                            <Route path={match.url + "/clasificadoras"} component={Clasificadoras} />
                            <Route path={match.url + "/trituradoras"} component={Trituradoras} />

                        </Switch>
                    </Grid.Row>
                </Grid>
            </div >
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}


export default connect(null, mapDispatchToProps)(OpenMap);