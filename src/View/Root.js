'use strict';

import ViewAbstract from './Abstract.js';
import ViewHeader from './Header.js';

export default class ViewRoot extends ViewAbstract {
    __children__ () {
        return {
            'header': ViewHeader
        }
    }

    initialize (options) {
        super.initialize.call(this, options);

        this.onRender();
    }
}