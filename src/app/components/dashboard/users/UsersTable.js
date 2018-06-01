import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Table, Checkbox, Button, Icon, Header, Segment, Dimmer, Loader, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { fetchUsers, fetchUserDispatcheds } from '../../../actions/userActions';
import DataTable from '../DataTable'
import { Route, Switch } from "react-router-dom";
import ClientDispatcheds from './ClientDispatcheds';


class UsersTable extends Component {

    componentDidMount() {
        this.props.getUsers();
    }



    render() {

        const users = this.props.users;
        console.log('TABLE PROPS: ', this.props)
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
        } else if (users) {

            return (
                <div>
                    {/* <Switch>
                        <Route
                            exact
                            path={this.props.match.url}
                            render={() => <DataTable data={users} actions={() => <Link to={`${this.props.match.url}/52`}>Ver Despachos</Link>} />}
                        />
                    </Switch> */}
                    {/* <DataTable data={users} actions={() => <Link to={`${this.props.match.url}/52`}>Ver Despachos</Link>} /> */}
                    <DataTable data={users} match={this.props.match} />
                </div>
            );
        } else return null;
    }
}

const mapStateToProps = state => {
    return {
        users: state.userReducer.fetchUsersSuccess,
        hasErrored: state.userReducer.fetchUsersFailure,
        isLoading: state.userReducer.fetchUsersRequest,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => {
            dispatch(fetchUsers())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);   