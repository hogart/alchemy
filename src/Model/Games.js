'use strict';

import AbstractModel from './Abstract.js';

export default class ModelGames extends AbstractModel {
    defaults () {
        return {
            mw: false,
            ob: false,
            sr: false
        }
    }

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