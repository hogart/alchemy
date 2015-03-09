'use strict';

/**
 * @author Konstantin Kitmanov <doctor.hogart@gmail.com>
 * @license MIT
 */


/**
 * Iterates over all effects on given ingredient list
 * @param {Array.<Ingredient>} ingredients
 * @param {Function} iterator receives `effect` and `ingredient`
 */
function iterateEffects (ingredients, iterator) {
	for (let ingredient of ingredients) {
		for (let [index, effect] of ingredient.effects.entries()) {
			iterator(effect, index, ingredient);
		}
	}
}

/**
 * Class, representing particular ingredient
 * @property {String} name
 * @property {Array.<String>} effects
 */
export class Ingredient {
	/**
	 * @param {String} name
	 * @param {Array.<String>} effects
	 */
	constructor (name, effects) {
		this.name = name;
		this.effects = effects;
	}

	/**
	 * Returns array of effects present both in this ingredient and `other`
	 * @param {Ingredient} other
	 * @return {Array.<String>}
	 */
	getSharedEffects (other) {
		return this.effects.filter( (effect) => {
			return other.hasEffect(effect);
		});
	}

	/**
	 * Does this ingredient has given effect?
	 * @param {String} effect
	 * @return {Boolean}
	 */
	hasEffect (effect) {
		return this.effects.indexOf(effect) > -1;
	}

	/**
	 * Does this ingredient has any of desired effects?
	 * @param {Array.<String>} effects
	 * @return {boolean}
	 */
	hasSomeEffects (effects) {
		return effects.some((effect) => {
			return this.hasEffect(effect);
		});
	}
}

/**
 * Given ingredient list, return list of all possible potions
 * @param {Array.<Ingredient>} currentIngredients collection of ingredients
 */
export function getPossiblePotion (currentIngredients) {
	let effects = {};
	let potions = {};

	iterateEffects(currentIngredients, (effect, index, ingredient) => {
		if (!effects[effect]) {
			effects[effect] = [ingredient];
		} else {
			effects[effect].push(ingredient);

			if (effects[effect].length === 2) {
				potions[effect] = effects[effect];
			} else if (effects[effect].length > 2) {
				potions[effect].push(ingredient);
			}
		}
	});

	return potions;
}

/**
 * Given ingredient list, determine which effect(s) potion would have
 * @param {Array.<Ingredient>} ingredients
 * @return {Array.<String>}
 */
export function predictPotion (ingredients) {
	let effects = {};
	let resultingEffects = [];

	iterateEffects(ingredients, (effect) => {
		if (!effects[effect]) {
			effects[effect] = true;
		} else {
			resultingEffects.push(effect);
		}
	});

	return resultingEffects;
}

/**
 * What potions can you make from this `givenIngredient` and other ingredients
 * @param {Ingredient} givenIngredient
 * @param {Array.<Ingredient>} ingredients overall ingredients list
 */
export function getSuitableIngredients (givenIngredient, ingredients) {
	let suitableIngredients = [];

	iterateEffects(ingredients, (effect, index, ingredient) => {
		if (ingredient.name !== givenIngredient.name && suitableIngredients.indexOf(ingredient) === -1) { // do not compare ingredient with itself
			if (givenIngredient.getSharedEffects(ingredient).length) {
				suitableIngredients.push(ingredient);
			}
		}
	});

	return suitableIngredients;
}

/**
 * Given desired effects, what possible ingredients do you need to make it?
 * @param {Array.<String>} desiredEffects
 * @param {Array.<Ingredient>} ingredients
 * @return {Array.<Ingredient>}
 */
export function getIngredientsForPotion (desiredEffects, ingredients) {
	return ingredients.filter((/** @type {Ingredient} */ingredient) => {
		return ingredient.hasSomeEffects(desiredEffects);
	});
}