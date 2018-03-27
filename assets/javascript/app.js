let game = {
  counter: 0,
  qss: [],
  start: false,
  correct: 0,
  wrong: 0,
  getQuestions: () => {
    questions.map(x => game.qss.push(x));
    //console.log('worked')
  }
};

$(document).ready(() => {
  game.getQuestions();
  $("#question").html(`
       <div>
        <div class='question'>
            ${game.qss[game.counter].question}
        </div>
        <div class="choices"></div>
       </div>`);
  game.qss[game.counter].choices.map(x => {
    $(".choices").append(`<button class="btn btn-info m-3" correct=${x.correct}>
          <h4>${x.answer}</h4>
      </button>`);
  });

  $('button').on('click', function() {
    console.log($(this).attr('correct'))
  })

});
