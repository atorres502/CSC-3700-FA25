const fruits = ["Apple", "Banana", "Cake"];
const people = ["Jack", "Jane", "Jim"];

//module.exports = fruits;
//can create objects as you export them
// module.exports = {
//     'fruits' : fruits,
//     'people' : people
// }
//This still works, it grabs the key automatically
module.exports = {
    fruits,
    people
}