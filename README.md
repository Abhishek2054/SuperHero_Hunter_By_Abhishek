# SuperHero_Hunter_By_Abhishek

Features
1. Home Page
Fetch and display a list of SuperHeros (Characters) on the home page. Also create a search bar that will filter out the character based on search query. Suppose I type “bat” in the search box, it should show “batman”. 
[ API example https://gateway.marvel.com:443/v1/public/characters?ts=<time-stamp>&apikey=<public-key>&hash=<md5(ts+privateKey+publicKey)>]
Each search result of the superhero should have a favorite button, clicking on which superhero should be added to “My favorite superheroes” (a list).
On clicking any particular search result (any superhero), open a new page with more information about that superhero (Superhero page).
![image](https://github.com/Abhishek2054/SuperHero_Hunter_By_Abhishek/assets/64155110/b9fb7c78-b618-4c09-ab11-12efb496612b)
  
![image](https://github.com/Abhishek2054/SuperHero_Hunter_By_Abhishek/assets/64155110/c6efa7da-08a9-4275-8cf9-8cf21c09daf1)
  
In the home page it will display the similer results like,
  ![image](https://github.com/Abhishek2054/SuperHero_Hunter_By_Abhishek/assets/64155110/908d63a3-ea01-4e1d-ab27-a7c87d99a1b6)


Superhero Page
Should show a lot of information about the superhero like their name, photo, bio and other information provided by the API (comics, events, series, stories, etc).
  ![image](https://github.com/Abhishek2054/SuperHero_Hunter_By_Abhishek/assets/64155110/6326c5fd-7e71-40ff-8fcc-ec244f252ff7)

My favourite superheroes Page
  ![image](https://github.com/Abhishek2054/SuperHero_Hunter_By_Abhishek/assets/64155110/59d69d74-d6bd-40ac-aaeb-461f13c3f82e)

  The card is having zoom-in functonality on hover
  ![image](https://github.com/Abhishek2054/SuperHero_Hunter_By_Abhishek/assets/64155110/ca73e39c-7f6d-4d32-aa3a-92316bd4aa4a)

  
Display a list of all the favourite superheroes.
Make this list persistent (should have the same number of superheroes before and after closing the browser).
Remove from favourites button: Each superhero should have remove from favourites button, clicking on which should remove that superhero from the list.
