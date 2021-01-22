function setup() {
  noCanvas();
  wordnik('word', randomWordURL);
}


function wordnik(where, url) {
  loadJSON(url, wordLoaded);
  function wordLoaded(data) {
    var div = createDiv(data.word);
    div.parent(where);
  }
}
