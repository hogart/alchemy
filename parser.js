// Parser for uesp.net alchemy ingredient list pages
// insert fnd.js in console, then this
(function () {
    /* global fnd, console */
    'use strict';

    function parseRow1 (tr) {
        var tds = fnd('td', tr);

        var name = fnd('a', tds[1])[0].textContent;
        var icon = fnd('img', tds[0])[0].src;
        var note = tds[2].textContent;

        return {
            name: name,
            icon: icon,
            note: note
        };
    }

    function parseRow2 (tr) {
        var links = fnd('td a', tr);

        return links.map(function (link) {
            return link.textContent.trim();
        }).filter(function (str) { return !!str; });
    }

    function findTable () {
        return fnd('.wikitable')[0];
    }

    function iterateRows (table) {
        var trs = fnd('tr', table);
        var data = [];

        for (var i = 1; i < trs.length; i++) { // skip first row
            if (i % 2) {
                data.push(parseRow1(trs[i]));
            } else {
                data[data.length - 1].effects = parseRow2(trs[i]);
            }
        }

        return data;
    }

    function parse () {
        return iterateRows(findTable());
    }

    /* eslint-disable */
    console.log(JSON.stringify(parse()));
    /* eslint-enable */
}());

