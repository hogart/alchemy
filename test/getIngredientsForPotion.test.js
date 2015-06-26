/* eslint-env mocha */
'use strict';

import {getIngredientsForPotion} from '../src/lib/alchemy.js';
import mockData from './mockData.js';
import {assert} from 'chai';

describe('getIngredientsForPotion', () => {
    it('should provide some ingredients when possible', () => {
        assert.lengthOf(
            getIngredientsForPotion(['Water Walking'], mockData.ingredientList),
            2,
            '2 ingredients have water walking effect'
        );

        assert.lengthOf(
            getIngredientsForPotion(['Paralyze'], mockData.ingredientList),
            1,
            'only 1 ingredient have paralyze effect'
        );
    });

    it('should return empty array when used with non-existent effect', () => {
        assert.lengthOf(
            getIngredientsForPotion(['Fortify Fish-catching'], mockData.ingredientList),
            0,
            'no ingredients have `Fortify Fish-catching` effect'
        );
    });

    it('should return empty array when passed empty list of effects', () => {
        assert.lengthOf(
            getIngredientsForPotion([''], mockData.ingredientList),
            0,
            'no effects resulted in no ingredients'
        );
    })
});