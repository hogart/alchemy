'use strict';
import 'babel/polyfill'; // for generators to work properly

// for stuff like Backbone.$ to work properly
window.jQuery = require('jquery');
let Backbone = require('backbone');
Backbone.$ = require('jquery');

import Skull from 'backbone-skull';
import ModelGames from './Model/Games.js';
import CollectionInventory from './Collection/Inventory.js';
import CollectionShowcase from './Collection/Showcase.js';
import CollectionPotion from './Collection/Potion';
import ViewRoot from './View/Root.js';
import Router from './Router.js';

class AlchemyApplication extends Skull.Application {
    create (name, constructor, data, params) {
        params.registry = this.registry;
        this.registry.register(name, new constructor(data, params));
    }
}

const appConfig = {
    rootView: ViewRoot,
    //autostart: true,
    router: Router
};

const app = new AlchemyApplication(appConfig);

app.create('games', ModelGames, {}, {});
app.create('potions', CollectionPotion, [], {});
app.create('inventory', CollectionInventory, [], {});
app.create('showcaseCollection', CollectionShowcase, [], {});

app.start();