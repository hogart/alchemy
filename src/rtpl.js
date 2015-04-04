'use strict';

export default function rtpl (templateName) {
    return JST['templates/client/' + templateName]();
}