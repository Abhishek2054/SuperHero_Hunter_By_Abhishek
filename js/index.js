

const req = new XMLHttpRequest();
const public_key = '9798c70d3a564b5b348e0faab8ac5062';
const private_key = 'da5aafdff6ebeddaa9bc8db4b9e87dbc02ca049a'

var curr_Comic_Char_ToShow = null
const ts = Date.now();
const st = ts + private_key + public_key;

var hash = CryptoJS.MD5(st).toString();
const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${hash}`;
req.open("GET", url);
req.send();

var data = '';

req.onload = () => { }



function characters() {

	console.log("button fire");
	var urlQueryParams = new URLSearchParams(window.location.search);
	var searchedQuery = urlQueryParams.get("search")
	console.log(searchedQuery);
	var name = document.getElementById("search").value
	console.log("idhr : ", name);


	if (searchedQuery != null && searchedQuery != " ") {
		document.getElementById("search").innerText = searchedQuery;
		Connection(searchedQuery);
	}
	else if (name != null && name != " ") {
		console.log("2");
		document.getElementById("searchForm").addEventListener("submit", Connection(name));
	}
	else {
		console.log("3");
		document.getElementById("characterSection").innerHTML =
			`<h2> Enter the search ..... </h2>`
	}
}

function Connection(name) {
	const xhr = new XMLHttpRequest();
	const marvelurl = `https://gateway.marvel.com:443/v1/public/characters?name=${name}&ts=${ts}&apikey=${public_key}&hash=${hash}`
	xhr.open('GET', marvelurl, true);
	xhr.onload = function () {
		if (this.status == 200) {
			const results = JSON.parse(this.responseText);
			console.log(results);
			if (results["data"].count == 0) {
				document.getElementById("loading").innerHTML =
					`<h2> No results for the search  ${name}</h2>`
			} else {
				const characterDetails = results["data"].results[0];
				const characterId = characterDetails.id;
				var name = `${characterDetails.name}`
				var output = '';
				output = `
				<div class="characters">
					<img class="thumbnail" src="${characterDetails.thumbnail["path"]}.${characterDetails.thumbnail["extension"]}"/>
					<h3 class="name">${characterDetails.name}</h3>
					<div class="btns">
						<a class="link" onClick="singleComic()" href="superhero_page.html?character=${characterId}"><button class="btn">View Details</button></a>	
						<button class="btn" onClick="favorites('character-${characterDetails.name}',${characterDetails.id})">Add To Favorites </button>
					</div>
				</div>
				`

				document.getElementById("characterSection").innerHTML = output;
				document.querySelector(".sim_res").style.visibility = "visible";
				comics(characterId);
			}
		}
		else {
			document.getElementById("noData").style.visibility = "visible";
			document.getElementById("noData").innerHTML =
				'<h2> No Results Found!!! </h2>'
		}
	}
	
	xhr.send();
}


function comics(characterId) {

	const xhr = new XMLHttpRequest();
	const comicsUrl = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?ts=${ts}&apikey=${public_key}&hash=${hash}`

	xhr.open('GET', comicsUrl, true)
	xhr.onloadstart = () => {
		document.getElementById("comic-section").innerHTML = `<h2>Wait .... </h2>`
	}
	xhr.onerror = () => {
		document.getElementById("comic-section").innerHTML = `<h2> there is some server issues while loading comics </h2>`
	}

	xhr.onload = function () {
		if (this.status == 200) {
			const results = JSON.parse(this.responseText);
			const comics = results["data"].results;
			if (comics.length == 0) {
				var noData = document.getElementById("noData");
				noData.style.visibility = 'visible';
				noData.innerHTML = 'No data available for this search. Plaese search for another character';
			} else {
				var output = '';
				for (const i in comics) {
					if (comics.hasOwnProperty(i)) {
						var data = comics[i];
						var url = `superhero_page.html?comic=${data.id}`
						output += `
						<div class="characters">
							<img class="thumbnail" src=${data.thumbnail["path"]}.${data.thumbnail["extension"]}></img>
							<h3 class="name"> ${data.title} </h2>
							<div class="btns">
								<a class="link" href=${url} onClick="singleComic()"><button class="btn">View Details</button></a>
								<button class="btn" onClick="favorites('comics-${data.title}',${data.id})">Add To Favorites </button> 
							</div>
						</div>
						`
					}
				}
				document.getElementById("comic-section").innerHTML = output;
			}
		}
	}
	xhr.send();
}


function singleComic() {
	window.location.replace('superhero_page.html')
}

function pageChanger(id) {
	window.location.replace('superhero_page.html')
}

function favorites(name, item) {
	console.log("here", item, name);
	localStorage.setItem(name, item);
}