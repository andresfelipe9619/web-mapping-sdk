import React from 'react'
import {
    Grid,
    Header,
    Segment,
    Dimmer,
    Loader,
    Container,
    Button, Dropdown
} from "semantic-ui-react";
import Select from 'react-select'

export default (props) => {
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
    return (
        <div>
            <Segment>
                <h3>Consulte Mallas de Origen </h3>
                <Dropdown
                    placeholder="Cliente"
                    selection
                    options={atributosOptions}
                    // onChange={this.handleChangeClient}
                    isSearchable={true}
                />
                <Dropdown
                    placeholder="Producto"
                    selection
                    // options={productOptions}
                    // onChange={this.handleChangeProduct}
                    isSearchable={true}
                />
                <Dropdown
                    placeholder="Zona"
                    selection
                    // options={dispatchOptions}
                    // onChange={this.handleChangeDispatched}
                    isSearchable={true}
                />
                <Dropdown
                    placeholder="Calidad"
                    selection
                    // options={dispatchOptions}
                    // onChange={this.handleChangeDispatched}
                    isSearchable={true}
                />

                <Button type='submit' style={{ marginTop: '20px' }} onClick={this.handleSubmit} primary >Consultar</Button>
                <Button type='submit' style={{ marginTop: '20px' }} onClick={this.handleSubmit} primary >Reiniciar</Button>

            </Segment>
        </div>
    )
}
