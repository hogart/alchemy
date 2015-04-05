'use strict';

import ViewAbstract from './Abstract.js';
import inventoryTpl from '../../templates/client/inventory.jade';

export default class ViewInventory extends ViewAbstract {
    __registry__ () {
        return {
            inventory: 'inventory'
        }
    }

    __bindings__ () {
        return {
            inventory: this.inventory
        }
    }

    tpl () {
        return inventoryTpl;
    }

    events () {
        return {
            'click .ingredient': 'onIngredientClick'
        }
    }

    initialize (options) {
        super.initialize.call(this, options);

        this.onRender();
    }

    onIngredientClick (event) {
        let target = event.currentTarget;
        let index = parseInt(target.dataset.idx);
        let model = this.inventory.at(index);

        this.inventory.remove(model);
    }
};