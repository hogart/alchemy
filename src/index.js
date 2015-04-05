'use strict';
import 'babel/polyfill'; // for generators to work properly

// for stuff like Backbone.$ to work properly
window.jQuery = require('jquery');
let Backbone = require('backbone');
Backbone.$ = require('jquery');

import Skull from 'backbone-skull';
import CollectionIngredient from './Collection/Ingredient.js';
import CollectionShowcase from './Collection/Showcase.js';
import morrowind from './lib/data/morrowind.js';
import ViewRoot from './View/Root.js';
import Router from './Router.js';

class AlchemyApplication extends Skull.Application {}

const appConfig = {
    rootView: ViewRoot,
    //autostart: true,
    router: Router
};

const app = new AlchemyApplication(appConfig);

app.registry.register('inventory', new CollectionIngredient([], {registry: app.registry}));
app.registry.register('showcaseCollection', new CollectionShowcase(morrowind, {registry: app.registry}));

app.start();