import React, {Component} from 'react';
import {Label, Menu, Header, Input, Icon} from 'semantic-ui-react'
import {Route, Link} from 'react-router-dom';

export default class MenuMapa extends Component {
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
                        name='proceso'
                        style={{
                        background: 'grey'
                    }}
                        onClick={this.handleItemClick}>

                        <Header as='h4'>
                            <Icon name='refresh' size='mini'/>
                            <Header.Content>
                                Proceso Productivo
                            </Header.Content>
                        </Header>
                    </Menu.Item>

                    <Menu.Item
                        name='mallas'
                        active={activeItem === 'mallas'}
                        onClick={this.handleItemClick}
                        to="/mapa/mallas" as={Link}>
                        <Header as='h4'>
                            <Icon name='connectdevelop' size='mini'/>
                            <Header.Content>
                            Mallas
                            </Header.Content>
                        </Header>
                    
                    </Menu.Item>

                    <Menu.Item
                        name='trituradoras'
                        active={activeItem === 'trituradoras'}
                        onClick={this.handleItemClick}
                        to="/mapa/trituradoras" as={Link}>
                        <Header as='h4'>
                            <Icon name='cut' size='mini'/>
                            <Header.Content>
                                Trituradoras
                            </Header.Content>
                        </Header>
                    
                    </Menu.Item>

                    <Menu.Item
                        name='clasififcadoras'
                        active={activeItem === 'clasififcadoras'}
                        onClick={this.handleItemClick}
                        to="/mapa/clasificadoras" as={Link}>
                        <Header as='h4'>
                            <Icon name='map signs' size='mini'/>
                            <Header.Content>
                                Clasificadoras
                            </Header.Content>
                        </Header>
                
                    </Menu.Item>

                    {/* <Menu.Item
                        name='bandas'
                        active={activeItem === 'bandas'}
                        onClick={this.handleItemClick}
                        to="/mapa/bandas" as={Link}>
                        <Header as='h4'>
                            <Icon name='expand arrows alternate' size='mini'/>
                            <Header.Content>
                                Bandas
                            </Header.Content>
                        </Header>
                
                    </Menu.Item>

                    <Menu.Item
                        name='procrudo'
                        active={activeItem === 'procrudo'}
                        onClick={this.handleItemClick}
                        to="/mapa/procrudo" as={Link}>
                        <Header as='h4'>
                            <Icon name='circle' size='mini'/>
                            <Header.Content>
                                Producto crudo
                            </Header.Content>
                        </Header>
                
                    </Menu.Item>

                    <Menu.Item
                        name='profinal'
                        active={activeItem === 'profinal'}
                        onClick={this.handleItemClick}
                        to="/mapa/profinal" as={Link}>
                        <Header as='h4'>
                            <Icon name='dolly' size='mini'/>
                            <Header.Content>
                                Producto final
                            </Header.Content>
                        </Header>
                
                    </Menu.Item> */}
                </Menu>
            </div>
        );
    }
}