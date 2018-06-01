import React, { Component } from "react";
import { MenuDashboard } from "./Menu.js";
import  UsersTable  from "./users/UsersTable";
import { connect } from "react-redux";
import { loadDashboard } from "../../actions/dashboardActions";
// import { ProductsTable } from "./products/ProductsTable";
// import { OrdersTable } from "./orders/OrdersTable";
// import { InvoicesTable } from "./invoices/InvoicesTable";
// import { DevolutionsTable } from "./devolutions/DevolutionsTable";
import { Grid, Header, Segment, Dimmer, Loader } from "semantic-ui-react";
import { Route, Switch} from "react-router-dom";
import ClientDispatcheds from './users/ClientDispatcheds';
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
            <Header as="h2">Usuarios</Header>
            <Switch>
            <Route exact path={match.url + "/clientes"} component={UsersTable} />
            <Route exact path={match.url + "/clientes/:clientid"} component={ClientDispatcheds} />
            
            </Switch>
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
