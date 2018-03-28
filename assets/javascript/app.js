let game = {
  counter: 1,
  qss: [],
  start: false,
  correct: 0,
  wrong: 0,
  unanswered: 0,
  choiceMade: false,
  getQuestions: () => {
    questions.map(x => game.qss.push(x));
  },
  clock: 30,

};


$("#question").html(`
    <button id='start' class=''>Start Trivia</button>`);
$("button").on("click", function() {
  $(this).remove();
  game.getQuestions();
  renderQuestions();
});

$(document).on("click", ".btn", function() {
  clearInterval(game.countdown)
  var right = $(this).attr("correct");
  if (right == "true" && !game.choiceMade) {
    $(this).removeClass("btn-info");
    $(this).addClass("btn-success");
    game.correct++;
    $("#answer").html($("<p>You got it right!!!</p>"));
    addFuntip();
  } else if (right == "false" && !game.choiceMade) {
    $(this).addClass("btn-danger");
    game.wrong++;
    $("#answer").html($("<p>You got it wrong!!!</p>"));
    addFuntip();
  }
});

$(document).on("click", "#restart", function() {
  game.counter = 1;
  game.choiceMade = false;
  game.correct = 0;
  game.wrong = 0;
  renderQuestions();
});

function renderQuestions() {
  $("#question").html(`
      <div>
      <div class='question'>
            ${game.qss[game.counter - 1].question}
            </div>
        <div class="choices"></div>
        </div>`);
  game.qss[game.counter - 1].choices.map(x => {
    $(".choices").append(`<button class="btn btn-info m-3" correct=${x.correct}>
          <h4>${x.answer}</h4>
          </button>`);
  });
  $("#clock").html(`<p>Time Remaining: ${game.clock}</p>`);  game.clock = 10;
  game.clock = 30
  
  game.countdown = setInterval(clock, 1000)
}

let clock = () => {
    game.clock--;
    $("#clock").html(`<p>Time Remaining: ${game.clock}</p>`);
    if (game.clock <= 0) {
      clearInterval(game.countdown);
      game.unanswered++;
      setTimeout(nextQuestions, 1000);
    }
};

function addFuntip() {
  game.choiceMade = true;
  let funTip = `<p>${game.qss[game.counter - 1].funtip}</p>`;
  $("#answer").append(funTip);
  setTimeout(nextQuestions, 1500);
  clearInterval(game.countdown)
}

function nextQuestions() {
  game.counter++;
  game.choiceMade = false;
  if (game.counter > game.qss.length) {
    $("#answer").empty();
    $("#clock").empty();
    $("#question").html(`
          <div>
          <p> Number Correct: ${game.correct}</p>
          <p> Number Wrong: ${game.wrong}</p>
          <p> Questions Unanswered: ${game.unanswered}</p>
         <button id="restart">Start Over</button>
            </div>`);
  } else {
    $("#answer").empty();

    renderQuestions();
  }
}
