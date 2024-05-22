class Clock {
  constructor({ template }) {
    this.template = template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = "0" + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = "0" + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = "0" + secs;

    let output = this.template
      .replace("h", hours)
      .replace("m", mins)
      .replace("s", secs);

    console.log(output);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}

let clock = new Clock({ template: "h:m:s" });
// clock.start();
//__________________________#2_________________________
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    console.log(`${this.name} бежит со скоростью ${this.speed}.`);
    // return this.speed;
  }
  stop() {
    this.speed = 0;
    console.log(`${this.name} стоит неподвижно.`);
    // return this.speed;
  }
}

let animal = new Animal("Мой питомец");
console.log(animal);
console.log(animal.run(20));
console.log(animal.stop());

//*********************Наследование классов********************
// ----------------ключевое слово extend----------------------
class Rabbit extends Animal {
  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }
  hide() {
    console.log(`${this.name} прячется!`);
  }
  stop() {
    super.stop();
    this.hide();
  }
}

let rabbit = new Rabbit("Белый кролик");
let rabbit2 = new Rabbit("Серый кролик");
let rabbit3 = new Rabbit("Черный кролик", 10);
console.log(rabbit3.name); //Черный кролик
console.log(rabbit3.earLength); //10

// class Rabbit extends Animal {
//   stop() {
//     setTimeout(() => super.stop(), 1000); // вызывает родительский stop после 1 секунды
//   }
// }

rabbit.run(5); //Белый кролик бежит со скоростью 5.
rabbit.hide(); //Белый кролик прячется!
rabbit2.stop(); //Серый кролик стоит неподвижно.Серый кролик прячется!

let rabbit4 = new Rabbit("Рыжий Кролик");
rabbit4.stop();

//_______________________
//Пример вызова функции, которая генерирует родительский класс:
function f(phrase) {
  return class {
    sayHi() {
      console.log(phrase);
    }
  };
}

class User extends f("Привет") {}

new User().sayHi(); // Привет
let u1 = new User();
console.log(u1);
console.log(u1.sayHi()); //Привет
