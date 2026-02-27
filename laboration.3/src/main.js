
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
          applicants: Number(statistics[i].applicantsTotal)
        });
      } else if (statistics[i].type === "Program") {
        //Pushar objekt med programstatistik till array
        programStat.push({
          name: statistics[i].name,
          applicants: Number(statistics[i].applicantsTotal)
        });
      }
    }

    //Felmeddelande som visas om datan inte läses in korrekt. eller annat fel
  } catch (error) {
    console.error("Fel vid hämtning av statistik", error);
  }
}



//Stapeldiagram - kursinformation
const chartOne = document.querySelector(".barchart");

if (chartOne) {
  let options1 = {
    chart: {
      type: 'bar'
    },
    series: [{
      name: 'sales',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }],
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  };

  let chart = new ApexCharts(chartOne, options1);
  chart.render();
}

//Cirkeldiagram -  programinformation
const chartTwo = document.querySelector(".piechart");

if (chartTwo) {
  let options = {
    chart: {
      type: 'pie',
    },
    series: [44, 55, 13, 33],
    labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
  }

  let chart = new ApexCharts(chartTwo, options);
  chart.render();
}

