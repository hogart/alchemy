'use strict';

import Skull from 'backbone-skull';
import _ from 'underscore';
import Ractive from 'ractive';
import RactiveBackboneAdaptor from 'ractive-adaptors-backbone';

export default class ViewAbstract extends Skull.View {
    onRender () {
        super.onRender();
        this._ensureRactive();
    }

    _ensureRactive () {
        let bindings = _.result(this, '__bindings__');

        if (bindings) {
            let template = _.result(this, 'tpl');

            this.ractive = new Ractive({
                adapt: 'Backbone',
                el: this.el,
                data: bindings,
                template: template
            });
        }
    }
}

