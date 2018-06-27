
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
import OlLayerGroup from 'ol/layer/group';

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
        this.mapId = `map`;
        this.olExtent = [1060051, 879589, 1061860, 880613]
        this.olOverlay = new Overlay({
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });

        this.olView = new View({
            zoom: 16, center: [1061480, 879727],

            projection: new Projection({
                code: 'EPSG:3115',
                units: 'm',
                axisOrientation: 'neu',
                // extent: extent
            })
        })
    }

    addLayerToMap(layer, map) {
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
                console.log('alyer', superlayer)
            } else { console.log('ajjajajaja', layer) }
        }
        var filterParams = {
            'FILTER': null,
            'CQL_FILTER': null,
            'FEATUREID': null
        };

        filterParams["CQL_FILTER"] = 'estado==0';
        map.getLayers().forEach(function (lyr) {
            lyr.getSource().updateParams(filterParams);
        });
    }

    componentDidMount() {

        var container = document.getElementById('popup');
        var content = document.getElementById('popup-content');
        var closer = document.getElementById('popup-closer');
        var { layers, filter } = this.props;
        var overlay = this.olOverlay;
        var view = this.olView;
        overlay.setElement(container)

        var map = new Map({
            projection: 'EPSG:3115',
            controls: [new Zoom(), new Scale({ units: 'metric' }), new MousePosition()],
            target: 'map',
            pixelRatio: 1,
            view: view,
            overlays: [overlay]
        });

        closer.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };


        var viewResolution = view.getResolution();
        var viewProjection = view.getProjection();



        map.on('click', function (evt) {
            var coordinate = evt.coordinate;

            content.innerHTML = '<p>Hiciste click aqui:</p><code>' + coordinate + '</code>';
            overlay.setPosition(coordinate);
            var url = ""

            map.getLayers().forEach(function (lyr) {
                url = lyr.getSource().getGetFeatureInfoUrl(
                    coordinate, viewResolution, viewProjection,
                    { 'INFO_FORMAT': 'text/html' });
                console.log('url', url)
                if (url) {
                    document.getElementById('info').innerHTML =
                        '<iframe seamless src="' + url + '"></iframe>';
                }
            })
        });

        if (layers && filter) {
            layers.map((layer) => {
                console.log('layer', layer)
                this.addLayerToMap(layer, map)
            })

        } else if (layers) {

            layers.map((layer) => {
                console.log('layer', layer)
                this.addLayerToMap(layer, map)
            })
        }
    }



    render() {
        return (
            <section className="panel-map">
                <div id={this.mapId} className="map" ref="olmap"></div>
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
