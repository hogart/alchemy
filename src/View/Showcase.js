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
            inventory: 'inventory',
            app: 'app'
        }
    }

    events () {
        return {
            'click .ingredient:not(.marked)': 'onIngredientClick',
            'click $search': 'onSearchClick'
        }
    }

    __ui__ () {
        return {
            'search': 'input[type="search"]'
        }
    }

    initialize (options) {
        super.initialize.call(this, options);

        this.onRender();

        this.listenTo(this.app, 'searchByPotion', this.onSearchBy);
    }

    onIngredientClick (event) {
        let target = event.currentTarget;
        let index = parseInt(target.dataset.idx);

        this.showcaseCollection.toInventory(index);
    }

    onSearchBy (str) {
        console.log(str);
        this.ui.search.val(str);

        let event = document.createEvent('HTMLEvents');
        event.initEvent('change', true, true);

        this.ui.search[0].dispatchEvent(event);
    }

    onSearchFocus (event) {
        this.ui.search.select();
    }
}