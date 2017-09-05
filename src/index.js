const $ = require('jquery')
const url = require('./config').url

document.addEventListener("DOMContentLoaded", () => {

  $.getJSON(`${url}top_word`, function(data) {
    let word = Object.keys(data.word)[0]
    let number = Object.values(data.word)[0]
    $('h3').replaceWith(`<h3>Top word from Word Watch API: ${word} (${number})</h3>`)
  })
 
})

