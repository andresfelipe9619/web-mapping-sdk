import React, { Component } from 'react'
import { connect } from 'react-redux';
import DataTable from '../DataTable'

class Clasificadoras extends Component {
  render() {
    return (
      <div>
        <DataTable data={this.props.clasificadoras} actions={()=><p>Zoom In</p>}/>
      </div>
    )
  }
}

const MapStateToProps = state =>{
    return{
        clasificadoras: state.map.sources.clasificadoras.data.features
    }
}

export default connect(MapStateToProps,null)(Clasificadoras)