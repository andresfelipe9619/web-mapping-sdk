import React, { Component } from 'react'
import { Dropdown, Button, Icon, Header, Segment, Dimmer, Grid, Loader } from 'semantic-ui-react';
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
        let layerOptions = [
            { value: '', label: '' }
        ]

        let comparacionOptions = [
            { value: '<', label: '<' },
            { value: '<=', label: '<=' },
            { value: '>=', label: '>=' },
            { value: '>', label: '>' },
            { value: '==', label: '==' }
        ]


        if (this.props.layers) {
            for (let layer of this.props.layers) {
                layerOptions.push({ value: layer.Title, label: layer.Ttile })
            }
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
                                options={layerOptions}
                                defaultValue='Todos'
                                labelContent='Info'
                                // onChange={this.handleChnageLayer}
                                isSearchable={true}
                            />
                        </Grid.Row>
                        <Grid.Row>
                            <br />
                            <h3>Atributos</h3>
                            <Dropdown
                                text='Nombre'

                                name="atributos"
                                // options={dispatchOptions}
                                defaultValue='Todos'
                                // onChange={this.handleChangeDispatched}
                                isSearchable={true}
                            />
                            <br />
                            <Dropdown
                                text='Comparacion'

                                name="comparacion"
                                options={comparacionOptions}
                                defaultValue='Todos'
                                // onChange={this.handleChangeDispatched}
                                isSearchable={true}
                            />
                            <br />
                            <Dropdown
                                text='Valor'
                                name="valor"
                                // options={valorOptions}
                                defaultValue='Todos'
                                // onChange={this.handleChangeDispatched}
                                isSearchable={true}
                            />
                        </Grid.Row>

                        <Button type='submit' style={{ marginTop: '20px' }} onClick={this.handleSubmit} primary >Consultar</Button>
                    </Segment>
                </div>
            )
        }else return null
    }
}
