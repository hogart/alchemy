'use strict';

import CollectionAbstract from './Abstract.js';
import ModelIngredient from '../Model/Ingredient';

function* collectionIterator (models) {
    for (let model of models) {
        yield model.attributes;
    }
}

export default class CollectionIngredient extends CollectionAbstract {
    [Symbol.iterator] () {
        return collectionIterator(this.models);
    }
}

CollectionIngredient.prototype.model = ModelIngredient;
CollectionIngredient.__super__ = CollectionAbstract.prototype;