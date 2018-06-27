import React, { Component } from 'react'
import { Dropdown, Button, Icon, Header, Segment, Dimmer,Form,  Grid, Loader } from 'semantic-ui-react';
import { Select } from 'react-select';

export default class FilterQuery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: false,
            query: {
                layer: null,
                atributos: [],
                comparacion: null,
                valor: null
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
        const { history, match } = this.props;

        var path = this.evaluateQuery(query);
        if (path) { this.setState({ ...this.state, path }) }

    }
    // const url=`https://api.myjson.com/bins/e69i9/?i=${value}&q=${value2}`;

    // fetch(url,{
    //     method:'GET'
    // }).then(response => response.json())
    // .then(json =>console.log('details',json));

    handleChangeLayer = (event) => {
        this.setState({ query: { ...this.state.query, layer: [event.value] } });
    }
    handleChangeAtributos = (event) => {
        this.setState({ query: { ...this.state.query, atributos: [event.value] } });
    }
    handleChangeComparacion = (event) => {
        this.setState({ query: { ...this.state.query, comparacion: [event.value] } });
    }
    handleChangeValor = (event) => {
        this.setState({ query: { ...this.state.query, valor: [event.value] } });
    }
    componentDidMount() {


    }
    render() {
        // if(this.props.){

        // }
        let layerOptions = []

        let comparacionOptions = [
            { key: '<', value: '<', text: '<' },
            { key: '<=', value: '<=', text: '<=' },
            { key: '>=', value: '>=', text: '>=' },
            { key: '>', value: '>', text: '>' },
            { key: '==', value: '==', text: '==' }
        ]

        let atributosOptions = [
            { key: 'velocidad', value: 'velocidad', text: 'velocidad' },
            { key: 'capacidad', value: 'capacidad', text: 'capacidad' },
            { key: 'estado', value: 'estado', text: 'estado' },

        ]


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
                                onChange={this.handleChangeDispatched}
                            />
                            <br />
                            <Form.Input
                                required
                                fluid
                                icon="money"
                                iconPosition="left"
                                name="valor"
                                placeholder="Valor a comparar"
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
