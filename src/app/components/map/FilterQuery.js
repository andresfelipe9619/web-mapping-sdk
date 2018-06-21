import React, { Component } from 'react'
import { Dropdown, Button, Icon, Header, Segment, Dimmer, Grid, Loader } from 'semantic-ui-react';
import { Select } from 'react-select';

export default class FilterQuery extends Component {
    render() {
        return (
            <div>
                <Segment style={{ marginTop: '4em' }}>
                    <h2>Consulta Sql</h2>
                    <Grid.Row>
                        <h3>Informacion geografica</h3>
                        <Dropdown
                            simple
                            text='Nombre de la capa'
                            name="clientes"
                            // options={clientOptions}
                            defaultValue='Todos'
                            labelContent='Info'
                            // onChange={this.handleChangeClient}
                            isSearchable={true}
                        />
                    </Grid.Row>
                    <Grid.Row>
                        <br />
                        <h3>Atributos</h3>
                        <Dropdown
                            text='Nombre'

                            name="despachos"
                            // options={dispatchOptions}
                            defaultValue='Todos'
                            // onChange={this.handleChangeDispatched}
                            isSearchable={true}
                        />
                        <br />
                        <Dropdown
                            text='Comparacion'

                            name="despachos"
                            // options={dispatchOptions}
                            defaultValue='Todos'
                            // onChange={this.handleChangeDispatched}
                            isSearchable={true}
                        />
                        <br />
                        <Dropdown
                            text='Valor'
                            name="despachos"
                            // options={dispatchOptions}
                            defaultValue='Todos'
                            // onChange={this.handleChangeDispatched}
                            isSearchable={true}
                        />
                    </Grid.Row>

                    <Button type='submit' style={{ marginTop: '20px' }} onClick={this.handleSubmit} primary >Consultar</Button>
                </Segment>
            </div>
        )
    }
}
