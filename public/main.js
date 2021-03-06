var input = document.querySelector('input')
var button = document.querySelector('button')
var error = document.getElementById('error')
var result = document.getElementById('result')

function sendData(data) {
  input.value = '';
  
  var url = window.location.href

  fetch(url + 'api/url', {
    headers: { "Content-Type": "application/json" },
    method:'POST',
    body: JSON.stringify({
      "url":data,
      "currentUrl":url
    })
  })
  .then(data => data.json())
  .then((json) => {
    var respUrl = json.url
    result.innerHTML = respUrl
    result.style.display = 'block'
  })
} 

var errorMessage = function (msg) {
  error.classList.add('error-shake')
  error.style.display = 'block'
  error.innerText = msg
  setTimeout(() => { error.classList.remove('error-shake') }, 600)
}

var checkInput = function (input) {
  if (input == '' || input == ' ') {
    errorMessage('URL cannot be empty')
    return false
  } else if (!input.includes('www')) {
    errorMessage('URL is not valid.')
    return false
  } else {
    error.style.display = 'none';
    return true
  }
}

// these two event listeners basically do the same thing - form submitting / resetting
button.addEventListener('click', (e) => {
  e.preventDefault()

  if (checkInput(input.value)) {
    sendData(input.value)
  } 
})

// Using keyup instead of change
// because change will trigger on window resize
input.addEventListener('keyup', (e) => {
  e.preventDefault()

  if (e.keyCode === 13) {
    if (checkInput(input.value)) {
      sendData(input.value)
    }
  }
})

// this fixes some weird bug
// which only appears on mobile
if (/Mobi/.test(navigator.userAgent)) {
  let button = document.querySelector('button')
  button.style.height = '47.5px';
}
