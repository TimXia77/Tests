const assert = require('chai').assert;
const app = require('../app');

// Results:
sayHelloresult = app.sayHello();
addNumbersresult = app.addNumbers(5,5);


describe('App', function(){
    describe('sayHello()', function(){
        it('sayHello should return hello', function(){
            assert.equal(sayHelloresult, 'hello');
        });
    
        it('sayHello should return type string', function(){
            assert.typeOf(sayHelloresult, 'string');
        });
    });

    describe('addNumbers()', function(){
        it('addNumbers should be above 5', function(){
            assert.isAbove(addNumbersresult, 5);
        });
    
        it('addNumbers should return type number', function(){
            assert.typeOf(addNumbersresult, 'number');
        });
    });


    // it('addNumbers should be above 5', function(){
    //     assert.isAbove(addNumbersresult, 5);
    // });

    // it('addNumbers should return type number', function(){
    //     assert.typeOf(addNumbersresult, 'number');
    // });
});