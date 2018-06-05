import React, { Component } from 'react'
import { Table, Checkbox, Button, Icon, Header, Segment, Dimmer, Grid, Loader, Modal } from 'semantic-ui-react';
import SortableTbl from 'react-sort-search-table';

class FeatureTable extends Component {
    render() {
        if (this.props.data) {
            var mData = [];
            let tHead = [];
            let col = [];

            for (var element of this.props.data) {
                mData.push(element.properties)
                const temp = Object.keys(element.properties);
                for (let j = 0, jj = temp.length; j < jj; j++) {
                    // if the feature.properties is new add it to headers
                    if (tHead.indexOf(temp[j]) < 0) {
                        tHead.push(temp[j]);
                        col.push(temp[j])
                    }
                }
            }
            if (this.props.actions) {
                let mActions = [];
                const mButton = () => <Button primary>Ver Mallas</Button>;

                for (var action of this.props.actions) {
                    if (tHead.indexOf(action.name) < 0) {
                        tHead.push(action.name);
                        col.push(action.name)
                    }
                    mActions.push({ custd: mButton, keyItem: action.name })
                }
                return (
                    <div>
                        <SortableTbl
                            tblData={mData}
                            tHead={tHead}
                            dKey={col}
                            customTd={mActions}
                            search={true}
                        />
                    </div>
                )

            } else {
                return (
                    <div>
                        <SortableTbl
                            tblData={mData}
                            tHead={tHead}
                            dKey={col}
                            search={true}
                        />
                    </div>
                )
            }
        } else return null;
    }
}


export default FeatureTable;  