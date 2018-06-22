import React, { Component } from 'react'
import ReactCollapsingTable from 'react-collapsing-table'
import {  Segment } from "semantic-ui-react";

class FeatureTable extends Component {
    render() {

        let { data, component, callbacks, } = this.props;
        let columns = [];
        let accessors = [];
        let mData = []


            for (var element of data) {
                // if(element.properties.nombre){
                //     element.properties.nombre = element.properties.nombre.toUpperCase()
                // }
                mData.push(element.properties)
                const temp = Object.keys(element.properties);
                for (let j = 0, jj = temp.length; j < jj; j++) {
                    if (accessors.indexOf(temp[j]) < 0) {
                        if (temp[j] == 'bbox' || temp[j] == 'este' || temp[j] == 'norte' || temp[j] == 'gid' ) {
                            continue
                        } else {
                            console.log('EMP', temp[j])
                            accessors.push(temp[j])
                            columns.push({
                                accessor: temp[j],
                                label: temp[j],
                                priorityLevel: j + 1,
                                position: j + 1,
                                minWidth: 50,
                                key: j
                            })
                        }
                    }
                }
            }
            if (component) {
                let last = accessors.length
                columns.push({ accessor: 'acciones', label: 'acciones', priorityLevel: last, position: last, minWidth: 50, CustomComponent: component })
            }
            console.log('cols', columns)
    
            if (callbacks) {
                return (
                    <div>
                        <Segment>
                        <ReactCollapsingTable theme={{width:"60px"}} rows={mData} columns={columns} callbacks={callbacks} showSearch showPagination rowSize={10} />
                        </Segment>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Segment>
                        <ReactCollapsingTable rows={mData} columns={columns} showSearch showPagination rowSize={10} />
                        </Segment>
                    </div>
                )
            }
    }
}


export default FeatureTable;  