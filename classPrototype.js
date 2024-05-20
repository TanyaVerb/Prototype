const dog = {
  name: "Dora",
  sayGav() {
    console.log(`${this.name} говорит Gav`);
  },
  meet() {
    console.log(`Привет, я ${this.name}`);
  },
};

const cat = {
  name: "Tosay",
  sayMay() {
    console.log(`${this.name} говорит May`);
  },
  meet() {
    console.log(`Привет, я ${this.name}`);
  },
};

//*********************************************************/
//______________________________________________________
function Pet(name) {
  // this.meet = function() {
  //     console.log(`Привет, я ${this.name}`);
  // }

  this.setName(name);
}

Pet.prototype.setName = function (name) {
  this.name = name;
};

Pet.prototype.getName = function () {
  return this.name;
};

Pet.prototype.meet = function () {
  console.log(`Привет, я ${this.name}`);
};

function Cat(name) {
  Cat.prototype.sayMay = function () {
    console.log(`${this.name} говорит May`);
  };
}

function Dog(name) {
  Dog.prototype.sayGav = function () {
    console.log(`${this.name} говорит Gav`);
  };

  Dog.prototype.meet = function () {
    Pet.prototype.meet.call(this);
    console.log(`NEW MEEET`);
  };
}

function inherit(child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
  //   child.prototype.parent = parent;
}

let pet1 = new Pet(" Rick");
console.log(pet1); //Pet {name: ' Rick'}
console.log(pet1.meet()); //Привет, я  Rick

let cat1 = new Cat("Lily");
console.log(cat1);
console.log(cat1.sayMay());

let dog2 = new Dog("Gav");
console.log(dog2);
console.log(dog2.sayGav());
// console.log(dog2.setName("Dora"));
// dog2.meet();

// console.log(cat2);
console.log(dog2);

// Если вызвать функцию c ключевым словом NEW, то функция начнет возвращать "пустой" объект
// this внутри функции конструктора указывает на экземпляр
// у экземпляра есть свойство constructor (указывает на функцию-конструктор)
// У каждого конструктора есть свойство prototype, которое изначально является "пустым" объектом
// Наполняя prototype любыми свойствами, мы, тем самым, наполняем свойствами и все экс данного конструктора
/*
 Когда конструктор создает экз, помимо свойства constructor, в экз помещается СКРЫТОЕ св-во
 __proto__, которое ссылается на prototype конструктора
*/
