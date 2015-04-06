'use strict';

import CollectionIngredient from  './Ingredient.js';
import _ from 'underscore';

export default class CollectionShowcase extends CollectionIngredient {
    __registry__ () {
        let parentReg = this._parentResult('__registry__');

        return _.extend({}, parentReg, {
            inventory: 'inventory'
        });
    }

    initialize (models, options) {
        super.initialize.call(this, models, options);

        this.listenTo(this.inventory, 'remove', this.onInventoryRemove);
        this.listenTo(this.inventory, 'reset', this.onInventoryReset);
    }

    findByTitle (name) {
        return this.findWhere({name: name});
    }

    onInventoryRemove (model/*, inventory, options*/) {
        this.findByTitle(model.get('name')).set('inInventory', false);
    }

    toInventory (index) {
        let model = this.at(index);
        this.inventory.add(model.clone());
        model.set('inInventory', true);
    }

    onInventoryReset () {
        this.where({inInventory: true}).forEach((model) => model.set('inInventory', false));
    }
};