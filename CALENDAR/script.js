let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')):[];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const TitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const myBirth = new Date(2022, 3,1);
const momBirth = new Date(2022, 8, 7);
const gramBirth = new Date(2022, 5, 10);
const grapBirth = new Date(2022, 7, 11);
const newYearEve = new Date(2022, 11,31);
const newYear = new Date(2022, 0, 1);
const christmas = new Date(2022, 11, 25);
const christmasEve = new Date(2022, 11, 24);
const independence = new Date(2022, 9, 1);
const childrensDay = new Date(2022, 4, 27);
function openModal(date)
{
   clicked = date;

   const eventForDay = events.find(e => e.date === clicked);

   if (eventForDay)
   {
       document.getElementById('eventText').innerText = eventForDay.title;
       deleteEventModal.style.display = 'block';
   }
   else{
       newEventModal.style.display = 'block';
   }
   backDrop.style.display = 'block';
}
function load(){
   const dt = new Date();

   if( nav !== 0){
       dt.setMonth(new Date().getMonth() + nav);
   }

   const day = dt.getDay();
   const month = dt.getMonth();
   const year = dt.getFullYear();

   const firstDayOfMonth = new Date(year, month, 1);
   const daysInMonth = new Date(year, month + 1, 0).getDate();
   
   const dateString = firstDayOfMonth.toLocaleDateString('en-us',{
       weekday:'long',
       year: 'numeric',
       month: 'numeric', 
       day: 'numeric',
   });
   const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

   document.getElementById('monthDisplay').innerText = 
   `${dt.toLocaleDateString('en-us',{month: 'long'})} ${year}`;
  
   calendar.innerHTML = '';

   for(let i = 1; i <= paddingDays + daysInMonth; i++)
   {
       const daySquare = document.createElement('div');
       daySquare.classList.add('day');
       const dayString = `${month + 1}/${i - paddingDays}/${year}`;
       if(i > paddingDays){
           
           daySquare.innerText = i - paddingDays;
           const eventForDay= events.find(e => e.date === dayString);
           if (i - paddingDays === day && nav === 0) {
               daySquare.id = "currentDay";
           }
           else if (i - paddingDays === myBirth.getDate() && dt.getMonth() === myBirth.getMonth()){
               daySquare.id = "mybirth";
           }
           else if (i - paddingDays === momBirth.getDate() && dt.getMonth() === momBirth.getMonth()) {
               daySquare.id = "mombirth";
           }
           else if (i - paddingDays === gramBirth.getDate() && dt.getMonth() === gramBirth.getMonth()) {
               daySquare.id = "grambirth";
           }
           else if (i - paddingDays === grapBirth.getDate() && dt.getMonth() === grapBirth.getMonth()) {
               daySquare.id = "grapbirth";
           }
           else if (i - paddingDays === newYearEve.getDate() && dt.getMonth() === newYearEve.getMonth() ||
            i - paddingDays === newYear.getDate() && dt.getMonth() === newYear.getMonth() || 
            i - paddingDays === christmas.getDate() && dt.getMonth() === christmas.getMonth() ||
             i - paddingDays === christmasEve.getDate() && dt.getMonth() === christmasEve.getMonth() ||
              i - paddingDays === independence.getDate() && dt.getMonth() === independence.getMonth()||
               i - paddingDays === childrensDay.getDate() && dt.getMonth() === childrensDay.getMonth()){
               daySquare.id = "holiday";
           }
           
           if(eventForDay)
           {
               const eventDiv = document.createElement('div');
               eventDiv.classList.add('event');
               eventDiv.innerText = eventForDay.title;
               daySquare.appendChild(eventDiv);
           }
           daySquare.addEventListener('click', () => openModal(dayString));
       }
       else{
           daySquare.classList.add('padding');
       }
       
       calendar.appendChild(daySquare);
       
   }
    
}
function closeModal()
{
   eventTitleInput.classList.remove('error');
   newEventModal.style.display ='none';
   deleteEventModal.style.display = 'none';
   backDrop.style.display ='none';
   eventTitleInput.value = '';
   clicked = null;
   load();
}
function saveEvent(){
   if (eventTitleInput.value){
       eventTitleInput.classList.remove('error');
       events.push({
           date:clicked,
           title:eventTitleInput.value,
       });
       localStorage.setItem('events',JSON.stringify(events));
       closeModal();
   }
   else{
       eventTitleInput.classList.add('error');
   }
}
function deleteEvent(){

   events = events.filter(e =>e.date !== clicked);
   localStorage.setItem('events', JSON.stringify(events));
   closeModal();
}
function initButtons(){
   document.getElementById('nextButton').addEventListener('click', () => {nav ++; load();});
   document.getElementById('backButton').addEventListener('click', () => {nav--; load();});
   
   document.getElementById('saveButton').addEventListener('click',saveEvent);
   document.getElementById('cancelButton').addEventListener('click', closeModal);

   document.getElementById('deleteButton').addEventListener('click', deleteEvent);
   document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();