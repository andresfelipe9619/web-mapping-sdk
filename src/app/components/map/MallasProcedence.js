import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Grid,
    Form,
    Segment,
    Button, Dropdown
} from "semantic-ui-react";
import { updateMapFilter, clearFilterLayers } from '../../actions/mapActions';

class MallasProcedence extends Component {

    constructor(props) {
        super(props);
        this.state = {
            path: false,
            query: {
                client: null,
                product: null,
                calidad: null,
                zona: null,
            }
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { query } = this.state;
        console.log('You clicked me', query)

        var path = this.evaluateQuery(query);
        if (path) {
            this.setState({ ...this.state, path })
            console.log('another filter', query)
            this.props.updateFilter(query);
            this.props.history.push(path)
        }
    }

    handleChangeClient = (e, { value }) => {
        this.setState({ query: { ...this.state.query, client: value } });
    }
    handleChangeZona = (e, { value }) => {
        this.setState({ query: { ...this.state.query, zona: value } });
    }
    handleChangeCalidad = (e, { value }) => {
        this.setState({ query: { ...this.state.query, calidad: value } });
    }
    handleChangeProduct = (e, { value }) => {
        this.setState({ query: { ...this.state.query, product: value } });
    }

    evaluateQuery(query) {
        let path = false;

        if (query.client && query.product && query.zona>=0 && query.calidad) {
            path = `/mapa/mallas/origen/`
            return path

        }
    }
    render() {
        var options = [{ value: '%', key: 'todos', text: 'Todos' }];
        let calidadOptions = [
            ...options,
            { key: 'bueno', value: 'bueno', text: 'Bueno' },
            { key: 'malo', value: 'malo', text: 'Malo' },
            { key: 'regular', value: 'regular', text: 'Regular' },

        ]
        var zonaOptions = [
            { value: 4, key: 'zz0', text: 'Total' },
            { value: 0, key: 'zz1', text: 'Zona A' },
            { value: 1, key: 'zz2', text: 'Zona B' },
            { value: 2, key: 'zz3', text: 'Zona C' }]


        var clientOptions = [], productOptions = [];

        var { clients, products } = this.props

        if (clients && products) {
            clientOptions.push(options[0]);
            productOptions.push(options[0]);

            clients.map(client => {
                clientOptions.push({ value: client.properties.gid, key: client.properties.nombre, text: client.properties.nombre })
            })

            products.map(product => {
                productOptions.push({ value: product.properties.idpc, key: product.properties.nombre, text: product.properties.nombre })
            })

            return (
                <div>
              <Form size="large" onSubmit={this.handleSubmit}>
                    <Segment>
                        <h3>Consulte Mallas de Origen </h3>
                        <Form.Group widths='equal'>
                            <Form.Field>

                                <Form.Select
                                    required
                                    label="Cliente"
                                    placeholder="Cliente"
                                    selection
                                    options={clientOptions}
                                    onChange={this.handleChangeClient}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Select
                                    required
                                    label="Producto"
                                    placeholder="Producto"
                                    selection
                                    options={productOptions}
                                    onChange={this.handleChangeProduct}
                                />
                            </Form.Field>
                            <Form.Field>

                                <Form.Select
                                    required
                                    label="Zona"
                                    placeholder="Zona"
                                    selection
                                    options={zonaOptions}
                                    onChange={this.handleChangeZona}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Select
                                    required
                                    label="Calificacion"
                                    placeholder="Calificacion"
                                    selection
                                    options={calidadOptions}
                                    onChange={this.handleChangeCalidad}
                                />
                            </Form.Field>
                        </Form.Group>

                        <Button type='submit' style={{ marginTop: '20px' }} primary >Consultar</Button>
                        <Button style={{ marginTop: '20px' }} onClick={this.props.clearFilter} primary >Reiniciar</Button>

                    </Segment>
                    </Form>
                </div>
            )
        } else return null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateFilter: (filter) => {
            dispatch(updateMapFilter(filter))
        },
        clearFilter: (filter) => {
            dispatch(clearFilterLayers(filter))
        }
    }
}



// export default MallasProcedence
export default connect(null, mapDispatchToProps)(MallasProcedence) 