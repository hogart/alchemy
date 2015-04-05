'use strict';

import Skull from 'backbone-skull';
import _ from 'underscore';

export default class ModelAbstract extends Skull.Model {
    _parentResult (propertyName) {
        let prop = super[propertyName];
        if (_.isFunction (prop)) {
            return prop.call(this);
        } else {
            return prop;
        }
    }
}