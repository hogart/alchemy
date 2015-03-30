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
			]
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
			]
		);
	});

	it('should return empty array if there are no common effects', () => {
		assert.lengthOf(
			predictPotion([
				mockData.ingredients.alitHide,
				mockData.ingredients.kreshFiber
			]),
			0
		);
	});
});