'use strict';

import Skull from 'backbone-skull';
import ViewAbstract from './Abstract.js';
import rtpl from '../rtpl.js';
import ModelGames from '../Model/Games.js';
import headerTemplate from '../../templates/client/header.jade';

export default class ViewHeader extends ViewAbstract {
    tpl () {
        return headerTemplate
    }

    initialize (options) {
        super.initialize.call(this, options);

        this.model = new ModelGames({}, {registry: this.registry});

        this.onRender();
    }
}

ViewHeader.prototype.__bindings__ = function () {
    return {
        model: this.model
    }
};