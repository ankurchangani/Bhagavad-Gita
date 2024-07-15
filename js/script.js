 fetch('https://vedicscriptures.github.io/chapters')
  .then(response => response.json())
  .then(data => console.log(data));



