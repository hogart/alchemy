'use strict';

import CollectionAbstract from './Abstract.js';
import ModelIngredient from '../Model/Ingredient';
import CollectionPotion from './Potion.js';
import {getPossiblePotions as libGetPotions} from '../lib/alchemy.js'

function* collectionIterator (models) {
    for (let model of models) {
        yield model.attributes;
    }
}

export default class CollectionIngredient extends CollectionAbstract {
    [Symbol.iterator] () {
        return collectionIterator(this.models);
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

        return new CollectionPotion(potionsArr, {registry: this.registry});
    }
}

CollectionIngredient.prototype.model = ModelIngredient;
CollectionIngredient.__super__ = CollectionAbstract.prototype;