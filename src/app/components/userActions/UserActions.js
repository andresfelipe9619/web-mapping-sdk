import React, { Component } from 'react';
import { Grid, Icon,  Container, Header} from "semantic-ui-react";
import {Route, Link} from 'react-router-dom';

export default class UserActions extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4} >
            <Icon name='shipping'  size='huge'/>
            {/* <Header  to="/ingreso" as={Link}>Despachos</Header> */}
            <Header>Despachos</Header>
            </Grid.Column>
            <Grid.Column width={4} >
            <Icon name='refresh'  size='huge'/>
            <Header>Ciclo productivo</Header>            
            </Grid.Column>
            <Grid.Column width={4} >
            <Icon name='code'  size='huge'/>
            <Header>Consulta SQL</Header>            
            </Grid.Column>
            <Grid.Column width={4} >
            <Icon name='users'  size='huge'/>
            <Header>Usuarios</Header>            
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

