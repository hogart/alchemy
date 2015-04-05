'use strict';

import CollectionAbstract from './Abstract.js';
import ModelPotion from '../Model/Potion.js';

export default class CollectionPotion extends CollectionAbstract {

}

CollectionPotion.prototype.model = ModelPotion;
CollectionPotion.__super__ = CollectionAbstract.prototype;
