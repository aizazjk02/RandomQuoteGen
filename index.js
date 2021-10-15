const quoteContainer = document.getElementById('container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader');
const loaderContainer = document.getElementById('loader-container');
 
let apiQuotes = []
//Show Loading 
 function loading() {
     loader.style.display = 'flex';
     loaderContainer.classList.add = 'loader-container';
     quoteContainer.style.display = "none";
 }

 //Hide Loading 
 function complete() {
    quoteContainer.style.display = "block";
     loader.style.display = 'none';
     loaderContainer.classList.remove = 'loader-container';
 }


//Show new Quote
function newQuote() {
    loading();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //if the quote has no author 
    if(!quote.author)
        authorText.textContent = "Unknown";
    else    
        authorText.textContent = quote.author;
    //if the quote text is longer 
    if(quote.text.length > 40)
        quoteText.classList.add('long-quote');
    else
        quoteText.classList.remove('long-quote');

    quoteText.textContent = quote.text;
    complete();
}

//Get Quotes from API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        //fetch quotes from apiUrl 
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch (error) {
        //Cath Error Here
    }
}

//Tweet Quote 
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,"_blank");
}
 
//Event Listeners
 newQuoteBtn.addEventListener('click',newQuote);
 twitterBtn.addEventListener('click',tweetQuote);

//On Load
getQuotes()
