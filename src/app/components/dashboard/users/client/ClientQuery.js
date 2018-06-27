import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Select from 'react-select'
import { Table, Checkbox, Button, Icon, Header, Segment, Dimmer, Grid, Loader, Modal, Form } from 'semantic-ui-react';


class ClientQuery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: false,
            query: {
                client: null,
                product: null,
                dispatched: null,
            }
        }
        this.handleChangeClient = this.handleChangeClient.bind(this);
        this.handleChangeProduct = this.handleChangeProduct.bind(this);
        this.handleChangeDispatched = this.handleChangeDispatched.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('You clicked me')
        const { query } = this.state;
        const { history, match } = this.props;

        var path = this.evaluateQuery(query);
        if (path) { this.setState({ ...this.state, path }) }

    }


    handleChangeClient = (event) => {
        this.setState({ query: { ...this.state.query, client: [event.value] } });
    }
    handleChangeProduct = (event) => {
        this.setState({ query: { ...this.state.query, product: [event.value] } });
    }
    handleChangeDispatched = (event) => {
        this.setState({ query: { ...this.state.query, dispatched: [event.value] } });
    }


    evaluateQuery(query) {
        const { history, match } = this.props;


        var path = false;
        if (query.product || query.product && query.client) {
            if (Number(query.client[0]) && query.product[0] === 'todos') {
                path = `/usuarios/clientes/${query.client[0]}/despachos`;
            }
            else if (Number(query.client[0]) && query.product[0]) {
                path = `/usuarios/clientes/${query.client[0]}/despachos/productos/${query.product[0]}`

            } else if (query.product[0] === 'todos') {
                path = `/usuarios/clientes/productos`;

            }
        } else if (query.client) {
            if (Number(query.client[0])) {
                path = `/usuarios/clientes/${query.client[0]}/despachos`

            } else if (Number(query.client[0])) {
                path = `/usuarios/clientes/${query.client[0]}/despachos`

            } else if (Number(query.client[0])) {
                path = `/usuarios/clientes/${query.client[0]}/despachos`

            } else if (query.client[0] === 'todos') {
                path = '/usuarios/clientes';
            }

        } else if (query.dispatched[0] === 'todos') {
            path = `/usuarios/clientes/despachos`;

        }
        return path;
    }

    render() {
        var options = [{ value: 'todos', label: 'Todos' }];

        var clientOptions = [], productOptions = [], dispatchOptions = [];

        var { clients, products, dispatcheds } = this.props.data

        clientOptions.push(options[0]);
        productOptions.push(options[0]);
        dispatchOptions.push(options[0]);

        clients.map(client => {
            clientOptions.push({ value: client.properties.idcli, label: client.properties.nombre })
        })

        products.map(product => {
            productOptions.push({ value: product.properties.idpc, label: product.properties.nombre })
        })

        dispatcheds.map(dispatch => {
            dispatchOptions.push({ value: dispatch.properties.iddes, label: dispatch.id })
        })

        return (

            <Grid.Row>
                <Grid.Column width={4}>
                    Clientes
                 <Select
                        name="clientes"
                        options={clientOptions}
                        defaultValue='Todos'
                        onChange={this.handleChangeClient}
                        isSearchable={true}
                    />
                </Grid.Column>
                <Grid.Column width={4}>
                    Despachos
                 <Select
                        name="despachos"
                        options={dispatchOptions}
                        defaultValue='Todos'
                        onChange={this.handleChangeDispatched}
                        isSearchable={true}
                    />
                </Grid.Column>
                <Grid.Column width={4}>
                    Productos
                 <Select
                        name="productos"
                        options={productOptions}
                        defaultValue='Todos'
                        onChange={this.handleChangeProduct}
                        isSearchable={true}
                    />
                </Grid.Column>
                <Grid.Column width={4}>
                    <Button type='submit' style={{ marginTop: '20px' }} onClick={this.handleSubmit} primary >Consultar</Button>
                </Grid.Column>

                {(this.state.path ? <Redirect to={this.state.path} ></Redirect> : null)}
            </Grid.Row>

        )
    }
}

export default ClientQuery;