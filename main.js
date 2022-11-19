
// Input
// Name1, Name2, Club1, Club2

// Output
// NameCompatibility (from API) and ClubCompatibility (from matrix)
// witty description 


let name1 = document.getElementById("name1");

let name2 = document.getElementById("name2");



async function getNamePercent(name1, name2) {
    const response = await fetch(`https://love-calculator.p.rapidapi.com/getPercentage?sname=${name1.value}&fname=${name2.value}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "love-calculator.p.rapidapi.com",
            "x-rapidapi-key": "f1f30e086emsh59114c6a52387e0p1ca9c5jsn717bedd1f30d"
        }
    })

        const data = await response.json();

        let percent = data.percentage;

    return percent;
    

}

getNamePercent(name1, name2)



const clubCompatibilityDictionary = {



        ep: { ep: 89, xbx: 7, ox: 67, pka: 35, xcd: 46, athletics: 80, chorale: 21, none: 17},
        xbx: { ep: 7, xbx: 94, ox: 8, pka: 57, xcd: 68, athletics: 9, chorale: 92, none: 29},
        ox: { ep: 67, xbx: 8, ox: 99, pka: 53, xcd: 70, athletics: 98, chorale: 17, none: 80},
        pka: { ep: 35, xbx: 57, ox: 53, pka: 98, xcd: 89, athletics: 99, chorale: 52, none: 27},
        xcd: { ep: 46, xbx: 68, ox: 70, pka: 89, xcd: 98, athletics: 67, chorale: 52, none: 7},
        athletics: { ep: 80, xbx: 9, ox: 98, pka: 99, xcd: 67, athletics: 84, chorale: 2, none: 9},
        chorale: { ep: 21, xbx: 92, ox: 17, pka: 52, xcd: 52, athletics: 2, chorale: 99, none: 28},
        none: { ep: 17, xbx: 29, ox: 80, pka: 27, xcd: 7, athletics: 9, chorale: 28, none: 13}



}; 

const descriptionDictionary = {

    d1: {start:0, end: 10, description: "Although our sophisticated algorithms say that it won't work out, why not give it a shot? We're sure you can beat probability"},
    d2: {start:11, end: 45, description: "We hate to be the bearers of bad news, but this relationship has as much chance of working as Angelina and Brad Pitt. Wait, are they still together? Guess you got a shot, but it ain't gonna be easy."},
    d3: {start:46, end: 85, description: "There's a slim chance this might work. It's gonna be tough, but whatever, YOLO."},
    d4: {start:86, end: 100, description: `Aww, you're a great match for each other!`},
 
 }
 

const club1 = document.getElementById("clubOneSelect");
const club2 = document.getElementById("clubTwoSelect");

const calcButton = document.getElementById("calc_btn");

//const club_percent = clubCompatibilityDictionary[club1.value][club2.value]



function getClubPercent(club1, club2) {
    return clubCompatibilityDictionary[club1.value][club2.value];
}

async function getFinalPercent() {

    let name1 = document.getElementById("name1");
    let name2 = document.getElementById("name2");

    let club1 = document.getElementById("clubOneSelect");
    let club2 = document.getElementById("clubTwoSelect");

    console.log(club2.value)

    let percent = await getNamePercent(name1, name2);
    let club_percent = clubCompatibilityDictionary[club1.value][club2.value];

    let avg = (parseFloat(percent) + parseFloat(club_percent))/parseFloat(2);


    document.getElementById("percentage").innerHTML = avg + '%';

    return avg;

}

async function getDescription() {

    let response = '';
    let avg = await getFinalPercent();

    if (avg > descriptionDictionary.d1.start && avg < descriptionDictionary.d1.end) {
        response = descriptionDictionary.d1.description;
    }

    if (avg > descriptionDictionary.d2.start && avg < descriptionDictionary.d2.end) {
        response = descriptionDictionary.d2.description;
    }

    if (avg > descriptionDictionary.d3.start && avg < descriptionDictionary.d3.end) {
        response = descriptionDictionary.d3.description;
    }

    if (avg > descriptionDictionary.d4.start && avg < descriptionDictionary.d4.end) {
        response = descriptionDictionary.d4.description;
    }

    console.log(response)

    document.getElementById("response").innerHTML = response;


    return response;


}

async function clearPage() {

    let avg = await getFinalPercent();
    let response = await getDescription();

    document.getElementById("page").style.visibility = "hidden";
    document.getElementById("new_btn").style.visibility = "visible";
    document.getElementById("percentage").style.visibility = "visible";
    document.getElementById("response").style.visibility = "visible";
    
    document.getElementById("percentage").innerHTML = avg + '%';

    document.getElementById("response").innerHTML = response;

}

function fixPage() {
    document.getElementById("page").style.visibility = "visible";
    document.getElementById("percentage").style.visibility = "hidden";
    document.getElementById("response").style.visibility = "hidden";
    document.getElementById("percentage").style.visibility = "hidden";
    document.getElementById("new_btn").style.visibility = "hidden";``
}