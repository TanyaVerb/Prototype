class People{
    constructor(fio, birthday, numbers, room){
let name = fio.toLowerCase().split(' ');
this name = {};
this.name.f = name[0][0].toUpperCase()+name[0].slice(1);
this.name.i = name[1][0].toUpperCase()+name[1].slice(1);
this.name.o = name[2][0].toUpperCase()+name[2].slice(1);

let date = birthday.split('.');
this date = {};
this.date.d= +date[0]
this.date.m= +date[1]
this.date.y= +date[2]


    }
}

let people1 = new People(' иванов Иван Иванович', '24.11.1982', '2245,2344,1899', 542)