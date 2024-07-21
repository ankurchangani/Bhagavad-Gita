


let view = document.getElementById("view")
let modalVersesContent = document.getElementById('modalVersesContent')

const displayChapters = () => {
  fetch('https://vedicscriptures.github.io/chapters')
    .then(response => response.json())
    .then(data => {
      // Loop through each chapter object in the data
      data.forEach(chapterObj => {
        let chapterNumber = chapterObj.chapter_number;
        let chapterName = chapterObj.name;
        let versesCount = chapterObj.verses_count;
        let translation = chapterObj.translation;
        let transliteration = chapterObj.transliteration;
        let meaning = chapterObj.meaning && chapterObj.meaning.en && chapterObj.meaning.en.hi ? chapterObj.meaning.en.hi : 'Meaning not available';
        let summary = chapterObj.summary ? chapterObj.summary : 'Summary not available';
        
        view.innerHTML += `
          <div class="chapter mt-5 p-3" style="background-color: bisque; border-radius: 30px;">
            <h2>${chapterNumber}. ${chapterName}</h2>
            <p>Translation: ${translation}</p>
            <p>Transliteration: ${transliteration}</p>
            <p>Meaning: ${meaning}</p>
            <p>Summary: ${typeof summary === 'object' ? JSON.stringify(summary) : summary}</p>
            <p class="Verses" onclick="versesCount(${chapterNumber}, ${versesCount})" style="cursor: pointer;">Verses Count: ${versesCount}</p>
          </div>
        `;
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

const versesCount = (number, count) => {
  modalVersesContent.innerHTML = ''; // Clear previous content
  for (let i = 1; i <= count; i++) {
    fetch(`https://vedicscriptures.github.io/slok/${number}/${i}`)
      .then(response => response.json())
      .then(data => {
        modalVersesContent.innerHTML += `
          <h1 class="my-8 text-4xl text-white font-extrabold text-center" >${data.verse}</h1>
          <h3 class="text-[#f57903] text-lg uppercase font-medium text-center my-6">${data.slok}</h3>
          <p class="mt-3 text-white text-lg text-center">${data.transliteration}</p>
        `;
      })
      .catch(err => {
        console.log("Error", err);
      });
  }
  var versesModal = new bootstrap.Modal(document.getElementById('versesModal'));
  versesModal.show();
}

displayChapters();