'use strict';

import Skull from 'backbone-skull';
import ViewAbstract from './Abstract.js';
import _ from 'underscore';
import headerTemplate from '../../templates/client/header.jade';

export default class ViewHeader extends ViewAbstract {
    tpl () {
        return headerTemplate
    }

    __registry__ () {
        let reg = this._parentResult('__registry__');

        return _.extend(
            {},
            reg,
            {
                model: 'games'
            }
        )
    }

    __bindings__ () {
        return {
            model: this.model
        }
    }

    initialize (options) {
        super.initialize.call(this, options);

        this.onRender();
    }
}