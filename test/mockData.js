/* eslint-env mocha */
'use strict';

import {Ingredient} from '../src/lib/alchemy.js';

let mockData = {
	/**
	 * @type {Object.<string, Ingredient>}
	 */
	ingredients: {
		alitHide: new Ingredient('Alit Hide', ['Drain Intelligence', 'Resist Poison', 'Telekinesis', 'Detect Animal']),
		ampoulePod: new Ingredient('Ampoule Pod', ['Water Walking', 'Paralyze',	'Detect Animal', 'Drain Willpower']),
		boneMeal: new Ingredient('Bonemeal', ['Restore Agility', 'Telekinesis', 'Drain Fatigue', 'Drain Personality']),
		kwamaCuttle: new Ingredient('Kwama Cuttle', ['Resist Poison', 'Drain Fatigue', 'Water Walking', 'Water Breathing']),
		kreshFiber: new Ingredient('Kresh Fiber', ['Restore Luck',	'Fortify Personality', 'Drain Magicka', 'Drain Speed']),
		ashSalt: new Ingredient('Ash Salts', ['Drain Agility', 'Resist Magicka', 'Cure Blight Disease', 'Resist Magicka'])
	}
};

mockData.ingredientList = Object.keys(mockData.ingredients).map((key) => { return mockData.ingredients[key]; });

export default mockData;