import React, { Component } from 'react'
import {
    Grid,
    Segment,
    Button, Dropdown
} from "semantic-ui-react";
import { connect } from 'react-redux'
import { updateMapFilter, clearFilterLayers } from '../../actions/mapActions';

class MallasDate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: {
                desde: null,
                hasta: null,
                zona: null,
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { query } = this.state;
        console.log('You clicked me', query)
        if(query){
            this.props.updateFilter(query);
            this.props.history.push('/mapa/mallas/fecha')
        }

        // var path = this.evaluateQuery(query);
        // if (path) {
        //     this.setState({ ...this.state, path })
        //     console.log('another filter', query)

        // }
    }

    handleChangeZona = (e, { value }) => {
        this.setState({ query: { ...this.state.query, zona: value } });
    }
    handleChangeDesde = (e) => {
        this.setState({ query: { ...this.state.query, desde: e.target.value } });
    }
    handleChangeHasta = (e) => {
        this.setState({ query: { ...this.state.query, hasta: e.target.value } });
    }

    render() {

        var zonaOptions = [
            { value: "'z1'", key: 'z1', text: 'Zona 1' },
            { value: "'z2'", key: 'z2', text: 'Zona 2' },
            { value: "'z3'", key: 'z3', text: 'Zona 3' }]
        return (
            <div style={{ marginTop: '10px' }}>
                <Segment>
                    <h3>Consulta Fecha Mallas</h3>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            Desde
                    <input type="date" onChange={this.handleChangeDesde} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={4}>
                            Hasta <br/>
                        <input type="date" onChange={this.handleChangeHasta} />
                        </Grid.Column>
                    </Grid.Row>
                    <br />
                    <Dropdown
                        placeholder="Zona"
                        compact
                        selection
                        options={zonaOptions}
                        onChange={this.handleChangeZona}
                    />
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

export default connect(null, mapDispatchToProps)(MallasDate)