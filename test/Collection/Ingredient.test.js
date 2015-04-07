/* eslint-env mocha */
'use strict';

import CollectionIngredient from '../../src/Collection/Ingredient.js';
import CollectionPotion from '../../src/Collection/Potion.js';
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
	it('should correctly iterate over models attributes using for..of', () => {
		for (let ingred of ingredients) {
			assert.property(ingred, 'name', 'has `name` property');
			assert.lengthOf(ingred.effects, 4, 'has effects property with length of 4');
			break;
		}
	});
});