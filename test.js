

var create_email = false;
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.addEventListener('start', function () {
    recognizing = true;
    showInfo('info_speak_now');
    // display listening
  });

  recognition.addEventListener('error', function (event) {
    if (event.error == 'no-speech') {
      // not listening
      showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      // not listening
      showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('info_blocked');
      } else {
        showInfo('info_denied');
      }
      ignore_onend = true;
    }
  });

  recognition.addEventListener('end', function () {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
    if (!final_transcript) {
      showInfo('info_start');
      return;
    }
    showInfo('');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);
    }
    if (create_email) {
      create_email = false;
      createEmail();
    }
  });

  recognition.addEventListener('result', function (event) {
    var interim_transcript = '';
    if (typeof (event.results) == 'undefined') {
      recognition.onend = null;
      recognition.stop();
      upgrade();
      return;
    }
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    if (/computer begin program/i.test(final_transcript)) {
      console.log('yes!');
      document.body.innerHTML = '<iframe src="//giphy.com/embed/R0TrhAtNeUC0E" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>'
    }
    console.log(`transcript: ${final_transcript}`);
    // final_span.innerHTML = linebreak(final_transcript);
    console.log(`interim: ${interim_transcript}`);
    // console.log(linebreak(interim_transcript));
  });
}

function upgrade() {
  start_button.style.visibility = 'hidden';
  showInfo('info_upgrade');
}

var two_line = /\n\n/g;
var one_line = /\n/g;
/** @param {string} s */
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
/**
 * @param {string} s the string to capitalize.
 */
function capitalize(s) {
  return s.replace(first_char, function (m) { return m.toUpperCase(); });
}

function createEmail() {
  var n = final_transcript.indexOf('\n');
  if (n < 0 || n >= 80) {
    n = 40 + final_transcript.substring(40).indexOf(' ');
  }
  var subject = encodeURI(final_transcript.substring(0, n));
  var body = encodeURI(final_transcript.substring(n + 1));
  window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
}

function copyButton() {
  if (recognizing) {
    recognizing = false;
    recognition.stop();
  }
  copy_button.style.display = 'none';
  copy_info.style.display = 'inline-block';
  showInfo('');
}

function emailButton() {
  if (recognizing) {
    create_email = true;
    recognizing = false;
    recognition.stop();
  } else {
    createEmail();
  }
  email_button.style.display = 'none';
  email_info.style.display = 'inline-block';
  showInfo('');
}

function startButton() {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = 'en-US';
  recognition.start();
  ignore_onend = false;
  showInfo('info_allow');
  start_timestamp = performance.now();
}
// document.querySelector('button').addEventListener('click', startButton);
startButton();

function showInfo(s) {
  console.log(s);
  // if (s) {
  //   for (var child = info.firstChild; child; child = child.nextSibling) {
  //     if (child.style) {
  //       child.style.display = child.id == s ? 'inline' : 'none';
  //     }
  //   }
  //   info.style.visibility = 'visible';
  // } else {
  //   info.style.visibility = 'hidden';
  // }
}

var current_style;
