class User {
  //свойства
  //   admin = true;
  department = "administration";
  //Тоже метод
  constructor(name, age, admin = false) {
    this.name = name;
    this.age = age;
    this.admin = admin;
  }
  //метод
  myInfo() {
    console.log(`Мой возраст ${this.age}, мое имя ${this.name}`);

    if (this.admin == true) {
      console.log("Я админ");
    }
    // return this;
  }
}

//наследует constructor от User
class Moderator extends User {
  constructor(name, age, admin = false, moder = true) {
    super(name, age, admin);
    this.moder = moder;
  }
  addPost() {
    console.log("New Post");
  }
  myInfo() {
    super.myInfo();
    console.log("Я модератор");
  }
  // return this;
}

let u1 = new User("Rita", 18);
console.log(u1);
let u2 = new User("Mila", 28, true);
console.log(u2.myInfo());
let u3 = new User("Misha", 15);
console.log(u3.myInfo());
let m1 = new Moderator("Masha", 35, true);
console.log(m1);
m1.myInfo();
m1.addPost();
