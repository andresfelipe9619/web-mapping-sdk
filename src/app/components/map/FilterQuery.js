import React, { Component } from 'react'
import { Dropdown, Button, Segment, Dimmer, Form, Grid, Loader } from 'semantic-ui-react';
import { filterLayers, loadLayers, loadLayersFeatures, clearFilterLayers } from '../../actions/mapActions';
import { connect } from 'react-redux'
class FilterQuery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: false,
            query: {
                layer: null,
                atributos: null,
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

    componentDidMount() {
        this.props.getLayersFeatures(['mallas', 'procrudo'])
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('You clicked me')
        const { query } = this.state;

        var path = this.evaluateQuery(query);
        if (path) {
            this.setState({ ...this.state, path })
            console.log('another filter', query)
            this.props.updateFilter(query);
            this.props.history.push(path)
        }

    }

    handleChangeLayer = (e, { value }) => {
        this.setState({ query: { ...this.state.query, layer: value } });
    }
    handleChangeAtributos = (e, { value }) => {
        this.setState({ query: { ...this.state.query, atributos: value } });
    }
    handleChangeComparacion = (e, { value }) => {
        this.setState({ query: { ...this.state.query, comparacion: value } });
    }
    handleChangeValor = (e) => {
        this.setState({ query: { ...this.state.query, valor: e.target.value } });
    }

    evaluateQuery(query) {
        var path = false;

        if (query.layer && query.atributos && query.comparacion && query.valor) {
            let valor = null;
            if (Number(query.valor)) {
                valor = Number(query.valor)
            } else {
                valor = `'${query.valor}'`
            }
            console.log('ur filter sr', valor)
            this.setState({ 
                ...this.state,
                query: {
                    ...query,
                    valor: valor
                }
            })
            path = `/mapa/sql/${query.layer}/`
            return path

        }
    }
    render() {

        let layerOptions = []

        let comparacionOptions = [
            { key: '<', value: '<', text: '<' },
            { key: '<=', value: '<=', text: '<=' },
            { key: '>=', value: '>=', text: '>=' },
            { key: '>', value: '>', text: '>' },
            { key: '=', value: '=', text: '=' }
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
        ]

        if (true) {
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
                        <Button  style={{ marginTop: '20px' }} onClick={this.props.clearFilter} primary >Reiniciar</Button>
                    </Segment>

                </div>
            )
        } else return null
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        updateFilter: (filter) => {
            dispatch(filterLayers(filter))
        },
        getLayersFeatures(layers) {
            dispatch(loadLayersFeatures(layers))
        },
        clearFilter: (filter) => {
            dispatch(clearFilterLayers(filter))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        loadLayerRequest: state.mapReducer.loadLayerRequest,
        loadLayerError: state.mapReducer.loadLayerError,
        loadLayerSuccess: state.mapReducer.loadLayerSuccess,
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(FilterQuery)