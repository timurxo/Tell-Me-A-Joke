const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
var my_key = config.myKey;
// var jokes_url = config2.jokesUrl;

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// pass joke to speech api
function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, '%20');
  
  VoiceRSS.speech({
    key: my_key,
    src: jokeString,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get jokes from Joke API
async function getJokes() {
  let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=racist,sexist';
  try {
    // return json object
    const response = await fetch(apiUrl);
    // extract json from response
    const data = await response.json();

    // Assign One or Two Part Joke
    if (data.setup) {   // for 2 part jokes
        // create pause for 2 part jokes
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    // text to speech
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    
  }
}

// Event listeners
button.addEventListener('click', getJokes);
// enable button only after audio is finished
audioElement.addEventListener('ended', toggleButton);   
