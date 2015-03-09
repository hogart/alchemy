/* eslint-env mocha */
'use strict';

import {getPossiblePotion} from '../src/alchemy.js';
import mockData from './mockData.js';
import {assert} from 'chai';

describe('getPossiblePotion', () => {
	it('should correctly detect possible potions', () => {
		let detectAnimal = getPossiblePotion([
			mockData.ingredients.alitHide,
			mockData.ingredients.ampoulePod
		]);
		assert.property(
			detectAnimal,
			'Detect Animal',
			'alit hide and ampoule pod gives "Detect Animal"'
		);

		let detectAnimalAndTelekinesis = getPossiblePotion([
			mockData.ingredients.alitHide,
			mockData.ingredients.ampoulePod,
			mockData.ingredients.boneMeal
		]);

		assert.property(
			detectAnimalAndTelekinesis,
			'Telekinesis',
			'alit hide, ampoule pod and bonemeal gives "Telekinesis"'
		);
		assert.property(
			detectAnimal,
			'Detect Animal',
			'alit hide, ampoule pod and bonemeal gives "Detect Animal"'
		);
	});

	it('should return empty object if there\'s no potions', () => {
		assert.deepEqual(
			getPossiblePotion([
				mockData.ingredients.alitHide,
				mockData.ingredients.kreshFiber
			]),
			{}
		);
	});
});