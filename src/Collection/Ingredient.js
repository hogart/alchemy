'use strict';

import CollectionAbstract from './Abstract.js';
import ModelIngredient from '../Model/Ingredient';
import CollectionPotion from './Potion.js';
import {getPossiblePotions as libGetPotions} from '../lib/alchemy.js'

class CollectionIngredient extends CollectionAbstract {
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
}

CollectionIngredient.prototype.model = ModelIngredient;

export default CollectionIngredient;