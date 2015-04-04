'use strict';

import Skull from 'backbone-skull';

export default class ModelGames extends Skull.Model {
    initialize (attributes, options) {
        super.initialize.call(this, attributes, options);

        this.listenTo(this.registry.acquire('app'), 'path', this.onPath);
    }

    onPath (routeName) {
        if (!this.get(routeName)) {
            let set = {
                mw: false,
                ob: false,
                sr: false
            };
            set[routeName] = true;

            this.set(set);
        }
    }
};

ModelGames.prototype.defaults = {
    mw: false,
    ob: false,
    sr: false
};