import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadLayers, zoomToLayer, selectLayer } from '../../actions/mapActions'

import Map from './Map'
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
        var baseLayers = [
            'clasificadoras',
            'cantera',
            'bandas',
            'trituradoras',
            'procrudo',
            'profinal'
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
                                                <Route path={match.url + "/sql"} render={()=> <FilterQuery layers={this.props.layers}/>} />
                                                <Route path={match.url + "/mallas"} component={MallasQuery} />
                                            </Switch>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column width={10} style={mBorder}>
                                <Route path={match.url} render={() => <div> <Map layers={this.props.layers}></Map></div>} />
                                </Grid.Column>

                            </Grid.Row>
                            <Grid.Row>
                                <Switch>
                                    <Route path={match.url + "/mallas"} component={Mallas} />
                                    <Route path={match.url + "/clasificadoras"} component={Clasificadoras} />
                                    <Route path={match.url + "/trituradoras"} component={Trituradoras} />

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