import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Table, Checkbox, Button, Icon, Header, Segment, Dimmer, Loader, Modal } from 'semantic-ui-react';
import { fetchUserDispatcheds } from '../../../actions/dispatchedsActions';

import DataTable from '../DataTable'

class ClientDispatcheds extends Component {

    componentDidMount() {
            this.props.getUserDispatcheds(this.props.match.params)
    }

    render() {
        const dispatcheds = this.props.dispatcheds;
        console.log('DISPATCHEDS?: ', this.props)
        if (this.props.hasErrored) {
            return <h1>Error</h1>;
        } else if (this.props.isLoading) {
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
        } else if (dispatcheds) {

            return (
                <div>
                    <DataTable data={dispatcheds}  />
                </div>
            );
        } else return null;
    }
}



const mapStateToProps = state => {
    return {
        // users: state.userReducer.fetchUsersSuccess,        
        dispatcheds: state.dispatchedReducer.fetchUserDispatchedsSuccess,
        dispatchedsFailure: state.dispatchedReducer.fetchUserDispatchedsFailure,
        dispatchedsLoading: state.dispatchedReducer.fetchUserDispatchedsRequest,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserDispatcheds: (user) => {
            dispatch(fetchUserDispatcheds(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientDispatcheds)
