import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Container,
    Image,
    Menu,
    Button,
    Segment,
    Header,
    Icon
} from 'semantic-ui-react'
import { logout } from "../../actions/authActions";


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: ''
        };
        // this.handleLogoutClick = this.handleLogoutClick.bind(this);

    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    // handleLogoutClick(e) {     this.props.requestLogout(); }
    render() {
        const { activeItem } = this.state;
        return (
            <div>
                <Segment
                    color='blue'
                    style={{
                        marginBottom: '50px',
                    }}>
                    <Menu fixed='top' icon='labeled' >
                        <Menu.Menu position='right' style={{ marginRight: '10em' }}>
                            <Menu.Item
                                name='inicio'
                                active={activeItem === 'inicio'}
                                onClick={this.handleItemClick}
                                as={Link}
                                to="/"
                                header
                                color='blue'>
                                <Icon name='home' />
                                Inicio
                            </Menu.Item>
                            <Menu.Item
                                color='blue'
                                name='mapa'
                                active={activeItem === 'mapa'}
                                onClick={this.handleItemClick}
                                as={Link}
                                to="/mapa">
                                <Icon name='map' />
                                Mapa</Menu.Item>
                            <Menu.Item
                                color='blue'
                                name='sql'
                                active={activeItem === 'sql'}
                                onClick={this.handleItemClick}
                                to="mapa/sql"
                                as={Link}>
                                <Icon name='code' />
                                SQL</Menu.Item>
                            <Menu.Item
                                color='blue'
                                name='usuarios'
                                active={activeItem === 'usuarios'}
                                onClick={this.handleItemClick}
                                to="/dashboard/usuarios"
                                as={Link}>
                                <Icon name='users' />
                                Usuarios</Menu.Item>
                            <Menu.Item
                                color='blue'
                                name='despachos'
                                active={activeItem === 'despachos'}
                                onClick={this.handleItemClick}
                                to="/dashboard/despachos"
                                as={Link}>
                                <Icon name='shopping basket' />
                                Despachos</Menu.Item>
                            <Menu.Item
                                color='blue'
                                name='ingreso'
                                active={activeItem === 'ingreso'}
                                onClick={this.handleItemClick}
                                to="/ingreso"
                                as={Link}>
                                <Icon name='sign in' />
                                Ingreso</Menu.Item>
                            {/* {this.props.user.admin
                                ? <Menu.Item
                                        name='dashboard'
                                        active={activeItem === 'dashboard'}
                                        onClick={this.handleItemClick}
                                        to="/dashboard"
                                        as={Link}>Dashboard</Menu.Item>
                                : ''}
                            <Menu.Item position='right'>
                                {this.props.user.admin
                                    ? <Segment>
                                        <Header as='h3' color='green'>
                                        <Header.Content>
                                                {this.props.user.username}
                                        </Header.Content>
                                            <Button as={Link} floated="right" to="/ingreso" onClick={this.handleLogoutClick}>Cerrar Sesion</Button>
                                        </Header>
                                    </Segment>

                                    : <Segment>
                                        <Button as={Link} to="/ingreso">Ingreso</Button> <Button as = {Link}
                                            to = "/registro" style = {{marginLeft: '0.5em'}} > Registrarse </Button>
                                </Segment>   }
                            </Menu.Item> */}
                        </Menu.Menu>
                    </Menu>
                </Segment>
            </div>
        );
    }
}

// const mapStateToProps = (state) => {     return {user:
// state.authReducer.loginSuccess}; }; const mapDispatchToProps = (dispatch) =>
// {     return {         requestLogout: () =>{             dispatch(logout())
//     }     } }; export default connect(mapStateToProps,
// mapDispatchToProps)(Navbar);
export default Navbar;