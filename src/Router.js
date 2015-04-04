'use strict';

import Backbone from 'backbone';

export default class Router extends Backbone.Router {};

Router.prototype.routes = {
    '': 'mw',
    'mw': 'mw',
    'ob': 'ob',
    'sr': 'sr'
};

