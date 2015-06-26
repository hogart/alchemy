/* eslint-env mocha */
'use strict';

import {Ingredient} from '../src/lib/alchemy.js';
import mockData from './mockData.js';
import {assert} from 'chai';

const alitHide = mockData.ingredients.alitHide;

describe('Ingredient', () => {
    it('should correctly determine if it has given effect', () => {
        assert.ok(alitHide.hasEffect('Drain Intelligence'), 'alit hide makes you dumber indeed');
        assert.notOk(alitHide.hasEffect('Paralyze'), 'alit hide cannot paralyze you');
    });

    it('should correctly find shared effects', () => {
        assert.deepEqual(alitHide.getSharedEffects(mockData.ingredients.ampoulePod), ['Detect Animal'], 'alit hide and ampoule pod both "detect animal"');
        assert.lengthOf(alitHide.getSharedEffects(mockData.ingredients.kreshFiber), 0, 'alit hide and kresh fiber do not share effects');
    });

    it('should correctly determine if it has some of desired effects', () => {
        assert.ok(alitHide.hasSomeEffects(['Telekinesis', 'Water Walking']), 'alit hide has either telekinesis or water walking');
        assert.notOk(alitHide.hasSomeEffects(['Paralyze', 'Drain Willpower']), 'alit hide have neither paralyze nor drain willpower');
    });
});
