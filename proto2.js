// function inherit(child, parent) {
//   let Temp = function () {};
//   Temp.prototype = parent.prototype;
//   child.prototype = new Temp();
//}
//второй вариант:
//конструктор родителя
function inherit(child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
  child.prototype.parent = parent;
}

//   child.prototype ={
//  setAge: function(){}
//     __proto__:{
//         constructor: F, //parent
//         setName: function(){},
//         getName: function(){}
//     }
//   }

/**
 * obj 2 = {
 * name:'Андрей',
 * age: 30,
 * __proto__:{
 *     setAge:function(){},
 *     __proto__:{
 *          constructor: F,
 *          getName: function(){},
 *          setName: function(){}
 * }
 * }
 * }
 *
 */

let F = function (name) {
  this.setName(name);
};
let F2 = function (name, age) {
  this.setName(name);
  this.setAge(age);
};
let F3 = function (name, age, pet) {
  this.setName(name);
  this.setAge(age);
  this.setPet(pet);
};

F.prototype.setName = function (name) {
  this.name = name;
};
F.prototype.getName = function () {
  return this.name;
};

//F2.prototype = F.prototype; при присваивании объектов, оба объекта начинают указывать на один и тот же объект, следовательно, изменяя один из объектов, автоматически изменяется и другой.

inherit(F2, F);
inherit(F3, F2);

F2.prototype.setAge = function (age) {
  this.age = age;
};
F2.prototype.getAge = function () {
  return this.age;
};
F2.prototype.setName = function (name) {
  F.prototype.setName.call(this, name);
  console.log("новое имя установлено");
};

F3.prototype.setPet = function (pet) {
  this.pet = pet;
};
F3.prototype.setAge = function (age) {
  this.parent.prototype.setAge.call(this, age);
  console.log("установлен возраст");
};
F3.prototype.getPet = function () {
  return this.pet;
};

let obj1 = new F("Сергей");
let obj2 = new F2("Андрей", 30);
let obj3 = new F3("Оля", 25, "Собака");

// obj2 = {
//   name: "Андрей",
//   age: 30,
//   __proto__: {
//     setAge: function (name) {},
//     getAge: function () {},
//     __proto__: {
//       constructor: F,
//       setName: function () {},
//       getName: function () {},
//     },
//   },
// };

// console.log(obj1.setAge(26));// ошибка
console.log(obj1.getName()); //Сергей
// console.log(obj2.getName(), obj2.getAge()); //Андрей 30
// console.log(obj2.__proto__.__proto__.getName.call(obj2)); //Андрей
console.log(obj2.getAge()); //30
// console.log(obj2.setPet("Кот")); // ошибка
console.log(obj1.getName());
console.log(obj2.getName(), obj2.getAge()); //Андрей 30
console.log(obj3.getPet(), obj3.getName(), obj3.getAge());
console.log(obj3.setAge(26)); //установлен возраст
console.log(obj3); //F3 {name: 'Оля', age: 26, pet: 'Собака'}

let m = {
  prop: 3,
  f: function () {
    let func = () => {
      console.log(this.prop);
    };

    func();
  },
};

m.f(); //3

let m2 = {
  prop: 3,
  f: function () {
    let func = function () {
      console.log(this.prop);
    };

    func();
  },
};

m2.f(); //undefined, так как теряется контекст у внутренней функции

let m3 = {
  prop: 3,
  f: function () {
    let func = function () {
      console.log(this.prop);
    };

    func.call(this); //привязываем контекст
  },
};

m3.f(); //3
console.log(m3.constructor()); //{}=>[[Prototype]]:Object

console.log(m3.hasOwnProperty("prop")); //true - указывает на то, содержит ли объект указанное собственное(неунаследованное) свойство, или метод.
