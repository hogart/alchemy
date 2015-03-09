'use strict';

import {getIngredientsForPotion} from '../src/alchemy.js';
import mockData from './mockData.js';
import {assert} from 'chai';

describe('getIngredientsForPotion', () => {
	it('should provide some ingredients when possible', () => {
		assert.lengthOf(
			getIngredientsForPotion(['Water Walking'], mockData.ingredientList),
			2
		);

		assert.lengthOf(
			getIngredientsForPotion(['Paralyze'], mockData.ingredientList),
			1
		);
	});

	it('should return empty array when used with non-existent effect', () => {
		assert.lengthOf(
			getIngredientsForPotion(['Fortify Fish-catching'], mockData.ingredientList),
			0
		);
	})
});