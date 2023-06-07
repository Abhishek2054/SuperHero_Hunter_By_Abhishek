const req = new XMLHttpRequest();
const public_key = '9798c70d3a564b5b348e0faab8ac5062';
const private_key = 'da5aafdff6ebeddaa9bc8db4b9e87dbc02ca049a'
const apiKey = '9798c70d3a564b5b348e0faab8ac5062'

var curr_Comic_Char_ToShow = null
const ts = Date.now();
const st = ts + private_key + public_key;

var hash = CryptoJS.MD5(st).toString();

const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${hash}`;

var urlQueryParams = new URLSearchParams(window.location.search);

function singleCharacter() {
  var searchedQuery = urlQueryParams.get("character");
  var comics = urlQueryParams.get('comic');


  if (searchedQuery) {
    const xhr = new XMLHttpRequest();
    const comicUrl = `https://gateway.marvel.com:443/v1/public/characters/${searchedQuery}?ts=${ts}&apikey=${public_key}&hash=${hash}`;
    xhr.open('GET', comicUrl);
    xhr.onloadstart = () => {
      const value = document.getElementsByTagName('div')

    }
    xhr.onerror = function () {
      const value = document.getElementsByTagName('div')
    }
    xhr.onload = function () {
      if (this.status == 200) {
        const results = JSON.parse(this.responseText);
        const comics = results["data"].results;
        if (results["data"] == 0) {
          document.getElementById("comic-section").innerHTML = `<h2>No comics found !! </h2>`
        } else {
          const Info = results["data"].results;
          document.querySelector('.char_name').innerHTML = Info[0].name;
          document.querySelector('.boxItem').innerHTML = `
          <ul>
            <li>
              <div class="row">
                <div class="col-md-12 text-center" id="component">
                  <h3 class="animate-charcter">Comics : &nbsp;${Info[0].comics.available}</h3>
                </div>
              </div>  
            </li>
            <li>  
              <div class="row">
                <div class="col-md-12 text-center" id="component">
                  <h3 class="animate-charcter">Events :&nbsp;${Info[0].events.available}</h3>
                </div>
              </div>
            </li>
            <li>   
              <div class="row">
                <div class="col-md-12 text-center">
                  <h3 class="animate-charcter">Series: &nbsp; ${Info[0].series.available}</h3>
                </div>
              </div>
            </li>
            <li>
              <div class="row">
                <div class="col-md-12 text-center" id="component">
                  <h3 class="animate-charcter">Stories : &nbsp;${Info[0].stories.available}</h3>
                </div>
              </div>
            </li>
          </ul>
          <div class="cont">
            <img class="thumbnail" src="${Info[0].thumbnail["path"]}.${Info[0].thumbnail["extension"]}"/>
            <p class="desc">${Info[0].description}</p>
          </div>
          `
        }
      }
      else {
        console.log("Error in Similer result");
      }
    }
    xhr.onloadend = () => {

    }
    xhr.send();
  }
  if (comics) {
    const comicUrl = `https://gateway.marvel.com:443/v1/public/comics/${comics}?ts=${ts}&apikey=${public_key}&hash=${hash}`;
    const xhr = new XMLHttpRequest()
    xhr.open('GET', comicUrl)
    xhr.onload = function () {

      if (this.status == 200) {
        const results = JSON.parse(this.responseText);
        const comics = results["data"].results;
        if (results["data"] == 0) {
          document.getElementById("comic-section").innerHTML = `<h2>No comics found !! </h2>`
        } else {
          const Info = results["data"].results;
          console.log("info ", Info);
          document.querySelector('.char_name').innerHTML = Info[0].title;
          document.querySelector('.boxItem').innerHTML = `
             <ul>
               <li>
                  <div class="row">
                      <div class="col-md-12 text-center" id="component">
                        <h3 class="animate-charcter">Characters : &nbsp;${Info[0].characters.available}</h3>
                      </div>
                  </div>
               </li>
               <li> 
                  <div class="row">
                      <div class="col-md-12 text-center">
                        <h3 class="animate-charcter">Series: &nbsp; ${Info[0].series.name}</h3>
                      </div>
                  </div>
               </li>
               <li>
                  <div class="row">
                      <div class="col-md-12 text-center">
                        <h3 class="animate-charcter">Price: &nbsp; ${Info[0].prices[0].price}$</h3>
                      </div>
                  </div>
               </li>
               <li>
                  <div class="row">
                      <div class="col-md-12 text-center" id="component">
                        <h3 class="animate-charcter">Stories : &nbsp;${Info[0].stories.available}</h3>
                      </div>
                  </div> 
               </li>
             </ul>
              <img class="thumbnail" src="${Info[0].thumbnail["path"]}.${Info[0].thumbnail["extension"]}"/>
             `
        }
      }
      else {
        console.log("error occur in comics fetch");
      }

    }

    xhr.onloadend = () => {
      console.log("the fetching ends");

    }
    xhr.send();

  }

}




