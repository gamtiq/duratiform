(function(root, factory) {
    if (root === undefined && window !== undefined) root = window;
    if (typeof module === 'object' && module.exports) {
        module.exports = factory(require, exports, module);
    }
    else if(typeof define === 'function' && define.amd) {
        define(['require', 'exports', 'module'], factory);
    }
    else {
        var req = function(id) {return root[id];},
            exp = root,
            mod = {exports: exp};
        root['duratiform'] = factory(req, exp, mod);
    }
}(this, function(require, exports, module) {
/**
 * @module duratiform
 */

/**
 * Separate time duration into parts.
 *
 * @param {Integer} nDuration
 *      Time duration in milliseconds.
 * @param {Integer} [nPartQty]
 *      Parts quantity. The default value is 3.
 *      The following values are allowed:
 *      <ul>
 *      <li><code>1</code> - return seconds quantity (<code>second</code> field)
 *      <li><code>2</code> - return quantity of minutes and seconds (<code>minute</code> and <code>second</code> fields)
 *      <li><code>3</code> - return quantity of hours, minutes and seconds (<code>hour</code>, <code>minute</code> and <code>second</code> fields)
 *      <li><code>4</code> - return quantity of days, hours, minutes and seconds (<code>day</code>, <code>hour</code>, <code>minute</code> and <code>second</code> fields)
 *      <li><code>5</code> - return quantity of weeks, days, hours, minutes and seconds (<code>week</code>, <code>day</code>, <code>hour</code>, <code>minute</code> and <code>second</code> fields)
 *      </ul>
 * @param {Boolean} [bAddStrings]
 *      Specifies whether additional string fields should be included into result object.
 *      An additional field represents a value of calculated part that is converted into string
 *      and is prefixed with "0" if it is necessary (i.e. values from 0 to 9 are converted to "00"-"09").
 *      The default value is <code>false</code>.
 * @return {Object}
 *      Object representing the requested parts of time duration. Can contain the following fields.
 *      <table class="params">
 *          <tr>
 *              <th>Name</th>
 *              <th>Type</th>
 *              <th>Description</th>
 *          </tr>
 *          <tr>
 *              <td>day</td>
 *              <td>Integer</td>
 *              <td>Quantity of full days</td>
 *          </tr>
 *          <tr>
 *              <td>day2</td>
 *              <td>String</td>
 *              <td>
 *                  Quantity of full days. String contains at least 2 characters.
 *                  This field is included only when <code>bAddStrings</code> has <code>true</code> value.
 *              </td>
 *          </tr>
 *          <tr>
 *              <td>hour</td>
 *              <td>Integer</td>
 *              <td>Quantity of full hours</td>
 *          </tr>
 *          <tr>
 *              <td>hour2</td>
 *              <td>String</td>
 *              <td>
 *                  Quantity of full hours. String contains at least 2 characters.
 *                  This field is included only when <code>bAddStrings</code> has <code>true</code> value.
 *              </td>
 *          </tr>
 *          <tr>
 *              <td>minute</td>
 *              <td>Integer</td>
 *              <td>Quantity of full minutes</td>
 *          </tr>
 *          <tr>
 *              <td>minute2</td>
 *              <td>String</td>
 *              <td>
 *                  Quantity of full minutes. String contains at least 2 characters.
 *                  This field is included only when <code>bAddStrings</code> has <code>true</code> value.
 *              </td>
 *          </tr>
 *          <tr>
 *              <td>second</td>
 *              <td>Integer</td>
 *              <td>Quantity of full seconds</td>
 *          </tr>
 *          <tr>
 *              <td>second2</td>
 *              <td>String</td>
 *              <td>
 *                  Quantity of full seconds. String contains at least 2 characters.
 *                  This field is included only when <code>bAddStrings</code> has <code>true</code> value.
 *              </td>
 *          </tr>
 *          <tr>
 *              <td>week</td>
 *              <td>Integer</td>
 *              <td>Quantity of full weeks</td>
 *          </tr>
 *          <tr>
 *              <td>week2</td>
 *              <td>String</td>
 *              <td>
 *                  Quantity of full weeks. String contains at least 2 characters.
 *                  This field is included only when <code>bAddStrings</code> has <code>true</code> value.
 *              </td>
 *          </tr>
 *      </table>
 * @alias module:duratiform.divide
 */
function divide(nDuration, nPartQty, bAddStrings) {
    var result = {};

    function getPart(sField, nDivisor) {
        var nV;
        if (nDuration >= nDivisor) {
            nV = result[sField] = Math.floor(nDuration / nDivisor);
            nDuration = nDuration % nDivisor;
        }
        else {
            nV = result[sField] = 0;
        }
        if (bAddStrings) {
            result[sField + "2"] = nV < 10 ? "0" + nV : String(nV);
        }
    }

    // Convert duration to seconds
    nDuration = nDuration * 0.001;
    if (! nPartQty) {
        nPartQty = 3;
    }

    // Extract weeks
    if (nPartQty > 4) {
        getPart("week", 604800);
    }
    // Extract days
    if (nPartQty > 3) {
        getPart("day", 86400);
    }
    // Extract hours
    if (nPartQty > 2) {
        getPart("hour", 3600);
    }
    // Extract minutes
    if (nPartQty > 1) {
        getPart("minute", 60);
    }
    // Extract seconds
    if (nPartQty > 0) {
        getPart("second", 1);
    }
    return result;
}

/**
 * Convert time duration into string.
 *
 * @param {Integer} nDuration
 *      Time duration in milliseconds.
 * @param {String} [sFormat]
 *      Format of the returned value. The default value is <code>hh:mm:ss</code>.<br>
 *      The following tokens are interpreted in special way:
 *      <ul>
 *      <li><code>\x</code> - replaced by <code>x</code>, where <code>x</code> is any character
 *      <li><code>d</code> - quantity of days (1 or more characters)
 *      <li><code>dd</code> - quantity of days (2 or more characters)
 *      <li><code>h</code> - quantity of hours (1 or more characters)
 *      <li><code>hh</code> - quantity of hours (2 or more characters)
 *      <li><code>m</code> - quantity of minutes (1 or more characters)
 *      <li><code>mm</code> - quantity of minutes (2 or more characters)
 *      <li><code>s</code> - quantity of seconds (1 or more characters)
 *      <li><code>ss</code> - quantity of seconds (2 or more characters)
 *      <li><code>w</code> - quantity of weeks (1 or more characters)
 *      <li><code>ww</code> - quantity of weeks (2 or more characters)
 *      <li><code>[</code> - cancel special processing of the following characters (except <code>\x</code> and <code>]</code>);
 *              this character won't be included into the result
 *      <li><code>]</code> - restore special processing that was previously cancelled by <code>[</code> character;
 *              this character won't be included into the result;
 *              thus any sequence of characters that is surrounded by square brackets (except <code>\x</code> and <code>]</code>)
 *              will be included into the result as is but without brackets
 *      <li><code>(x:</code> - where <code>x</code> is one of <code>w</code> (weeks), <code>d</code> (days),
 *              <code>h</code> (hours), <code>m</code> (minutes) or <code>s</code> (seconds),
 *              begin group of characters that will be included in the result
 *              only when the corresponding part of duration is present (above 0)
 *      <li><code>(!x:</code> - where <code>x</code> is one of <code>w</code> (weeks), <code>d</code> (days),
 *              <code>h</code> (hours), <code>m</code> (minutes) or <code>s</code> (seconds),
 *              begin group of characters that will be included in the result
 *              only when the corresponding part of duration is not present (equals to 0)
 *      <li><code>)</code> - end of previous group; thus by using format <code>(h:h:)mm:ss</code> hours part
 *              will be in result only when duration is greater than 60 minutes
 *      </ul>
 *      All other characters will be included into the result as is.
 * @return {String}
 *      String representing time duration depending of format.
 * @alias module:duratiform.format
 */
function format(nDuration, sFormat) {
    /*jshint boss:true, laxbreak:true*/
    var result = [],
        bReplace = true,
        group = null,
        groupList = [],
        nP = 0,
        specialChar = {
            w: ["week", 5],
            d: ["day", 4],
            h: ["hour", 3],
            m: ["minute", 2],
            s: ["second", 1]
        },
        sSlash = "\\",
        bNegative, nI, nK, nL, sChar, sNextChar, part, struct;

    function getGroupList() {
        return group && groupList.concat(group);
    }

    function getPart() {
        var groupSet = this.g,
            bNot, nEnd, nNum, sGroupExpr;
        if (groupSet) {
            for (nNum = 0, nEnd = groupSet.length; nNum < nEnd; nNum++) {
                sGroupExpr = groupSet[nNum];
                bNot = sGroupExpr.charAt(0) === "!";
                if ((bNot && struct[sGroupExpr.substring(1)]) || (! bNot && ! struct[sGroupExpr])) {
                    groupSet = false;
                    break;
                }
            }
        }
        else {
            groupSet = true;
        }
        return groupSet
            ? this.c || String(struct[this.p])
            : "";
    }

    if (! sFormat) {
        sFormat = "hh:mm:ss";
    }
    // Scan format string and find positions for replacement
    for (nI = 0, nL = sFormat.length, nK = nL - 1; nI < nL; nI++) {
        sChar = sFormat.charAt(nI);
        sNextChar = sFormat.charAt(nI + 1);
        // Special character
        if (bReplace && sChar in specialChar) {
            struct = specialChar[sChar];
            // Save value that will be replaced:
            // 2 or more characters
            if (sNextChar === sChar) {
                part = struct[0] + "2";
                nI++;
            }
            // 1 or more characters
            else {
                part = struct[0];
            }
            result.push({p: part, g: getGroupList(), toString: getPart});
            // Change quantity of time duration parts if it is necessary
            if (struct[1] > nP) {
                nP = struct[1];
            }
        }
        // Cancel special processing
        else if (bReplace && sChar === "[") {
            bReplace = false;
        }
        // Restore special processing
        else if (! bReplace && sChar === "]") {
            bReplace = true;
        }
        // Start of a group
        else if (bReplace && sChar === "("
                && ((bNegative = sNextChar === "!") || true)
                && sFormat.charAt(nI + (bNegative ? 3 : 2)) === ":"
                && (part = (bNegative ? sFormat.charAt(nI + 2) : sNextChar).match(/d|h|m|s|w/))) {
            if (group) {
                groupList.push(group);
            }
            group = (bNegative ? "!" : "") + specialChar[part[0]][0];
            nI += bNegative ? 3 : 2;
        }
        // End of a group
        else if (bReplace && group && sChar === ")") {
            group = groupList.length
                ? groupList.pop()
                : null;
        }
        // Any other character or escaped character
        else if (sChar !== sSlash || nI < nK) {
            // Escaped character
            if (sChar === sSlash) {
                sChar = sNextChar;
                nI++;
            }
            result.push(
                group
                    ? {g: getGroupList(), c: sChar, toString: getPart}
                    : sChar
            );
        }
    }
    // Get parts of duration if it is necessary
    if (nP) {
        struct = divide(nDuration, nP, true);
    }
    return result.join("");
}

//Exports

module.exports = {
    divide: divide,
    format: format
};

return module.exports;
}));
