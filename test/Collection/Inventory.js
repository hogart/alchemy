/* eslint-env mocha */
'use strict';

import CollectionInventory from '../../src/Collection/Inventory.js';
import CollectionPotion from '../../src/Collection/Potion.js';
import mockData from '../mockData.js';
import {assert} from 'chai';

const registry = {
	acquire: function () {}
};

const inventory = new CollectionInventory(
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

describe('CollectionInventory', () => {
	let potions = inventory.getPossiblePotions();

	it('CollectionInventory#getPossiblePotions should return PotionCollection', () => {
		assert.instanceOf(inventory.getPossiblePotions(), CollectionPotion, 'returns instance of CollectionPotion');
		assert.lengthOf(potions, 1, 'with 1 potion');
	});

	it('CollectionInventory#getPossiblePotions result should contain proper model', () => {
		let potion = potions.models[0];

		assert.equal(potion.get('name'), 'Detect Animal', 'potion of `Detect Animal`');
		assert.lengthOf(potion.get('ingredientNames'), 2, 'from 2 ingredients');
	});

    it('should properly `clearAll` itself', function (done) {
        assert.isFunction(inventory.clearAll, 'has method');
        inventory.listenTo(inventory, 'clearAll', function () {
            assert.ok(true, 'fired `clearAll` event');
            done();
        });
        inventory.clearAll();
        assert.lengthOf(inventory, 0, 'Cleared all models');
    });
});