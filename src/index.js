const $ = require('jquery')
const url = require('./config').url

document.addEventListener("DOMContentLoaded", () => {

  $.getJSON(`${url}top_word`, function(data) {
    let word = Object.keys(data.word)[0]
    let number = Object.values(data.word)[0]
    $('h3').replaceWith(`<h3>Top word from Word Watch API: ${word} (${number})</h3>`)
  })

  $('button').on('click', function() {
    getWords()
  })

  $('textarea').keypress(function(key){
    if (key.which == 13 && !key.shiftKey) {
      event.preventDefault()
      getWords()
    }
  })

})

function getWords() {
  const input = $('textarea').val()
  const words = input.split(/\s+/)
  const cleanWords = cleanArray(words)
  countWords(cleanWords)
  sendWords(cleanWords)
}

function cleanArray(actual) {
  var newArray = new Array()
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}


function sendWords(words) {
  words.forEach(function(word) {
    $.post(`${url}words`, {word: { value: word } })
  })
}

function countWords(words) {
  const count = {}
  for (var i = 0; i < words.length; i++) {
    var num = words[i].toLowerCase()
    count[num] = count[num] ? count[num] + 1 : 1
  }
  reformatForDom(count)
}

function reformatForDom(count) {
  const countKeys = Object.keys(count)
  const countedWords = []
  var i
  for (i in countKeys){
      countedWords.push([countKeys[i], count[countKeys[i]]])
  }
  $('.word-count').empty()
  countedWords.forEach(function(word) {
    appendToDom(word)
  })
}

function appendToDom(word) {
  $('.word-count').append(`<p style=font-size:${word[1]}em>${word[0]}</p><br>`)
}
