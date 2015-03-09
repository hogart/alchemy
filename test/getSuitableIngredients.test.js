'use strict';

import {getSuitableIngredients} from '../src/alchemy.js';
import mockData from './mockData.js';
import {assert} from 'chai';

describe('getSuitableIngredients', () => {
	it('should return all suitable ingredients', () => {
		assert.lengthOf(
			getSuitableIngredients(
				mockData.ingredients.alitHide,
				mockData.ingredientList
			),
			3
		);
	});

	it('should return empty array if no suitable ingredients found', () => {
		assert.lengthOf(
			getSuitableIngredients(
				mockData.ingredients.alitHide,
				[mockData.ingredients.kreshFiber]
			),
			0
		);
	});
});