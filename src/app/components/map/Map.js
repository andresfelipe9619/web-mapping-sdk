import React, { Component } from 'react'

import WFS from 'ol/format/wfs';
import Map from 'ol/map';
import Zoom from 'ol/control/zoom';
import Scale from 'ol/control/scaleline';
import MousePosition from 'ol/control/mouseposition';
import Control from 'ol/control';
// import LayerSwitcher from 'ol3-layerswitcher';
import condition from 'ol/events/condition';
import View from 'ol/view';
import WMSCapabilitiesFormat from 'ol/format/wmscapabilities';
import TileLayer from 'ol/layer/tile';
import TileWMS from 'ol/source/tilewms';
import OSM from 'ol/source/osm';
import Proj from 'ol/proj';
import Projection from 'ol/proj/projection';
import Coordinate from 'ol/coordinate';
import Overlay from 'ol/overlay';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import SelectInteraction from 'ol/interaction/select';
// import "ol/css/ol.css"

class MapComponent extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {

        var container = document.getElementById('popup');
        var content = document.getElementById('popup-content');
        var closer = document.getElementById('popup-closer');

        var selectFeature = new Style({
            stroke: new Stroke({
                color: '#ff0000',
                width: 2
            })
        });

        var defaultFeature = new Style({
            stroke: new Stroke({
                color: '#0000ff',
                width: 2
            })
        });

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

        var extent = [1060051, 879589, 1061860, 880613]

        var projection = new Projection({
            code: 'EPSG:3115',
            units: 'm',
            axisOrientation: 'neu',
            // extent: extent
        });
        // const olView = new View({ center: projCenter, zoom: 16 })
        var layersName = [];

        const olView = new View({ zoom: 16, center: [1061480, 879727], projection })

        var viewResolution = olView.getResolution();
        var viewProjection = olView.getProjection();


        const url = 'http://localhost:8080/geoserver/cahibi1/wms?service=WMS&request=GetCapabilities';
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
                        layersName.push(superlayer);
                    }
                })
                return layersName
            })
            .then(layers => {


                var selectInteraction = new SelectInteraction({
                    layers: function (layer) {
                        return layer.get('id') == 'mallas';
                    }
                });

                // var layerSwitcher = new Control.LayerSwitcher({
                //     tipLabel: 'Légende' // Optional label for button
                // });

                var map = new Map({
                    projection: 'EPSG:3115',
                    controls: [new Zoom(), new Scale({ units: 'metric' }), new MousePosition()],
                    target: 'map',
                    pixelRatio: 1,
                    layers: [
                        ...layers
                    ],
                    view: olView,
                    overlays: [overlay]
                });


                map.on('click', function (evt) {
                    var coordinate = evt.coordinate;

                    content.innerHTML = '<p>Hiciste click aqui:</p><code>' + coordinate +
                        '</code>';
                    overlay.setPosition(coordinate);
                    var url = ""
                    // for (let layer of layers) {
                    //     console.log('layer2222', layer.getSource())

                    //     let urlPrueba = layer.getSource().getGetFeatureInfoUrl(
                    //         coordinate, viewResolution, viewProjection,
                    //         { 'INFO_FORMAT': 'text/html' });
                    //         fetch(urlPrueba).then(response => {
                    //             return response.text()
                    //         }).then(data=>{
                    //             console.log(data.includes('table'))
                    //             console.log(data.includes(layer.get('id')))
                    //             if(data.includes('table') && data.includes(layer.get('id'))){
                    //                 url = urlPrueba;
                                    
                    //             }
                    //         })

                    // }
                      url = layers[2].getSource().getGetFeatureInfoUrl(
                            coordinate, viewResolution, viewProjection,
                            { 'INFO_FORMAT': 'text/html' });
                    console.log('url', url)
                    if (url) {
                        document.getElementById('info').innerHTML =
                            '<iframe seamless src="' + url + '"></iframe>';
                    }

                });

                // if (selectClick !== null) {
                //     map.addInteraction(selectClick);
                //     selectClick.on('select', function (e) {
                //         var extent = e.target.getFeatures().getArray()[0].getGeometry().getExtent();
                //         var view = map.getView().fit(extent);

                //     });
                // }

                console.log('layers', layers)
                console.log('map', map)
            })
    }


    render() {
        return (
            <section className="panel-map">
                <div id="map" className="map" ref="olmap"></div>
                <div id="popup" className="ol-popup">
                    <a href="#" id="popup-closer" className="ol-popup-closer"></a>
                    <div id="popup-content"></div>
                    <div id="info">&nbsp;</div>

                </div>
                <div id="information">&nbsp;</div>
            </section>
        );
    }
}

export default MapComponent;