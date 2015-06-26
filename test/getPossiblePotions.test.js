/* eslint-env mocha */
'use strict';

import {getPossiblePotions} from '../src/lib/alchemy.js';
import mockData from './mockData.js';
import {assert} from 'chai';

describe('getPossiblePotions', () => {
    it('should correctly detect possible potions', () => {
        let detectAnimal = getPossiblePotions([
            mockData.ingredients.alitHide,
            mockData.ingredients.ampoulePod
        ]);
        assert.property(
            detectAnimal,
            'Detect Animal',
            'alit hide and ampoule pod gives "Detect Animal"'
        );

        let detectAnimalAndTelekinesis = getPossiblePotions([
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

        assert.notProperty(
            getPossiblePotions([mockData.ingredients.ashSalt]),
            'Resist Magicka',
            'Ash salts itself will not brew into any potion, despite it has "Resist Magicka" effect twice'
        );
    });

    it('should return empty object if there\'s no potions', () => {
        assert.deepEqual(
            getPossiblePotions([
                mockData.ingredients.alitHide,
                mockData.ingredients.kreshFiber
            ]),
            {},
            'true negative when no possible potions'
        );
    });
});