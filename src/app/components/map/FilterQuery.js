import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Dropdown, Button, Segment, Dimmer, Form, Grid, Loader } from 'semantic-ui-react';

export default class FilterQuery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: false,
            query: {
                layer: null,
                atributos: null,
                comparacion: null,
                valor: ''
            }
        }
        this.handleChangeLayer = this.handleChangeLayer.bind(this);
        this.handleChangeAtributos = this.handleChangeAtributos.bind(this);
        this.handleChangeComparacion = this.handleChangeComparacion.bind(this);
        this.handleChangeValor = this.handleChangeValor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('You clicked me')
        const { query } = this.state;

        var path = this.evaluateQuery(query);
        if (path) {
            this.setState({ ...this.state, path })
            this.props.history.push(path)
        }

    }

    handleChangeLayer = (e, { value }) => {
        this.setState({ query: { ...this.state.query, layer: { value } } });
    }
    handleChangeAtributos = (e, { value }) => {
        this.setState({ query: { ...this.state.query, atributos: { value } } });
    }
    handleChangeComparacion = (e, { value }) => {
        this.setState({ query: { ...this.state.query, comparacion: { value } } });
    }
    handleChangeValor = (e) => {
        this.setState({ query: { ...this.state.query, valor: [e.target.value] } });
    }

    evaluateQuery(query) {
        var path = false;
        console.log('change it bitch', path)
        console.log('change it bitch', query)

        if (query.layer) {
            console.log('change it bitch', path)

            if (query.atributos && query.comparacion) {
                console.log('change it bitch', path)

                path = `/mapa/sql/${query.layer.value}/${query.atributos.value}/${query.comparacion.value}/${query.valor}`
                return path

            }
        }
        return path
    }
    render() {

        let layerOptions = []

        let comparacionOptions = [
            { key: '<', value: '<', text: '<' },
            { key: '<=', value: '<=', text: '<=' },
            { key: '>=', value: '>=', text: '>=' },
            { key: '>', value: '>', text: '>' },
            { key: '==', value: '==', text: '==' }
        ]

        let atributosOptions = [
            { key: 'nombre', value: 'nombre', text: 'nombre' },
            { key: 'cota', value: 'cota', text: 'cota' },
            { key: 'idzona', value: 'idzona', text: 'idzona' },
            { key: 'fechae', value: 'fechae', text: 'fechae' },
            { key: 'estado', value: 'estado', text: 'estado' },
            { key: 'velocidad', value: 'velocidad', text: 'velocidad' },
            { key: 'capacidad', value: 'capacidad', text: 'capacidad' },
            { key: 'volumen', value: 'volumen', text: 'volumen' },
            { key: 'fechae', value: 'fechae', text: 'fechae' }
        ]
        
        // let atributosOptions = {
        //     mallas: [{ key: 'nombre', value: 'nombre', text: 'nombre' },
        //     { key: 'cota', value: 'cota', text: 'cota' },
        //     { key: 'idzona', value: 'idzona', text: 'idzona' },
        //     { key: 'fechae', value: 'fechae', text: 'fechae' }],
        //     clasificadoras: [{ key: 'nombre', value: 'nombre', text: 'nombre' },
        //     { key: 'estado', value: 'estado', text: 'estado' },
        //     { key: 'velocidad', value: 'velocidad', text: 'velocidad' },
        //     { key: 'capacidad', value: 'capacidad', text: 'capacidad' },],
        //     trituradoras: [{ key: 'nombre', value: 'nombre', text: 'nombre' },
        //     { key: 'estado', value: 'estado', text: 'estado' },
        //     { key: 'velocidad', value: 'velocidad', text: 'velocidad' },
        //     { key: 'capacidad', value: 'capacidad', text: 'capacidad' },],
        //     bandas: [{ key: 'nombre', value: 'nombre', text: 'nombre' },
        //     { key: 'estado', value: 'estado', text: 'estado' },
        //     { key: 'velocidad', value: 'velocidad', text: 'velocidad' },
        //     { key: 'capacidad', value: 'capacidad', text: 'capacidad' },],
        //     cantera: [{ key: 'nombre', value: 'nombre', text: 'nombre' },
        //     { key: 'area', value: 'area', text: 'area' },
        //     { key: 'idzona', value: 'idzona', text: 'idzona' },],
        //     procrudo: [{ key: 'nombre', value: 'nombre', text: 'nombre' },
        //     { key: 'volumen', value: 'volumen', text: 'volumen' },],
        //     profinal: [{ key: 'nombre', value: 'nombre', text: 'nombre' },
        //     { key: 'volumen', value: 'volumen', text: 'volumen' },
        //     { key: 'porceps', value: 'porceps', text: 'porceps' },
        //     ]
        // }


        if (this.props.layers) {
            for (let layer of this.props.layers) {
                layerOptions.push({ key: layer.Title, value: layer.Title, text: layer.Title })
            }
            return (
                <div>
                    <Segment style={{ marginTop: '4em' }}>
                        <h2>Consulta Sql</h2>
                        <Grid.Row>
                            <h3>Informacion geografica</h3>
                            <Dropdown
                                placeholder="Nombre Capa"
                                selection
                                name="layers"
                                options={layerOptions}
                                onChange={this.handleChangeLayer}
                            />
                        </Grid.Row>
                        <Grid.Row>
                            <br />
                            <h3>Atributos</h3>
                            <Dropdown
                                placeholder="atributo"
                                selection
                                name="atributos"
                                options={atributosOptions}
                                onChange={this.handleChangeAtributos}
                            />
                            <br />
                            <Dropdown
                                placeholder='Comparacion'
                                name="comparacion"
                                selection
                                options={comparacionOptions}
                                onChange={this.handleChangeComparacion}
                            />
                            <br />
                            <Form.Input
                                required
                                fluid
                                name="valor"
                                placeholder="Valor a comparar"
                                type="text"
                                onChange={this.handleChangeValor}
                                value={this.state.query.valor} />
                        </Grid.Row>

                        <Button type='submit' style={{ marginTop: '20px' }} onClick={this.handleSubmit} primary >Consultar</Button>
                    </Segment>

                </div>
            )
        } else return null
    }
}
