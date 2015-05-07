'use strict';

import Backbone from 'backbone';
import Skull from 'backbone-skull';
import _ from 'underscore';
import Ractive from 'ractive';
import ractiveBackboneAdaptor from 'ractive-adaptors-backbone';
ractiveBackboneAdaptor.Backbone = Backbone;

export default class ViewAbstract extends Skull.View {
    _parentResult (propertyName) {
        let prop = super[propertyName];
        if (_.isFunction (prop)) {
            return prop.call(this);
        } else {
            return prop;
        }
    }

    onRender () {
        super.onRender();
        this._ensureRactive();
    }

    _ensureRactive () {
        let bindings = _.result(this, '__bindings__');

        if (bindings) {
            let template = _.result(this, 'tpl');

            try {
                this.ractive = new Ractive({
                    adapt: [ractiveBackboneAdaptor],
                    el: this.el,
                    data: bindings,
                    template: template
                });
            } catch (e) {
                console.log(this.el, this.cid)
            }

        }
    }
}
