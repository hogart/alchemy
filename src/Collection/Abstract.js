'use strict';

import Skull from 'backbone-skull';

function* collectionIterator (models) {
    for (let model of models) {
        yield model.attributes;
    }
}

class CollectionAbstract extends Skull.Collection {
    [Symbol.iterator] () {
        return collectionIterator(this.models);
    }
}

export default CollectionAbstract;