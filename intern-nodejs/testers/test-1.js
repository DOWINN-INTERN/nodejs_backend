// Object Declaration: Can contain variables and functions.
const person = {
    name: "Edwin",
    age: 25,
    greet: function () {
        console.log("Hi i am " + this.name);
    }
};

person.greet();

// Copy an object to another object.
let objcopy = { ...person };

console.log(objcopy);

// Create an array and iterate.
const arr = ["Edwin", "Bea"];

for (let ar of arr) {
    console.log(ar);
}

// Copy an array to another array type 1.
let copy1 = arr.map((copy1) => copy1);

// Copy an array to another array type 2.
let copy2 = arr.slice();

// Copy an array to another array type 3.
let copy3 = [...arr];

console.log(copy1);
console.log(copy2);
console.log(copy3);

// Create responsive array.
let ToArray = (...args) => {
    return args;
};

console.log(ToArray(1, 2, 3, 4));
