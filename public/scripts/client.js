/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json


$(document).ready(function() {
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
for (const tweet of tweets) {
  const $tweet = createTweetElement(tweet);
  $("#tweet-area").append($tweet);
  return $tweet;

}

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
    <div><h6 class="date">${tweet.created_at}</div>
    
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

renderTweets(data);
});