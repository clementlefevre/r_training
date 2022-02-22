// For Prod, copy this snippet into "quizz.js" :
var quizz_json = (function () {
  var json = null;
  console.log("Start parsing .json file...")
  $.ajax({
    'async': false,
    'global': false,
    'url': "./quizz.json",
    'dataType': "json",
    'success': function (data) {
      json = data;
    }
  });
  return json;
})();

var linked_level = { 0: "Head of Digital Transformation", 1: "Powerpoint TikTok Influencer", 2: "Tableau's Technical Debt Designer", 3: "Green Blockchain Expert", 4: "AI-generated Employee", 5: "Chief VisualBasic Officer" }


function checkMultipleAnswers(quizz_id, answers) {

  correct_answers = quizz_json[quizz_id].answer;
  if (correct_answers.sort().join(',') === answers.sort().join(',')) {
    alert('same members');
  }
  else alert('not a match');

}

function checkAnswer(quizz_id) {

  var is_answer_correct = false;

  var radios = document.getElementsByName("radio-".concat(quizz_id.toString()))
  user_answer = [...radios].filter((x) => (x.checked)).map((x) => (x.value))[0]
  console.log("user_answer : ", user_answer)

  if (user_answer == quizz_json[quizz_id].answer) {
    is_answer_correct = true;
  }

  var answer_chunk = document.getElementById("Answer_".concat(quizz_id.toString()))
  answer_chunk.classList.toggle('open');
  document.getElementById("p_Answer_".concat(quizz_id)).innerHTML = is_answer_correct ? "<b>Correct !</b><br>Solution :" : "<b>Wrong !</b><br>Solution :";

  return (is_answer_correct)
}

function create_question_block(quizz_id) {

  var parent = document.getElementById("Quizz_".concat(quizz_id));
  var br = document.createElement("br");
  parent.appendChild(br);
  console.log(quizz_id)
  var question_data = quizz_json[quizz_id]

  var label = document.createElement("label");
  label.setAttribute("for", "text-input-".concat(quizz_id.toString()));
  label.innerHTML = question_data.question;
  parent.appendChild(label);


  var frag = document.createDocumentFragment();
  frag.appendChild(br);
  question_data.choices.forEach(function (choice, i) {
    var choiceLabel = document.createElement('label');
    var choiceSelection = document.createElement('input');

    choiceSelection.setAttribute('type', 'radio');
    choiceSelection.setAttribute('name', "radio-".concat(quizz_id.toString()));

    choiceSelection.setAttribute('value', choice);

    choiceLabel.setAttribute('for', "radio-".concat(quizz_id.toString()));
    choiceLabel.innerText = " ".concat(choice.toString())

    frag.appendChild(choiceSelection);
    frag.appendChild(choiceLabel);

    var br = document.createElement('br');
    frag.appendChild(br);
  })
  parent.appendChild(frag);
}

var all_quizzes_id = $('[id^="Quizz_"]')
var unique_quizzes_ids = [...all_quizzes_id].map((x) => (x.id.split("_")[1]))

for (const id of unique_quizzes_ids) {
  create_question_block(id)
}

var score_elem = document.createElement("p");
score_elem.id = "score-id"

score_elem.innerHTML = ""
score_elem.style.fontSize = "x-large";
var src = document.getElementById("main_Quizz");
src.appendChild(score_elem)

$(":radio").change(function () {
  var names = {};
  $(':radio').each(function () {
    names[$(this).attr('name')] = true;
  });
  var count = 0;
  $.each(names, function () {
    count++;
  });
  if ($(':radio:checked').length === count) {

    $("#button-answer").attr("disabled", false);
  }
}).change();



var audio_OK = new Audio('https://r-training-bookdown.s3.amazonaws.com/data/soviet_union_national_anthem.mp3');
var audio_NOK = new Audio('https://r-training-bookdown.s3.amazonaws.com/data/answer_NOK.mp3')


var button = document.createElement("button");
button.id = "button-answer"
button.innerHTML = "Check my answers !";
button.disabled = "true"
button.onclick = function () {

  var all_anwers_OK = unique_quizzes_ids.map(checkAnswer)

  let checker = arr => arr.every(Boolean);

  var score = all_anwers_OK.filter(Boolean).length;

  //

  if (checker(all_anwers_OK)) {
    audio_OK.play()
  }
  else {
    audio_NOK.play()
  }

  var element = $("#main_Quizz");
  element.css('outline', 'none !important')
    .attr("tabindex", -1)
    .focus();

  score_elem.innerHTML = `<br><span style="color:dodgerblue;font-weight:bold;font-size:40px;">${score} </span> / ${all_anwers_OK.length} -  <span style="font-weight:bold;font-size:18px;">LinkedIn rank : </span><br><span style="color:dodgerblue;font-size:36px"><b><i>${linked_level[score]}.</i></b></span>`
}
var parent_main = document.getElementById("main_Quizz");
parent_main.appendChild(button);



