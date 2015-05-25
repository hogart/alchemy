'use strict';

import CollectionIngredient from  './Ingredient';
import _ from 'underscore';
import JSONStorage from '../JSONStorage';

import data from '../lib/data/index.js';

export default class CollectionShowcase extends CollectionIngredient {
    __registry__ () {
        let parentReg = this._parentResult('__registry__');

        return _.extend({}, parentReg, {
            games: 'games',
            inventory: 'inventory'
        });
    }

    initialize (models, options) {
        super.initialize.call(this, models, options);

        this.storage = new JSONStorage('actives');

        this.marked = new Set([]);
        this.on('change:inInventory', function (model, value) {
            this.marked[value ? 'add' : 'delete'](model.id);
        }, this);

        this.listenTo(this.games, 'change:active', this.onGameChange);

        this.listenTo(this.inventory, 'clearAll', this.onInventoryClear);
        this.listenTo(this.inventory, 'remove', this.onInventoryRemove);

        window.addEventListener('beforeunload', this.saveMarked.bind(this));
    }

    findByTitle (name) {
        return this.findWhere({name: name});
    }

    onInventoryRemove (model/*, inventory, options*/) {
        this.get(model.id).set('inInventory', false);
    }

    toInventory (index) {
        let model = this.at(index);
        this.inventory.add(model.clone());
        model.set('inInventory', true);
    }

    onInventoryClear () {
        this.clearMarked();
    }

    clearMarked () {
        this.where({inInventory: true}).forEach(model => model.set('inInventory', false));
    }

    onGameChange (model, active) {
        if (this.activeGame) { // we have some active selection so we should save first
            this.saveMarked();
        }

        this.activeGame = active;
        this.clearMarked(true);
        this.reset(data[active], {parse: true});

        this.inventory.reset([]);
        this.marked = new Set(this.storage.getItem(this.activeGame));
        this.marked.forEach(this.toInventory.bind(this));
    }

    saveMarked () {
        this.storage.setItem(this.activeGame, this.marked);
    }

    parse (rawData) {
        return rawData.map((ingredient, index) => {
            ingredient.id = index;
            return ingredient;
        });
    }
};