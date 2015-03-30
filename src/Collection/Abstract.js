'use strict';

import Skull from 'backbone-skull';

function collectionIterator (models) {
    return  {
        _i: -1,
        next: function () {
            return {
                value: models[this._i + 1].attributes,
                done: models.length - 1 === ++this._i
            }
        }
    }
}

class CollectionAbstract extends Skull.Collection {
    initialize () {
        this[Symbol.iterator] = () => {
            return collectionIterator(this.models)
        }
    }

    //[Symbol.iterator] () { babel doesn't like it:(
    //  return collectionIterator(this.models)
    //}
}

export default CollectionAbstract;