import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadLayers, zoomToLayer, selectLayer } from '../../actions/mapActions'
import MallasProcedence from "./MallasProcedence";
import { fetchClients } from '../../actions/userActions';
import { fetchProducts } from '../../actions/productActions';
import { fetchDispatcheds } from '../../actions/dispatchedsActions';
import MapContainer from './MapContainer'
import Menu from './MenuMapa'
import MallasDate from './MallasDate'
import FilterQuery from './FilterQuery'
import { Switch, Route } from 'react-router-dom';
import Clasificadoras from './../dashboard/proccess/Clasificadoras';
import Mallas from './../dashboard/proccess/Mallas';
import Trituradoras from './../dashboard/proccess/Trituradoras';
import FeatureTable from '../table/FeatureTable';


import {
    Grid,
    Header,
    Segment,
    Dimmer,
    Loader,
    Container,
    Button
} from "semantic-ui-react";

class OpenMap extends Component {

    componentDidMount() {
        let { match } = this.props;
        this.props.getClients();
        this.props.getProducts();
        var baseLayers = [
            'mallasOrigenProductoCliente',
            'clasificadoras',
            'cantera',
            'bandas',
            'trituradoras',
            'procrudo',
            'profinal',
            'mallas',
            
        ]
        this.props.loadLayersRequest(baseLayers)
    }

    render() {
        const mBorder = { borderStyle: 'solid', borderColor: '#3BA2FB' };
        const fondo = { padding: '10px', backgroundColor: '#3BA2FB' };
        const { match, layersHasErrored, layersIsLoading, layers, clients, products, totalProduct, currentMapFeatures } = this.props;
        if (layersHasErrored) {
            return <h1>Error</h1>;
        }
        // else if (this.state.path) {
        //     return <Redirect to={this.state.path}></Redirect>
        // }
        else if (layersIsLoading) {
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
        } else if (layers) {
            return (
                <div>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Grid.Row>
                                    <Grid.Column>
                                        {this.props.currentUser ? <Menu /> : null}
                                       
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        {(clients && products) ?
                                            (<Switch>
                                                <Route path={match.url + "/sql"} render={(props) => <FilterQuery {...props} layers={layers} />} />
                                                <Route path={match.url + "/mallas"} component={MallasDate} />
                                            </Switch>) : null}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column width={12} style={fondo}>

                                    
                                    {this.props.currentUser ?
                                         (
                                        <Switch> <Route exact path={match.url + "/clasificadoras"} render={(props) => <MapContainer {...props} layers={layers}></MapContainer>} />
                                         <Route exact path={match.url + "/trituradoras"} render={(props) => <MapContainer {...props} layers={layers}></MapContainer>} />
                                         <Route exact path={match.url + "/mallas"} render={(props) => <MapContainer {...props} layers={layers}></MapContainer>} />
                                         <Route path={match.url + "/mallas/fecha"} render={(props) => <MapContainer {...props} key={`fecha${Math.Random}`} layers={[layers[layers.findIndex(x=> x.Title == "mallas")]]}></MapContainer>} />
                                         <Route path={match.url + "/mallas/origen"} render={(props) => <MapContainer key={`origen${Math.Random}`} {...props} layers={[layers[layers.findIndex(x=> x.Title == "mallasOrigenProductoCliente")], layers[layers.findIndex(x=> x.Title == "cantera")]]}></MapContainer>} />
                                         </Switch>) : null}

                                    

                                <Switch>
                                    <Route exact path={match.url} render={(props) => <MapContainer {...props} layers={layers}></MapContainer>} />
                                    <Route exact path={match.url + "/sql"}   render={(props) => <MapContainer {...props} layers={layers}></MapContainer>} />
                                    <Route path={match.url + "/sql/bandas/"} render={(props) => <MapContainer {...props} key={`bandas${Math.Random}`} layers={[layers[layers.findIndex(x=> x.Title == "bandas")]]} ></MapContainer>} />
                                    <Route path={match.url + "/sql/cantera/"} render={(props) => <MapContainer {...props} key={`cantera${Math.Random}`} layers={[layers[layers.findIndex(x=> x.Title == "cantera")]]} ></MapContainer>} />
                                    <Route path={match.url + "/sql/clasificadoras/"} render={(props) => <MapContainer {...props} key={`clasificadoras${Math.Random}`} layers={[layers[layers.findIndex(x=> x.Title == "clasificadoras")]]} ></MapContainer>} />
                                    <Route path={match.url + "/sql/mallas/"} render={(props) => <MapContainer {...props} key={`mallas${Math.Random}`} layers={[layers[layers.findIndex(x=> x.Title == "mallas")]]} ></MapContainer>} />
                                    <Route path={match.url + "/sql/procrudo/"} render={(props) => <MapContainer {...props} key={`procrudo${Math.Random}`} layers={[layers[layers.findIndex(x=> x.Title == "prodcrudo")]]} ></MapContainer>} />
                                    <Route path={match.url + "/sql/profinal/"} render={(props) => <MapContainer {...props} key={`profinal${Math.Random}`} layers={[layers[layers.findIndex(x=> x.Title == "profinal")]]} ></MapContainer>} />
                                    <Route path={match.url + "/sql/trituradoras/"} render={(props) => <MapContainer {...props} key={`trituradoras${Math.Random}`} layers={[layers[layers.findIndex(x=> x.Title == "trituradoras")]]} ></MapContainer>} />
                                </Switch>
                                {(clients && products) ?
                                    <Route path={match.url + "/mallas"} render={(props) => <MallasProcedence clients={clients} products={products} {...props} />} />
                                    : null}
                            </Grid.Column>

                        </Grid.Row>
                        <Grid.Row centered>

                            <Switch>
                                <Route  path={match.url + "/mallas"} component={Mallas} />
                                {/* <Route exact path={match.url + "/mallas"} component={Mallas} /> */}
                                <Route exact path={match.url + "/clasificadoras"} component={Clasificadoras} />
                                <Route exact path={match.url + "/trituradoras"} component={Trituradoras} />
                                <Route exact path={match.url + "/sql/:entity"} render={(props)=> <FeatureTable {...props} data={currentMapFeatures} />} />
                            </Switch>
                        </Grid.Row>
                    </Grid>
                </div >
            )
        } else return null
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.authReducer.loginSuccess,

        clients: state.userReducer.fetchUsersSuccess,
        clientsHasErrored: state.userReducer.fetchUsersFailure,
        ClientsIsLoading: state.userReducer.fetchUsersRequest,

        products: state.productReducer.fetchProductsSuccess,
        productsHasErrored: state.productReducer.fetchProductsFailure,
        productsIsLoading: state.productReducer.fetchProductsRequest,

        userDispatcheds: state.dispatchedReducer.fetchUserDispatchedsSuccess,
        userDispatchedsFailure: state.dispatchedReducer.fetchUserDispatchedsFailure,
        userDispatchedsLoading: state.dispatchedReducer.fetchUserDispatchedsRequest,

        totalProduct: state.productReducer.fetchTotalProductSuccess,
        totalProductHasErrored: state.productReducer.fetchTotalProductFailure,
        totalProductIsLoading: state.productReducer.fetchTotalProductRequest,

        layers: state.mapReducer.loadLayersSuccess,
        layersHasErrored: state.mapReducer.loadLayersError,
        layersIsLoading: state.mapReducer.loadLayersRequest,

        currentMapFeatures: state.mapReducer.updateFeaturesMapSuccess,

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

        loadLayersRequest: (layers) => {
            dispatch(loadLayers(layers))
        },
        // getUserDispatcheds: (user, product, mallas) => {
        //     dispatch(fetchUserDispatcheds(user, product, mallas))
        // },
        // getTotalProduct: () => {
        //     dispatch(fetchTotalProduct())
        // },
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(OpenMap);