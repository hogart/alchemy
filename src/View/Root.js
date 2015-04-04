'use strict';

import ViewAbstract from './Abstract.js';
import ViewHeader from './Header.js';
import ViewShowcase from './Showcase.js';

export default class ViewRoot extends ViewAbstract {
    __children__ () {
        return {
            'header': ViewHeader,
            'nav.overall': ViewShowcase
        }
    }

    initialize (options) {
        super.initialize.call(this, options);

        this.onRender();
    }
}