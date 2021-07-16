//variable
const courses = document.getElementById('courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody');
      clearBtn = document.getElementById('clear-cart');




//event listener
eventListener()


function eventListener(){
    courses.addEventListener('click', buyCourse);
    shoppingCartContent.addEventListener('click', removeCourse);
    document.addEventListener('DOMContentLoaded', coursePersistent);
    clearBtn.addEventListener('click', clearall);

}



//function

function buyCourse(e){
    e.preventDefault();

    if(e.target.classList.contains('add-to-cart')){
        const course = e.target.parentElement.parentElement;
        getCourseInfo(course);
    }
}

function getCourseInfo(course){

    const courseInfo = {
         title: course.querySelector('h4').textContent,
         price: course.querySelector('.u-pull-right').textContent,
         image: course.querySelector('.course-image').src,
         id: course.querySelector('a').getAttribute('data-id') 
    }

    addIntoCart(courseInfo);
 
}

function addIntoCart(course){
    const row = document.createElement('tr');

    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;
    shoppingCartContent.appendChild(row);

    saveInfoStorage(course);
}

function saveInfoStorage(course){

    let courses = getCoursesFromStorage();

    courses.push(course);

    localStorage.setItem( 'courses', JSON.stringify(courses) );

}

function getCoursesFromStorage(){
    let courses;
    
    if(localStorage.getItem('courses') === null){
        courses = [];
    } else{
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}



function coursePersistent(){
    let coursesLS =getCoursesFromStorage();

    coursesLS.forEach(function(course){
        const row = document.createElement('tr');

        row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;
    shoppingCartContent.appendChild(row);
    })
}



function removeCourse(e){
    let course, courseID;
    if(e.target.classList.contains('remove')){
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseID = course.querySelector('a').getAttribute('data-id');
    }
    removeFromLocalStorage(courseID);
}

function removeFromLocalStorage(id){
    let coursesLS = getCoursesFromStorage();
    
    coursesLS.forEach(function(courseLS, index){
        if(courseLS.id === id){
            coursesLS.splice(index, 1);
        }
    });

    localStorage.setItem('courses', JSON.stringify(coursesLS));
}


function clearall(){
    while(shoppingCartContent.firstChild){
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    localStorage.clear();
}
