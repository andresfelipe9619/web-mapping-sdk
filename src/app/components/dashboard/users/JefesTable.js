import React, { Component } from 'react';
import { Table, Checkbox, Button, Icon, Header, Segment, Dimmer, Grid, Loader, Modal, Form } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { fetchJefes } from '../../../actions/userActions';
import { Route, Switch } from "react-router-dom";
import FeatureTable from '../../table/FeatureTable'


class JefesTable extends Component {


    componentDidMount() {
        this.props.getJefes();
    }

    render() {

        const { jefes, products, dispatcheds, match, history } = this.props;

        console.log('TABLE PROPS: ', this.props)
        if (this.props.jefesHasErrored) {
            return <h1>Error</h1>;
        }

        else if (this.props.jefesIsLoading) {
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
        } else if (jefes) {
            return (
                <div>
                    <Grid>
                        <br />
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Switch>
                                    {/* <Route exact path={match.url} render={() => <FeatureTable data={products} />} /> */}
                                    {console.log('match', match.url)}
                                    <Route exact path={match.url} render={() => <div> <Segment> <h2>Jefes de Produccion</h2></Segment><FeatureTable data={jefes} /></div>} />//Todos los despachos
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
        jefes: state.userReducer.fetchUsersSuccess,
        jefesHasErrored: state.userReducer.fetchUsersFailure,
        jefesIsLoading: state.userReducer.fetchUsersRequest,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getJefes: () => {
            dispatch(fetchJefes())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(JefesTable);   