// fetching the tabs head
const tabsHead = document.querySelectorAll('.single-tab')

// fetching the tabs
const tabsBody = document.querySelectorAll('.single-tab-body')

// fetching the search form
const searchForm = document.querySelector('.page-header-search')

// fetching the input value box
const searchList = document.getElementById('search-list')

// fetching the body of main box
const imageBody = document.querySelector('.website-body-content-photo');

// testing if the elements are fetched or not
// console.log(tabsBody)
// console.log(tabsHead)
// console.log(searchForm)
// console.log(searchList)

// setting the default value of a tab to 1 so only one tab at a time is open till the other one is clicked
let activeTab = 1, allData;

// setting the deafult tab head and body to load on the reload
const firstAppearence = function () {
    showActiveTabHead()
    showActiveTabBody()
}

// activeTab - 1 sets the value to the tab head on which the user click as user click on 3 option the array size will be 3 - 1 which will the position 2 and on the third tab it adds the class active tab which is defined in css and same goes with the tab body
const showActiveTabHead = function () {
    tabsHead[activeTab - 1].classList.add('active-tab')
}

const showActiveTabBody = function () {
    hideAllBody();
    tabsBody[activeTab - 1].classList.add('show-tab') 
}

// it basically removes the classes of the tabs which are not clicked and as they are not clicked the class removal hides them from the display which are defined in css
const hideAllBody = function () {
    tabsBody.forEach(singleTabBody => 
    singleTabBody.classList.remove('show-tab')
    )
}

// the css tells the compiler to highlight the tab which is open/active with an underline and when the user clicks on other tab it removes the underline from the inactive tabs
const hideAllHead = function () {
  tabsHead.forEach((singleTabHead) =>
    singleTabHead.classList.remove('active-tab')
  )
}

// on the page load or whenever you reload it sets the page to only show the first page
window.addEventListener('DOMContentLoaded', function () {
    firstAppearence();
})

// here a for each loop is used with the short hand technique with the self defined parameter just like the above for each loops and adding an event listener with the event click to track the clicks and call the functions defined accordingly
tabsHead.forEach(singleTabHead => {
    singleTabHead.addEventListener('click', function () {
        hideAllHead();
        activeTab = singleTabHead.dataset.id;
        showActiveTabHead();
        showActiveTabBody();
    })
})

// getting the search bar value whenever the user types in something it gets fetched by the function defined and using the trim function to cut all the extra spaces to get better results
const getInputValue = function (event) {
  event.preventDefault()
  let searchText = searchForm.search.value.trim()
  fetchAllSuperheroes(searchText)
}

// creating an empty array just to fetch the superheroes list into it
var superHeroList = [];

// publiv key = a42e8b8a6106b1ea4cd786e64f9910a4
// private key = 802fdf64a6ff4a9062b16bd363fc112b393df4a0
// hash key = ad60fc4a78025a7b4118efa782328284
// time stamp = 1
// below is the function to fetch data from the given API
// async function AllSuperheroes() {
//   var response = await fetch(
//     `https://gateway.marvel.com/v1/public/characters?&ts=1&apikey=a42e8b8a6106b1ea4cd786e64f9910a4&hash=ad60fc4a78025a7b4118efa782328284`
//     //https://gateway.marvel.com/v1/public/characters?&ts=1&apikey=a42e8b8a6106b1ea4cd786e64f9910a4&hash=ad60fc4a78025a7b4118efa782328284
//   )

//   allData = await response.json()

//   var results = allData.data.results

//   superHeroList = results;
// // printing the results in console just to test if the results are fetched properly or not
// //   console.log(results);
// }

// here is the function to search the name of the superhero whose name is starting with whatever user is typing i took searchedText as a parameter and inserted it in the api so whatever the user types it will show the results accordingly and i have already predefined the function to get the value of the input of the user
const fetchAllSuperheroes = async (searchText) => {
  let url = `https://www.superheroapi.com/api.php/727054372039115/search/${searchText}`
  try {
    const response = await fetch(url)
    allData = await response.json()
    if (allData.response === 'success') {
      // console.log(allData);
      ListShow(allData.results)
    }
  } catch (error) {
    console.log(error)
  }
}

// here we are maping over the results and putting it in the HTML format to diplay the searched results to the user
function ListShow(results) {
    searchList.innerHTML="";
    results.map((item) => {
        const div = document.createElement('div');
        div.classList.add('search-list-item')

        // when i defined the html i also added an attribute to fetch the id of the character which will be used to show the details of a single charater to the user
        div.innerHTML = `
                            <img src=${
                              item.image.url ? item.image.url : ''
                            }>
                            <p data-id = ${item.id}>${item.name}</p>
                        `
        // as the information has to be displayed inside a div i used the function appendChild to push the information inside that element
        searchList.appendChild(div)
    })
}

// function call to retrive the data from API
// AllSuperheroes();

// event listener call as if the user clicks on the search bar or clicks enter the results will pop up
searchForm.addEventListener('submit', getInputValue)

// setting the event listener so that the search function should only show results when the searched text is greater than 1
searchForm.search.addEventListener('keyup', () => {
    if (searchForm.search.value.length > 1) {
        fetchAllSuperheroes(searchForm.search.value);
    } else {
        searchList.innerHTML = '';
    }
})

// here i added an event listener on the search list which comes on when the user enters a superhero name and the search id in it fetches the id of the hero name clicked and then i created a varaible to store all the information of that particular hero name clicked and i used filter function to return the single information 
searchList.addEventListener('click', async (event) => {
    let searchId = event.target.dataset.id;
    let singleData = allData.results.filter(singleData => {
        return searchId === singleData.id;
    })
    showDetails(singleData);
    searchList.innerHTML = ''
})

// this function changes the inner HTML of our page and displays the information of the hero which the user clicked from the search list
const showDetails = (data) => {
    document.querySelector('.website-body-content-photo').innerHTML = `
        <img src = "${data[0].image.url}">
    `

    document.querySelector('.name').textContent = data[0].name;
    document.querySelector('.powerstats').innerHTML = `
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>intelligence</span>
        </div>
        <span>${data[0].powerstats.intelligence}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>strength</span>
        </div>
        <span>${data[0].powerstats.strength}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>speed</span>
        </div>
        <span>${data[0].powerstats.speed}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>combat</span>
        </div>
        <span>${data[0].powerstats.combat}</span>
    </li>
    `
     document.querySelector('.biography').innerHTML = `
    <li>
        <span>full name</span>
        <span>${data[0].biography['full-name']}</span>
    </li>
    <li>
        <span>alert-egos</span>
        <span>${data[0].biography['alter-egos']}</span>
    </li>
    <li>
        <span>aliases</span>
        <span>${data[0].biography['aliases']}</span>
    </li>
    <li>
        <span>place-of-birth</span>
        <span>${data[0].biography['place-of-birth']}</span>
    </li>`

    document.querySelector('.appearance').innerHTML = `
    <li>
        <span>
            <i class = "fas fa-star"></i> gender
        </span>
        <span>${data[0].appearance['gender']}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> race
        </span>
        <span>${data[0].appearance['race']}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> height
        </span>
        <span>${data[0].appearance['height'][0]}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> weight
        </span>
        <span>${data[0].appearance['weight'][0]}</span>
    </li>
    <li>`
}