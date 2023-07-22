$(document).ready(function() {
  console.log("working");
  let $string = $("textarea");
  let $output = $("output");
  let countOfTextArea = 0;
  

//update counter element to show # of Characters
  let count = function() {
    $output.text(140 - countOfTextArea);

    if (countOfTextArea > 140) {
      $output.css("color", "red");
    }
    if (countOfTextArea <= 140) {
      $output.css("color", "black");
    }
    
  }

  // Detects input on the textarea
  $string.on("input", function() {
    countOfTextArea = $string.val().length;
    console.log(countOfTextArea);
    count();

  });


});

