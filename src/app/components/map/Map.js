
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import WFS from 'ol/format/wfs';
import Map from 'ol/map';
import { Dropdown, Button, Segment, Dimmer, Form, Grid, Loader } from 'semantic-ui-react';

import Zoom from 'ol/control/zoom';
import Scale from 'ol/control/scaleline';
import MousePosition from 'ol/control/mouseposition';
import Coordinate from 'ol/coordinate';
import Control from 'ol/control';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import LayerGroup from 'ol/layer/group';
import TileWMS from 'ol/source/tilewms';
import OSM from 'ol/source/osm.js';
import Projection from 'ol/proj/projection';
import Overlay from 'ol/overlay';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import LayerSwitcher from "./LayerSwitcher"
import SelectInteraction from 'ol/interaction/select';
// import "ol/css/ol.css"

class MapComponent extends Component {

    mMap = null
    mLayers = null
    popup = null
    popupElement = null
    popupContent = null

    updateSelection(name) {

        const features = this.getCurrentFeatures()

        // if (features) {
        //     var coordinate = evt.coordinate;

        //     overlay.setPosition(coordinate);
        //     var url = ""

        //     this.mMap.getLayers().forEach(function (lyr) {
        //         url = lyr.getSource().getGetFeatureInfoUrl(
        //             coordinate, viewResolution, viewProjection,
        //             { 'INFO_FORMAT': 'text/html' });
        //         console.log('url', url)
        //         if (url) {
        //             document.getElementById('info').innerHTML =
        //                 '<iframe seamless src="' + url + '"></iframe>';
        //         }
        //     })
        // const selected = features.filter(feature => name === placeName(feature.getProperties()))

        // if (selected.length > 0) {
        //     let feature = selected[0]
        //     let pos = feature.getGeometry().getFirstCoordinate()
        //     this.popupElement.innerHTML = feature.getProperties().name
        //     this.popup.setPosition(pos)
        // }
        // }
    }

    clickHandler(event) {
        const viewResolution = this.mMap.getView().getResolution();
        const viewProjection = this.mMap.getView().getProjection();
        const { onSelectClick } = this.props
        const placeLayer = this.mLayers

        var coordinate = event.coordinate;

        var url = ""
        let content = this.popupContent
        let popup = this.popup
        this.mMap.getLayers().forEach(function (lyr) {
            url = lyr.getSource().getGetFeatureInfoUrl(
                coordinate, viewResolution, viewProjection,
                { 'INFO_FORMAT': 'text/html' });
            console.log('url', url)
            if (url) {
                popup.setPosition(coordinate);
                content.innerHTML =
                    '<iframe seamless src="' + url + '"></iframe>';
            }
        })
        // this.mMap.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
        //     let selected = feature.getProperties();
        //     onSelectClick(selected);
        //     return true // truthy return ends the iteration through the features
        // }, { layerFilter: candidate => candidate === placeLayer })
    }

    getCurrentFeatures() {
        if (this.mMap) {
            if (this.mLayers.length) {
                return this.mLayer.map(layer => {
                    let source = layer.getSource()
                    if (source) {
                        return source.getFeatures()
                    }
                })
            }
        }
        return null
    }

    updateFeatures(filter) {

        var filterParams = {
            'FILTER': null,
            'CQL_FILTER': null,
            'FEATUREID': null
        };
        if (filter) {

            let filterString = `${filter.atributos}${filter.comparacion}${filter.valor}`
            console.log(filterString)
            filterParams["CQL_FILTER"] = filterString;
            console.log("my filter", filterParams["CQL_FILTER"])
            if (this.mMap) {

                this.mMap.getLayers().forEach(function (lyr) {
                    // var extent = lyr.getSource().getExtent();
                    lyr.getSource().updateParams(filterParams);
                    console.log('layer', lyr.getSource)
                    // this.mMap.getView().fit(extent, this.mMap.getSize());
                });
            }
        } else {
            if (this.mMap) {
                this.mMap.getLayers().forEach(function (lyr) {
                    // var extent = lyr.getSource().getExtent();
                    lyr.getSource().updateParams(filterParams);
                    // this.mMap.getView().fit(extent, this.mMap.getSize());
                });
            }
        }
    }

    addLayerToMap(layer, map) {
        if (layer && map) {
            if (layer.Title === 'clasificadoras' || layer.Title === 'cantera' || layer.Title === 'bandas'
                || layer.Title === 'trituradoras' || layer.Title === 'procrudo' || layer.Title === 'profinal' || layer.Title === 'mallas') {

                let superlayer =
                    // new LayerGroup({
                    //     title: layer.Title,
                    // layers: [
                    new TileLayer({
                        id: layer.Title,
                        type: 'base',
                        // extent: extent,
                        source: new TileWMS({
                            // projection:"EPSG:3115",
                            url: 'http://localhost:8080/geoserver/cahibi1/wms',
                            params: {
                                'FORMAT': "image/png",
                                'LAYERS': `cahibi1:${layer.Title}`,
                                tiled: true,
                            },
                            serverType: 'geoserver',
                        })
                        //     })
                        // ]
                    })
                map.addLayer(superlayer)
                console.log('current layers', superlayer)
            }
        }
    }

    componentDidMount() {
        var { layers, filter, onLayersChange } = this.props;
        const mapElement = ReactDOM.findDOMNode(this.refs.map)
        this.popupElement = ReactDOM.findDOMNode(this.refs.popup);
        this.popupContent = ReactDOM.findDOMNode(this.refs['popup-content']);
        var closer = ReactDOM.findDOMNode(this.refs['popup-closer']);

        const mExtent = [1060051, 879589, 1061860, 880613]
        this.popup = new Overlay({
            element: this.popupElement,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });

        const mView = new View({
            zoom: 16, center: [1061480, 879727],
            projection: new Projection({
                code: 'EPSG:3115',
                units: 'm',
                axisOrientation: 'neu',
            })
        })


        this.mMap = new Map({
            projection: 'EPSG:3115',
            controls: [new Zoom(), new Scale({ units: 'metric' }), new MousePosition({
                coordinateFormat: Coordinate.createStringXY(3),
            })],
            target: mapElement,
            pixelRatio: 1,
            view: mView,
            overlays: [this.popup],
            // layers: [new TileLayer({
            //     source: new OSM()
            // })]
        });

        let mPopup = this.popup
        closer.onclick = function () {
            mPopup.setPosition(undefined);
            closer.blur();
            return false;
        };
        // var layerSwitcher = new LayerSwitcher();
        // this.mMap.addControl(layerSwitcher);

        this.mMap.on('click', this.clickHandler, this)


        if (layers) {
            layers.map((layer) => {
                console.log('layer', layer)
                this.addLayerToMap(layer, this.mMap)
            })
            if (filter) { this.updateFeatures(filter) }
            else {
                this.updateFeatures(null)
            }
            onLayersChange(layers)

        }
    }



    render() {
        const { selected, filter, } = this.props

        // if (filter) {
        console.log('Here u have, your fuckin filter sir', filter)
        this.updateFeatures(filter)
        // }

        // this.updateSelection(selected)
        return (
            <Segment>

                <section className="panel-map">
                    <div ref='map' className="map" ></div>
                    <div ref="popup" className="ol-popup">
                        <a href="#" ref="popup-closer" className="ol-popup-closer"></a>
                        <div ref="popup-content"></div>
                        <div ref="info">&nbsp;</div>
                    </div>
                    <div ref="information">&nbsp;</div>
                </section>
            </Segment>

        );
    }
}

export default MapComponent;
