'use strict';

import ViewAbstract from './Abstract.js';
import potionsTpl from '../../templates/client/potions.jade';

export default class ViewPotions extends ViewAbstract {
    tpl () {
        return potionsTpl
    }

    __registry__ () {
        return {
            potions: 'potions',
            app: 'app'
        }
    }

    __bindings__ () {
        return {
            potions: this.potions
        }
    }

    events () {
        return {
            'click .potion': 'onPotionClick'
        }
    }

    initialize (options) {
        super.initialize.call(this, options);

        this.onRender();
    }

    onPotionClick (event) {
        let titleNode = event.currentTarget.querySelector('.potion-title');
        let title = titleNode.textContent.trim();

        this.app.trigger('searchByPotion', title);
    }
}