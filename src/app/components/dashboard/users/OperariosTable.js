import React, { Component } from 'react';
import { Table, Checkbox, Button, Icon, Header, Segment, Dimmer, Grid, Loader, Modal, Form } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { fetchOperarios } from '../../../actions/userActions';
import { Route, Switch } from "react-router-dom";
import FeatureTable from '../../table/FeatureTable'


class JefeTable extends Component {


    componentDidMount() {
        this.props.getOperarios();
    }

    render() {

        const { operarios, match, history } = this.props;

        console.log('TABLE PROPS: ', this.props)
        if (this.props.operariosHasErrored) {
            return <h1>Error</h1>;
        }
        // else if (this.state.path) {
        //     return <Redirect to={this.state.path}></Redirect>
        // }
        else if (this.props.operariosIsLoading) {
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
        } else if (operarios) {

            return (
                <div>
                    <Grid>
                        <br />
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Switch>
                                    {/* <Route exact path={match.url} render={() => <FeatureTable data={products} />} /> */}
                                    {console.log('match', match.url)}
                                    <Route exact path={match.url} render={() => <div> <Segment> <h2>Operarios</h2></Segment><FeatureTable data={operarios} /></div>} />//Todos los despachos
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
        operarios: state.userReducer.fetchUsersSuccess,
        operariosHasErrored: state.userReducer.fetchUsersFailure,
        operariosIsLoading: state.userReducer.fetchUsersRequest,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOperarios: () => {
            dispatch(fetchOperarios())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(JefeTable);   