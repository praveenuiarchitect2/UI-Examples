1. type1:
<div id="abc">
Hello
</div>
var event = new Event('build');
var elem = document.getElementById('abc')
// Listen for the event.
elem.addEventListener('build', function (e) { console.log("Iam in custom events")}, false);

// Dispatch the event.
elem.dispatchEvent(event);

Type 2:
Old fashion

var event = document.createEvent('Event');

// Define that the event name is 'build'.
event.initEvent('build', true, true);

// Listen for the event.
elem.addEventListener('build', function (e) {
  // e.target matches elem
}, false);

// target can be any Element or other EventTarget.
elem.dispatchEvent(event);

type3:
var makeBlue = function (elem) {

    elem.classList.add('blue');

    // Create a new event
    var event = new CustomEvent('madeBlue');

    // Dispatch the event
    elem.dispatchEvent(event);

};

var elem = document.querySelector('.not-blue');
makeBlue(elem);

// Run function on `madeBlue` event
elem.addEventListener('madeBlue', function (elem) {
    elem.classList.add('color-changed');
}, false);