
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import WFS from 'ol/format/wfs';
import Map from 'ol/map';
import Zoom from 'ol/control/zoom';
import Scale from 'ol/control/scaleline';
import MousePosition from 'ol/control/mouseposition';
import Control from 'ol/control';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import TileWMS from 'ol/source/tilewms';

import Projection from 'ol/proj/projection';
import Overlay from 'ol/overlay';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
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

        this.popup.setPosition(coordinate);
        var url = ""
        let content = this.popupContent

        this.mMap.getLayers().forEach(function (lyr) {
            url = lyr.getSource().getGetFeatureInfoUrl(
                coordinate, viewResolution, viewProjection,
                { 'INFO_FORMAT': 'text/html' });
            console.log('url', url)
            if (url) {
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

    updateFeatures(event) {

    }

    addLayerToMap(layer, map, filter) {
        if (layer && map) {
            if (layer.Title === 'clasificadoras' || layer.Title === 'cantera' || layer.Title === 'bandas'
                || layer.Title === 'trituradoras' || layer.Title === 'procrudo' || layer.Title === 'profinal' || layer.Title === 'mallas') {

                let superlayer = new TileLayer({
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
                })
                map.addLayer(superlayer)
                console.log('current layers', superlayer)
            }
        }



    }

    componentDidMount() {
        var { layers, filter } = this.props;
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
            controls: [new Zoom(), new Scale({ units: 'metric' }), new MousePosition()],
            target: mapElement,
            pixelRatio: 1,
            view: mView,
            overlays: [this.popup]
        });

        // let mPopup = this.mPopup
        // closer.onclick = function () {
        //     mPopup.setPosition(undefined);
        //     closer.blur();
        //     return false;
        // };

        this.mMap.on('click', this.clickHandler, this)

        if (layers && filter) {
            layers.map((layer) => {
                console.log('layer', layer)
                this.addLayerToMap(layer, this.mMap)
            })

        } else if (layers) {

            layers.map((layer) => {
                console.log('layer', layer)
                this.addLayerToMap(layer, this.mMap)
            })
        }
    }



    render() {
        const { selected } = this.props

        if (this.props.match.url.includes('/mapa/sql/') && this.props.match.params) {
            var filter = {
                atributo: this.props.match.params.atributo,
                comparacion: this.props.match.params.comparacion,
                valor: this.props.match.params.valor
            }
            var filterParams = {
                'FILTER': null,
                'CQL_FILTER': null,
                'FEATUREID': null
            };

            filterParams["CQL_FILTER"] = `${filter.atributo}${filter.comparacion}${filter.valor}`;
            console.log("my filter", filterParams["CQL_FILTER"])
            this.mMap.getLayers().forEach(function (lyr) {
                // var extent = lyr.getSource().getExtent();
                lyr.getSource().updateParams(filterParams);
                // this.mMap.getView().fit(extent, this.mMap.getSize());
            });

        }

        // this.updateSelection(selected)
        return (
            <section className="panel-map">
                <div ref='map' className="map" ></div>
                <div ref="popup" className="ol-popup">
                    <a href="#" ref="popup-closer" className="ol-popup-closer"></a>
                    <div ref="popup-content"></div>
                    <div ref="info">&nbsp;</div>
                </div>
                <div ref="information">&nbsp;</div>
            </section>
        );
    }
}

export default MapComponent;
