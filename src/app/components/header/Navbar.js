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
    handleLogoutClick = (e)=> {
        this.props.requestLogout();
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
                                to="/mapa/sql"
                                as={Link}>
                                <Icon name='code' />
                                SQL</Menu.Item>
                                {this.props.user.rol==1?( <Menu.Item
                                    color='blue'
                                    name='usuarios'
                                    active={activeItem === 'usuarios'}
                                    onClick={this.handleItemClick}
                                    to="/usuarios"
                                    as={Link}>
                                    <Icon name='users' />
                                    Usuarios</Menu.Item>):null}
                            
                                {this.props.user.rol>0
                                    ? 
                                    <Menu.Item
                                    color='blue'
                                    name='salir'
                                    active={activeItem === 'salir'}
                                    onClick={this.handleLogoutClick}
                                    to="/ingreso"
                                    as={Link}>
                                    <Icon name='log out' />
                                    {this.props.user.usn} Cerrar Sesion</Menu.Item>
                                    :
                                <Menu.Item
                                    color='blue'
                                    name='ingreso'
                                    active={activeItem === 'ingreso'}
                                    onClick={this.handleItemClick}
                                    to="/ingreso"
                                    as={Link}>
                                    <Icon name='sign in' />
                                    Ingreso</Menu.Item>   }
                        </Menu.Menu>
                    </Menu>
                </Segment>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {user: state.authReducer.loginSuccess};
};  
const mapDispatchToProps = (dispatch) => {
    return {
        requestLogout: () =>{
            dispatch(logout())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);