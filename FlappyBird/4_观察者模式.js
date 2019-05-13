function Teacher() {
  this.students = [];
}

Teacher.prototype.liuzuoye = function (txt) {
  for (var i = 0; i < this.students.length; i++) {
    this.students[i].listen(txt);
  }
}

function Student(name, myteacher) {
  this.name = name;
  this.teacher = myteacher;
  this.teacher.students.push(this);
}
Student.prototype.listen = function (txt) {
  console.log("我是" + this.name + "，我收到了老师的作业：" + txt);
}

var laoshi = new Teacher(); // 发布者
var xiaoming = new Student("小明", laoshi); // 订阅者
var xiaoming = new Student("小红", laoshi); // 订阅者

laoshi.liuzuoye("背书！")