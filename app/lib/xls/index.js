var XLSX = require('xlsx');

module.exports = exports = {

    /**
     * Convert array to worksheet.
     *
     * Usage:
     *
     * data = [['First column', 'Second column'], ['Val of first', 'Val of second'], ['Val of first', 'Val of second']]
     *
     *
     * @param data
     * @param [opts]
     * @returns {{}}
     */
    sheet_from_array_of_arrays: function (data, opts) {
        var ws    = {};
        var range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}};
        for (var R = 0; R != data.length; ++R) {
            for (var C = 0; C != data[R].length; ++C) {
                if (range.s.r > R) range.s.r = R;
                if (range.s.c > C) range.s.c = C;
                if (range.e.r < R) range.e.r = R;
                if (range.e.c < C) range.e.c = C;
                var cell = {v: data[R][C]};
                if (cell.v == null) continue;
                var cell_ref = XLSX.utils.encode_cell({c: C, r: R});

                if (typeof cell.v === 'number') cell.t = 'n';
                else if (typeof cell.v === 'boolean') cell.t = 'b';
                else cell.t = 's';

                ws[cell_ref] = cell;
            }
        }
        if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
        return ws;
    }
};