import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadLayers, zoomToLayer, selectLayer } from '../../actions/mapActions'
import MallasProcedence from "./MallasProcedence";


import MapContainer from './MapContainer'
import Menu from './MenuMapa'
import MallasDate from './MallasDate'
import FilterQuery from './FilterQuery'
import { Switch, Route } from 'react-router-dom';
import Clasificadoras from './../dashboard/proccess/Clasificadoras';
import Mallas from './../dashboard/proccess/Mallas';
import Trituradoras from './../dashboard/proccess/Trituradoras';
import Select from 'react-select'

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

        var baseLayers = [

            'clasificadoras',
            'cantera',
            'bandas',
            'trituradoras',
            'procrudo',
            'profinal',
            'mallas'
        ]
        this.props.loadLayersRequest(baseLayers)
    }

    render() {
        const mBorder = { borderStyle: 'solid', borderColor: '#3BA2FB' };
        const fondo = { padding: '10px', backgroundColor: '#3BA2FB' };
        const { match } = this.props;
        if (this.props.layersHasErrored) {
            return <h1>Error</h1>;
        }
        // else if (this.state.path) {
        //     return <Redirect to={this.state.path}></Redirect>
        // }
        else if (this.props.layersIsLoading) {
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
        } else if (this.props.layers) {
            return (
                <div>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Menu />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Switch>
                                            <Route path={match.url + "/sql"} render={(props) => <FilterQuery {...props} layers={this.props.layers} />} />
                                            <Route exact path={match.url + "/mallas"} component={MallasDate} />
                                        </Switch>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column width={12} style={fondo}>
                                <Switch>
                                    <Route exact path={match.url} render={(props) => <MapContainer {...props} layers={this.props.layers}></MapContainer>} />
                                    <Route exact path={match.url + "/sql"} render={(props) => <MapContainer {...props} layers={this.props.layers}></MapContainer>} />
                                    <Route exact path={match.url + "/mallas"} render={(props) => <MapContainer {...props} layers={this.props.layers}></MapContainer>} />
                                    <Route exact path={match.url + "/clasificadoras"} render={(props) => <MapContainer {...props} layers={this.props.layers}></MapContainer>} />
                                    <Route exact path={match.url + "/trituradoras"} render={(props) => <MapContainer {...props} layers={this.props.layers}></MapContainer>} />
                                    <Route path={match.url + "/sql/bandas/"} render={(props) => <MapContainer {...props} key={`bandas${Math.Random}`} layers={[this.props.layers[0]]} ></MapContainer>} />

                                    <Route path={match.url + "/sql/cantera/"} render={(props) => <MapContainer {...props} key={`cantera${Math.Random}`} layers={[this.props.layers[1]]} filt></MapContainer>} />
                                    <Route path={match.url + "/sql/mallas/"} render={(props) => <MapContainer {...props} key={`mallas${Math.Random}`} layers={[this.props.layers[2]]} filt></MapContainer>} />
                                    <Route path={match.url + "/sql/procrudo/"} render={(props) => <MapContainer {...props} key={`procrudo${Math.Random}`} layers={[this.props.layers[3]]} filt></MapContainer>} />
                                    <Route path={match.url + "/sql/profinal/"} render={(props) => <MapContainer {...props} key={`profinal${Math.Random}`} layers={[this.props.layers[4]]} filt></MapContainer>} />
                                    <Route path={match.url + "/sql/trituradoras/"} render={(props) => <MapContainer {...props} key={`trituradoras${Math.Random}`} layers={[this.props.layers[5]]} filt></MapContainer>} />
                                    <Route path={match.url + "/sql/clasificadoras/"} render={(props) => <MapContainer {...props} key={`clasificadoras${Math.Random}`} layers={[this.props.layers[6]]} filt></MapContainer>} />
                                </Switch>
                                <Route exact path={match.url + "/mallas"} component={MallasProcedence} />
                            </Grid.Column>

                        </Grid.Row>
                        <Grid.Row>

                            <Switch>
                                <Route exact path={match.url + "/mallas"} component={Mallas} />
                                {/* <Route exact path={match.url + "/mallas"} component={Mallas} /> */}
                                <Route exact path={match.url + "/clasificadoras"} component={Clasificadoras} />
                                <Route exact path={match.url + "/trituradoras"} component={Trituradoras} />
                                {/* <Route exact path={match.url + "/sql"} component={FilterTable} /> */}
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
        layers: state.mapReducer.loadLayersSuccess,
        layersHasErrored: state.mapReducer.loadLayersError,
        layersIsLoading: state.mapReducer.loadLayersRequest,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadLayersRequest: (layers) => {
            dispatch(loadLayers(layers))
        },
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(OpenMap);