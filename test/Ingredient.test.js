'use strict';

import {Ingredient} from '../src/alchemy.js';
import mockData from './mockData.js';
import {assert} from 'chai';

const alitHide = mockData.ingredients.alitHide;

describe('Ingredient', function() {
	//it('should have 4 effects', () => {
	//	assert.equal(alitHide.effects.length, 4)
	//});

	it ('should correctly determine if it has given effect', () => {

		assert.ok(alitHide.hasEffect('Drain Intelligence'));
		assert.notOk(alitHide.hasEffect('Paralyze'));
	});

	it('should correctly find shared effects', () => {
		assert.deepEqual(alitHide.getSharedEffects(mockData.ingredients.ampoulePod), ['Detect Animal']);
		assert.equal(alitHide.getSharedEffects(mockData.ingredients.kreshFiber).length, 0);
	});

	it('should correctly determine if it has some of desired effects', () => {
		assert.ok(alitHide.hasSomeEffects(['Telekinesis', 'Water Walking']));
		assert.notOk(alitHide.hasSomeEffects(['Paralyze', 'Drain Willpower']));
	});
});
