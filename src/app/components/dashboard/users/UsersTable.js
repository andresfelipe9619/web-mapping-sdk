import React, { Component } from 'react';
import { Table, Checkbox, Button, Icon, Header, Segment, Dimmer, Loader, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { fetchUsers, fetchUserDispatcheds } from '../../../actions/userActions';
import DataTable from '../DataTable'
import ModalTable from '../ModalTable';



class ClientModal extends Component {

    componentDidMount() {
        this.props.fetchUserDispatcheds('TGOD')
    }

    render() {
        if (this.props.dispatchedsFailure) {
            return <h1>Error</h1>;
        }
        else if (this.props.dispatcheds) {
            return (
                <ModalTable data={this.props.dispatcheds} open={true} />
            )
        } else return null;
    }
}

const ClientActions = (props) => {
return <Button onClick={()=><ClientModal/>} primary >Ver despachos</Button>
}

class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSource: '',
            editRow: -1,
            editRecord: {}
        };
    }
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
                    <DataTable data={users} actions={ClientActions} />
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
        dispatcheds: state.userReducer.fetchUserDispatchedsSuccess,
        dispatchedsFailure: state.userReducer.fetchUserDispatchedsFailure,
        dispatchedsLoading: state.userReducer.fetchUserDispatchedsRequest,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => {
            dispatch(fetchUsers())
        },
        getUsersDispatcheds: () => {
            dispatch(fetchUserDispatcheds())
        }
    }
}

connect(mapStateToProps, mapDispatchToProps)(ClientModal);

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);   