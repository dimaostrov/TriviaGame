let game = {
  counter: 1,
  qss: [],
  start: false,
  correct: 0,
  wrong: 0,
  gameover: false,
  choiceMade: false,
  getQuestions: () => {
    questions.map(x => game.qss.push(x));
  },
  count: () => {}
};

$("#question").html(`
    <button id='start' class=''>Start Trivia</button>`);
$("button").on("click", function() {
  $(this).remove();
  game.getQuestions();
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
});

$(document).on("click", ".btn", function() {
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

function addFuntip() {
  game.choiceMade = true;
  let funTip = `<p>${game.qss[game.counter - 1].funtip}</p>`;
  $("#answer").append(funTip);
  setTimeout(nextQuestions, 3000);
}

function nextQuestions() {
  game.counter++;
  $("#answer").empty();
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
}
