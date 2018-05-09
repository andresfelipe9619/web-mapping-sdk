import React, {Component} from 'react';
import logo from './logo.svg';
import {connect} from 'react-redux'
import './App.css';
import SdkZoomControl from '@boundlessgeo/sdk/components/map/zoom-control';
import Scaleline from '@boundlessgeo/sdk/components/map/scaleline';
import LayerList from '@boundlessgeo/sdk/components/layer-list';
// import MapPanel from '@boundlessgeo/sdk/components/MapPanel';
import SdkMap from '@boundlessgeo/sdk/components/map';
import * as SdkMapActions from '@boundlessgeo/sdk/actions/map';

class App extends Component {
  componentDidMount() {
    // add the OSM source
    this
      .props
      .initialLoad();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit
          <code>src/App.js</code>
          and save to reload.
        </p>
        <SdkMap>
          <SdkZoomControl/>
          <Scaleline/>
        </SdkMap>
          <LayerList></LayerList>
        <div>
          <p>Footer</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initialLoad: () => {
      const getMapUrl = `http://localhost:8080/geoserver/my_web_app/wms?service=WMS&version=1.1.0&request=GetMap&layers=my_web_app:bandas&styles=&bbox=1061320.99028061,879652.17093466,1061471.51196961,879719.005935081&width=768&height=341&srs=EPSG:3115`;

      dispatch(SdkMapActions.setView([
        -76.52563361025985, 3.5077020719791223
      ], 16));

      dispatch(SdkMapActions.addOsmSource('osm'));

      // add an OSM layer
      dispatch(SdkMapActions.addLayer({id: 'osm', source: 'osm'}));

      dispatch(SdkMapActions.addSource('bandas', {
        type: 'raster',
        tileSize: 256,
        tiles: [getMapUrl]
      }));
      dispatch(SdkMapActions.addLayer({
        type: 'raster',
        metadata: {
          'bnd:title': 'bandas'
        },
        id: 'bandas',
        source: 'bandas'
      }));
    }
  }
}

export default connect(null, mapDispatchToProps)(App);
