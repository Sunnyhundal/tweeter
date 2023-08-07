/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json


$(document).ready(function() {
  // hides any slide down error messages that may be present at the start of the page
  $('#error-CharOver').hide();
  $("#error-InvalidChar").hide();

  //remove header on scroll
  $(window).scroll(function() {
    const scrollDuration = 450;
    if ($(window).scrollTop() > scrollDuration) {
      $('nav').fadeOut();
    } else {
      $('nav').fadeIn();
    }
  });


  // prevent XSS(cross site scripting) with Escaping function
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const renderTweets = function(tweets) {
    $("#tweet-area").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      //renders tweets in the order of newest to oldest
      $("#tweet-area").prepend($tweet);
    }
  };

  const loadtweets = function() {
    $.ajax({
      url: '/tweets',
      method: "GET",
      success: (tweets) => {
        renderTweets(tweets);
      },
      fail: (error) => {
        console.log(error);
      }
    });

  };

  const createTweetElement = function(tweet) {
    let $tweet = $(`
<article class="tweets">
  <header>
    <div class="author-bio">
      <img src="${tweet.user.avatars}" alt = "Author Bio Photo">
      <p class="author-name">${tweet.user.name}<p>
    </div>
    <div class="author-tag">${tweet.user.handle}</div>
  </header>
  <p class="tweet-text">${escape(tweet.content.text)}</p>
  <footer>
    <div ><h6 class="date">${timeago.format(tweet.created_at)}</div>
    
    <div class="buttons">
    <a href="" class="button-action">  
      <i class="fa-solid fa-flag"></i>
    </a>
    <a href="" class="button-action">  
      <i class="fa-solid fa-retweet"></i>
    </a>
    <a href="" class="button-action">
      <i class="fa-solid fa-heart"></i>
    </a>
    </div>
  </footer>
</article>`);
    return $tweet;

  };

  // disable the default behaviour of the form submission, and instead use jQuery to make a request to the server.
  const $form = $("#tweets-form");
  $form.on("submit", function(event) {
    event.preventDefault();
    const $input_text = $form.serialize();
  
    if ($("textarea").val().length === 0 || $("textarea").val() === null || $("textarea").val() === "") {
      $("#error-InvalidChar").slideDown("slow");
      return;
    } if ($("textarea").val().length > 140) {
      $("#error-CharOver").slideDown("slow");
      return;
    } else {

      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $input_text,
        success: () => {
          loadtweets();
        },
        fail: (error) => {
          console.log(error);
        }
      });
    }
    // reset the counter to 140 and clear the textarea after submission
    $("textarea").val("");
    $(".counter").text(140);
  
    // hide the error messages once submission is successful
    $('#error-CharOver').slideUp("slow");
    $("#error-InvalidChar").slideUp("slow");
  });

  loadtweets();

});

