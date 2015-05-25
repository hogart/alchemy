'use strict';

import _ from 'underscore';
import AbstractModel from './Abstract.js';

export default class ModelGames extends AbstractModel {
    __registry__ () {
        let parentReg = this._parentResult('__registry__');

        return _.extend({}, parentReg, {
            app: 'app'
        });
    }

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

        this.listenTo(this.app, 'path', this.onPath);
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