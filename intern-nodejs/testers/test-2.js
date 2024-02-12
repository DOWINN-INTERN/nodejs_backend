// const fs = require('fs');
// fs.writeFileSync('message.txt', 'Hello Edwin E. Calma Jr.');

// Method type 1.
const sample1 = function () {
    console.log("Sample 1");
};

// Method type 2.
const sample2 = () => {
    console.log("Sample 2");
};

// Method type 3.
const sample3 = () => console.log("Sample 3");

sample1();
sample2();
sample3();
