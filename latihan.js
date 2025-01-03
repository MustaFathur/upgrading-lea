const persons = [
    {
        name: 'Mark',
        mass1: 78,
        mass2: 95,
        heigth1: 1.69,
        heigth2: 1.88
    },
    {
        name: 'John',
        mass1: 92,
        mass2: 95,
        heigth1: 1.95,
        heigth2: 1.76
    }
]
  
const markBmi1 = persons[0].mass1 / (persons[0].heigth1 ** 2);
const johnBmi1 = persons[1].mass1 / (persons[1].heigth1 ** 2);
const markHigherBMI1 = markBmi1 > johnBmi1;

const markBmi2 = persons[0].mass2 / (persons[0].heigth2 ** 2);
const johnBmi2 = persons[1].mass2 / (persons[1].heigth2 ** 2);
const markHigherBMI2 = markBmi2 > johnBmi2;

console.log(markBmi1, johnBmi1, markHigherBMI1, markBmi2, johnBmi2, markHigherBMI2);

/* Output: PS D:\Dev\Practice\LEA\1> node .\latihan.js
27.309968138370508 24.194608809993426 true 26.87867813490267 30.668904958677686 false
*/