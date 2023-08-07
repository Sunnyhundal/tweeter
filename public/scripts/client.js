/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json


$(document).ready(function() {
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

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
  })

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
  <p class="tweet-text">${tweet.content.text}</p>
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

}

//renderTweets(data);


// disable the default behaviour of the form submission, and instead use jQuery to make a request to the server.
const $form = $("#tweets-form");

$form.on( "submit", function( event ) {
  event.preventDefault();
 const $input_text = $form.serialize();
  
 if ($("textarea").val().length === 0 || $("textarea").val() === null || $("textarea").val() === "") {
  alert("Please write something." + "\n" + "Empty tweets are not allowed.");
  return;
 } if ($("textarea").val().length > 140) {
    alert("Your tweet is too long! Tweeter only supports posts of 140 characters"+ "\n" + "Please remove, " + ($("textarea").val().length - 140) + " characters.");
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
  })
   }
});

loadtweets();

});

