/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*** Global Variables ***/
let studentItems = document.querySelectorAll('.student-item');
let searchResults = Array.prototype.slice.call(document.querySelectorAll(".student-item"));
let numberOfStudents = studentItems.length;
let limitPerPage = 10;
const pageHeader = document.querySelector('.page-header');
const numberOfPages = Math.ceil(numberOfStudents/limitPerPage);
const page = document.querySelector('.page');

// HIDE STUDENTS FUNCTION
function hideStudents(list) {
  if (numberOfStudents > limitPerPage) {
    for(i = 0; i < numberOfStudents; i++) {
      list[i].style.display = 'none';
    }
  }
};

//Function takes a list (stored in an array), the current page being iterated over,
//and the number of items to be displayed on each page.
function showPage(list, selectedPage, limitPerPage) {
    hideStudents(list);
    for(i=selectedPage*limitPerPage-limitPerPage; i<selectedPage*limitPerPage && i<list.length; i++) {
        list[i].style.display = '';
    }
};

// Page start initializes with first page
showPage(studentItems, 1, limitPerPage);

///  appendPageLinks function generates, append, and adds functionality
///  to the pagination buttons.
function appendPageLinks() {
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  page.appendChild(pagination);
  const ul = document.createElement('ul');
  const numberOfPages = Math.ceil(numberOfStudents/limitPerPage);
  const paginationBtnUl = document.createElement('ul');
  pagination.appendChild(paginationBtnUl);
  for (i=0; i<numberOfPages; i++) {
    let paginationBtnLi = document.createElement('li');
    let paginationBtnA = document.createElement('a');
    paginationBtnA.setAttribute('href', '#');
    paginationBtnA.textContent = i+1;
    paginationBtnLi.appendChild(paginationBtnA);
    paginationBtnUl.appendChild(paginationBtnLi);
  }
  pagination.addEventListener('click', (e) => {
    if (e.target.tagName == 'A') {
      let selectedPage = e.target.textContent;
      showPage(searchResults, selectedPage, limitPerPage)
      let paginationLinks = document.querySelectorAll('.pagination a');
      for (i=0; i<paginationLinks.length; i++){
        paginationLinks[i].classList.remove('active');
      }
      e.target.classList.add('active');
    }
  });
}

appendPageLinks();

// createMessage and removeMessage dynamically create messages giving
// user feedback if the search yielded no results.
function createMessage() {
  const div = document.createElement('div');
  div.setAttribute('class', 'modal');
  const h2 = document.createElement('h2');
  h2.textContent='Sorry!'
  const p = document.createElement('p');
  p.textContent='No matches found.'
  insertAfter(div, pageHeader);
  div.appendChild(h2);
  div.appendChild(p)
}

function removeMessage() {
  const modal = document.querySelector('.modal');
  modal.parentNode.removeChild(modal);
}

// ------------------------------------------
//  SEARCH FUNCTION
//  filterStudents function takes the input value and checks to see if it matches
//  the name values stored in the students variable. If not, student is hidden.
// ------------------------------------------
  const filterStudents = () => {
    let filterValue, employees, caption;
    filterValue = document.querySelector('INPUT').value.toUpperCase();
    students = document.querySelectorAll(".student-details h3");
    for (let i=0; i<students.length; i++) {
      studentName = students[i].textContent;
      if (studentName.toUpperCase().indexOf(filterValue) > -1) {
        students[i].parentNode.parentNode.style.display= '';
      } else {
        students[i].parentNode.parentNode.style.display= 'none';
      }
    }
    updatePagination();
    showPage(searchResults, 1, limitPerPage);
    if (searchResults.length === 0 && document.querySelector('.modal') === null) {
      createMessage();
    }
    if (searchResults.length > 0 && document.querySelector('.modal') !== null) {
      removeMessage();
    }
  }

// ------------------------------------------
//  CREATE SEARCH INPUT
//  Dynamically adds search input and attaches event listeners
// ------------------------------------------
function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

var ref = document.querySelector('div.before');

function createSearch() {
    const div = document.createElement('div');
    const pageHeader = document.querySelector('.page-header');
    div.setAttribute('class', 'student-search');
    const searchInput = document.createElement('input');
    searchInput.setAttribute('placeholder', 'Search for students...');
    pageHeader.appendChild(div);
    div.appendChild(searchInput)
    const searchBtn = document.createElement('button');
    searchBtn.textContent = 'Search';
    insertAfter(searchBtn, searchInput)
    const search = document.querySelector('BUTTON');
    const input = document.querySelector('INPUT');
    search.addEventListener('click', filterStudents);
    input.addEventListener('keyup', filterStudents);
}

createSearch();

// Function clears and updates current users being displayed.
function updatePagination() {
  searchResults=[];
  numberOfStudents =0;
  page.removeChild(page.childNodes[07]);
  for (i=0; i<studentItems.length; i++) {
      if(studentItems[i].style.display === '') {
      searchResults.push(studentItems[i]);
      numberOfStudents += 1;
    }
  }
  appendPageLinks();
}
