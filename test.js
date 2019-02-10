import test from 'ava';
import PrettyPrinter from './src/prettyPrint';
let jsonObjects = [
    {
      "PassengerId": 1,
      "Survived": 0,
      "Pclass": 3,
      "Name": "Braund, Mr. Owen Harris",
      "Sex": "male",
      "Age": 22,
      "SibSp": 1,
      "Parch": 0,
      "Ticket": "A/5 21171",
      "Fare": 7.25,
      "Cabin": "",
      "Embarked": "S"
    },
    {
      "PassengerId": 2,
      "Survived": 1,
      "Pclass": 1,
      "Name": "Cumings, Mrs. John Bradley (Florence Briggs Thayer)",
      "Sex": "female",
      "Age": 38,
      "SibSp": 1,
      "Parch": 0,
      "Ticket": "PC 17599",
      "Fare": 71.2833,
      "Cabin": "C85",
      "Embarked": "C"
    },
    {
      "PassengerId": 3,
      "Survived": 1,
      "Pclass": 3,
      "Name": "Heikkinen, Miss. Laina",
      "Sex": "female",
      "Age": 26,
      "SibSp": 0,
      "Parch": 0,
      "Ticket": "STON/O2. 3101282",
      "Fare": 7.925,
      "Cabin": "",
      "Embarked": "S"
    },
    {
      "PassengerId": 4,
      "Survived": 1,
      "Pclass": 1,
      "Name": "Futrelle, Mrs. Jacques Heath (Lily May Peel)",
      "Sex": "female",
      "Age": 35,
      "SibSp": 1,
      "Parch": 0,
      "Ticket": 113803,
      "Fare": 53.1,
      "Cabin": "C123",
      "Embarked": "S"
    },
    {
      "PassengerId": 5,
      "Survived": 0,
      "Pclass": 3,
      "Name": "Allen, Mr. William Henry",
      "Sex": "male",
      "Age": 35,
      "SibSp": 0,
      "Parch": 0,
      "Ticket": 373450,
      "Fare": 8.05,
      "Cabin": "",
      "Embarked": "S"
    }
  ];

test.before((t)=>{
    t.context.prettyprinter = new PrettyPrinter();
})
test('the number of header columns should be equal to the number of keys in an object of the array', t => {
    let table = t.context.prettyprinter.createTable(jsonObjects);
    t.is(table.tHead.childElementCount, Object.keys(jsonObjects[0]).length); // Assertion
});
test('the number of header columns should be equal to the number of table body columns', t => {
    let table = t.context.prettyprinter.createTable(jsonObjects);
    t.is(table.tHead.childElementCount, table.tBodies[0].rows[0].childElementCount); // Assertion
});
test('the number of rows excluding header is equal to number of json objects in the array', t => {
    let table = t.context.prettyprinter.createTable(jsonObjects);
    t.is(table.tBodies[0].childElementCount, jsonObjects.length); // Assertion
});

test('the table is not created when json objects array is empty', t => {
    let table = t.context.prettyprinter.createTable([]);
    t.is(table,0); // Assertion
});

test('the table is not created when json objects array is null', t => {
    let table = t.context.prettyprinter.createTable([]);
    t.is(table,0); // Assertion
});