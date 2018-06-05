import React, { Component } from 'react'
import DataTable from '../DataTable'
import { connect } from 'react-redux';
import SortableTbl from 'react-sort-search-table';
import Select from 'react-select'
import { Grid, Header, Segment, Dimmer, Loader, Button } from "semantic-ui-react";
import FeatureTable from '../../table/FeatureTable'
import { fetchProducts } from '../../../actions/productActions';

class Mallas extends Component {


  render() {

    var options = [
      { value: '10/3/2016', label: '10/3/2016' },
      { value: '10/5/2016', label: '10/5/2016' }
    ]
    const { products } = this.props;

    console.log('TABLE PROPS: ', this.props)
    if (this.props.productsHasErrored) {
      return <h1>Error</h1>;
    } else if (this.props.productsIsLoading) {
      return (
        <Segment
          style={{
            marginTop: "7em",
            height: "20em"
          }}
        >
          <Dimmer inverted active>
            <Loader size="big">Loading</Loader>
          </Dimmer>
        </Segment>
      );
    } else if (products) {

      return (
        <div>
            <Grid.Row>
              <Grid.Column width={4}>
                Desde
            <Select
                  name="desde"
                  options={options}
                  defaultValue='10/3/2016'
                  // onChange={this.handleChange}
                  isSearchable={true}

                />
              </Grid.Column>
              <Grid.Column width={4}>
                Hasta
            <Select
                  name="hasta"
                  options={options}
                  defaultValue='10/5/2016'
                  // onChange={this.handleChange}
                  isSearchable={true}
                />
              </Grid.Column>

              <Grid.Column width={4}>
                <Button style={{ marginTop: '20px' }} primary >Consultar</Button>
              </Grid.Column>
            </Grid.Row>
            <br />
            <Grid.Row>
              <Grid.Column width={13}>
                <FeatureTable data={products} />
              </Grid.Column>
            </Grid.Row>
        </div>
      )
    }else return null;
  }
}

const mapStateToProps = state => {
  return {

    products: state.productReducer.fetchProductsSuccess,
    productsHasErrored: state.productReducer.fetchProductsFailure,
    productsIsLoading: state.productReducer.fetchProductsRequest,

  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => {
      dispatch(fetchProducts())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Mallas);   