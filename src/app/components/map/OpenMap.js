import React, { Component } from 'react'
import { connect } from 'react-redux';

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

    render() {
        const mBorder = { borderStyle: 'solid', borderColor: '#3BA2FB' };
        const { match } = this.props;

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
                                        <Route path={match.url + "/sql"} component={FilterQuery} />
                                        <Route path={match.url + "/mallas"} component={MallasQuery} />
                                    </Switch>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={10} style={mBorder}>
                            <Map></Map>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}


export default connect(null, mapDispatchToProps)(OpenMap);