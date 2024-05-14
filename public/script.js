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



// document.querySelector('form.add-item').addEventListener

// function setCookie(name, value, days) {
//     var expires = "";
//     if (days) {
//         var date = new Date();
//         date.setTime(date.getTime() + (days*24*60*60*1000));
//         expires = "; expires=" + date.toUTCString();
//     }
//     document.cookie = name + "=" + (value || "")  + expires + ";";
// }


// function cookieParser(cookieString) {
 
    // Return an empty object if cookieString
    // is empty
    // if (cookieString === "")
    //     return {};
 
    // Get each individual key-value pairs
    // from the cookie string
    // This returns a new array
    // let pairs = cookieString.split(";");
 
    // Separate keys from values in each pair string
    // Returns a new array which looks like
    // [[key1,value1], [key2,value2], ...]
    // let splittedPairs = pairs.map(cookie => cookie.split("="));
 
 
    // Create an object with all key-value pairs
    // const cookieObj = splittedPairs.reduce(function (obj, cookie) {
 
        // cookie[0] is the key of cookie
        // cookie[1] is the value of the cookie 
        // decodeURIComponent() decodes the cookie 
        // string, to handle cookies with special
        // characters, e.g. '$'.
        // string.trim() trims the blank spaces 
        // auround the key and value.
//         obj[decodeURIComponent(cookie[0].trim())]
//             = decodeURIComponent(cookie[1].trim());
 
//         return obj;
//     }, {})
 
//     return cookieObj;
// }



// let addItemToLeeslijstForm = document.querySelector('form.add-item')

// if (addItemToLeeslijstForm) {
//     addItemToLeeslijstForm.addEventListener("submit", (event) => {
//         // prevent refresh which is default behavior on a form submit
//         event.preventDefault();
//         // // document.cookie = 
//         const id = addItemToLeeslijstForm.querySelector('input[name="id"]').value
        
//         const allCookies = cookieParser(document.cookie)
//         if (allCookies && allCookies.leeslijst) {
//             const parsedCookie = JSON.parse(allCookies.leeslijst.replace('j:', ''));
//             console.log(parsedCookie);
//             if (!parsedCookie.includes(id)) {
//                 parsedCookie.push(id)
//                 setCookie('leeslijst', JSON.stringify(parsedCookie), 10)
//             } else {
//                 console.log('exists!')
//             }

//         } else {
//             setCookie('leeslijst', JSON.stringify([id]), 10)
//         }
//         // dialog.showModal();
//     });

// }

