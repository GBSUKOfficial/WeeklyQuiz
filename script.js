var score = [];
var allWrongs = [];

//change that accordingly
var maxScore = 10;
var name = document.querySelector('#name').textContent.trim();
var finalResult;

const headDiv = document.querySelector('#headDiv');
const startBtn = document.querySelector('#startBtn');

//quiz
const quizDiv = document.querySelector('#quizDiv');
const quiz1 = document.querySelector('#quiz1');
const quiz2 = document.querySelector('#quiz2');
const quiz3 = document.querySelector('#quiz3');
const quiz4 = document.querySelector('#quiz4');
const quiz5 = document.querySelector('#quiz5');
const quiz6 = document.querySelector('#quiz6');
const quiz7 = document.querySelector('#quiz7');
const quiz8 = document.querySelector('#quiz8');
const quiz9 = document.querySelector('#quiz9');
const quiz10 = document.querySelector('#quiz10');

const finish = document.querySelector('#finish');

let messages = document.getElementsByClassName('messages');

const final = document.querySelector('#final');
const finalScore = document.querySelector('#finalScore');
const reload = document.querySelector('#reload');
const wrongAnswers = document.querySelector('#wrongAnswers');
const prizeImg = document.querySelector('#prizeImg');
const email = document.querySelector('#email');

const clearScreen = () => {
  let containers = document.getElementsByClassName('containers');
  Array.from(containers).forEach(element => {
    element.style.display = 'none';
  });
};

//display the outcome
const outcome = (question, wrong, right) => {
  let wrongDiv = document.createElement('div');
  wrongDiv.classList.add('wrongDiv');

  let span1 = document.createElement('p');
  span1.classList.add('questionWrong');
  span1.textContent = question;

  let span3 = document.createElement('p');
  span3.classList.add('rightAnswer');
  span3.textContent = right;

  let span5 = document.createElement('p');
  span5.classList.add('wrongAnswer');
  span5.textContent = wrong;

  wrongDiv.appendChild(span1);
  wrongDiv.appendChild(span3);
  wrongDiv.appendChild(span5);
  return wrongDiv;
};

const clickControl = (answer, cl) => {
  let allAnswers = document.getElementsByClassName(cl);
  //remove the class for checked
  Array.from(allAnswers).forEach(element => {
    element.classList.remove('checked');
  });

  document.getElementById(answer).classList.add('checked');
};

const checkClicked = cl => {
  let allAnswers = document.getElementsByClassName(cl);

  const hasIt = element => element.classList.contains('checked');

  return Array.from(allAnswers).some(hasIt);
};

const sumResult = () => {
  //summarize all score
  const add = (a, b) => a + b;
  const sum = score.reduce(add);
  return sum;
};

const getPrize = () => {
  prizeImg.style.display = 'block';
  reload.style.display = 'none';
  confetti();
};

const next = (n, nextOne, current) => {
  if (checkClicked(`answers${n}`)) {
    clearScreen();
    //checkMatch(`correct${n}`, n - 1, `question${n}`);

    getAnswer(`answers${n}`, `correct${n}`, n - 1, `question${n}`);

    nextOne.style.display = 'flex';
  } else {
    current.appendChild(attachMessage());
  }
};

const previous = pre => {
  clearScreen();
  pre.style.display = 'flex';
};

const attachMessage = () => {
  let mess = document.createElement('p');
  mess.classList.add('messages');
  mess.classList.add('containers');
  mess.textContent = 'Please make your choice first.';
  mess.style.display = 'block';
  return mess;
};

const getAnswer = (cl, answer, questionN, source) => {
  let allAnswers = document.getElementsByClassName(cl);
  const found = Array.from(allAnswers).find(element => element.classList.contains('checked'));

  let correct = document.getElementById(answer).textContent;
  if (found.textContent.trim() === correct.trim()) {
    score[questionN] = 1;
    //remove the stored wrong answer if changed to correct
    allWrongs[questionN] = 0;
  } else {
    score[questionN] = 0;
    //store the div for wrong answer
    allWrongs[questionN] = outcome(document.getElementById(source).textContent, found.textContent.trim(), correct);
  }
};

startBtn.addEventListener('click', e => {
  headDiv.style.display = 'none';
  quiz1.style.display = 'flex';
});

//Quiz10-Last
finish.addEventListener('click', e => {
  if (checkClicked('answers10')) {
    clearScreen();

    getAnswer('answers10', 'correct10', 9, 'question10');

    //display the wrong ones
    allWrongs.forEach(element => {
      if (element !== 0) {
        wrongAnswers.appendChild(element);
      }
    });

    finalResult = `${sumResult()} / ${maxScore}`;
    finalScore.textContent = finalResult;
    if (sumResult() === maxScore) {
      getPrize();
    }
    final.style.display = 'flex';
  } else {
    quiz10.appendChild(attachMessage());
  }
});

//Final
reload.addEventListener('click', e => {
  window.location.reload();
});

const confetti = () => {
  let W = window.innerWidth;
  let H = window.innerHeight;
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const maxConfettis = 150;
  const particles = [];

  const possibleColors = [
    'DodgerBlue',
    'OliveDrab',
    'Gold',
    'Pink',
    'SlateBlue',
    'LightBlue',
    'Gold',
    'Violet',
    'PaleGreen',
    'SteelBlue',
    'SandyBrown',
    'Chocolate',
    'Crimson'
  ];

  function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  function confettiParticle() {
    this.x = Math.random() * W; // x
    this.y = Math.random() * H - H; // y
    this.r = randomFromTo(11, 33); // radius
    this.d = Math.random() * maxConfettis + 11;
    this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
    this.tilt = Math.floor(Math.random() * 33) - 11;
    this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
    this.tiltAngle = 0;

    this.draw = function() {
      context.beginPath();
      context.lineWidth = this.r / 2;
      context.strokeStyle = this.color;
      context.moveTo(this.x + this.tilt + this.r / 3, this.y);
      context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
      return context.stroke();
    };
  }

  function Draw() {
    const results = [];

    // Magical recursive functional love
    requestAnimationFrame(Draw);

    context.clearRect(0, 0, W, window.innerHeight);

    for (var i = 0; i < maxConfettis; i++) {
      results.push(particles[i].draw());
    }

    let particle = {};
    let remainingFlakes = 0;
    for (var i = 0; i < maxConfettis; i++) {
      particle = particles[i];

      particle.tiltAngle += particle.tiltAngleIncremental;
      particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
      particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

      if (particle.y <= H) remainingFlakes++;

      // If a confetti has fluttered out of view,
      // bring it back to above the viewport and let if re-fall.
      if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
        particle.x = Math.random() * W;
        particle.y = -30;
        particle.tilt = Math.floor(Math.random() * 10) - 20;
      }
    }

    return results;
  }

  window.addEventListener(
    'resize',
    function() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    },
    false
  );

  // Push new confetti objects to `particles[]`
  for (var i = 0; i < maxConfettis; i++) {
    particles.push(new confettiParticle());
  }

  // Initialize
  canvas.width = W;
  canvas.height = H;
  Draw();
};

//Send email with the results
email.addEventListener('click', e => {
  email.href = `mailto:GBScomms@asda.co.uk?subject=${name} Result: ${finalResult}`;
});
