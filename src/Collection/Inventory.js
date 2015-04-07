'use strict';

'use strict';

import CollectionIngredient from  './Ingredient.js';

export default class CollectionInventory extends CollectionIngredient {
    clearAll () {
        this.reset();
        this.trigger('clearAll');
    }
}