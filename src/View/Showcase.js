'use strict';

import ViewAbstract from './Abstract.js';
import showcaseTpl from '../../templates/client/showcase.jade'

export default class ViewShowcase extends ViewAbstract {
    tpl () {
        return showcaseTpl
    }

    __bindings__ () {
        return {
            showcaseCollection: this.showcaseCollection
        }
    }

    __registry__ () {
        return {
            showcaseCollection: 'showcaseCollection'
        }
    }

    events () {
        return {
            'search [type="search"]': 'onSearch'
        }
    }

    initialize (options) {
        super.initialize.call(this, options);

        this.onRender();
    }

    onSearch (event) {
        console.log(event)
    }
}