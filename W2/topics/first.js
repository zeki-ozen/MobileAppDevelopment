let sayi1 = "This is example of external JS file";

console.log(sayi1);


let numara = 100;
let floatNumber = 10.5;
let string = "Hello, World!";
let boolean = true;
let booleanFalse = false;

let array = [1, 2, 3, "zeki", true];
let object = { name: "Alice", age: 30 };
let nullValue = null;
let undefinedValue;

let bigInt = 1234567890123456789012345678901234567890n;
let symbol = Symbol("unique");


let numbers = [10, 20, 30, 40, 50];

let sayiDevam= true;
while (sayiDevam) {
  const num = numbers.shift();
  console.log(`Popped number: ${num}`);
  if (numbers.length === 0) {
    sayiDevam = false;
  }
}

/*
for (let i = 0; i < numbers.length; i++) {
  console.log(`Index ${i}: ${numbers[i]}`);
}
*/

/*
numbers.forEach((num, index) => {
  console.log(`Index ${index}: ${num}`);
});
*/