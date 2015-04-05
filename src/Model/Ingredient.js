'use strict';

import AbstractModel from './Abstract.js';
import {Ingredient} from '../lib/alchemy.js'

export default class ModelIngredient extends AbstractModel {
    constructor (attributes, options) {
        super(attributes, options);

        /**
         * @type {{string: boolean}}
         * @private
         * @instance
         */
        this._searchCache = {};
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

    /**
     * Detects if this ingredient have given substring in name or in effects list
     * @param {String} term
     * @return {boolean}
     */
    hasString (term) {
        if (term in this._searchCache) {
            return this._searchCache[term];
        } else {
            let nameHas = this.get('name').toLowerCase().includes(term);
            let effectsHave = this.get('effects').some((effect) => effect.toLowerCase().includes(term));

            this._searchCache[term] = nameHas || effectsHave;

            return  nameHas || effectsHave;
        }
    }
}