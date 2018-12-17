/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/


// const remainder = 10 * ((numberOfStudents/10) - (Math.floor(numberOfStudents/10))).toFixed(1);
const studentItems = document.querySelectorAll('.student-item');
const numberOfStudents = studentItems.length;
const numberOfPages = Math.ceil(numberOfStudents/10);


// HIDE STUDENTS FUNCTION

function hideStudents() {
  // const studentItems = document.querySelectorAll('.student-item');
  // const numberOfStudents = studentItems.length;
  if (numberOfStudents > 10) {
    for(i = 0; i < numberOfStudents; i++) {
      studentItems[i].style.display = 'none';
    }
  }
};


/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/





/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/


function showPage(list, selectedPage) {
    hideStudents();
    for(i=selectedPage*10-10; i<selectedPage*10 && i<studentItems.length; i++) {
        studentItems[i].style.display = '';
        console.log(i);
    }
};

// Page start initialized with first page
showPage(studentItems, 1)


function appendPageLinks() {
  const page = document.querySelector('.page');
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  page.appendChild(pagination);
  const ul = document.createElement('ul');
  const numberOfPages = Math.ceil(numberOfStudents/10);
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
      showPage(studentItems, selectedPage)
      let paginationLinks = document.querySelectorAll('.pagination a');
      for (i=0; i<paginationLinks.length; i++){
        paginationLinks[i].classList.remove('active');
      }
      e.target.classList.add('active');
    }
  });
}

appendPageLinks();









// Remember to delete the comments that came with this file, and replace them with your own code comments.
