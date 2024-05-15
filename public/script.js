// const body = document.querySelector('body'),
// sidebar = body.querySelector('nav'),
// toggle = body.querySelector(".toggle"),
// searchBtn = body.querySelector(".search-box"),
// modeSwitch = body.querySelector(".toggle-switch"),
// modeText = body.querySelector(".mode-text");

// toggle.addEventListener("click" , () =>{
//     sidebar.classList.toggle("close");
// })

// searchBtn.addEventListener("click", () =>{
//     sidebar.classList.remove("close");
// })

// modeSwitch.addEventListener("click" , () =>{
//     body.classList.toggle("dark");

//     if(body.classList.contains("dark")){
//         modeText.innerText = "Light mode";
//     }else{
//         modeText.innerText = "Dark mode";

//     }
// })



let lijstForm = document.querySelector('.add-item');

lijstForm.addEventListener('submit', function(event){
    let savedItem = new FormData(this)


let leeslijstButton  = document.querySelector('.leeslijst-button');
leeslijstButton.addEventListener('click', function(event){

}).then(function(response) {
    // Als de server een antwoord geeft, krijgen we een stream terug
    // We willen hiervan de text gebruiken, wat in dit geval HTML teruggeeft
    return response.text('toegevoegd')

}).then(function(responseHTML) {
    // En de HTML kunnen we gebruiken om onze DOM aan te passen
    document.querySelector('.leeslijst-button').innerHTML = responseHTML


savedItem.append('enhanced', true)

fetch(this.action, {
    method: this.method,
   
    body: new URLSearchParams(savedItem)
}).then()
// Haal de URL op van de huidige pagina
// Controleer of de URL het "added=true" query parameter bevat



    // SVG-icoon aanpassen
    notification.classList.add("notification")
    notificationIcon.classList.add("notification")
    const svgIcon = document.querySelector(".bi-bookmark-fill");

    // Verander de fill kleur naar currentColor (wit in dit geval)
    svgIcon.setAttribute("fill", "currentColor");
   

event.preventDefault()
})
});