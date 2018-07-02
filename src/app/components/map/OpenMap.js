import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadLayers, zoomToLayer, selectLayer } from '../../actions/mapActions'

import Map from './Map'
import MapContainer from './MapContainer'
import Menu from './MenuMapa'
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

const MallasQuery = () => {
    var options = [
        { value: '10/3/2016', label: '10/3/2016' },
        { value: '10/5/2016', label: '10/5/2016' }
    ]
    return (

        <Segment>
            <Grid.Row>
                <Grid.Column width={4}>
                    Desde
                    <Select
                        name="desde"
                        options={options}
                        defaultValue='10/3/2016'
                        // onChange={this.handleChange}
                        isSearchable={true}
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={4}>
                    Hasta
                    <Select
                        name="hasta"
                        options={options}
                        defaultValue='10/5/2016'
                        // onChange={this.handleChange}
                        isSearchable={true}
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Column width={4}>
                <Button style={{ marginTop: '20px' }} primary >Consultar</Button>
            </Grid.Column>
        </Segment>
    )
}

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
                                            <Route exact path={match.url + "/mallas"} component={MallasQuery} />
                                        </Switch>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column width={10} style={mBorder}>
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
                            </Grid.Column>

                        </Grid.Row>
                        <Grid.Row>
                            <Switch>
                                <Route exact path={match.url + "/mallas"} component={Mallas} />
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