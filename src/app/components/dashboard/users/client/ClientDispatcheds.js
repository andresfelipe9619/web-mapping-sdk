import React, { Component } from 'react'
import { connect } from 'react-redux';
import Select from 'react-select'
import { Table, Checkbox, Button, Icon, Header, Segment, Dimmer, Grid, Loader, Modal } from 'semantic-ui-react';
import { fetchUserDispatcheds, fetchDispatcheds } from '../../../../actions/dispatchedsActions';
import { fetchTotalProduct } from '../../../../actions/productActions';

import FeatureTable from '../../../table/FeatureTable'


class ClientDispatcheds extends Component {


    componentDidMount() {
        var { match } = this.props;
        console.log('MATCH', match)
        if (match.url.includes('mallas')) {

            this.props.getUserDispatcheds(match.params.clientid, match.params.productid, true)
        }
        else if (match.params.productid) {

            this.props.getUserDispatcheds(match.params.clientid, match.params.productid)

        } else if (match.params.clientid) {

            this.props.getUserDispatcheds(match.params.clientid)
        }
    }

    render() {
        var { match } = this.props;

        const userDispatcheds = this.props.userDispatcheds;
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
        } else if (userDispatcheds) {
            if (match.url.includes('mallas')) {
                return (
                    <div>
                        <Header as="h2">Mallas Origen Despachos al cliente {match.params.clientid}</Header>
                        <FeatureTable data={userDispatcheds} actions={
                            [{ component: () => <p>Hello</p>, keyItem: 'acciones' }]
                        } />
                    </div>
                );
            }
            else if (match.params.productid) {

                return (
                    <div>
                        <Header as="h2">Despachos al cliente {match.params.clientid} con producto  {match.params.productid} </Header>
                        <FeatureTable data={userDispatcheds} actions={
                            [{ component: () => <p>Hello</p>, keyItem: 'acciones' }]
                        } />
                    </div>
                );

            } else if (match.params.clientid) {

                return (
                    <div>
                        <Header as="h2">Despachos al cliente {match.params.clientid}</Header>

                        <FeatureTable data={userDispatcheds} actions={
                            [{ component: () => <p>Hello</p>, keyItem: 'acciones' }]
                        } />
                    </div>
                );
            }

        } else return null;
    }
}



const mapStateToProps = state => {
    return {
        // users: state.userReducer.fetchUsersSuccess,        
        userDispatcheds: state.dispatchedReducer.fetchUserDispatchedsSuccess,
        userDispatchedsFailure: state.dispatchedReducer.fetchUserDispatchedsFailure,
        userDispatchedsLoading: state.dispatchedReducer.fetchUserDispatchedsRequest,

        totalProduct: state.productReducer.fetchTotalProductSuccess,
        totalProductHasErrored: state.productReducer.fetchTotalProductFailure,
        totalProductIsLoading: state.productReducer.fetchTotalProductRequest,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserDispatcheds: (user, product, mallas) => {
            dispatch(fetchUserDispatcheds(user, product, mallas))
        },
        getTotalProduct: () => {
            dispatch(fetchTotalProduct())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientDispatcheds)
