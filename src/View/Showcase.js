'use strict';

import ViewAbstract from './Abstract.js';
import showcaseTpl from '../../templates/client/showcase.jade'

export default class ViewShowcase extends ViewAbstract {
    tpl () {
        return showcaseTpl
    }

    __bindings__ () {
        return {
            showcaseCollection: this.showcaseCollection
        }
    }

    __registry__ () {
        return {
            showcaseCollection: 'showcaseCollection',
            inventory: 'inventory'
        }
    }

    events () {
        return {
            'click .ingredient:not(.marked)': 'onIngredientClick'
        }
    }

    initialize (options) {
        super.initialize.call(this, options);

        this.onRender();
    }

    onIngredientClick (event) {
        let target = event.currentTarget;
        let index = parseInt(target.dataset.idx);

        this.showcaseCollection.toInventory(index);
    }
}