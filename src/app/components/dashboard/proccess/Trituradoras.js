import React, { Component } from 'react'
import { connect } from 'react-redux';
import DataTable from '../DataTable'
import FeatureTable from './../../table/FeatureTable';

class Trituradoras extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trituradoras: null
    }
  }
  componentDidMount() {
    fetch(`http://localhost:8080/geoserver/cahibi1/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:trituradoras&outputFormat=application%2Fjson`)
      .then(response => {
        if (!response.ok) {
          // dispatch(alertError(response));
          return Promise.reject(response.statusText);
        }
        return response.json();
      }).then((response) => {
        this.setState({ trituradoras: response.features })
      })
  }

  render() {
    if (this.state.trituradoras) {
      return (
        <div>
          <FeatureTable data={this.state.trituradoras} />
        </div>
      )
    } else return null
  }
}

export default Trituradoras