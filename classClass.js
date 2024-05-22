class Pet {

    constructor(name, age){
        this.name = name
        this.age = age
    }

    set name(name){
        if(typeof name!=='string'){
            console.log("Принимает только строки");
        } else{
            this._name = name // приватное свойство
        }
      
    }
get name (){
    if(!this._name){
        let isTrue =  prompt('Поле сейчас пустое, хотите задать значение?')
       if (isTrue){
        this._name= isTrue
       }
                     
        }else{
            return this._name
        }
}
    eat(){
        console.log(`${this.name} кушает!`); //если использовать стрелочную ф-ция =>, то запишется в поле, а не в prototype
    }

}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function PetOld(name, age){
    this.age = age
    this.setName(name)
    // this.eat = function(){
    //     console.log(`${this.name} кушает!`);
    // }

    //prototyoe -пустой объект

    
}


PetOld.prototype.setName = function(name){
    if(typeof name!=='string'){
        console.log("Принимает только строки");
    } else{
        this.name = name
    }
    this.name=name
}

PetOld.prototype.eat = function(){
    console.log(this);
    console.log(`${this.name} кушает!`);
}

function CatOld(name) {
    this.name = name
  Cat.prototype.setName(name)
}


CatOld.prototype = Object.create(PetOld.prototype)
CatOld.prototype.constructor = CatOld

CatOld.prototype.sayMay = function () {
    console.log(`${this.name} говорит May`);
  };

PetOld.prototype.getName = function(){
    if(!this.name){
    //    alert("Поле сейчас пустое, хотите задать значение?");
     let isTrue =  prompt('Поле сейчас пустое, хотите задать значение?')
     console.log(isTrue);
     isTrue && this.setName(isTrue)
    }else{
        return this.name
    }

}

const obj = new Pet('', 5)
// const objOld = new PetOld('',32)// this указывает на объект, кот будет создан
// 

// 2233

console.log(obj);
console.log(obj.name);
console.log(obj.eat());//Tosya кушает!



class Cat extends Pet {
    constructor(name, age){
        super(name,age)

    }
    sayMay(){
        console.log(`${this.name} говорит May`);
    }
    eat(){
        super.eat()
        console.log("Новый eat");
    }
}


const pet = new Pet ('Dora', 5)
const cat = new Cat ('Tosya', 5)

const objOld = new Cat('Tosya')
console.log(objOld);

// console.log(objOld);
// let result = objOld.getName();
// console.log(result);
// console.log(objOld);

// console.log((obj.__proto__ === Pet.prototype));
// console.log((objOld.__proto__ === PetOld.prototype));