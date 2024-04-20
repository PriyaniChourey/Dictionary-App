const form = document.querySelector("form")
const resultDiv = document.querySelector('.result')

form.addEventListener('submit',(e)=>
{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
})
const getWordInfo =async (word)=>{
    try {
    resultDiv.innerHTML="Fetching data....";
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    let def =data[0].meanings[0].definitions[0];
    resultDiv.innerHTML=`
    <h2><strong>Word: </strong>${data[0].word}</h2>
    <p class="partOfSpeech">${data[0].meanings[0].partofSpeech}</p>
    <p><strong>Meaning: </strong>${def.definition === undefined ? "Not found" : def.definition}</p>
    <p><strong>Example: </strong>${def.example === undefined ? "Not found" : def.example}</p>
    <p><strong>Antonyms: </strong></p>
    <p><strong.Synonyms: </strong></p>
      `;
      if(def.antonyms.length === 0)
      {
        resultDiv.innerHTML += `<span>Not found</span>`;
      }
      else
      {
       for(let i=0;i<def.antonyms.length;i++)
      {
        resultDiv.innerHTML += `<li>${def.antonyms[i]}</li>`;
      }
      }
      resultDiv.innerHTML +=`<div><a href="${data[0].sourceUrls}" target="_blank">Read more</a></div>`;
    } 
    catch (error) {
        resultDiv.innerHTML = `<p>Sorry,word not found</p>`;
    }

      
    
    
}
