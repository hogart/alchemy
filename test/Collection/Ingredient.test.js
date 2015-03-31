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
	let potions = ingredients.getPossiblePotions();

	it('CollectionIngredient#getPossiblePotions should return PotionCollection', () => {
		assert.instanceOf(ingredients.getPossiblePotions(), CollectionPotion);
		assert.lengthOf(potions, 1);
	});

	it('CollectionIngredient#getPossiblePotions result should contain proper model', () => {
		let potion = potions.models[0];

		assert.equal(potion.get('name'), 'Detect Animal');
		assert.lengthOf(potion.get('ingredientNames'), 2);
	})
});