(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports);
	}
})(function (exports) {
	"use strict";

	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	/**
  * Given ingredient list, return list of all possible potions
  * @param {Array.<Ingredient>} currentIngredients collection of ingredients
  */
	exports.getPossiblePotion = getPossiblePotion;

	/**
  * Given ingredient list, determine which effect(s) potion would have
  * @param {Array.<Ingredient>} ingredients
  * @return {Array.<String>}
  */
	exports.predictPotion = predictPotion;

	/**
  * What potions can you make from this `givenIngredient` and other ingredients
  * @param {Ingredient} givenIngredient
  * @param {Array.<Ingredient>} ingredients overall ingredients list
  */
	exports.getSuitableIngredients = getSuitableIngredients;

	/**
  * Given desired effects, what possible ingredients do you need to make it?
  * @param {Array.<String>} desiredEffects
  * @param {Array.<Ingredient>} ingredients
  * @return {Array.<Ingredient>}
  */
	exports.getIngredientsForPotion = getIngredientsForPotion;

	/**
  * @author Konstantin Kitmanov <doctor.hogart@gmail.com>
  * @license MIT
  */

	/**
  * Iterates over all effects on given ingredient list
  * @param {Array.<Ingredient>} ingredients
  * @param {Function} iterator receives `effect` and `ingredient`
  */
	function iterateEffects(ingredients, iterator) {
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = ingredients[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var ingredient = _step.value;
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = ingredient.effects.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _step2$value = _slicedToArray(_step2.value, 2);

						var index = _step2$value[0];
						var effect = _step2$value[1];

						iterator(effect, index, ingredient);
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
							_iterator2["return"]();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator["return"]) {
					_iterator["return"]();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	}

	/**
  * Class, representing particular ingredient
  * @property {String} name
  * @property {Array.<String>} effects
  */

	var Ingredient = exports.Ingredient = (function () {
		/**
   * @param {String} name
   * @param {Array.<String>} effects
   */

		function Ingredient(name, effects) {
			_classCallCheck(this, Ingredient);

			this.name = name;
			this.effects = effects;
		}

		_prototypeProperties(Ingredient, null, {
			getSharedEffects: {

				/**
     * Returns array of effects present both in this ingredient and `other`
     * @param {Ingredient} other
     * @return {Array.<String>}
     */

				value: function getSharedEffects(other) {
					return this.effects.filter(function (effect) {
						return other.hasEffect(effect);
					});
				},
				writable: true,
				configurable: true
			},
			hasEffect: {

				/**
     * Does this ingredient has given effect?
     * @param {String} effect
     * @return {Boolean}
     */

				value: function hasEffect(effect) {
					return this.effects.indexOf(effect) > -1;
				},
				writable: true,
				configurable: true
			},
			hasSomeEffects: {

				/**
     * Does this ingredient has any of desired effects?
     * @param {Array.<String>} effects
     * @return {boolean}
     */

				value: function hasSomeEffects(effects) {
					var _this = this;

					return effects.some(function (effect) {
						return _this.hasEffect(effect);
					});
				},
				writable: true,
				configurable: true
			}
		});

		return Ingredient;
	})();

	function getPossiblePotion(currentIngredients) {
		var effects = {};
		var potions = {};

		iterateEffects(currentIngredients, function (effect, index, ingredient) {
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

	function predictPotion(ingredients) {
		var effects = {};
		var resultingEffects = [];

		iterateEffects(ingredients, function (effect) {
			if (!effects[effect]) {
				effects[effect] = true;
			} else {
				resultingEffects.push(effect);
			}
		});

		return resultingEffects;
	}

	function getSuitableIngredients(givenIngredient, ingredients) {
		var suitableIngredients = [];

		iterateEffects(ingredients, function (effect, index, ingredient) {
			if (ingredient.name !== givenIngredient.name && suitableIngredients.indexOf(ingredient) === -1) {
				// do not compare ingredient with itself
				if (givenIngredient.getSharedEffects(ingredient).length) {
					suitableIngredients.push(ingredient);
				}
			}
		});

		return suitableIngredients;
	}

	function getIngredientsForPotion(desiredEffects, ingredients) {
		return ingredients.filter(function ( /** @type {Ingredient} */ingredient) {
			return ingredient.hasSomeEffects(desiredEffects);
		});
	}

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
});
//# sourceMappingURL=alchemy.js.map