function createNewPerson(name) {
  var obj = {};
  obj.name = name;
  obj.greeting = function() {
    alert('Hi! I\'m ' + this.name + '.');
  };
  return obj;
}
var salva = createNewPerson('Salva');
salva.name;
salva.greeting();
// Person Constructor
function Person(name) {
    this.name = name;
    this.greeting = function() {
      alert('Hi! I\'m ' + this.name + '.');
    };
  }
  var person1 = new Person('Bob');
  var person2 = new Person('Sarah');
  person1.greeting()
  person2.greeting()


  Q: Create your own events