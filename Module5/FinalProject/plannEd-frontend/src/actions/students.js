export function signUpUser(email, firstName, lastName) {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch("http://192.168.0.3:3000/api/v1/students/sign_up", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({email, firstName, lastName})
    })
    .then(resp => resp.json())
    .then(json => {dispatch({ type: "SIGNED_UP", payload: json.student })});
  };
};

export function signInUser(email) {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch(`http://192.168.0.3:3000/api/v1/students/sign_in`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email })
    })
    .then(resp => resp.json())
    .then(json => {
      return fetch(`http://192.168.0.3:3000/api/v1/students/student_courses?studentId=${json.student.id}`)
      .then(resp => resp.json())
      .then(data => {
        dispatch({ type: "SIGNED_IN_AND_FETCHED_COURSES", payload: {
              studentCourses: data.studentCourses,
              student: json.student
            }
        });
      });
    });
  };
};

export function enterEmail(email) {
  return {
    type: "ENTER_EMAIL",
    payload: email
  }
}

export function enterFirstName(firstName) {
  return {
    type: "ENTER_FIRST_NAME",
    payload: firstName
  }
}

export function enterLastName(lastName) {
  return {
    type: "ENTER_LAST_NAME",
    payload: lastName
  }
}

export function enterDirectorySemester(semester) {
  return {
    type: "SELECT_DIRECTORY_SEMESTER",
    payload: semester
  }
}

export function enterDirectorySubject(subject) {
  return {
    type: "SELECT_DIRECTORY_SUBJECT",
    payload: subject
  }
}

export function signOutUser() {
  return { type: "SIGN_OUT"};
};

export function addCourse(student, studentCourse, instructors) {
  return (dispatch) => {
    dispatch({ type: 'LOADING'});
    return fetch(`http://192.168.0.3:3000/api/v1/students/add_student_course`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ student, studentCourse, instructors })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        dispatch({ type: 'ADD_COURSE_TIME_CONFLICT', payload: data.error });
      } else {
        dispatch({ type: 'ADDED_COURSE', payload: { studentCourse: data.studentCourse, studentAssignments: data.studentAssignments, dueDates: data.dueDates, courseDates: data.courseDates }})
        dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" })
      }
    });
  };
};

export function removeAddConflict() {
  return {
    type: "REMOVE_ADD_CONFLICT"
  }
};

export function fetchSubAssignments(studentAssignmentId) { // CHECKED
  return (dispatch) => {
    dispatch({type: "LOADING"});
    return fetch(`http://192.168.0.3:3000/api/v1/students/get_sub_assignments?studentAssignmentId=${studentAssignmentId}`)
      .then(resp => resp.json())
      .then(data => {
        dispatch({ type: "FETCHED_SUB_ASSIGNMENTS", payload: {
          parentAssignmentId: data.parentAssignmentId,
          subAssignments: data.subAssignments,
          hasParent: data.hasParent
        }})
        dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" })
    });
  }
}

export function fetchAssignments(studentId) { // CHECKED
  return (dispatch) => {
    return fetch(`http://192.168.0.3:3000/api/v1/students/student_assignments?studentId=${studentId}`)
    .then(resp => resp.json())
    .then(data => {
      dispatch({ type: "FETCHED_ASSIGNMENTS", payload: { studentAssignments: data.studentAssignments, dueDates: data.dueDates, courseDates: data.courseDates }})
      dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" })
    });
  };
};



export function fetchDirectorySubjects(semester) { // CHECKED
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch(`https://classes.cornell.edu/api/2.0/config/subjects.json?roster=${semester}`)
	    .then(resp => resp.json())
	    .then(json => {
        dispatch({ type: "FETCHED_DIRECTORY_SUBJECTS", payload: json.data.subjects})});
  };
};

export function fetchDirectoryCourses(semester, subject) { // CHECKED
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch(`https://classes.cornell.edu/api/2.0/search/classes.json?roster=${semester}&subject=${subject}`)
	    .then(resp => resp.json())
	    .then(json => {
        dispatch({ type: "FETCHED_DIRECTORY_COURSES", payload: json.data.classes })});
  };
};

export function completeAssignment(studentAssignmentId, isParent) { // CHECKED
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch("http://192.168.0.3:3000/api/v1/students/complete_assignment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ studentAssignmentId, isParent })
    })
      .then(resp => resp.json())
      .then(json => {
        // ..changes?
        dispatch({ type: "COMPLETED_ASSIGNMENT", payload: json.studentAssignment })
        dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" })
      })
  };
};

export function completeSubAssignment(studentAssignmentId, rootAssignmentIds, subAssignmentIds, isParent) { // CHECKED
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch("http://192.168.0.3:3000/api/v1/students/complete_assignment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ studentAssignmentId, rootAssignmentIds, subAssignmentIds, isSubAssignment: true, isParent: isParent })
    })
      .then(resp => resp.json())
      .then(json => {

        // ..changes?
        dispatch({ type: "COMPLETED_SUB_ASSIGNMENT", payload: {
            rootAssignments: json.rootAssignments,
            subAssignments: json.subAssignments,
            ids: json.ids
          }
        })
        dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" })
      })
  };
};

export function completeParent(studentAssignmentId) {
  return (dispatch) => {
    dispatch({ type: "LOADING "});
    return fetch("http://192.168.0.3:3000/api/v1/students/complete_parent_assignment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ studentAssignmentId })
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch({ type: "COMPLETED_PARENT", payload: { ids: json.ids, completed: json.completed }})
        dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" })
      })
  }
}

export function selectAssignment(studentAssignmentId) {
  return {
    type: "SELECT_ASSIGNMENT",
    payload: studentAssignmentId
  }
};

export function deselectAssignment() {
  return {
    type: "DESELECT_ASSIGNMENT"
  }
};

export function deselectSubAssignment(studentAssignmentId) {
  return {
    type: "DESELECT_SUB_ASSIGNMENT",
    payload: studentAssignmentId
  }
};

export function selectDirectoryCourse(course) {
  return {
    type: "SELECT_DIRECTORY_COURSE",
    payload: course
  }
};

export function selectDirectoryCourseComponent(type, component, section) {
  return {
    type: "SELECT_DIRECTORY_COURSE_COMPONENT",
    payload: {
      type,
      component: {
        ...component,
        section
      }
    }
  }
};

export function sortBy(attribute) { // COMPLETE BELOW //
  return {
    type: "SORT_BY",
    payload: attribute
  }
};

export function sortDirection(direction) {
  return {
    type: "SORT_DIRECTION",
    payload: direction
  }
};

export function limitChange(limit) {
  return {
      type: "LIMIT_CHANGE",
      payload: limit
  }
};

export function filterByCourse(studentCourseId) {
  return {
    type: "FILTER_BY_COURSE",
    payload: studentCourseId
  }
};

export function filterByCompleted() {
  return {
    type: "FILTER_BY_COMPLETED"
  }
};

export function filterByIncomplete() {
  return {
    type: "FILTER_BY_INCOMPLETE"
  }
};

export function removeCompletedFilter() {
  return {
    type: "REMOVE_COMPLETED_FILTER"
  }
};

export function filterByDueDate(days) {
  return {
    type: "FILTER_BY_DUE_DATE",
    payload: days
  }
};

export function changeAssignmentsDisplay() {
  return {
    type: "CHANGE_ASSIGNMENTS_DISPLAY"
  }
};

export function selectForToDo(assignment) {
  return {
    type: "SELECT_FOR_TO_DO",
    payload: assignment
  }
}
