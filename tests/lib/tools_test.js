var tools = require('../../lib/dialects/common/tools');

(function() {
    console.log("4 is isEven : "+tools.isEven(4));
    console.log("5 is isEven : "+tools.isEven(5));

    console.log("4 is isOdd : "+tools.isOdd(4));
    console.log("5 is isOdd : "+tools.isOdd(5));

    console.log("4 is int : "+tools.isInt(4));
    console.log("'5.4' is int : "+tools.isOdd('5.4'));

    console.log("' ewf \t\t \n' ewe:"+tools.transAllNonCharToSpace("' ewf \t\t \n' ewe"));
})();