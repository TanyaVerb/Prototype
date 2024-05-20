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
