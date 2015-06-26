/* eslint-env mocha */
'use strict';

import {getSuitableIngredients} from '../src/lib/alchemy.js';
import mockData from './mockData.js';
import {assert} from 'chai';

describe('getSuitableIngredients', () => {
    it('should return all suitable ingredients', () => {
        assert.lengthOf(
            getSuitableIngredients(
                mockData.ingredients.alitHide,
                mockData.ingredientList
            ),
            3,
            '3 ingredients combine with alit hide'
        );
    });

    it('should return empty array if no suitable ingredients found', () => {
        assert.lengthOf(
            getSuitableIngredients(
                mockData.ingredients.alitHide,
                [mockData.ingredients.kreshFiber]
            ),
            0,
            'alit hide combines with nothing in list of single kresh fiber'
        );
    });
});