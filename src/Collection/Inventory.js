'use strict';

'use strict';

import CollectionIngredient from  './Ingredient.js';
import CollectionPotion from './Potion.js';
import {getPossiblePotions as libGetPotions} from '../lib/alchemy.js';
import _ from 'underscore';

export default class CollectionInventory extends CollectionIngredient {
    __registry__ () {
        let parentReg = this._parentResult('__registry__');

        return _.extend({}, parentReg, {
            potions: 'potions'
        });
    }

    initialize (models, options) {
        super.initialize.apply(this, arguments);

        this.on('add remove reset', this.onAddRemove, this);
    }

    getPossiblePotions () {
        let potionsObj = libGetPotions(this);
        let potionsArr = [];

        for (let potionName of Object.keys(potionsObj)) {
            potionsArr.push(
                {
                    name: potionName,
                    ingredientNames: potionsObj[potionName].map(entry => entry.name)
                }
            )
        }

        return potionsArr;
    }

    clearAll () {
        this.reset([]);
        this.trigger('clearAll');
    }

    onAddRemove () {
        this.potions.reset(this.getPossiblePotions());
    }
}