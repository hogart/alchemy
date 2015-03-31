'use strict';

import CollectionAbstract from './Abstract.js';
import ModelPotion from '../Model/Potion.js';

class CollectionPotion extends CollectionAbstract {

}

CollectionAbstract.prototype.model = ModelPotion;

export default CollectionPotion;
