'use strict';

'use strict';

import CollectionIngredient from  './Ingredient.js';
import CollectionPotion from './Potion.js';
import {getPossiblePotions as libGetPotions} from '../lib/alchemy.js';

export default class CollectionInventory extends CollectionIngredient {
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

        return new CollectionPotion(potionsArr, {registry: this.registry});
    }

    clearAll () {
        this.reset();
        this.trigger('clearAll');
    }
}