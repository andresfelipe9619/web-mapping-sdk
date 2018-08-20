import React, { Component } from 'react'
import ReactCollapsingTable from 'react-collapsing-table'
import { Segment } from "semantic-ui-react";

class FeatureTable extends Component {


    loadTableData(data) {
        let tableData = {
            columns: [],
            accessors: [],
            mData: []
        }
        let { component } = this.props;


        for (var element of data) {

            tableData.mData.push(element.properties)
            const temp = Object.keys(element.properties);
            for (let j = 0, jj = temp.length; j < jj; j++) {
                if (tableData.accessors.indexOf(temp[j]) < 0) {
                    if (temp[j] == 'bbox' || temp[j] == 'este' || temp[j] == 'norte' || temp[j] == 'gid') {
                        continue
                    } else {
                        tableData.accessors.push(temp[j])
                        tableData.columns.push({
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
            let last = tableData.accessors.length
            tableData.columns.push({ accessor: 'acciones', label: 'acciones', priorityLevel: last, position: last, minWidth: 50, CustomComponent: component })
        }
        console.log('cols', tableData.columns)
        return tableData;

    }

    render() {

        let { data, callbacks } = this.props;

        if (data) {
            let { columns, mData } = this.loadTableData(data)
            
            if (mData.length) {

                if (callbacks) {
                    return (
                        <div>
                            <Segment>
                                <ReactCollapsingTable theme={{ width: "60px" }} rows={mData} columns={columns} callbacks={callbacks} showSearch showPagination rowSize={10} />
                            </Segment>
                        </div>
                    )
                }

                return (
                    <div>
                        <Segment>
                            <ReactCollapsingTable rows={mData} columns={columns} showSearch showPagination rowSize={10} />
                        </Segment>
                    </div>
                )
            } else {
                return (
                    <Segment>
                        <h2>No hay datos para mostrar</h2>
                    </Segment>)
            }
        }else return null
    }
}


export default FeatureTable;  