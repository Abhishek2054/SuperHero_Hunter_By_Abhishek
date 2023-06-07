const req = new XMLHttpRequest();
const public_key = '9798c70d3a564b5b348e0faab8ac5062';
const private_key = 'da5aafdff6ebeddaa9bc8db4b9e87dbc02ca049a'


const ts = Date.now();
const st = ts + private_key + public_key;

var hash = CryptoJS.MD5(st).toString();

const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${hash}`;

var output = '';
async function favoritesFetcher() {
    for (i in localStorage) {
        var search = (i.split("-", 2));
        if (search[0] == 'character') {
            const name = search[1];
            const xhr = new XMLHttpRequest();
            const marvell = `https://gateway.marvel.com:443/v1/public/characters?name=${name}&ts=${ts}&apikey=${public_key}&hash=${hash}`;
            xhr.open('GET', marvell, true);
            xhr.onload = function () {
                if (this.status == 200) {
                    const results = JSON.parse(this.responseText);
                    console.log(results);
                    if (results == undefined || results.length == 0) {
                        console.log("undefined");
                    } else {
                        const characterDetails = results["data"].results[0];
                        const characterId = characterDetails.id;
                        var chName = `${characterDetails.name}`
                        document.getElementById('row').innerHTML = '<h2>gh</h2>'
                        output += `
                        <div class="card">
                            <img class="card-img-top" src="${characterDetails.thumbnail["path"]}.${characterDetails.thumbnail["extension"]}" alt="Card image cap" style="height:14rem; width:17rem;">
                            <div class="card-body">
                                <div class="col-md-12 text-center" id="component">
                                    <h3 class="animate-charcter">${characterDetails.name}</h3>
                                </div>
                                <a href="#" style="float:right;" onClick="favoriteDelete(${characterId})"><img src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" style="height:30px; width:30px"></img></a>
                            </div>
                        </div> `
                        document.getElementById('row').innerHTML = output;
                    }
                } else {
                    console.log("404");
                }
            }
            
            xhr.send();

        } else if (search[0] == 'comics') {
            const name = search[1];
            const xhr = new XMLHttpRequest();
            const marvell = `https://gateway.marvel.com:443/v1/public/comics/${localStorage[i]}}?ts=${ts}&apikey=${public_key}&hash=${hash}`;
            xhr.open('GET', marvell, true);
            xhr.onload = function () {
                if (this.status == 200) {
                    const results = JSON.parse(this.responseText);
                   
                    if (results["data"].count == 0) {
                        console.log("count = 0");
                    } else if (results == undefined || results.length == 0) {
                        console.log("undefined");
                    } else {
                        const characterDetails = results["data"].results[0];
                        const characterId = characterDetails.id;
                        var chName = `${characterDetails.name}`;
                        document.getElementById('row').innerHTML = '<h2>gh</h2>';
                        output += `
                            <div class="card" style="width: 20rem; background-color:black; color:white">
                                <img class="card-img-top" src="${characterDetails.thumbnail["path"]}.${characterDetails.thumbnail["extension"]}" alt="Card image cap" style="height:14rem; width:"15rem;">
                                <div class="card-body">
                                
                                    <div class="col-md-12 text-center" id="component" style="float:left; text-align:left;">
                                        <h3 class="animate-charcter" style="font-size: 0.9rem;">${characterDetails.title}</h3>
                                    </div>
                                    <a href="#" style="float:right;" onClick="favoriteDelete(${characterId})" ><img src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" style="height:30px; width:30px"></img></a>
                                </div>
                            </div> `;
                        document.getElementById('row').innerHTML = output;
                    }
                } else {
                    console.log("404 error...");
                }
            }    
            xhr.send();
        }
    }
}


function favoriteDelete(id) {
    console.log("we are in delete ", id);
    for (i in localStorage) {
        if (localStorage[i] == id) {
            localStorage.removeItem(i)
            break;
        }
    }
    window.location.replace('favorites.html')
}

