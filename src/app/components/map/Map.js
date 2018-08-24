
import MousePosition from 'ol/control/mouseposition';
import Scale from 'ol/control/scaleline';
import Zoom from 'ol/control/zoom';
import Coordinate from 'ol/coordinate';
import TileLayer from 'ol/layer/tile';
import Map from 'ol/map';
import Overlay from 'ol/overlay';
import Projection from 'ol/proj/projection';
import TileWMS from 'ol/source/tilewms';
import View from 'ol/view';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Segment } from 'semantic-ui-react';
import LayerSwitcher from "./LayerSwitcher";



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
    onLayersChange(filter) {
        console.log('ON LAYER CHANGE FILTER', filter)
        if (filter) {
            this.props.updateMapFeatures(filter)
        }
    }

    clickHandler(event) {
        const viewResolution = this.mMap.getView().getResolution();
        const viewProjection = this.mMap.getView().getProjection();
        const { layers } = this.props
        var coordinate = event.coordinate;

        var url = ""
        let content = this.popupContent
        let popup = this.popup
        let queryLayers = ''

        if(layers){
            layers.forEach(function(lyr,i){
                queryLayers += `cahibi1:${lyr.Title}${(i<layers.length-1)?',' :''}`
            })
            console.log(queryLayers)
        }
        this.mMap.getLayers().forEach(function (lyr) {
            if (lyr.getSource()["getGetFeatureInfoUrl"] !== undefined) {

                url = lyr.getSource().getGetFeatureInfoUrl(
                    coordinate, viewResolution, viewProjection,
                    { 
                        'INFO_FORMAT': 'text/html' ,
                        'QUERY_LAYERS':queryLayers,
                        'LAYERS':  queryLayers
                    });
                console.log('url', url)
                if (url) {
                    popup.setPosition(coordinate);
                    content.innerHTML =
                        '<iframe seamless src="' + url + '"></iframe>';
                }
            }
        })
    }


    filterMapLayers(filter) {

        var filterParams = {
            'FILTER': null,
            'CQL_FILTER': null,
            'FEATUREID': null,
            "VIEWPARAMS": null
        };
        if (filter) {
            if (filter.atributos && filter.comparacion) {

                let filterString = `${filter.atributos}${filter.comparacion}${filter.valor}`
                console.log(filterString)
                filterParams["CQL_FILTER"] = filterString;
                console.log("my filter", filterParams["CQL_FILTER"])
                if (this.mMap) {

                    this.mMap.getLayers().forEach(function (lyr) {
                        // var extent = lyr.getSource().getExtent();
                        if (lyr.getSource()["updateParams"] !== undefined) {
                            lyr.getSource().updateParams(filterParams);
                            console.log('layer', lyr.getSource)
                        }
                        // this.mMap.getView().fit(extent, this.mMap.getSize());
                    });
                }
            } else if (filter.desde && filter.hasta) {
                let filterString = null

                if (filter.zona == 'todos') {
                    filterString = `fechae>${filter.desde} and fechae<${filter.hasta}`
                } else if (filter.zona) {
                    filterString = `fechae>${filter.desde} and fechae<${filter.hasta} and idzona=${filter.zona}`

                }
                console.log(filterString)
                filterParams["CQL_FILTER"] = filterString;
                console.log("my filter", filterParams["CQL_FILTER"])
                if (this.mMap) {

                    this.mMap.getLayers().forEach(function (lyr) {
                        // var extent = lyr.getSource().getExtent();
                        if (lyr.getSource()["updateParams"] !== undefined) {
                            lyr.getSource().updateParams(filterParams);
                            console.log('layer', lyr.getSource)
                        }
                        // this.mMap.getView().fit(extent, this.mMap.getSize());
                    });
                }

            } else if (filter.client && filter.product) {

                let viewString = `cliente:${filter.client};producto:${filter.product}`
                console.log('view', viewString)
                filterParams["VIEWPARAMS"] = viewString;

                let filterString = null;
                if (filter.calidad && filter.zona) {

                    if (filter.calidad == 'todos' && filter.zona == 'todos') {
                        filterString = null
                    } else if (filter.calidad == 'todos' && filter.zona) {
                        filterString = `idzona=${filter.zona}`
                        filterParams["CQL_FILTER"] = filterString;
                    } else if (filter.zona == 'todos' && filter.calidad) {
                        filterString = `calificaci=${filter.calidad}`
                        filterParams["CQL_FILTER"] = filterString;
                    } else {
                        filterString = `idzona=${filter.zona} and calificaci=${filter.calidad}`
                        filterParams["CQL_FILTER"] = filterString;
                    }

                } else {
                    filterString = null
                    filterParams["CQL_FILTER"] = filterString;
                }
                console.log('string', filterString)
                if (this.mMap) {

                    this.mMap.getLayers().forEach(function (lyr) {
                        // var extent = lyr.getSource().getExtent();
                        if (lyr.getSource()["updateParams"] !== undefined) {
                            lyr.getSource().updateParams(filterParams);
                            console.log('layer', lyr.getSource)
                        }
                        // this.mMap.getView().fit(extent, this.mMap.getSize());
                    });
                }
            }
        } else {
            console.log('no fuckin filter')

            if (this.mMap) {
                this.mMap.getLayers().forEach(function (lyr) {
                    // var extent = lyr.getSource().getExtent();
                    if (lyr.getSource()["updateParams"] !== undefined) {
                        lyr.getSource().updateParams(filterParams);
                        console.log('layer', lyr.getSource)
                    }                    // this.mMap.getView().fit(extent, this.mMap.getSize());
                });
            }
        }
    }

    addLayerToMap(layer, map) {

        if (layer && map) {
            if (layer.Title === 'clasificadoras' || layer.Title === 'cantera' || layer.Title === 'bandas'
                || layer.Title === 'trituradoras' || layer.Title === 'procrudo' || layer.Title === 'profinal'
                || layer.Title === 'mallas' || layer.Title === 'mallasOrigenProductoCliente') {

                let superlayer =
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
                            transparent: true
                        })
                    })
                map.addLayer(superlayer)
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
            // projection: 'EPSG:3115',
            controls: [new Zoom(), new Scale({ units: 'metric' }), new MousePosition({
                coordinateFormat: Coordinate.createStringXY(2),
            })],
            target: mapElement,
            pixelRatio: 1,
            view: mView,
            overlays: [this.popup],
            layers: [new TileLayer({
                id: 'mapa_base',
                type: 'base',
                // extent: extent,
                source: new TileWMS({
                    // projection:"EPSG:3115",
                    url: 'http://localhost:8080/geoserver/cahibi1/wms',
                    params: {
                        'FORMAT': "image/png",
                        'LAYERS': `cahibi1:mapa_base`,
                        tiled: true,
                    },
                    serverType: 'geoserver',
                    transparent: true
                })
                //     })
                // ]
            })]
        });

        let mPopup = this.popup
        closer.onclick = function () {
            mPopup.setPosition(undefined);
            closer.blur();
            return false;
        };

        this.mMap.on('click', this.clickHandler, this)

        if (layers) {
            layers.map((layer) => {
                this.addLayerToMap(layer, this.mMap)
            })

            console.log('layers', layers)
            if (filter) {
                this.filterMapLayers(filter)
                this.onLayersChange(filter)
            } else {
                this.filterMapLayers(null)
            }
        }
    }



    render() {
        const { selected, filter } = this.props

        this.filterMapLayers(filter)
        // this.onLayersChange(filter)

        // this.updateSelection(selected)
        return (
            <Segment>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <section className="panel-map">
                            <div ref='map' className="map" ></div>
                            <div ref="popup" className="ol-popup">
                                <a href="#" ref="popup-closer" className="ol-popup-closer"></a>
                                <div ref="popup-content"></div>
                                <div ref="info">&nbsp;</div>
                            </div>
                            <div ref="information">&nbsp;</div>
                        </section>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <LayerSwitcher></LayerSwitcher>
                    </Grid.Column>
                </Grid.Row>
            </Segment>

        );
    }
}

export default MapComponent;
