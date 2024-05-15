// console.log('Hier komt je server voor Sprint 10. Gebruik uit Sprint 9 alleen de code die je mee wilt nemen.')

/*** Express setup & start ***/

// Importeer het npm pakket express uit de node_modules map
import express, { application, json } from 'express'


// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Maak een nieuwe express app aan
const app = express()
const apiUrl = 'https://fdnd-agency.directus.app/items/'
const apiFamily = apiUrl + 'oba_family'
const apiProfile = apiUrl + 'oba_profile'
const apiItem = apiUrl + 'oba_item'

let leeslijst = {}

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

// dit is de index pagina // met alle items van OBA
// hier vraag ik om de afbeeldingen in te laden met de originele width en height

app.get('/', function (request, response) {
  fetchJson(apiItem + '?fields=*,afbeelding.id,afbeelding.height,afbeelding.width').then((items) => {
    console.log(items.data)
    response.render('index', {
      items: items.data /*hier zeg ik dat iedereen getoond moet worden*/,
    })
  })
})

// books
app.get('/home', async function (request, response) {
  try {
    const families = await fetchJson(apiFamily)
    const profiles = await fetchJson(apiProfile)

    //   console.log(families.data);
    //   console.log(profiles.data);

    response.render('home', {
      families: families.data,
      profiles: profiles.data,
    })
  } catch (error) {
    //   console.error('Error fetching data:', error);
    response.status(500).send('Internal Server Error')
  }
})

// detail
app.get('/detail/:id', function (request, response) {
  fetchJson(apiItem + '?filter={"id":' + request.params.id + '}').then((items) => {
    response.render('detail', {
      items: items.data /*hier zeg ik dat iedereen getoond moet worden*/,
    })
  })
})

// app.post('/detail/:id', function (request, response) {
//   const id = request.params.id;

//   console.log(request.params.id)

//   // posten naar directus..
//   fetch(`${apiUrl}oba_bookmarks/`, {
//     method: 'POST',
//     body: JSON.stringify({
//       item: request.params.id,
//     }),
//     headers: {
//       'Content-Type': 'application/json; charset=UTF-8',
//     },
//   }).then((postResponse) => {
//     if (request.body.enhanced){
//       response.render('detail', {added:true});
//     } else{
//     console.log(postResponse)
//     response.redirect(303, '/detail/' + id + '?added=true')
//     }
//   })
// });


app.post('/detail/:id', function(request, response){
 
  const id = request.params.id;
 
  fetch(`${apiUrl}/oba_bookmarks/` , {
      method: 'POST',
      body: JSON.stringify({
        item: request.params.id,
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }).then((postResponse) => {
      // Redirect naar de persoon pagina
      if (request.body.enhanced) {
          response.render('detail', {added:true});
        } else {
        response.redirect(303, '/detail/' + id + '?added=true')
    }
  })
});



app.get('/leeslijst', function (request, response) {
  let loadingStatus = 'loading' // Indicate that the page is loading

  // bookmarks ophalen...
  let leeslijstFetch = `${apiUrl}oba_bookmarks?fields=*.*`

  // Simulate an asynchronous task, such as an API call
  fetchJson(leeslijstFetch)
    .then(({ data }) => {
      return data.map((bookmark) => {
        return bookmark.item
      })
    })
    .then((itemsOpLeeslijst) => {
      if (itemsOpLeeslijst.length) {
        // console.log('there is a book')
        // console.log(loadingStatus)
        response.render('leeslijst', {
          items: itemsOpLeeslijst,
          loadingStatus: loadingStatus,
        })
      } else {
        // console.log('empty state')
        // If there are no items, render the empty state
        response.render('partials/emptyState')
      }
    })
})

// app.get('/leeslijst', function (request, response) {
//   fetchJson(apiItem).then((items) => {
//     let loadingStatus = "loading";
//     let itemsOpLeeslijst = []
// console.log(request.cookies.leeslijst)
// console.log(request.cookies);
// items.data.forEach(function (item) {
// turn id into string so it corresponds with the cookie ids;
//   const id = `${item.id}`
//   if (request.cookies.leeslijst && request.cookies.leeslijst.includes(id)) {
//     itemsOpLeeslijst.push(item)
//     console.log('gets here')
//   }
// })

// if (itemsOpLeeslijst.length) {
//   response.render('leeslijst', {
//     items: itemsOpLeeslijst
//   });

// if (itemsOpLeeslijst.length === 0) {
//   loadingStatus = "empty";
// } else {
//   loadingStatus = "success";
// }

//   response.render('leeslijst', {
//     loadingStatus: loadingStatus,
//     items: itemsOpLeeslijst
//   });

//   if (itemsOpLeeslijst.length === 0) {
//     // Rendeer de lege staat
//     response.render('emptyState');
// } else {
//     // Rendeer de items
//     response.render('leeslijst', {
//         items: itemsOpLeeslijst
//     });
// }

// } else {
//   response.render('leeslijst', {
//     loadingStatus: loadingStatus,
//     items: []
//   });
// console.error("Invalid or unexpected API response format");
// response.status(500).send("Internal Server Error");
//     }
//   });
// });

// let leeslijst = []

// app.post('/detail/:id', function (request, response) {
//   request.cookies.leeslijst = JSON.parse(request.cookies.leeslijst)

//   if (request.cookies.leeslijst) {
//     leeslijst = request.cookies.leeslijst
//     console.log(leeslijst)
//   }
//   fetchJson(apiItem + '?filter={"id":' + request.params.id + '}').then((items) => {
//     const book =  items.data[0]
// console.log(book)
// leeslijst.push(request.params.id)
// Jammerdepammer:
// leeslijst[id] = {
//   id: book.id,
//   title: book.title,
//   afbeelding: book.afbeelding,
// };
// Save leeslijst in cookie called 'leeslijst'
//   console.log('lijst:' + leeslijst);
//   response.cookie('leeslijst', leeslijst, { maxAge: 900000, httpOnly: false });
//   response.redirect(303, '/detail/' + request.params.id + '?added=true');
// })

// send succes state //

// });

// favorieten

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
