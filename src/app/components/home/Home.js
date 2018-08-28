import React, { Component } from 'react';
import { Dimmer, Loader, Segment, Container, Grid, Header, Button, Icon} from 'semantic-ui-react';
import { connect } from "react-redux";
import { loadHome } from '../../actions/homeActions';
import { Route, Link } from 'react-router-dom';
import clasificadora from './clasificadora.jpg'
import transporte from './transporte.jpg'

class Home extends Component {

    componentDidMount() {
        this.props.loadPage();
    }

    render() {

        if (this.props.hasErrored) {
            return (
                <h1>Error</h1>
            )
        } else if (this.props.isLoading) {
            return (
                <Segment style={{
                    marginTop: '7em',
                    height: '20em'
                }}>
                    <Dimmer inverted active>
                        <Loader size='big'>Loading</Loader>
                    </Dimmer>
                </Segment>
            );
        } else {
            return (
                <Container>
                    <Grid
                        style={{
                            marginTop: '7em',

                        }}>
                        <Grid.Row centered >
                            <Grid.Column centered={true} width={16} >
                                <Header as='h1' textAlign="center">
                                    SIG Para Cantera De Agregados
                                    </Header>
                                <Header as='h3' textAlign="center">
                                    Este es un proyecto enfocado en Desarrollar e implementar un ambiente web que integre y relacione la información espacial y alfanumérica referente a la cadena productiva de la planta de agregados y mezclas Cachibi
                                    <br />
                                    <Button primary as={Link} to="/ingreso">Ingreso</Button>
                                    <Button secondary as={Link} to="/registro" style={{ marginLeft: '0.5em' }} > Registrarse </Button>
                                </Header>
                            </Grid.Column>

                        </Grid.Row >
                        <Grid.Row centered>
                            <Grid.Column width={8} style={{ height:'500px', backgroundImage: `url(${clasificadora})` }}>
                            </Grid.Column>
                            <Grid.Column width={8} style={{ backgroundImage: `url(${transporte})` }}>

                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column width={8} textAlign="center">
                                <Header as='h3' textAlign="center">
                                    Diseñado por:<br />
                                    Wildeman Alonso Alomia <br />
                                    Ruben Dario Cuervo
                                </Header>
                            </Grid.Column>
                            <Grid.Column width={8} textAlign="center">
                                <Header as='h3' textAlign="center">
                                    Dirigido por:<br />
                                    Ingeniero Eduardo Peña <br />
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Header as='h2' textAlign="center">
                                Cantera de Agregados Y Mezclas Cachibi
                            </Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8} textAlign="center">
                                <Icon circular name='road' size='huge' />
                                <Header as='h4' textAlign="center" >
                                    Este desarrollo se logro a partir del Establecimiento de la zonificación y Preclasificación de la cantera con las principales propiedades de la roca y su litología, Desarrollando este  SIG para que responda a los principales requerimientos del proceso productivo de la planta; así como también, con la Creación de este aplicativo se pudo efectuar un grado de trazabilidad efectivo del proceso de conversión de la materia prima a producto final el cual es llevado a las manos del cliente.
                                </Header>

                            </Grid.Column>
                            <Grid.Column width={8} textAlign="center" >
                                <Icon circular name='clipboard check' size='huge' />
                                <Header as='h4' textAlign="center" >
                                    En este proyecto se analizaron los procesos y mecanismos utilizados para la explotación de materiales a cielo abierto, enfocados en la cantera de Agregados Cachibí ubicada en el municipio de Yumbo, se desarrollo este sistema de información geográfica que permitió mejorar la productividad general de todo el proceso de los productos, analizando su distribución y tecnología.
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <br /><br />
                        <Grid.Row>
                            <Grid.Column width={8} textAlign="center">
                                <Header as='h2' textAlign="center">
                                    Ingenieria Topografica<br />Facultad de Ingenieria Civil y Geommatica
                            </Header>
                                <br /><br />
                            </Grid.Column>
                            <Grid.Column width={8} textAlign="center">
                                <Header as='h2' textAlign="center">
                                    Universidad del Valle<br />Proyecto de Grado
                            </Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return { message: state.homeReducer.homeLoaded, isLoading: state.homeReducer.homeLoading, hasErrored: state.homeReducer.homeErrored };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadPage: () => {
            dispatch(loadHome());
        },
        errorMessage: () => {
            dispatch()
        },
        successMessage: () => {
            dispatch()
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);