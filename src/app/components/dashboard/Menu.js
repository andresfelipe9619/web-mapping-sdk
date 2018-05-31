import React, {Component} from 'react';
import {Label, Menu, Header, Input, Icon} from 'semantic-ui-react'
import {Route, Link} from 'react-router-dom';

export class MenuDashboard extends Component {
    state = {};
    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {activeItem} = this.state;

        return (
            <div>
                <Menu
                    size='large'
                    vertical>
                    <Menu.Item
                        name='usuarios'
                        style={{
                        background: 'grey'
                    }}
                        onClick={this.handleItemClick}>

                        <Header as='h4'>
                            <Icon name='setting' size='mini'/>
                            <Header.Content>
                                Usuarios
                            </Header.Content>
                        </Header>
                    </Menu.Item>

                    <Menu.Item
                        name='clientes'
                        active={activeItem === 'clientes'}
                        onClick={this.handleItemClick}
                        to="/usuarios/clientes" as={Link}>
                        <Header as='h4'>
                            <Icon name='users' size='mini'/>
                            <Header.Content>
                                Clientes
                            </Header.Content>
                        </Header>
                    
                    </Menu.Item>

                    <Menu.Item
                        name='operarios'
                        active={activeItem === 'operarios'}
                        onClick={this.handleItemClick}
                        to="/usuarios/operarios" as={Link}>
                        <Header as='h4'>
                            <Icon name='cubes' size='mini'/>
                            <Header.Content>
                                Operarios
                            </Header.Content>
                        </Header>
                    
                    </Menu.Item>

                    <Menu.Item
                        name='jefesProduccion'
                        active={activeItem === 'jefesProduccion'}
                        onClick={this.handleItemClick}
                        to="/usuarios/jefseProduccion" as={Link}>
                        <Header as='h4'>
                            <Icon name='shopping basket' size='mini'/>
                            <Header.Content>
                                Jefes de Produccion
                            </Header.Content>
                        </Header>
                    

                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}