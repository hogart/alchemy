'use strict';

import Skull from 'backbone-skull';
import {Ingredient} from '../lib/alchemy.js'

class ModelIngredient extends Skull.Model {
    constructor (attributes, options) {
        super(attributes, options);
    }

    hasEffect (effect) {
        return Ingredient.prototype.hasEffect.call(this.attributes, effect);
    }

    getSharedEffects (other) {
        return Ingredient.prototype.getSharedEffects.call(this.attributes, other);
    }

    hasSomeEffects (effects) {
        return Ingredient.prototype.hasSomeEffects.call(this, effects);
    }
}

export default ModelIngredient;