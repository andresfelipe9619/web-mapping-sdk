import React, { Component } from 'react'
import { Dropdown, Button, Segment, Dimmer, Form, Grid, Loader } from 'semantic-ui-react';
import { filterLayers, loadLayers, loadLayersFeatures, clearFilterLayers } from '../../actions/mapActions';
import { connect } from 'react-redux'

const baseLayers =  [
    'clasificadoras',
    'cantera',
    'bandas',
    'trituradoras',
    'procrudo',
    'profinal',
    'mallas'
]

class FilterQuery extends Component {
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

    componentDidMount() {
        this.props.getLayersFeatures(baseLayers)
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

        let atributosOptions = []

        if (this.props.layersFeaturesSuccess) {
            for (let layer of baseLayers) {
                layerOptions.push({ key: layer, value: layer, text: layer })
            }

            for(let feature of this.props.layersFeaturesSuccess){
                console.log(feature)
                if(this.state.query.layer){
                    if(feature.features[0].id.includes(this.state.query.layer)){
                        
                        const temp = Object.keys(feature.features[0].properties);
                        for(let t of temp){
                            atributosOptions.push({ key: t, value: t, text: t })
                        }
                    }

                }
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
        layersFeaturesError: state.mapReducer.fetchLayersFeaturesError,
        layersFeaturesSuccess: state.mapReducer.fetchLayersFeaturesSuccess,
        layersFeaturesRequest: state.mapReducer.fetchLayersFeaturesRequest,

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(FilterQuery)