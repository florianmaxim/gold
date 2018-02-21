import React from 'react';

import About from './components/About';
import Block from './components/Block';

import {Route, Switch} from 'react-router';

export default () =>

    <Switch>

        <Route path="/block/:blockHeight" component={Block} />

        <Route path="/about" component={About} />

        <Route exactPath="/" component={About} />

    </Switch>