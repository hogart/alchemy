'use strict';
import 'babel/polyfill'; // for generators to work properly

// for stuff like Backbone.$ to work properly
window.jQuery = require('jquery');
let Backbone = require('backbone');
Backbone.$ = require('jquery');

import Skull from 'backbone-skull';
import CollectionIngredient from './Collection/Ingredient.js';
import ViewRoot from './View/Root.js';
import Router from './Router.js';

class AlchemyApplication extends Skull.Application {}

const appConfig = {
    rootView: ViewRoot,
    autostart: true,
    router: Router
};

const app = new AlchemyApplication(appConfig);