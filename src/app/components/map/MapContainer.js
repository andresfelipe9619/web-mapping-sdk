import { connect } from 'react-redux'

import Map from './Map'
import { updateMapFeatures, selectLayer } from '../../actions/mapActions';

// Map Redux state to component props
const mapStateToProps = (state) => {
  return {
    selected: state.mapReducer.selectedLayer,
    filter: state.mapReducer.currentFilter
  }
}

// Map Redux actions to component props
const mapDispatchToProps = (dispatch) => {
  return {
    onSelectClick: selected => dispatch(selectLayer(selected)),
    updateMapFeatures: (filter) => dispatch(updateMapFeatures(filter))
  }
}

// Connected Container:
const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer
