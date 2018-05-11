import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
    Container,
    Image,
    Menu,
    Button,
    Segment,
    Header,
    Icon
} from 'semantic-ui-react'
import {logout} from "../../actions/authActions";


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: ''
        };
        // this.handleLogoutClick = this.handleLogoutClick.bind(this);

    }
    handleItemClick = (e, {name}) => this.setState({activeItem: name})
    // handleLogoutClick(e) {     this.props.requestLogout(); }
    render() {
        const {activeItem} = this.state;
        return (
            <div>
                <Segment
                color='blue'
                    style={{
                    marginBottom: '50px',
                }}>
                    <Menu fixed='top'>
                        <Container >
                            <Menu.Item
                                name='inicio'
                                active={activeItem === 'inicio'}
                                onClick={this.handleItemClick}
                                as={Link}
                                to="/"
                                header
                                color='blue'>
                                Inicio
                            </Menu.Item>
                            <Menu.Item
                                name='mapa'
                                active={activeItem === 'mapa'}
                                onClick={this.handleItemClick}
                                as={Link}
                                to="/mapa">Mapa</Menu.Item>
                            <Menu.Item
                                name='acciones'
                                active={activeItem === 'acciones'}
                                onClick={this.handleItemClick}
                                to="/acciones"
                                as={Link}>Acciones</Menu.Item>
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
                        </Container>
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