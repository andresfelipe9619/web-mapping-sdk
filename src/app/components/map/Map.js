import React, { Component } from 'react';
import LayerList from '@boundlessgeo/sdk/components/layer-list';
import SdkZoomControl from '@boundlessgeo/sdk/components/map/zoom-control';
import SdkZoomSlider from '@boundlessgeo/sdk/components/map/zoom-slider';
import SdkMousePosition from '@boundlessgeo/sdk/components/map/mouseposition';
import SdkScaleLine from '@boundlessgeo/sdk/components/map/scaleline';
import SdkPopup from '@boundlessgeo/sdk/components/map/popup';
import SdkMap from '@boundlessgeo/sdk/components/map';
import Menu from './MenuMapa'

import * as SdkMapActions from '@boundlessgeo/sdk/actions/map';
import * as SdkWfsActions from '@boundlessgeo/sdk/actions/wfs';
import WMSCapabilitiesFormat from 'ol/format/wmscapabilities';
import Table from './SdkTable'
import FilterComponent from './Filter';
import { connect } from 'react-redux';
import {
    Grid,
    Header,
    Segment,
    Dimmer,
    Loader,
    Container
} from "semantic-ui-react";

class MarkFeaturesPopup extends SdkPopup {

    // constructor(props) {
    //     super(props);
    //     this.markFeatures = this.markFeatures.bind(this);
    // }

    // markFeatures(evt) {
    //     const feature_ids = [];
    //     const features = this.props.features;

    //     for (let i = 0, ii = features.length; i < ii; i++) {
    //         // create an array of ids to be removed from the map.
    //         feature_ids.push(features[i].properties.id);
    //         // set the feature property to "marked".
    //         features[i].properties.isMarked = true;
    //     }

    //     // remove the old unmarked features
    //     store.dispatch(mapActions.removeFeatures('points', ['in', 'id'].concat(feature_ids)));
    //     // add the new freshly marked features.
    //     store.dispatch(mapActions.addFeatures('points', features));
    //     // close this popup.
    //     this.close(evt);
    // }

    render() {
        const feature_ids = this.props.features.map(f => f.properties.id);

        return this.renderPopup((
            <div className="sdk-popup-content">
                You clicked here:<br />
                <code>
                    {this.props.coordinate.hms}
                </code>
                <br />
                <p>
                    Feature ID(s):<br />
                    <code>{feature_ids.join(', ')}</code>
                    <br />
                    {/* <button className="sdk-btn" ref={(c) => {
                        if (c) {
                            c.addEventListener('click', this.markFeatures);
                        }
                    }}>
                        Mark this feature
            </button> */}
                </p>
            </div>
        ));
    }
}

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
                        <Grid.Column width={4}>
                        <Menu></Menu>
                        </Grid.Column>
                        <Grid.Column width={10} style={mBorder}>
                            <SdkMap
                                includeFeaturesOnClick
                                onClick={(map, xy, featuresPromise) => {
                                    console.log('PROMISE', featuresPromise)
                                    featuresPromise.then((featureGroups) => {
                                        // setup an array for all the features returned in the promise.
                                        let features = [];
                                        console.log('GROUPSSSSSSSSSSS', featureGroups)
                                        // featureGroups is an array of objects. The key of each object
                                        // is a layer from the map.
                                        for (let g = 0, gg = featureGroups.length; g < gg; g++) {
                                            // collect every feature from each layer.
                                            const layers = Object.keys(featureGroups[g]);
                                            for (let l = 0, ll = layers.length; l < ll; l++) {
                                                const layer = layers[l];
                                                features = features.concat(featureGroups[g][layer]);
                                            }
                                        }

                                        if (features.length === 0) {
                                            // no features, :( Let the user know nothing was there.
                                            map.addPopup(<SdkPopup coordinate={xy} closeable><i>No features found.</i></SdkPopup>);
                                        } else {
                                            // Show the super advanced fun popup!
                                            map.addPopup(<MarkFeaturesPopup coordinate={xy} features={features} closeable />);
                                        }
                                    }).catch((exception) => {
                                        console.error('An error occurred.', exception);
                                    });
                                }}>
                                <SdkScaleLine />
                                <SdkMousePosition style={{ position: 'absolute', top: 20, right: 12, zIndex: 1, width: '5em' }} />
                                <SdkZoomControl />
                                <SdkZoomSlider />
                            </SdkMap>
                        </Grid.Column>
                        <Grid.Column width={2} style={mBorder}>
                            <LayerList />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <FilterComponent source="clasificadoras" />
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
                        if (layer.Title === 'mallas3' || layer.Title === 'clasificadoras' || layer.Title === 'cantera' ||
                            layer.Title === 'bandas' || layer.Title === 'productocrudo' || layer.Title === 'productofinal' || layer.Title === 'trituradoras' || layer.Title === 'mezclas') {
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
                                    console.log('Feature', feature)

                                    dispatch(SdkMapActions.addFeatures(layersName[i], [{
                                        type: 'Feature',
                                        properties: {
                                            id: feature.id,
                                            ...feature.properties
                                        },
                                        geometry: {
                                            type: feature.geometry.type,
                                            coordinates: feature.geometry.coordinates,
                                        },
                                    }]))
                                })
                            })
                    }
                })
                // .then(()=>{
                //      dispatch(SdkMapActions.updateLayer('clasificadoras', {filter: ["==","velocidad", 3]}));

                // })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}


export default connect(null, mapDispatchToProps)(Map);
