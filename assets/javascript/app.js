let game = {
  counter: 0,
  qss: [],
  start: false,
  correct: 0,
  wrong: 0,
  gameover: false,
  getQuestions: () => {
    questions.map(x => game.qss.push(x));
    //console.log('worked')
  }
};

$(document).ready(function() {
    $("#question").html(`
    <button id='start' class='btn btn-danger'>Start Trivia</button>`);
    $("button").on("click", function() {
      $(this).remove()
    });
  
    

  if (game.start) {
    game.getQuestions();
    $("#question").html(`
     <div>
      <div class='question'>
          ${game.qss[game.counter].question}
      </div>
      <div class="choices"></div>
     </div>`);
    game.qss[game.counter].choices.map(x => {
      $(".choices").append(`<button class="btn btn-info m-3" correct=${
        x.correct
      }>
        <h4>${x.answer}</h4>
    </button>`);
    });

    $(".choices").on("click", "button", function() {
      console.log($(this).attr("correct"));
    });
  } else {
  }
});
