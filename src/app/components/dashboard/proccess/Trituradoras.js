import React, { Component } from 'react'
import { connect } from 'react-redux';
import DataTable from '../DataTable'

class Trituradoras extends Component {
  render() {
    return (
      <div>
        <DataTable data={this.props.trituradoras} />
        
      </div>
    )
  }
}
const MapStateToProps = state =>{
    return{
        trituradoras: state.map.sources.trituradoras.data.features
    }
}

export default connect(MapStateToProps,null)(Trituradoras)