import React, { Component } from 'react'
import {
    Grid,
    Segment,
    Button, Dropdown
} from "semantic-ui-react";
import { connect } from 'react-redux'
import { updateMapFilter, clearFilterLayers } from '../../actions/mapActions';

class BandasRuta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: {
                llegada: null,
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { query } = this.state;
        console.log('You clicked me', query)
        if(query){
            this.props.updateFilter(query);
            this.props.history.push('/mapa/bandas/ruta')
        }
    }

    handleChangeProducto = (e, { value }) => {
        this.setState({ query: { ...this.state.query, llegada: value } });
    }

    render() {

        var productOptions = [
            { value: 2, key: 'ppp1', text: 'grava 38' },
            { value: 4, key: 'ppp2', text: 'grava 12' },
            { value: 18, key: 'ppp3', text: 'grava 34' },
            { value: 19, key: 'ppp4', text: 'polvillo 4' },
            { value: 3, key: 'ppp5', text: 'arena tritu' },
            { value: 15, key: 'ppp6', text: 'polvillo 7' },
            { value: 7, key: 'ppp7', text: 'grava 1' },]
        return (
            <div style={{ marginTop: '10px' }}>
                <Segment>
                    <h3>Ruta a un Producto Crudo</h3>
                    <Grid.Row>
                    <Dropdown
                        placeholder="Producto"
                        compact
                        selection
                        options={productOptions}
                        onChange={this.handleChangeProducto}
                    />
                    </Grid.Row>
                    <br />
                    <Grid.Column width={8}>
                        <Button style={{ marginTop: '20px', marginLeft: '-10px'}} size='mini' onClick={this.handleSubmit} primary >Consultar</Button>
                        <Button style={{ marginTop: '20px'}} size='mini' onClick={this.props.clearFilter} primary >Reiniciar</Button>
                    </Grid.Column>
                </Segment>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateFilter: (filter) => {
            dispatch(updateMapFilter(filter))
        },
        clearFilter: (filter) => {
            dispatch(clearFilterLayers(filter))
        }
    }
}

export default connect(null, mapDispatchToProps)(BandasRuta)