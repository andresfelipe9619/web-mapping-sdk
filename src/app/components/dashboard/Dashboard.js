import React, { Component } from "react";
import { MenuDashboard } from "./Menu.js";
import { connect } from "react-redux";
import { loadDashboard } from "../../actions/dashboardActions";
import { Grid, Header, Segment, Dimmer, Loader } from "semantic-ui-react";
import { Route, Switch} from "react-router-dom";
import ClientsTable from './users/client/ClientsTable';
import FeatureTable from './../table/FeatureTable';
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
    } else if (this.props.message){
      return (
        <Grid>
          <Grid.Column width={4}>
            <MenuDashboard />
          </Grid.Column>
          <Grid.Column width={12}>
            <Route exact path={match.url + "/clientes"} component={ClientsTable} />
          </Grid.Column>
        </Grid>
      );
    }else return false;
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
