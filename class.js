class User {
  constructor(name, age, admin = false) {
    this.name = name;
    this.age = age;
    this.admin = admin;
  }
  myInfo() {
    console.log(
      "Меня зовут " + this.name + ", мой возраст " + this.age + " лет."
    );
    if (this.admin === true) {
      console.log(" Я админ.");
    }
  }
}

let u1 = new User("Vika", 32);
console.log(u1); //UserU {name: 'Vika', age: 32}
let u2 = new User("Petr", 30);
let u3 = new User("Kate", 40, true);
let u4 = new User("Tanya", 18);

console.log(u4.myInfo()); //Меня зовут Tanya, мне 18 лет
console.log(u3.myInfo()); //Меня зовут Kate, мой возраст 40 лет
//Я админ

class Moderator extends User {
  constructor(name, age, admin = false, moder = true) {
    super(name, age, admin);
    this.moder = moder;
  }
  addPost() {
    console.log("New Post");
  }

  //изменяем метод:
  //   myInfo() {
  //     console.log(
  //       "Меня зовут " + this.name + ", мой возраст " + this.age + " лет."
  //     );
  //     if (this.admin === true) {
  //       console.log(" Я модератор.");
  //     }
  //   }
  // чтобы дополнить метод:
  myInfo() {
    super.myInfo();
    console.log("Я модератор");
  }
}

let m1 = new Moderator("Ivan", 25, true);
console.log(m1); //Moderator {name: 'Ivan', age: 25, admin: true, moder: true}

m1.myInfo(); //Меня зовут Ivan, мой возраст 25 лет.  Я админ. Я модератор.
m1.addPost(); //New Post

//___________________Практика________________________
class People {
  /** 
    Класс человек
    * @param {String} fio по формату 'Фамилия Имя Отчество'
    * @param {String} birthday день рождения по формату '24.11.1994'
    * @param {String} numbers "номер" если больше 2 номеров, то по формату "номер1, номер2"
    * @param {Number} room комната*/
  constructor(fio, birthday, numbers = "", room = "") {
    let name = fio.toLowerCase().split(" ");
    this.name = {};
    this.name.f = name[0][0].toUpperCase() + name[0].slice(1);
    this.name.i = name[1][0].toUpperCase() + name[1].slice(1);
    this.name.o = name[2][0].toUpperCase() + name[2].slice(1);

    let date = birthday.split(".");
    this.date = {};
    this.date.d = +date[0];
    this.date.m = +date[1];
    this.date.y = +date[2];

    this.numbers = numbers.split(","); // разбиваем строку в массив
    this.room = +room;
  }
  static month = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    " сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  //Документация стандарта JSDoc
  /**
   * Вывести ФИО
   * @return {String} Строка формата 'Фамилия Имя Отчество'
   */
  getFio() {
    return `${this.name.f} ${this.name.i} ${this.name.o} `;
  }
  /**
   * Вывести день рождения
   * @return {String}Строка формата '24 июля 1997'
   */
  getBirthday() {
    return `${this.date.d} ${People.month[this.date.m - 1]} ${this.date.y}`;
  }
  /**
   * Вывести Фамилия_Имя_Отчество.расширение
   * @param {String} extention расширение, например "jpg" или "png"
   * @return {String} для названия изображения
   */
  getImgSrs(extention) {
    return `${this.name.f}_${this.name.i}_${this.name.o}.${extention}`;
  }
  /**Вывести все номера телефонов или только первый номер
   * @param {Boolean} allNumbers если true, то все номера, если false, то только первый номер
   * @return {String} Строка формата: "89006660099, 89009996699"
   */
  getNumbersList(allNumbers) {
    if (this.numbers.length == 0 || this.numbers[0].length == 0)
      return undefined;
    if (allNumbers === true) {
      return this.numbers.join(",");
    } else return this.numbers[0];
  }
}

let people1 = new People(
  "Вербицкий алексаНдр Владимирович",
  "22.08.1981",
  "9984,8847,5478",
  542
);
let people2 = new People(
  "иванов Иван Иванович",
  "11.05.1982",
  "9184,8147,5578",
  522
);

console.log(people1);
console.log(people1.getFio()); //Вербицкий Александр Владимирович
console.log(people2.getFio()); //Иванов Иван Иванович
console.log(people2);
console.log(people2.getBirthday()); //11 мая 1982
console.log(people1.getBirthday()); //22 августа 1981
console.log(people1.getImgSrs("png")); //Вербицкий_Александр_Владимирович.png
console.log(people1.getNumbersList(true)); //9984,8847,5478
console.log(people2.getNumbersList()); //9184

//****************************************************/
let head = {
  glasses: 1,
};

let table = {
  pen: 3,
  __proto__: head,
};

let bed = {
  sheet: 1,
  pillow: 2,
  __proto__: table,
};

let pockets = {
  money: 2000,
  __proto__: bed,
};

console.log(pockets.pen); //3
console.log(bed.glasses); //1
console.log(table.money); //undefined

//________________
let animal = {
  eat() {
    this.full = true;
  },
};

let rabbit = {
  __proto__: animal,
};

rabbit.eat();
console.log(rabbit); //{full: true}
