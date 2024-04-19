// console.log('Hier komt je server voor Sprint 10. Gebruik uit Sprint 9 alleen de code die je mee wilt nemen.')


/*** Express setup & start ***/

// Importeer het npm pakket express uit de node_modules map
import express, { application, json } from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

app.use(express.urlencoded({extended: true }))

const apiUrl = "https://fdnd-agency.directus.app/items/"

const apiFamily = (apiUrl + 'oba_family')

const apiProfile = (apiUrl + 'oba_profile')

const apiItem = (apiUrl + 'oba_item')

// dit is de home page & family

// app.get('/', function(request, response) {
//     fetchJson(apiItem).then((items) => { console.log(items.data)
//         response.render('index', {
           
//             items: items.data/*hier zeg ik dat iedereen getoond moet worden*/
//         });
//     })
//     console.log(apiItem) 
// })

// app.get('/', function(request, response) {
//     fetchJson(apiFamily + '?fields=*,afbeelding.id,afbeelding.height,afbeelding.width').then((items) => { console.log(items.data)
//         response.render('index', {
           
//             items: items.data/*hier zeg ik dat iedereen getoond moet worden*/
//         });
//     })
//     console.log(apiFamily) 
// })

// dit is de index pagina // met alle items van OBA
// hier vraag ik om de afbeeldingen in te laden met de originele width en height

app.get('/', function(request, response) {
    fetchJson(apiItem + '?fields=*,afbeelding.id,afbeelding.height,afbeelding.width').then((items) => { console.log(items.data)
        response.render('index', {
           
            items: items.data/*hier zeg ik dat iedereen getoond moet worden*/
        });
    })
})


// books


//

app.get('/home', async function(request, response) {
    
    try {
      const families = await fetchJson(apiFamily);
      const profiles = await fetchJson(apiProfile);
 
    //   console.log(families.data);
    //   console.log(profiles.data);
 
      response.render('home', {
        families: families.data,
        profiles: profiles.data,
      });
    } catch (error) {
    //   console.error('Error fetching data:', error);
      response.status(500).send('Internal Server Error');
    }
  });
 


// detail

app.get('/detail/:id', function(request, response) {
    fetchJson(apiItem + '?filter={"id":' + request.params.id + '}').then((items) => {
        response.render('detail', {

            items: items.data/*hier zeg ik dat iedereen getoond moet worden*/
        });
    })
  
})


// get route voor leeslijst hieronder


// leeslijst


let leeslijst = {}

app.post ('/detail/:id', function(request, response) {
   const id = request.params.id;

   leeslijst[id] = true;

   response.redirect(303, '/detail/' + id + '?added=true');
      
});


app.get('/leeslijst', function(request, response) {
    fetchJson(apiItem).then((items) => { console.log(items.data);
    
let itemsOpLeeslijst = []

items.data.forEach(function(item) {
    if (leeslijst[item.id]) {
      itemsOpLeeslijst.push(item)
    }
  })

  if (itemsOpLeeslijst.length) {
      response.render('leeslijst', {
          items: itemsOpLeeslijst
      });
  } else {
      console.error("Invalid or unexpected API response format");
      response.status(500).send("Internal Server Error");
  }
});
});


  // Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
});
