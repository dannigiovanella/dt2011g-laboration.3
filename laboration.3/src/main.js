
"use strict";

// HAMBURGERMENY

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

///////////////////////////////////////////////////////////////////////////////////////

// ANIMATION 

//Trigger för animation på knapp (animation.html)

//Hämtar id för knapp
const animatedButton = document.querySelector('.animatedbutton');

//Händelselyssnare. Lyssnar på klick av knapp
if (animatedButton) {
  animatedButton.addEventListener('click', () => {
    animatedButton.classList.add('clicked');
  });
}

/////////////////////////////////////////////////////////////////////////////////////

// DIAGRAM (APEX)
import ApexCharts from "apexcharts";

//Globala varibaler att spara toppkurser och program
let topCourses = [];
let topPrograms = [];

//Hämtar kursinformation

async function getStatistics() {
  try {
    //Väntar in svar från url med kurser
    const response = await fetch(
      "https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json"
    );
    //Konverterar datan till javascript-objekt
    const statistics = await response.json();
    //Arrayer för kurser och program samt sökande
    const courseStat = [];
    const programStat = [];


    for (let i = 0; i < statistics.length; i++) {
      if (statistics[i].type === "Kurs") {
        //pushar objekt med kursstatistik till array
        courseStat.push({
          name: statistics[i].name,
          applicants: Number(statistics[i].applicantsTotal.trim())
        });
      } else if (statistics[i].type === "Program") {
        //Pushar objekt med programstatistik till array
        programStat.push({
          name: statistics[i].name,
          applicants: Number(statistics[i].applicantsTotal.trim())
        });
      }
    }

    //Sortering av toppval

    //Sorterar i mest sökande kurser först
    courseStat.sort((a, b) => b.applicants - a.applicants);
    //Plockar ut de 6 första och lägger i array
    topCourses = courseStat.slice(0, 6);

    //...program
    programStat.sort((a, b) => b.applicants - a.applicants);
    //Lägger till top fem i array
    topPrograms = programStat.slice(0, 5);

    console.log("Toppkurser:", topCourses);
    console.log("Toppprogram:", topPrograms);

    //RITAR UT DIAGRAM

//Stapeldiagram - kursinformation
const chartOne = document.querySelector(".barchart");

if (chartOne) {
  let options = {
    chart: {
      type: 'bar',
      height: 700
    },
    //plockar ut värden från objektet i topCourses(map)
    series: [{
      name: 'Antal sökande',
      data: topCourses.map(course => course.applicants)
    }],
    xaxis: {
      categories: topCourses.map(course => course.name)
    }
  };

  let chart = new ApexCharts(chartOne, options);
  chart.render();
}


    //Cirkeldiagram -  programinformation
    const chartTwo = document.querySelector(".piechart");

    if (chartTwo) {
      let options = {
        chart: {
          type: 'pie',
          height: 500,
        },
        //plockar ut värden från objektet i topPrograms(map)
        series: topPrograms.map(programs => programs.applicants),
        labels: topPrograms.map(programs => programs.name)
      }

      let chart = new ApexCharts(chartTwo, options);
      chart.render();
    }



    //Felmeddelande som visas om datan inte läses in korrekt. eller annat fel
  } catch (error) {
    console.error("Fel vid hämtning av statistik", error);
  }

}

//Kallar på funktionen
getStatistics();

////////////////////////////////////////////////////////////////////////////

// KARTA //

//Skapar kartobjekt med en startposition. koordinater och zoom-level
const map = L.map('map').setView([51.505, -0.09], 13);

//Hämtar bild på karta från openstreetmap och lägger på kartobjektet
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Platsmarkerare med kordinater
const marker = L.marker([51.5, -0.09]).addTo(map);


//Sökfunktion - Hämta koordinater från sökinput

//Hämtar id från sökormulär. Eventlyssnare på knapp för sök. Stoppar sida från att laddas om
document.querySelector('#searchinput').addEventListener('submit', function(nonReload) {
  nonReload.preventDefault();

  //Variabel för värdet i input
  const location = document.querySelector('#search').value;
  console.log("Användaren sökte på", location);
})
