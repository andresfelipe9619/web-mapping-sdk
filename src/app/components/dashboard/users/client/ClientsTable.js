import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SortableTbl from 'react-sort-search-table';
import Select from 'react-select'
import { Table, Checkbox, Button, Icon, Header, Segment, Dimmer, Grid, Loader, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { fetchClients } from '../../../../actions/userActions';
import { fetchProducts } from '../../../../actions/productActions';
import { fetchDispatcheds } from '../../../../actions/dispatchedsActions';

import ClientDispatcheds from './ClientDispatcheds';
import DispatchedProducts from './DispatchedProducts'
import { Route, Switch } from "react-router-dom";
import FeatureTable from '../../../table/FeatureTable'


class ClientsTable extends Component {
    constructor(props) {
        super();
        this.state = {
            clientes: null,
            productos: null,
            despachos: null,
            options: {
                Clientes: [],
                productos: [],
                despachos: []
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();
        const { Clientes, productos, despachos } = this.state.options;
        const query = {
            Clientes,
            productos,
            despachos
        };

        // this
        //   .props
        //   .requestLogin(user);
    }

    evaluateQuery(query) {
        // if(query.clientes === 'todos'){

        // }else if(query.clientes === ){

        // }else{

        // }
    }

    handleChange = (event) => {
        this.setState({ [event.name]: event.value });

    }

    componentDidMount() {
        const { clientes, productos, despachos } = this.state;

        this.props.getClients();
        this.props.getProducts();
        this.props.getDispatcheds();
    }

    render() {

        const { clients, products, dispatcheds, match } = this.props;

        console.log('TABLE PROPS: ', this.props)
        if (this.props.clientsHasErrored) {
            return <h1>Error</h1>;
        } else if (this.props.clientsIsLoading) {
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
            var options = [{ value: 'todos', label: 'Todos' }];

            var clientOptions = [], productOptions = [], dispatchOptions = [];

            clientOptions.push(options[0]);
            productOptions.push(options[0]);
            dispatchOptions.push(options[0]);

            clients.map(client => {
                clientOptions.push({ value: client.properties.clid, label: client.properties.nombre })
            })

            products.map(product => {
                productOptions.push({ value: product.properties.idpc, label: product.properties.nombre })
            })

            dispatcheds.map(dispatch => {
                dispatchOptions.push({ value: dispatch.properties.iddes, label: dispatch.id })
            })

            const mButton = ()=> <Button>Ver Mallas</Button>;
            return (
                <div>
                    <Header as="h2">Clientes</Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                Clientes
                            <Select
                                    name="clientes"
                                    options={clientOptions}
                                    defaultValue='Todos'
                                    onChange={this.handleChange}
                                    isSearchable={true}

                                />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                Despachos
                            <Select
                                    name="despachos"
                                    options={dispatchOptions}
                                    defaultValue='Todos'
                                    onChange={this.handleChange}
                                    isSearchable={true}
                                />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                Productos
                            <Select
                                    name="productos"
                                    options={productOptions}
                                    defaultValue='Todos'
                                    onChange={this.handleChange}
                                    isSearchable={true}
                                />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Button style={{ marginTop: '20px' }} primary >Consultar</Button>
                            </Grid.Column>
                        </Grid.Row>
                        <br />
                        <Grid.Row>
                            <Grid.Column width={13}>
                            <Switch>
                                {/* <Route exact path={match.url} render={() => <FeatureTable data={products} />} /> */}

                                <Route exact path={match.url} component={DispatchedProducts} />
                                <Route exact path={`${match.url}/despachos`} render={() => <FeatureTable data={dispatcheds} />} />//Todos los despachos
                                <Route exact path={`${match.url}/productos`} render={() => <FeatureTable data={products} />} />//Todos los despachos
                                <Route exact path={`${match.url}/:clientid/despachos`} component={ClientDispatcheds} />//Todos los despahos del cliente x
                                {/* <Route exact path={`${match.url}/:clientid/despachos/productos`} component={ClientDispatcheds} />//Todos los despachos del cliente x con todos los productos */}
                                <Route exact path={`${match.url}/:clientid/despachos/productos/:productid`} component={ClientDispatcheds} />//Todos los despachos del cliente x con producto y
                                <Route exact path={`${match.url}/:clientid/despachos/productos/:productid/mallas`} component={ClientDispatcheds} />//Todas las mallas de procedencias delos despachos del cliente x con producto z
                                <Route exact path={`${match.url}/:clientid/despachos/:despachoid/productos/:productid`} component={ClientDispatcheds} />//Todas las mallas de procedencua del producto x del despacho x 
                            </Switch>
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                </div>
            );
        } else return null;
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