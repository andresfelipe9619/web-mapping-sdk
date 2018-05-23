import React, { Component } from 'react';
import SdkZoomControl from '@boundlessgeo/sdk/components/map/zoom-control';
import Scaleline from '@boundlessgeo/sdk/components/map/scaleline';
import LayerList from '@boundlessgeo/sdk/components/layer-list';
// import MapPanel from '@boundlessgeo/sdk/components/MapPanel';
import WMSCapabilitiesFormat from 'ol/format/wmscapabilities';
import SdkMap from '@boundlessgeo/sdk/components/map';
import * as SdkMapActions from '@boundlessgeo/sdk/actions/map';
import * as SdkWfsActions from '@boundlessgeo/sdk/actions/wfs';
import Table from './Table'

// import { REGISTER_FAILURE } from './actions/constants/ActionTypes';
import { connect } from 'react-redux';
import {
    Grid,
    Header,
    Segment,
    Dimmer,
    Loader,
    Container
} from "semantic-ui-react";
class Map extends Component {

    componentDidMount() {
        this.props.initialLoad();
    }

    render() {
        const mBorder = { borderStyle: 'solid', borderColor: '#3BA2FB' };
        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={14} style={mBorder}>
                            <SdkMap>
                                <SdkZoomControl />
                                <Scaleline />
                            </SdkMap>
                        </Grid.Column>
                        <Grid.Column width={2} style={mBorder}>
                            <LayerList></LayerList>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Table />
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initialLoad: () => {
            const layersName = [];
            dispatch(SdkMapActions.setView([
                -76.52563361025985, 3.5077020719791223
            ], 16));

            dispatch(SdkMapActions.addOsmSource('osm'));

            // add an OSM layer
            dispatch(SdkMapActions.addLayer({ id: 'osm', source: 'osm' }));

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
                        if (layer.Title == 'mallas' || layer.Title == 'clasificadoras' || layer.Title == 'bandas' || layer.Title == 'productocrudo' || layer.Title == 'productofinal') {
                            const layerUrl = `http://localhost:8080/geoserver/my_web_app/wms?service=WMS&version=1.1.0&request=GetMap&layers=my_web_app:${layer.Name}&styles=&bbox=1060980.05,879701.83,1061502.75,880039.71&width=768&height=496&srs=EPSG:3115&format=image/png&transparent=true`

                            layersName.push(layer.Title);
                            dispatch(SdkMapActions.addSource(layer.Name, {
                                type: 'raster',
                                tileSize: 256,
                                tiles: [layerUrl],
                            }));

                            dispatch(SdkMapActions.addLayer({
                                type: 'raster',
                                metadata: {
                                    'bnd:title': layer.Title,
                                    'bnd:queryable': layer.queryable,
                                },
                                id: layer.Name,
                                source: layer.Name,
                            }));

                        }
                    })
                })
                .then(() => {
                    for (let i in layersName) {
                        fetch(`http://localhost:8080/geoserver/my_web_app/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=my_web_app:${layersName[i]}&outputFormat=application/json`)
                            .then(
                                response => response.json(),
                                error => console.error('An error occured.', error
                                ))
                            .then((json) => {
                                console.log(json)
                                if (json) {
                                    const root = json.features;
                                    console.log('ROOT WFS', root)
                                    return root;
                                } else {
                                    return Promise.reject('Bad request');
                                }
                            })
                            .then((features) => {
                                features.map((feature) => {
                                    dispatch(SdkMapActions.addFeatures(layersName[i], [{
                                        type: 'Feature',
                                        properties: {
                                            id: feature.id,
                                            nombre: feature.properties.nombre,
                                            estado: feature.properties.estado,
                                            capacidad: feature.properties.capacidad,
                                            velocidad: feature.properties.velocidad,

                                        },
                                        geometry: {
                                            type: feature.geometry.type,
                                            // this generates a point somewhere on the planet, unbounded.
                                            coordinates: feature.geometry.coordinates,
                                        },
                                    }]))
                                })
                            })
                    }


                }).catch(err => {
                    console.log(err)
                })
        }
    }
}


export default connect(null, mapDispatchToProps)(Map);
