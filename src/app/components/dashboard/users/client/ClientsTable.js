import React, { Component } from 'react';
import { Table, Checkbox, Button, Icon, Header, Segment, Dimmer, Grid, Loader, Modal, Form } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { fetchClients } from '../../../../actions/userActions';
import { fetchProducts } from '../../../../actions/productActions';
import { fetchDispatcheds } from '../../../../actions/dispatchedsActions';
import ClientQuery from './ClientQuery'
import ClientDispatcheds from './ClientDispatcheds';
import { Route, Switch } from "react-router-dom";
import FeatureTable from '../../../table/FeatureTable'


class ClientsTable extends Component {


    componentDidMount() {
        const { clientes, productos, despachos } = this.props;

        this.props.getClients();
        this.props.getProducts();
        this.props.getDispatcheds();
    }

    render() {

        const { clients, products, dispatcheds, match, history } = this.props;

        console.log('TABLE PROPS: ', this.props)
        if (this.props.clientsHasErrored) {
            return <h1>Error</h1>;
        }
        // else if (this.state.path) {
        //     return <Redirect to={this.state.path}></Redirect>
        // }
        else if (this.props.clientsIsLoading) {
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
        } else if (clients && products && dispatcheds) {


            const DespachosProducto = (props) => <div><ClientDispatcheds {...props} /></div>;
            const MallasDespachos = (props) => <div><ClientDispatcheds {...props}/></div>;
            const MallasProductoDespachos = (props) => <div><ClientDispatcheds {...props}/></div>;

            return (
                <div>
                    <Header as="h2">Clientes</Header>
                    <Grid>
                        <ClientQuery data={{clients, products, dispatcheds}} history={history} match={match}></ClientQuery>
                        <br />
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Switch>
                                    {/* <Route exact path={match.url} render={() => <FeatureTable data={products} />} /> */}
                                    {console.log('match', match.url)}
                                    <Route exact path={match.url} render={() => <div> <Segment> <h2>Todos los Clientes</h2></Segment><FeatureTable data={clients} /></div>} />//Todos los despachos
                                    <Route exact path={`${match.url}/despachos`} render={() => <div> <Segment> <h2>Todos los Despachos</h2> </Segment><FeatureTable data={dispatcheds} /></div>} />//Todos los despachos
                                    <Route exact path={`${match.url}/productos`} render={() => <div> <Segment> <h2>Todos los Productos</h2></Segment> <FeatureTable data={products} /></div>} />//Todos los despachos
                                    <Route exact path={`${match.url}/:clientid/despachos`} component={DespachosProducto} />//Todos los despahos del cliente x
                                    {/* <Route exact path={`${match.url}/:clientid/despachos/productos`} component={ClientDispatcheds} />//Todos los despachos del cliente x con todos los productos */}
                                    <Route exact path={`${match.url}/:clientid/despachos/productos/:productid`} component={DespachosProducto} />//Todos los despachos del cliente x con producto y
                                    <Route exact path={`${match.url}/:clientid/despachos/productos/:productid/mallas`} component={MallasDespachos} />//Todas las mallas de procedencias delos despachos del cliente x con producto z
                                    <Route exact path={`${match.url}/:clientid/despachos/:despachoid/productos/:productid/mallas`} component={MallasProductoDespachos} />//Todas las mallas de procedencua del producto x del despacho x 
                                </Switch>
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                </div>
            );
        }else return null;
    }
}

const mapStateToProps = state => {
    return {
        clients: state.userReducer.fetchUsersSuccess,
        clientsHasErrored: state.userReducer.fetchUsersFailure,
        ClientsIsLoading: state.userReducer.fetchUsersRequest,

        products: state.productReducer.fetchProductsSuccess,
        productsHasErrored: state.productReducer.fetchProductsFailure,
        productsIsLoading: state.productReducer.fetchProductsRequest,

        dispatcheds: state.dispatchedReducer.fetchDispatchedsSuccess,
        dispatchedsHasErrored: state.dispatchedReducer.fetchDispatchedsFailure,
        dispatchedsIsLoading: state.dispatchedReducer.fetchDispatchedsRequest,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getClients: () => {
            dispatch(fetchClients())
        },
        getProducts: () => {
            dispatch(fetchProducts())
        },
        getDispatcheds: () => {
            dispatch(fetchDispatcheds())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ClientsTable);   