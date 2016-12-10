var timeDisplay = document.querySelector('#timeDisplay');
var startButton = document.querySelector('#startButton');
var abandonButton = document.querySelector('#abandonButton');
var completeButton = document.querySelector('#completeButton');
var restartButton = document.querySelector('#restartButton');
var svg1 = document.querySelector('#svg1');
var svg2 = document.querySelector('#svg2');
var issueUrl = document.querySelector('#issue_url').value;
var bodyStr = JSON.stringify({ issueUrl: issueUrl });

var buttons = document.querySelectorAll('.cta_button');
for (var i = 0; i < buttons.length; i++) {
  var button = buttons[i];
  button.onclick = function () {
    handleInput(this.id);
  };
}

var links = document.querySelectorAll('.issues__list-item-link');

for (i = 0; i < links.length; i++) {
  var t = links[i].textContent;
  var res = links[i].textContent = t.substr(0, 70);
  if (t.length > res.length) { res = res.trim() + '...'; }
  links[i].textContent = res;
}

var sessionLength = 25 * 60 * 1000;
var currentTime;
var timeRemaining;
var timer;

function handleInput (id) {
  var buttons = {
    startButton: start,
    completeButton: complete,
    abandonButton: abandon,
    restartButton: restart
  };

  buttons[id]();
}

function countdown () {
  var oldTime = currentTime;
  currentTime = Date.now();
  timeRemaining -= currentTime - oldTime;
  if (timeRemaining <= 0) {
    timeRemaining = 0;
    end();
  } else {
    updateDOM();
  }
}

function end () {
  stopTimer();
  showElement(restartButton);
}

function stopTimer () {
  window.clearInterval(timer);
}

function start () {
  assignUser(issueUrl);
  hideElement(startButton);
  showElement(abandonButton);
  showElement(completeButton);
  startTimer();
}

function startTimer () {
  currentTime = Date.now();
  timeRemaining = sessionLength + 900;
  updateDOM();
  timer = window.setInterval(countdown, 10);
}

function complete () {
  stopTimer();
  completeRequest(issueUrl);
}

function abandon () {
  stopTimer();
  abandonRequest(issueUrl);
}

function restart () {
  hideElement(restartButton);
  startTimer();
}

function updateDOM () {
  timeDisplay.textContent = formatTime(timeRemaining);
  svg1.attributes.offset.value = 1 - timeRemaining / sessionLength;
  svg2.attributes.offset.value = 1 - timeRemaining / sessionLength;
}

function formatTime (time) {
  var seconds = Math.floor((time / 1000) % 60).toString();
  var minutes = Math.floor((time / (60 * 1000)) % 60).toString();
  if (seconds.length < 2) seconds = '0' + seconds;
  if (minutes.length < 2) minutes = '0' + minutes;
  return '' + minutes + ':' + seconds;
}

function hideElement (elem) {
  elem.style.display = 'none';
}

function showElement (elem) {
  elem.style.display = 'block';
}

function assignUser (issueUrl) {
  var assignRequest = new XMLHttpRequest();
  var url = '/assign';
  assignRequest.open('post', url);
  assignRequest.send(bodyStr);
}

function completeRequest (issueUrl) {
  var request = new XMLHttpRequest();
  var url = '/complete';
  request.onreadystatechange = function () {
    console.log(request.status);
  };
  request.open('post', url);
  request.send(bodyStr);
}

function abandonRequest (issueUrl) {
  var request = new XMLHttpRequest();
  var url = '/abandon';
  // request.onreadystatechange = function () {
  //   if (request.readyState === XMLHttpRequest.DONE) {
  //     window.location.href = '/';
  //   }
  // };
  request.open('post', url);
  request.send(bodyStr);
}

// handle leaving page

// window.onbeforeunload = function () {
//   abandon();
//   if (timeRemaining < sessionLength) { confirm('Do you want to stop working on this issue?'); return false; }
// };
