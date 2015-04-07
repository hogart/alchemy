'use strict';

import ViewAbstract from './Abstract.js';
import potionsTpl from '../../templates/client/potions.jade';

export default class ViewPotions extends ViewAbstract {
    tpl () {
        return potionsTpl
    }

    __registry__ () {
        return {
            potions: 'potions'
        }
    }

    __bindings__ () {
        return {
            potions: this.potions
        }
    }

    initialize (options) {
        super.initialize.call(this, options);

        this.onRender();
    }
}