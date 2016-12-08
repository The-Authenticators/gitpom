var timeDisplay = document.querySelector('#timeDisplay');
var startButton = document.querySelector('#startButton');
var abandonButton = document.querySelector('#abandonButton');
var completeButton = document.querySelector('#completeButton');
var restartButton = document.querySelector('#restartButton');
var issueUrl = document.querySelector('#issue_url').value;

var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
  var button = buttons[i];
  button.onclick = function () {
    handleInput(this.id);
  };
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
  // sendCompleteRequest();
}

function abandon () {
  stopTimer();
  // sendAbandonRequest();
}

function restart () {
  hideElement(restartButton);
  startTimer();
}

function updateDOM () {
  timeDisplay.innerText = formatTime(timeRemaining);
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
  var body = { issueUrl: issueUrl };
  var url = '/assign';
  assignRequest.open('post', url);
  assignRequest.send(JSON.stringify(body));
}
