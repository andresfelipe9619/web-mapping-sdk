import React, { Component } from 'react';
import SdkZoomControl from '@boundlessgeo/sdk/components/map/zoom-control';
import Scaleline from '@boundlessgeo/sdk/components/map/scaleline';
import LayerList from '@boundlessgeo/sdk/components/layer-list';
// import MapPanel from '@boundlessgeo/sdk/components/MapPanel';
import SdkMap from '@boundlessgeo/sdk/components/map';
import * as SdkMapActions from '@boundlessgeo/sdk/actions/map';
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

    render(){
        const mBorder = {borderStyle: 'solid', borderColor: '#3BA2FB'};
        return (
            <div>
                <Grid>
                    <Grid.Column width={14} style={mBorder}>
                        <SdkMap>
                            <SdkZoomControl />
                            <Scaleline />
                        </SdkMap>
                    </Grid.Column>
                    <Grid.Column width={2} style={mBorder}>
                        <LayerList></LayerList>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initialLoad: () => {

            dispatch(SdkMapActions.setView([
                -76.52563361025985, 3.5077020719791223
            ], 16));

            dispatch(SdkMapActions.addOsmSource('osm'));

            // add an OSM layer
            dispatch(SdkMapActions.addLayer({ id: 'osm', source: 'osm' }));


            const clasificadorasUrl = `http://localhost:8080/geoserver/my_web_app/wms?service=WMS&version=1.1.0&request=GetMap&layers=my_web_app:clasificadoras&styles=&bbox=1061365.36661719,879657.369418114,1061459.79364869,879702.249508635&width=768&height=365&srs=EPSG:3115&format=image%2Fpng&TRANSPARENT=TRUE`;

            // this requires CORS headers on the geoserver instance.
            // const url = 'https://demo.boundlessgeo.com/geoserver/wms?service=WMS&request=GetCapabilities';

            // const getMapUrl = `https://demo.boundlessgeo.com/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&SRS=EPSG:900913&LAYERS=${layer.Name}&STYLES=&WIDTH=256&HEIGHT=256&BBOX={bbox-epsg-3857}`;
            dispatch(SdkMapActions.addSource('clasificadoras', {
              type: 'raster',
              tileSize: 256,
              tiles: [clasificadorasUrl],
            }));
            dispatch(SdkMapActions.addLayer({
              type: 'raster',
              metadata: {
                'bnd:title': 'clasificadoras',
              },
              id: 'clasificadoras',
              source: 'clasificadoras',
            }));
        }
    }
}


export default connect(null, mapDispatchToProps)(Map);

// fetch(url).then(response => response.text(), error => console.error('An error occured.', error), ).then(xml => {
//     //   const info = new WMSCapabilitiesFormat().read(xml);
//     //   const root = info.Capability.Layer;

//     // fetch(mallasUrl).then(result => console.log(result));

//     dispatch(SdkMapActions.addSource('mallas', {
//         type: 'raster',
//         tileSize: 256,
//         tiles: [mallasUrl]
//     }));

//     dispatch(SdkMapActions.addLayer({
//         type: 'raster',
//         metadata: {
//             'bnd:title': 'mallas'
//         },
//         id: 'mallas',
//         source: 'mallas'
//     }));
// })