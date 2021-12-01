// show current time
var today = new Date();
var hours = (today.getHours() == 0? '0' : '') + today.getHours();;
var minutes= (today.getMinutes() < 10? '0' : '') + today.getMinutes();;
var time = hours + ":" + minutes;
var currentTime = document.getElementById("currentTime");
currentTime.innerText = time;
 
//name and greeting
const askName = document.querySelector("#ask-name");
const nameInput = document.querySelector("#ask-name input");
const greeting = document.querySelector("#greeting");

const hidden = "hidden";
const myName = "name";

const savedName = localStorage.getItem(myName);

const changeNameButton = document.querySelector('#change-name')

function submitName(event) {
    askName.classList.add(hidden);
    const username = nameInput.value;
    localStorage.setItem(myName, username);
    printGreetings(username);
}

function printGreetings(username) {
    var hours = today.getHours();
    if(hours < 12){
        greeting.innerText = `Good Morning, ${username}.`;   
    }
    else if (hours == 12) {
        greeting.innerText = `Good Noon, ${username}.`;   
    }
    else if (hours >= 18) {
        greeting.innerText = `Good Evening, ${username}.`;   
    }
    else {
        greeting.innerText = `Good Afternoon, ${username}.`;   
    }
    greeting.classList.remove(hidden);
}

function changeName() {
    if (savedName !== null) {
        localStorage.removeItem(savedName);
        greeting.classList.add(hidden);
        askName.classList.remove(hidden);
        nameInput.placeholder='What is your name?';
        askName.addEventListener("submit", submitName);
      } 
}

changeNameButton.addEventListener('click', changeName)

if (savedName === null) {
    askName.classList.remove(hidden);
    askName.addEventListener("submit", submitName);
} 
else {
    printGreetings(savedName);
}

//main focus

const askMainFocus = document.querySelector("#ask-main-focus");
const mainFocusInput = document.querySelector("#ask-main-focus input");
const mainFocus = document.querySelector("#main-focus");

const hidden1 = "hidden1";
const mFocus = "mfocus";

const savedMainFocus = localStorage.getItem(mFocus);

const changeMainFocusButton = document.querySelector('#change-main-focus')

function submitMainFocus(event) {
    askMainFocus.classList.add(hidden1);
    const focus = mainFocusInput.value;
    localStorage.setItem(mFocus, focus);
    printMainFocus(focus);
}

function printMainFocus(focus) {
    mainFocus.innerText = focus;  
    mainFocus.classList.remove(hidden1);
}

function changeMainFocus() {
    if (savedMainFocus !== null) {
        localStorage.removeItem(savedMainFocus);
        mainFocus.classList.add(hidden1);
        askMainFocus.classList.remove(hidden1);
        mainFocusInput.placeholder='What is your main focus for today?';
        askMainFocus.addEventListener("submit", submitMainFocus);
      } 
}

changeMainFocusButton.addEventListener('click', changeMainFocus)

if (savedMainFocus === null) {
    askMainFocus.classList.remove(hidden1);
    askMainFocus.addEventListener("submit", submitMainFocus);
} 
else {
    printMainFocus(savedMainFocus);
}

//to do list

const toDoForm = document.getElementById("to-do-form");
const toDoList = document.getElementById("to-do-list");
const toDoInput = document.querySelector("#to-do-form input");

const toDoItems = "todoitems";

let toDoArray = [];

function saveToDoItems() {
    localStorage.setItem(toDoItems, JSON.stringify(toDoArray));
}

function deleteToDoItem(event) {
    const list = event.target.parentElement;
    list.remove();
    toDoArray = toDoArray.filter((toDo) => toDo.id !== parseInt(list.id));
    saveToDoItems();
}

function functionToDo(newToDoItem) {
    const list = document.createElement("li");
    list.id = newToDoItem.id;
    const button = document.createElement("button");
    button.innerText = "x";
    button.addEventListener("click", deleteToDoItem);
    const span = document.createElement("span");
    span.innerText = newToDoItem.text;
    list.appendChild(button);
    list.appendChild(span);
    toDoList.appendChild(list);
}

function submitToDo(event) {
    event.preventDefault();
    const newToDoItem = toDoInput.value;
    toDoInput.value = "";
    const newToDoObject = {
        text: newToDoItem,
        id: Date.now(), 
    };
    toDoArray.push(newToDoObject);
    functionToDo(newToDoObject);
    saveToDoItems();
}

toDoForm.addEventListener("submit", submitToDo);

const savedToDoItems = localStorage.getItem(toDoItems);
if (savedToDoItems) {
  const parsedToDoItems = JSON.parse(savedToDoItems);
  toDoArray = parsedToDoItems;
  parsedToDoItems.forEach(functionToDo);
}

//quotes from me


const quoteSpace = document.querySelector("#quotes");

const changeToRandomQuoteButton = document.querySelector('#change-to-random-quote')

const hidden2 = "hidden2";

const quotes = [
    "A day without sunshine is like, you know, night.",
    "If you really think I can be bought, my bank account number is 5514 0264 8634 3493.",
    "They said don't give up on your dreams. So I went back to sleep.",
    "If you fall, I will catch you. - Floor ",
    "What's the leading cause of dry skin? Towels.",
    "I NEED A HUGe amount of money.",
    "Adulting is soup, and I am a fork.",
    "If you are lonely, dim the lights, and put on a horror movie. After a while, it won't feel like you are alone anymore.",
    "Shout out to the people who want to know what the opposite of in is.",
    "I was wondering why the ball was getting bigger, then it hit me."
];

var randomNumber = Math.floor(Math.random()*quotes.length);

quoteSpace.innerText = quotes[randomNumber];



//quotes from user

const addQuote = document.querySelector("#add-quote");
const quoteInput = document.querySelector("#add-quote input");
const quote = document.querySelector("#quote");

const hidden3 = "hidden3";
const myQuote = "myquote";

const savedQuote = localStorage.getItem(myQuote);

const changeToOwnQuoteButton = document.querySelector('#change-to-own-quote')

function submitQuote(event) {
    addQuote.classList.add(hidden3);
    const mquote = quoteInput.value;
    localStorage.setItem(myQuote, mquote);
    printQuote(mquote);
}

function printQuote(mquote) {
    quote.innerText = mquote;  
    quote.classList.remove(hidden3);
}

function changeToOwnQuote() {
    localStorage.removeItem(savedQuote);
    quote.classList.add(hidden3);
    addQuote.classList.remove(hidden3);
    quoteSpace.classList.add(hidden2);
    quoteInput.placeholder='Add your own quote.';
    addQuote.addEventListener("submit", submitQuote);
}

changeToOwnQuoteButton.addEventListener('click', changeToOwnQuote)

function changeToRandomQuote() {
    localStorage.clear(savedQuote);
    quote.classList.add(hidden3);
    addQuote.classList.add(hidden3);
    quoteSpace.classList.remove(hidden2);
    var randomNumber = Math.floor(Math.random()*quotes.length);
    quoteSpace.innerText = quotes[randomNumber];
}

changeToRandomQuoteButton.addEventListener('click', changeToRandomQuote)

if (savedQuote !== null) {
    quoteSpace.classList.add(hidden2);
    printQuote(savedQuote);
} 

//side navigation bar
const hidden4 = "hidden4";

function openNav() {
    document.getElementById("openButton").classList.add(hidden4);
    document.getElementById("mySidenav").style.width = "90px";
}
  
function closeNav() {
    document.getElementById("openButton").classList.remove(hidden4);
    document.getElementById("mySidenav").style.width = "0";
}

//tdl button
const hidden5 = "hidden5";

function openTDL() {
    document.getElementById("to-do-list-button").classList.add(hidden5);
    document.getElementById("to-do-list-pop-up").classList.remove(hidden5);
}
  
function closeTDL() {
    document.getElementById("to-do-list-button").classList.remove(hidden5);
    document.getElementById("to-do-list-pop-up").classList.add(hidden5);
}

