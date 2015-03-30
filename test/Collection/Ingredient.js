/* eslint-env mocha */
'use strict';

import CollectionIngredient from '../../src/Collection/Ingredient.js';
import mockData from '../mockData.js';
import {assert} from 'chai';

const registry = {
	acquire: function () {}
};

const ingredients = new CollectionIngredient(
	[
		{
			name: 'Alit Hide',
			effects: ['Drain Intelligence', 'Resist Poison', 'Telekinesis', 'Detect Animal']
		},
		{
			name: 'Ampoule Pod',
			effects: ['Water Walking', 'Paralyze', 'Detect Animal', 'Drain Willpower']
		},
		{
			name: 'Kresh Fiber',
			effects: ['Restore Luck', 'Fortify Personality', 'Drain Magicka', 'Drain Speed']
		}
	],
	{
		registry: registry
	}
);

describe('CollectionIngredient', () => {
	it('should correctly determine possible potions', () => {
		assert.property(ingredients.getPossiblePotions(), 'Detect Animal')
	});
});