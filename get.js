// class User {
//   constructor(name) {
//     this.name = name;
//   }
// }
// const student = new User("alex");
// console.log(student);

//Функция-конструктор

function User(name) {
  //this = {} (неявно)
  this.name = name;
  this.isAdmin = false;

  //return this; (неявно)
}

let user = new User("Jack"); //запускаем функцию с помощью new
console.log(user.name); //Jack
console.log(user?.isAdmin); //false
console.log(user?.address); //undefined

let user2 = new User("Vanya");
console.log(user2); //User {name: 'Vanya', isAdmin: false}

/*Технически любая функция (кроме стрелочных функций, поскольку у них нет this) может использоваться в качестве конструктора. Его можно запустить с помощью new, и он выполнит выше указанный алгоритм. Подобные функции должны начинаться с заглавной буквы – это общепринятое соглашение, чтобы было ясно, что функция должна вызываться с помощью «new».*/

/*При вызове return с объектом, вместо this вернётся объект.
При вызове return с примитивным значением, оно проигнорируется.Другими словами, return с объектом возвращает этот объект, во всех остальных случаях возвращается this.

Обычно у конструкторов отсутствует return. */

function BigUser(name) {
  this.name = name;
  return { name: "Cat" }; //<-- возвращает этот объект
}

let dog = new BigUser("Lacky");
console.log(dog.name); //Cat
//_______________________________________________________
//____________Методы в конструкторе______________________
function User(name) {
  this.name = name;
  this.SayHi = function () {
    console.log("Меня зовут: " + this.name);
  };
}

let john = new User("John");
john.SayHi(); //Меня зовут: John

//_____________
let admin = {
  rules: 777,
  isAdmin() {
    console.log("Я админ " + this.name + ", мои права " + this.rules);
    return this;
  },
};

let userN = {
  name: "Nik",
  age: 20,
  __proto__: admin,
};

console.log(userN.rules); //777
console.log(userN.toString()); //[object Object]

function UserU(name, age) {
  this.name = name;
  this.age = age;
  this.__proto__ = admin;
  this.myInfo = function () {
    console.log("Меня зовут " + this.name + ", мне " + this.age + " лет");
  };
}

let u1 = new UserU("Vika", 32);
console.log(u1); //UserU {name: 'Vika', age: 32}
let u2 = new UserU("Petr", 30);
let u3 = new UserU("Kate", 40);
let u4 = new UserU("Tanya", 18);
console.log(u2);
console.log(u3);
console.log(u4);
console.log(u4.isAdmin());
console.log(u4.myInfo());
