import React, { Component } from 'react'
import { Segment, Icon , Button } from "semantic-ui-react";
import FeatureTable from '../../table/FeatureTable'

class Mallas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mallas: null
    }
  }

  componentDidMount() {
    fetch(`http://localhost:8080/geoserver/cahibi1/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:mallas&outputFormat=application%2Fjson`)
      .then(response => {
        if (!response.ok) {
          // dispatch(alertError(response));
          return Promise.reject(response.statusText);
        }
        return response.json();
      }).then((response) => {
        this.setState({ mallas: response.features })
      })
  }

  render() {


    if (this.state.mallas) {
      return (
        <div>
            <Segment> <h2>Mallas</h2></Segment>

              <FeatureTable data={this.state.mallas} />
        </div>
      )
    } else return null;
  }
}

export default Mallas;