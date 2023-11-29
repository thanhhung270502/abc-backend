const AbilityController = require('../src/app/controllers/AbilityController');

const CalculationOperations = require('../src/calculator');

 

describe("AbilityController TestCases", () => {

 test1("", () => {



   var sum = CalculationOperations.Add(1,2)



   expect(sum).toBe(3);

 });

})



