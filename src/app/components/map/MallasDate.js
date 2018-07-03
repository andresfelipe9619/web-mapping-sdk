import React, {Component} from 'react'
import {
    Grid,
    Segment,
    Button, Dropdown
} from "semantic-ui-react";
import { connect } from 'react-redux'
import { filterLayers, clearFilterLayers } from '../../actions/mapActions';

class MallasDate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: {
                layer: null,
                atributos: null,
                comparacion: null,
                valor: ''
            }
        }
    }

    render() {

        var zonaOptions = [
            { value: 'z1', label: 'Zona 1' },
            { value: 'z2', label: 'Zona 2' },
            { value: 'z3', label: 'Zona 3' }]
        return (
            <div style={{ marginTop: '10px' }}>
                <Segment>
                    <h3>Consulta Fecha Mallas</h3>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            Desde
                    <input type="date" />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={4}>
                            Hasta
                        <input type="date" />
                        </Grid.Column>
                    </Grid.Row>
                    <br />
                    <Dropdown
                        placeholder="Zona"
                        selection
                        options={zonaOptions}
                    // onChange={this.handleChangeDispatched}
                    />
                    <Grid.Column width={4}>
                        <Button style={{ marginTop: '20px' }} primary >Consultar</Button>
                        <Button style={{ marginTop: '20px' }} primary >Reiniciar</Button>
                    </Grid.Column>
                </Segment>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateFilter: (filter) => {
            dispatch(filterLayers(filter))
        },
        clearFilter: (filter) => {
            dispatch(clearFilterLayers(filter))
        }
    }
}

export default connect(null, mapDispatchToProps)(MallasDate)