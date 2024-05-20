let admin = {
  rules: 777,
  isAdmin() {
    console.log(
      `'Я админ  и меня зовут ${this.name}'` + " , мои права " + admin.rules
    );
    return console.log(this);
  },
};
// let user = {
//   name: "Ivan",
//   age: 20,
//   __proto__: admin,
// };

//в каждом объекте есть свойство _proto_ указывает на другой объект, кот.является родительским данного объекта
/**
 * внутри _proto_ находятся методы: constructor, hasOwnProperty,toString, get__proto__,set__proto__ и др.
 */

// console.log(user);
// console.log(user.rules); //777 - получаем св-во от родителя
// console.log(user.valueOf()); //{name: 'Ivan', age: 20}

function User(name, age) {
  this.name = name;
  this.age = age;
  this.myInfo = function () {
    console.log(`Мой возраст ${this.name}, мое имя ${this.name}`);
    return this;
  };

  this.__proto__ = admin;
}

let u1 = new User("Rita", 18);
console.log(u1);
let u2 = new User("Mila", 28);
console.log(u2);
let u3 = new User("Misha", 15);
console.log(u3);
u1.isAdmin();
admin.isAdmin(); //{rules: 777, isAdmin: ƒ}
u2.isAdmin(); //'Я админ  и меня зовут Mila' , мои права 777
u3.myInfo(); //Мой возраст Misha, мое имя Misha

let bool = true;
let str = "Hello";
let array = [1, 2, 3];
let a = {
  name: "Vsya",
  f: function () {
    console.log(a.name);
    return this;
  },
};

a.f();

let newFunc = a.f.bind(a);
console.log(newFunc());

// _____________
let F = function (name = "i") {
  this.name = name;
};

let obj = new F();
console.log(obj); //{}- пустой объект. Если заполнить F, то F {name: 'i'}
let obj1 = new F("Сергей");
console.log(obj1); //F {name: 'Сергей'}
let obj2 = new F("Маша");
console.log(obj2); //F {name: 'Маша'}

//Свойство constructor указывает на функцию-конструктор, с помощью которой был создан объект. И находится оно в prototype, а не добавляется в экземпляр при его создании.
console.log(obj.constructor); /*ƒ (name = "i") {
                               this.name = name;
                               }*/
console.log(a.constructor); //ƒ Object() { [native code] }
console.log(array.constructor); //ƒ Array() { [native code] }
console.log(str.constructor); //ƒ String() { [native code] }
console.log(bool.constructor); //ƒ Boolean() { [native code] }

//наполняем объект свойствами с помощью set и get
let F1 = function (name) {
  this.setName = function (name) {
    this.name = name;
  };
  this.getName = function (name) {
    return this.name;
  };
  this.setName(name);
};

let objF11 = new F1("Lena");
let objF12 = new F1("Vika");

// console.log(objF11.getName()); //Lena
// objF11.setName("Masha");
// console.log(objF11.getName()); //Masha

//наполняем объект свойствами с помощью prototype( по умолчанию- это пустой объект)
console.log(F1.prototype); //{}
//и этот пустой объект мы можем наполнять различными методами
let F2 = function (name) {
  F2.prototype.setName = function (name) {
    this.name = name;
  };
  F2.prototype.getName = function (name) {
    return this.name;
  };
  this.setName(name);
};

let objF21 = new F2("Lena");
let objF22 = new F2("Vika");
console.log(objF21.getName()); //Lena
objF21.setName("Masha");
console.log(objF21.getName()); //Masha

console.log(F2.prototype === objF21.__proto__); //true
//свойство prototype конструктора будет равно служебному скрытому свойству __proto__, и это свойство __proto__ добавляется в объект при его создании функцией-конструктором.
//Методы поместились не напрямую в объект, а в прототип, соответственно они будут располагаться внутри служебного св-ва __proto__.

// obj = {
//   name: 'Сергей',
//   __proto__:{
//     constructor:F,
//     getName:function(){},
//     setName:function(){},
//   }
// }
