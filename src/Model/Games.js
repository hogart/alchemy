'use strict';

import AbstractModel from './Abstract.js';

export default class ModelGames extends AbstractModel {
    defaults () {
        return {
            mw: false,
            ob: false,
            sr: false,
            active: ''
        }
    }

    initialize (attributes, options) {
        super.initialize.call(this, attributes, options);

        this.listenTo(this.registry.acquire('app'), 'path', this.onPath);
    }

    onPath (routeName) {
        if (!this.get(routeName)) {
            let data = {
                mw: false,
                ob: false,
                sr: false,
                active: routeName
            };
            data[routeName] = true;

            this.set(data);
        }
    }
};