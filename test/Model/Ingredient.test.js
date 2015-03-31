/* eslint-env mocha */
'use strict';

import ModelIngredient from '../../src/Model/Ingredient.js';
import mockData from '../mockData.js';
import {assert} from 'chai';

const registry = {
	acquire: function () {}
};

const alitHide = new ModelIngredient(
	{
		name: 'Alit Hide',
		effects: ['Drain Intelligence', 'Resist Poison', 'Telekinesis', 'Detect Animal']
	},
	{
		registry: registry
	}
);
const ampoulePod = new ModelIngredient(
	{
		name: 'Ampoule Pod',
		effects: ['Water Walking', 'Paralyze',	'Detect Animal', 'Drain Willpower']
	},
	{
		registry: registry
	}
);
const kreshFiber = new ModelIngredient(
	{
		name: 'Kresh Fiber',
		effects: ['Restore Luck',	'Fortify Personality', 'Drain Magicka', 'Drain Speed']
	},
	{
		registry: registry
	}
);

describe('ModelIngredient', () => {
	it('should correctly determine if it has given effect', () => {
		assert.ok(alitHide.hasEffect('Drain Intelligence'));
		assert.notOk(alitHide.hasEffect('Paralyze'));
	});

	it('should correctly find shared effects', () => {
		assert.deepEqual(alitHide.getSharedEffects(ampoulePod), ['Detect Animal']);
		assert.lengthOf(alitHide.getSharedEffects(kreshFiber), 0);
	});

	it('should correctly determine if it has some of desired effects', () => {
		assert.ok(alitHide.hasSomeEffects(['Telekinesis', 'Water Walking']));
		assert.notOk(alitHide.hasSomeEffects(['Paralyze', 'Drain Willpower']));
	});
});
