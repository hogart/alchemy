/**
 * @author Konstantin Kitmanov <doctor.hogart@gmail.com>
 * @license MIT
 */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) { // AMD anonymous module
		define([], factory);
	} else if (typeof exports === 'object') { // NodeJS/CommonJS-like module
		module.exports = factory();
	} else { // Browser globals (root is window)
		root.alchemy = factory();
	}
}(this, function () {
	'use strict';

	/**
	 * Iterates over all effects on given ingredient list
	 * @param {Ingredient[]} ingredients
	 * @param {Function} iterator receives `effect` and `ingredient`
	 */
	function iterateEffects (ingredients, iterator) {
		ingredients.forEach(ingredients, function (ingredient) {
			ingredient.effects.forEach(function (effect, index) {
				iterator(effect, index, ingredient);
			})
		})
	}

	/**
	 * @class Ingredient
	 * @param {String} name
	 * @param {String[]} effects
	 * @constructor
	 */
	function Ingredient (name, effects) {
		this.name = name;
		this.effects = effects;
	}

	Ingredient.prototype = {
		constructor: Ingredient,

		/**
		 * Returns array of effects present both in this ingredient and `other`
		 * @param {Ingredient} other
		 * @return {String[]}
		 */
		getSharedEffects: function (other) {
			return this.effects.filter(function (effect) {
				return other.hasEffect(effect);
			});
		},

		/**
		 * Does this ingredient has given effect?
		 * @param {String} effect
		 * @return {Boolean}
		 */
		hasEffect: function (effect) {
			return this.effects.indexOf(effect) > -1;
		},

		hasSomeEffects: function (effects) {
			effects.reduce(function (effect, index, accum) {
				return accum && this.hasEffect(effect);
			}.bind(this), false);
		}
	};

	/**
	 * Given ingredient list, return list of all possible potions
	 * @param {Ingredient[]} currentIngredients collection of ingredients
	 */
	function getPossiblePotion (currentIngredients) {
		var effects = {};
		var potions = {};

		iterateEffects(currentIngredients, function (effect, ingredient) {
			if (!effects[effect]) {
				effects[effect] = [];
			} else {
				effects[effect].push(ingredient);

				if (effects[effect].length === 1) {
					potions[effect] = [ingredient]
				} else if (effects[effect].length > 1) {
					potions[effect].push(ingredient);
				}
			}
		});
	}

	/**
	 * Given ingredient list, determine which effect(s) potion would have
	 * @param ingredients
	 */
	function predictPotion (ingredients) {
		var effects = {};
		var resultingEffects = [];

		iterateEffects(ingredients, function (effect, ingredient) {
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
	 * @param {Ingredient[]} ingredients overall ingredients list
	 */
	function getSuitableIngredients (givenIngredient, ingredients) {
		var suitableIngredients = [];

		iterateEffects(ingredients, function (effect, ingredient) {
			if (ingredient.name !== givenIngredient.name) { // do not compare ingredient with itself
				if (givenIngredient.getSharedEffects(ingredient).length) {
					suitableIngredients.push(ingredient);
				}
			}
		})
	}

	/**
	 * Given desired effects, what possible ingredients do you need to make it?
	 * @param {String[]} desiredEffects
	 * @param {Ingredient[]} ingredients
	 * @return {Ingredient[]}
	 */
	function getIngredientsForPotion (desiredEffects, ingredients) {
		return ingredients.filter(function (ingredient) {
			return ingredient.hasSomeEffects(desiredEffects);
		})
	}
}));