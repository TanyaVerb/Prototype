/**
 * Объект = это набор свойств
 * Каждое свойство имеет имя и значение.
 * У каждого объекта есть свойство constructor.
 * Можно обратится к свойству constructor любого типа данных в JS, следовательно , ВСЕ В JS- ОБЪЕКТ!!!
 *
 * Кроме undefined и null! - не объект.
 *
 */

let a = {
  prop: 1,
  f: function () {
    console.log(this.prop);
  },
};
let b = {
  prop: 2,
  f: function () {
    console.log(this.prop);
  },
};

// console.log(a.f());//1
// console.log(b.f());//2

// let newFunc = a.f;
// console.log(newFunc);//undefined
let newFunc = a.f.bind(b); // привязали контекст
console.log(newFunc); //2
a.f = a.f.bind(b);

console.log(a.f()); //2
console.log(b.f()); //2

//bind - возвращает новую функцию с измененным контекстом
//Принимает в качестве аргументов:
//-новый контекст
//-произвольное количество аргументов для передачи в функцию

//Изменить контекст функции можно только один раз.
///Имеет особенность накапливать аргументы.
//_______

function summ(a, b) {
  console.log(this.prop + a + b);
}
let a1 = {
  prop: 1,
  f: summ,
};
let b1 = {
  prop: 2,
  f: summ,
};

a1.f(1, 1); //3
b1.f(2, 2); //6

summ.call(a, 1, 1); //3
summ.call(b, 2, 2); //6

//Меняем this[call]
//call- меняет контекст функции и вызывает ее.
//Пробрасывает значение возвращаемое функцией.
//Принимает в качестве аргументов:
//- новый контекст
//-произвольное количество аргументов для передачи в функцию
//___________
console.log(summ.apply(a, [1, 1]));
console.log(summ.apply(b, [2, 2]));
// _____________________________
//функция-конструктор возвращает пустой объект и this- явл.этим объектом.
let F = function (name) {
  this.setName = function (name) {
    this.name = name;
  };
  this.getName = function () {
    return this.name;
  };
  this.setName(name);
};

let obj = new F();
console.log(obj); //{}

let obj1 = new F("Lena");
let obj2 = new F("Olya");

console.log(obj1.getName()); //Lena
obj1.setName("Mila");
console.log(obj1.getName()); //Mila
obj1.setName("Vika");
console.log(obj1.getName());
console.log(obj1); //Vika

console.log(obj2.constructor); //свойство constructor указывает на функцию, с помощью которой был создан объект, оно находится в __proto__

//Второй способ наполнения объектов методами\
console.log(F.prototype);
{
}

let F1 = function (name) {
  this.setName(name);
};
F1.prototype.setName = function (name) {
  this.name = name;
};
F1.prototype.getName = function (name) {
  return this.name;
};

let objF1 = new F1("Lena");
let objF2 = new F1("Olya");

console.log(F1.prototype === objF1.__proto__); //true
console.log(objF1.getName()); //Lena
objF1.setName("Mila");
console.log(objF1.getName()); //Mila

/** Прототипное наследование
 * У каждого конструктора есть свойство prototype, которое изначально является "пустым" объектом.
 * Наполняя prototype свойствами, мы тем самым, наполняем теми же свойствами и все экземпляры данного конструктора.
 * /Когда конструктор создает экземпляр, помимо свойства constructor, в экземпляр помещается скрытое свойство __proto__, которое указывает на prototype конструктора.
 * Прямой доступ к __proto__доступен не во всех браузерах.
 *
 */

let F2 = function (name, age) {
  this.setName(name);
  this.setAge(age); //инициализируем возраст
};

// F2.prototype = F1.prototype; - все методы из F1 наследуются F2

//Создаем прослойку между прототипами

//#1
// function inherit(child, parent) {
//   let Temp = function () {};
//   Temp.prototype = parent.prototype;
//   child.prototype = new Temp();
// }

//#2_____
function inherit(child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
  child.prototype.parent = parent;
}

inherit(F2, F1);
F2.prototype.setAge = function (age) {
  this.age = age;
};
F2.prototype.getAge = function () {
  return this.age;
};

F2.prototype.setName = function (name) {
  this.parent.prototype.setName.call(this, name);
  console.log("новое имя установлено");
};

let objF21 = new F2("Fill", 28);
console.log(objF21.getName(), objF21.getAge()); //Fill 28
// console.log(objF1.getName(), objF1.getAge()); //ошибка , так как ф-ция inherit делает так, чтобы у объектов типа F1 не было метода getAge()

/**
Прототипное наследование
При необходимости реализовать прототипное наследование, не рекомендуется присваивать один прототип другому.
При присваивании объектов, оба объекта начинают указывать на один и тот же объект, следовательно, изменяя один из объектов, автоматически изменяется и другой.
Для реализации правильного прототипного наследования, необходимо:
- либо создать объект-прослойку между прототипами
- либо использовать Object.create()  */

let dimych = { name: "Dimych" };

console.log(dimych.toString());
console.log(dimych);

function Samurai(name) {
  this.name = name;
}
Samurai.prototype.hello = function (name) {
  console.log(`Hello, ${this.name}`);
};

let shogun = new Samurai("Dima");
shogun.hello();
console.log(shogun);
let shogun2 = new Samurai("Dasha");
shogun2.hello();
console.log(shogun2);

//1
console.log({}.prototype === {}.__proto__); //false
//2
function ITKamasutra() {}
console.log(ITKamasutra.__proto__ === ITKamasutra.prototype); //false (ITKamasutra.prototype !=function.prototype)
//3
//4
function ITIncubator() {}
function ITKamasutra() {}
console.log(ITIncubator.__proto__ === ITKamasutra.__proto__); //true;
console.log(ITIncubator.prototype === ITKamasutra.prototype); //false

class Samurai2 {
  constructor(name) {
    this.name = name;
  }
  hello() {
    console.log(this.name);
  }
}

let shogun3 = new Samurai2("Lilu");

console.log(shogun3.__proto__.__proto__); //hasOwnProperty,toString,get __proto_,set __proto__ и др.свойства
console.log(shogun3.__proto__.__proto__.__proto__); //null
console.log(shogun3.__proto__);
console.log(shogun3.__proto__.constructor.__proto__); //ƒ () { [native code] }

const dog = {
  name: "Dora",
  sayGav() {
    console.log(`${this.name} говорит Gav`);
  },
  meet() {
    console.log("Меня зовут: я Dog");
  },
  temp: 123,
  obj: {
    age: "23",
  },
};

const cat = {
  name: "Tosay",
  sayMay() {
    console.log(`${this.name} говорит May`);
  },
  meet() {
    console.log("Привет");
  },
  temp2: dog.temp,
};

console.log(cat.temp2); //123
dog.temp = 150;
console.log(cat.temp2); //123
console.log(dog.temp); //150

console.log(dog.obj.age); //23
dog.obj.city = "Vit";
console.log(dog.obj.city); //Vit
cat.obj = dog.obj;
// dog.obj.age = null

function Pet(name) {
  this.name = name;
  // this.meet =function(){
  //   console.log(`Привет ${this.name}`);
  // }

  this.setName(name);
  // this.meeErrort= function(){
  //   console.log(`Привет ${this.name}`);
  // }
}

Pet.prototype.meet = function () {
  // привязывает контекст там где она была создана

  console.log(`Привет ${this.name}`);
};

Pet.prototype.setName = function (name) {
  this.name = name;
};
Pet.prototype.getName = function (name) {
  return (name = name);
};

function Cat(name) {
  Cat.prototype.sayMay = function () {
    console.log(`${this.name} говорит May`);
  };
}

Cat.prototype = Pet.prototype;
Dog.prototype.constructor = Cat;

Dog.prototype = Pet.prototype;

Dog.prototype = Object.create(Pet.prototype);
Dog.prototype.constructor = Dog;

function Dog() {
  Dog.prototype.sayGav = function () {
    console.log(`${this.name} говорит Gav`);
  };

  Dog.prototype.meet = function () {
    Pet.prototype.meet.call(this);
    console.log(`New MEEt`);
  };
}

// const dog2 = new Dog("Dora")
console.log(dog2.getName());
const cat2 = new Cat("Tosya");
cat2.meet();
cat2.setName;

console.log(cat2.setName("Tocz"));
console.log(dog2);
console.log(cat2);

const dog2 = new Dog();
dog2.meet();
dog2.meeError();

// function foo (cd){
//   cd()
// }

// foo(dog2.meet)
// foo(dog2.meeErrort)//undefined

/**
 * Pet{
 * prototype:{
 * constructor:Pet,
 * meet(){}
 * }
 * }
 *
 * cat2{
 * __proto__
 * }
 */

// cat2 = {
//   __proto__:Pet.prototype
// }

//*********************************************** */

// function Car (selector1, selector2){
//   this.input = document.querySelector(selector1)
//   this.btn = document.querySelector(selector2)
// }

// const cards= [
//   new Card ('.input1', 'btn1'),
//   new Card ('.input2', 'btn2'),
//   new Card ('.input3', 'btn3')
// ]
