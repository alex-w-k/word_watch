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
  const words = input.split(/[ :;!?,-.\]\[\n)(]+/)
  const cleanWords = cleanArray(words)
  countWords(cleanWords)
  sendWords(cleanWords)
  refreshTopWord()
}

function cleanArray(actual) {
  let newArray = new Array()
  actual.forEach(function (item) {
    if (item) {
      newArray.push(item)
    }
  })
  return newArray
}


function sendWords(words) {
  words.forEach(function(word) {
    $.post(`${url}words`, {word: { value: word } })
  })
}

function countWords(words) {
  const count = {}
  words.forEach(function(word) {
    let num = word.toLowerCase()
    count[num] = count[num] ? count[num] + 1 : 1
  })
  reformatForDom(count)
}

function reformatForDom(count) {
  const countKeys = Object.keys(count)
  const countedWords = []
  countKeys.forEach(function(key) {
    countedWords.push([key, count[key]])
  })
  $('.word-count').empty()
  countedWords.forEach(function(word) {
    appendToDom(word)
  })
}

function appendToDom(word) {
  $('.word-count').append(`<p style=font-size:${word[1]}em>${word[0]}</p><br>`)
}

function refreshTopWord() {
  $.getJSON(`${url}top_word`, function(data) {
    let word = Object.keys(data.word)[0]
    let number = Object.values(data.word)[0]
    $('h3').replaceWith(`<h3>Top word from Word Watch API: ${word} (${number})</h3>`)
  })
}
