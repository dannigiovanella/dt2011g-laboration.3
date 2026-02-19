
"use strict";

//Visar meny vid klick av hamburgerikon i tablet och desktop
//Hämtar element för hamburge-ikonen
const hamburger = document.querySelector('.hamburger');
//Hämtar element för menynlistan i navbaren
const menu = document.querySelector('.navbar ul');

//Eventlyssnare som lyssnar på klick av hamburgaren
//Arrow-funktion som körs när det klickas
hamburger.addEventListener('click',
  //Arrow-funktion som körs när det klickas 
  () => {
    //Classlist hanterar klasser som finns i elementet
    //Toggle växlar synligheten beroende på om elementet har klassen show
    //CSS styr ul med "show" och om och hur menyn ska visas 
    menu.classList.toggle('show');
  });


//Trigger för animation på knapp (animation.html)

//Hämtar id för knapp
const animatedButton = document.querySelector('.animatedbutton');

//Händelselyssnare. Lyssnar på klick av knapp
animatedButton.addEventListener('click', () => {
  animatedButton.classList.add('clicked');
});
