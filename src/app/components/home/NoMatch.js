import React, {Component} from 'react';
import {Image, Segment} from 'semantic-ui-react'

const NoMatch = ({location}) => (
    <Segment textAlign='center'>
        <h1>404</h1>
        <h3>
           Esta pagina no existe
            <code>{'   ' + location.pathname}</code>
        </h3>
	/>
    </Segment>
);

export default NoMatch;