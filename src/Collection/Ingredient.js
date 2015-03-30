'use strict';

import CollectionAbstract from './Abstract.js';
import IngredientModel from '../Model/Ingredient';
import {getPossiblePotions as libGetPotions} from '../lib/alchemy.js'

class CollectionIngredient extends CollectionAbstract {
    getPossiblePotions () {
        return libGetPotions(this);
    }
}

CollectionIngredient.prototype.model = IngredientModel;

export default CollectionIngredient;