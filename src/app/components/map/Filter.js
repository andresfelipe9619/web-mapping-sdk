import React from 'react';
import {connect} from 'react-redux';
import * as mapActions from '@boundlessgeo/sdk/actions/map';
import PropTypes from 'prop-types';

// Custom Filter Component
class FilterComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    // List of keys to use from the loaded geojson to be filtered
    const keysFromData = [
      {name: 'nombre', prettyName: 'Nombre'},
      {name: 'capacidad', prettyName: 'Capacidad'},
      {name: 'velocidad', prettyName: 'Velocidad'},
      {name: 'estado', prettyName: 'Estado'},

    ];
    this.state = {
      operator: '==',
      key: '',
      filterValue: '',
      keyOptions: keysFromData
    };

    this.handleChange = this.handleChange.bind(this); 
  }
  // Change handler to keep track of state
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // get current filters
  currentFilters(source) {
    const layers = this.props.map.layers;
    for (let i = 0, ii = layers.length; i < ii; i++) {
      if (layers[i].id === source) {
        return !layers[i].filter ? [] : layers[i].filter;
      }
    }
    return [];
  }

  // Build list of filter components
  currentFilterList(source) {
    const currentFilters = this.currentFilters(source);
    const filterList = [];
    for (let i = 0, ii = currentFilters.length; i < ii; i++) {
      if (typeof currentFilters[i] === 'object') {
        filterList.push(<li key={i}>[&quot;{currentFilters[i][0]}&quot;, &quot;{currentFilters[i][1]}&quot;, &quot;{currentFilters[i][2]}&quot;]</li>);
      }
    }
    return filterList;
  }

  // Action applying the filter
  addFilter() {
    const value = isNaN(parseFloat(this.state.filterValue)) ?
      this.state.filterValue :
      parseFloat(this.state.filterValue);

    const currentFilter = this.currentFilters(this.props.source);
    if (currentFilter.length === 0) {
      currentFilter.push('any');
    }
    const filter = [this.state.operator, this.state.key, value];
    this.props.updateLayer(this.props.source, {filter: [...currentFilter, filter]});

  }

  // Action on reset
  reset() {
    this.props.clearLayerFilter(this.props.source);
  }

  // Get list of keys
  getKeyOptions(source) {
    const keys = this.state.keyOptions;
    const options = [];
    for (let i = 0, ii = keys.length; i < ii; i++) {
      options.push(<option key={i} value={keys[i].name}>{keys[i].prettyName}</option>);
    }
    return options;
  }

  render() {
    var options = this.getKeyOptions(this.props.source);
    var currentFilters = this.currentFilterList(this.props.source);
    return (
      <div className='filter-box'>
        <div className='interior'>
          <div className="form-group">
            <label>Key: </label>
            <select className="input-control" name='key' value={this.state.key} onChange={this.handleChange}>
              <option value="">Select</option>
              {options}
            </select>
          </div>
          <div className="form-group">
            <label>Operator: </label>
            <select className="input-control" name='operator' value={this.state.operator} onChange={this.handleChange}>
              <option value="==">equal</option>
              <option value="!=">not equal</option>
              <option value=">">greater than</option>
              <option value=">=">greater than or equal</option>
              <option value="<">less than</option>
              <option value="<=">less than or equal</option>
            </select>
          </div>
          <div className="form-group">
            <label>Value:</label>
            <input className="input-control" type="text" name='filterValue' value={this.state.filterValue} onChange={this.handleChange} />
          </div>
          <div className="form-group info">
            <h3>Current Filters: </h3><br/>
            <ul className="filter-list">
              {currentFilters}
            </ul>
          </div>
          <div className="form-group">
            <button className="sdk-btn button-control" onClick={() => {
              this.addFilter();
            }} >Add Filter</button>
            <button className="sdk-btn button-control" onClick={() => {
              this.reset();
            }} >Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

// Getting the map stores
function mapStateToProps(state) {
  return {
    map: state.map
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateLayer: (sourceName, filter) => {
      dispatch(mapActions.updateLayer(sourceName, filter));
    },
    clearLayerFilter: (sourceName) => {
      dispatch(mapActions.clearLayerFilter(sourceName));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
