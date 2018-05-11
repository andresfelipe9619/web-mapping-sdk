import React, { Component } from 'react';
import { Dimmer, Loader, Segment, Container, Grid, Header, Button } from 'semantic-ui-react';
import { connect } from "react-redux";
import { loadHome } from '../../actions/homeActions';
import {Route, Link} from 'react-router-dom';



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
                        divided='vertically'
                        style={{
                            marginTop: '7em',

                        }}>
                        <Grid.Row centered >
                            <Grid.Column width={8} >
                                <Header as='h1' textAlign="center">
                                    SIG Minero
                                    </Header>
                                <Segment textAlign="center">
                                <p>Este es un aplicativo SIG desarrollado con el fin  de suministrar información geográfica de forma dinámica sobre el proceso productivo de la mina Cachibi</p>
                                <Button primary as={Link} to="/ingreso">Ingreso</Button> <Button secondary as = {Link}
                                            to = "/registro" style = {{marginLeft: '0.5em'}} > Registrarse </Button>
                                </Segment>
                            </Grid.Column>

                        </Grid.Row >
                        <Grid.Row centered>
                            <Grid.Column width={8} textAlign="center">
                                <p>Este sistema permite establecer una zonificación y Preclasificación de la cantera con las principales propiedades de la roca y su litología, y efectuar un grado de trazabilidad efectivo del proceso de conversión de la materia prima a producto final en las manos del cliente
</p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column width={8} textAlign="center">
                                <Header as='h2' textAlign="center">
                                    Desarrolladores
                                    </Header>
                                <p>Alonso Alomia - Ruben Cuervo</p>
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