import React, { Component } from 'react'
import DataTable from '../DataTable'
import { connect } from 'react-redux';
import SortableTbl from 'react-sort-search-table';
import { Grid, Header, Segment, Dimmer, Loader, Button } from "semantic-ui-react";
import FeatureTable from '../../table/FeatureTable'
import { fetchProducts } from '../../../actions/productActions';

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
            <Grid.Column width={13}>
              <FeatureTable data={this.state.mallas} />
            </Grid.Column>
        </div>
      )
    } else return null;
  }
}

export default Mallas;