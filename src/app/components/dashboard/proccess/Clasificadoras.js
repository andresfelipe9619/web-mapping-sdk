import React, { Component } from 'react'
import { connect } from 'react-redux';
import DataTable from '../DataTable'
import FeatureTable from './../../table/FeatureTable';

class Clasificadoras extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clasificadoras: null
    }
  }
  componentDidMount() {
    fetch(`http://localhost:8080/geoserver/my_web_app/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=my_web_app:clasificadoras&outputFormat=application%2Fjson`)
      .then(response => {
        if (!response.ok) {
          // dispatch(alertError(response));
          return Promise.reject(response.statusText);
        }
        return response.json();
      }).then((response) => {
        this.setState({ clasificadoras: response.features })
      })
  }

  render() {
    if (this.state.clasificadoras) {
      return (
        <div>
          <FeatureTable data={this.state.clasificadoras} />
        </div>
      )
    } else return null
  }
}

export default Clasificadoras