/* eslint-env mocha */
'use strict';

import {predictPotion} from '../src/lib/alchemy.js';
import mockData from './mockData.js';
import {assert} from 'chai';

describe('getPossiblePotions', () => {
	it('should correctly find which effects have 2 or more ingredients in common', () => {
		assert.deepEqual(
			predictPotion([
				mockData.ingredients.alitHide,
				mockData.ingredients.ampoulePod
			]),
			[
				'Detect Animal'
			],
			'alit hide and ampoule pod indeed makes you observant to animal presence'
		);

		assert.deepEqual(
			predictPotion([
				mockData.ingredients.alitHide,
				mockData.ingredients.ampoulePod,
				mockData.ingredients.kwamaCuttle
			]),
			[
				'Detect Animal',
				'Resist Poison',
				'Water Walking'
			],
			'Given alit hide, ampoule pod and kwama cuttle, you can brew detect animal, resist poison or water walling potions'
		);
	});

	it('should return empty array if there are no common effects', () => {
		assert.lengthOf(
			predictPotion([
				mockData.ingredients.alitHide,
				mockData.ingredients.kreshFiber
			]),
			0,
			'No potions can be brewed from alit hide and kresh fiber. Go gather some more!'
		);
	});
});