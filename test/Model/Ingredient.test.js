/* eslint-env mocha */
'use strict';

import ModelIngredient from '../../src/Model/Ingredient.js';
import mockData from '../mockData.js';
import {assert} from 'chai';

const registry = {
    acquire: function () {}
};

const alitHide = new ModelIngredient(
    {
        name: 'Alit Hide',
        effects: ['Drain Intelligence', 'Resist Poison', 'Telekinesis', 'Detect Animal']
    },
    {
        registry: registry
    }
);
const ampoulePod = new ModelIngredient(
    {
        name: 'Ampoule Pod',
        effects: ['Water Walking', 'Paralyze',	'Detect Animal', 'Drain Willpower']
    },
    {
        registry: registry
    }
);
const kreshFiber = new ModelIngredient(
    {
        name: 'Kresh Fiber',
        effects: ['Restore Luck',	'Fortify Personality', 'Drain Magicka', 'Drain Speed']
    },
    {
        registry: registry
    }
);

describe('ModelIngredient', () => {
    it('should correctly determine if it has given effect', () => {
        assert.ok(alitHide.hasEffect('Drain Intelligence'), 'true positive desired effect');
        assert.notOk(alitHide.hasEffect('Paralyze'), 'true negative desired effect');
    });

    it('should correctly find shared effects', () => {
        assert.deepEqual(alitHide.getSharedEffects(ampoulePod), ['Detect Animal'], 'array with single `detect animal` item');
        assert.lengthOf(alitHide.getSharedEffects(kreshFiber), 0, 'no shared effects between alit hide and kresh fiber');
    });

    it('should correctly determine if it has some of desired effects', () => {
        assert.ok(alitHide.hasSomeEffects(['Telekinesis', 'Water Walking']), 'alit hide has either telekinesis or water walking');
        assert.notOk(alitHide.hasSomeEffects(['Paralyze', 'Drain Willpower']), 'alit hide have no neither paralyze nor drain willpower');
    });

    it('should correctly determine if it has given text in name', () => {
        assert.ok(alitHide.hasString('alit'), 'Alit Hide have "alit"');
        assert.ok(ampoulePod.hasString('Ampoule Pod'.toLowerCase()), 'Ampoule Pod have "Ampoule Pod"');
        assert.ok(ampoulePod.hasString('ampoule'), 'Ampoule Pod have "ampoule"');

        assert.notOk(alitHide.hasString('wtf'), 'Alit Hide does not have "wtf"');
        assert.notOk(ampoulePod.hasString('pod123'), 'Ampoule Pod does not have "pod123" (sic!)');
        assert.notOk(kreshFiber.hasString('Kresh123'.toLowerCase()), 'Kresh Fiber do not have "Kresh123"');
    });

    it('should correctly determine if it has given text in effects', () => {
        assert.ok(alitHide.hasString('drain'), 'Alit Hide have `drain`');
        assert.ok(ampoulePod.hasString('Water Walking'.toLowerCase()), 'Ampoule Pod have "Water Walking"');
        assert.ok(ampoulePod.hasString('water w'), 'Ampoule Pod have "water w"');

        assert.notOk(alitHide.hasString('drain willpower'), 'Alit Hide does not have "drain willpower"');
        assert.notOk(ampoulePod.hasString('Paralize'.toLowerCase()), 'Ampoule Pod does not have "Paralize" (sic!)');
        assert.notOk(kreshFiber.hasString('Luck123'.toLowerCase()), 'Kresh Fiber do not have "Luck123"');
    });
});
