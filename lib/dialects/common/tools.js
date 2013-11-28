Tools = {
    isInt: function(num) {
        var numStr = num.toString();
        if (numStr.match(/^\d+$/)) {
            return true;
        } else {
            return false;
        }
    },

    isEven: function(num) {
        if (Tools.isInt(num)) {
            return num%2 === 0;
        } else {
            return false;
        }
    },

    isOdd: function(num) {
        if (Tools.isInt(num)) {
            return num%2 === 1;
        } else {
            return false;
        }
    },

    transAllNonCharToSpace: function(str) {
        return str.replace(/\t|\r\n|\r|\n/g, ' ');
    }
};

module.exports = Tools;