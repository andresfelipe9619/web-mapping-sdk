import React, { Component } from "react";
import { MenuDashboard } from "./Menu.js";
import { connect } from "react-redux";
import { loadDashboard } from "../../actions/dashboardActions";
import { Grid, Header, Segment, Dimmer, Loader } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import ClientsTable from './users/client/ClientsTable';
import OperariosTable from './users/OperariosTable';
import JefesTable from './users/JefesTable';
class Dashboard extends Component {
  componentDidMount() {
    this.props.loadPage();
  }

  render() {
    const { match } = this.props;
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
    } else if (this.props.message) {
      return (
        <Grid>
          <Grid.Row>
          <Grid.Column style={{marginTop:'10em'}} width={3}>
            <MenuDashboard />
          </Grid.Column>
          <Grid.Column width={13}>
            <Route path={match.url + "/clientes"} component={ClientsTable} />
            <Route path={match.url + "/operarios"} component={OperariosTable} />
            <Route path={match.url + "/jefesproduccion"} component={JefesTable} />
          </Grid.Column>
          </Grid.Row> 
        </Grid>
      );
    } else return false;
  }
}
const mapStateToProps = state => {
  return {
    message: state.dashboardReducer.dashboardLoaded,
    isLoading: state.dashboardReducer.dashboardLoading,
    hasErrored: state.dashboardReducer.dashboardErrored
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loadPage: () => {
      dispatch(loadDashboard());
    },
    errorMessage: () => {
      dispatch();
    },
    successMessage: () => {
      dispatch();
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
