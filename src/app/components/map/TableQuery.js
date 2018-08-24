import React, { Component } from 'react'
import { connect } from 'react-redux'
import FeatureTable from '../table/FeatureTable';
import { Segment, Dimmer, Grid, Loader, Icon, Button } from 'semantic-ui-react';
import { updateMapFeatures, selectLayer } from '../../actions/mapActions';
import { Switch, Route } from 'react-router-dom';

class TableQuery extends Component {
  clickedWatch = (row) => {
    console.log("u click me" + row)

    this.watchClasificadora(row);
  }

  watchClasificadora(id) {
    console.log("u click me" + id)
  }

  componentDidMount() {
    if (this.props.filter) {
      this.props.updateMapFeatures(this.props.filter)
    }
  }

  render() {
    const callbacks = { acciones: this.clickedWatch }
    const { currentMapFeatures, featuresHasErrored, featuresIsLoading, match } = this.props

    const ActionsComponent = ({ row, CustomFunction }) => {
      // const obj = row.reduce((o, key) => ({ ...o, [key]: o[key]}), {})
      const handleclickedWatch = () => CustomFunction(row);
      return (
        <Button.Group icon>
          <Button onClick={handleclickedWatch}>
            <Icon name='eye' />
          </Button>
        </Button.Group>
      )
    }

    if (featuresIsLoading) {
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
    } else if (featuresHasErrored) {
      return <h1>Error</h1>;

    } else if (currentMapFeatures) {

      return (
        <div>
          <Switch>
            <Route exact path={match.url + "/mallas"} render={()=><FeatureTable data={currentMapFeatures.features} />} />
            <Route exact path={match.url + "/bandas"} render={()=><FeatureTable data={currentMapFeatures.features} />} />
            <Route exact path={match.url + "/cantera"} render={()=><FeatureTable data={currentMapFeatures.features} />} />
            <Route exact path={match.url + "/clasificadora"} render={()=><FeatureTable data={currentMapFeatures.features} />} />
            <Route exact path={match.url + "/trituradora"} render={()=><FeatureTable data={currentMapFeatures.features} />} />
            <Route exact path={match.url + "/procrudo"} render={()=><FeatureTable data={currentMapFeatures.features} />} />
            <Route exact path={match.url + "/profinal"} render={()=><FeatureTable data={currentMapFeatures.features} />} />
            <Route exact path={match.url + "/origen"} render={()=><FeatureTable data={currentMapFeatures.features} />} />
          </Switch>
          {/* <FeatureTable data={currentMapFeatures.features} component={ActionsComponent} callbacks={callbacks}></FeatureTable> */}
        </div>
      )
    } else return null
  }
}

const mapStateToProps = state => {
  return {
    currentMapFeatures: state.mapReducer.currentMapFeaturesSuccess,
    featuresIsLoading: state.mapReducer.currentMapFeaturesRequest,
    featuresHasErrored: state.mapReducer.currentMapFeaturesError,
    filter: state.mapReducer.currentFilter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateMapFeatures: (filter) => dispatch(updateMapFeatures(filter))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TableQuery);   