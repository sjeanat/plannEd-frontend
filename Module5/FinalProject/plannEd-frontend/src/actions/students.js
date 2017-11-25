export function signUpUser(email, firstName, lastName) { //CHECKED
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch("http://localhost:3000/api/v1/students/sign_up", {
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

export function signInUser(email) { //CHECKED
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch(`http://localhost:3000/api/v1/students/sign_in`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email })
    })
    .then(resp => resp.json())
    .then(student => {dispatch({ type: "SIGNED_IN", payload: student.id })});
  };
};

export function signOutUser() { //CHECKED
  return { type: "SIGN_OUT"};
};

export function addCourse(student, studentCourse, instructors) { //CHECKED
  return (dispatch) => {
    dispatch({ type: 'LOADING'});
    return fetch(`http://localhost:3000/api/v1/students/add_student_course`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ student, studentCourse, instructors })
    })
    .then(resp => resp.json())
    .then(data => dispatch({ type: 'ADDED_COURSE', payload: { course: data.studentCourse, assignments: data.studentAssignments }));
  };
};

export function fetchSubAssignments(studentAssignmentId) { // CHECKED
  return (dispatch) => {
    dispatch({type: "LOADING"});
    return fetch(`http://localhost:3000/api/v1/students/get_sub_assignments?studentAssignmentId=${studentAssignmentId}`)
      .then(resp => resp.json())
      .then(data => dispatch({ type: "FETCHED_SUB_ASSIGNMENTS", payload: {
        parentAssignmentId: data.parentAssignmentId,
        subAssignments: data.subAssignments
      }}));
  }
}

export function fetchAssignments(studentId) { // CHECKED
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/students/student_assignments?studentId=${studentId}`)
    .then(resp => resp.json())
    .then(data => {dispatch({ type: "FETCHED_ASSIGNMENTS", payload: data.studentAssignments })});
  };
};


export function fetchCourses(studentId) { // CHECKED
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch(`http://localhost:3000/api/v1/students/student_courses?student_id=${studentId}`)
      .then(resp => resp.json())
      .then(data => {
        dispatch({ type: "FETCHED_COURSES", payload: data.studentCourses })});
  };
};

export function fetchDirectorySubjects(semester, year) { // CHECKED
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch(`https://classes.cornell.edu/api/2.0/config/subjects.json?roster=${semester}${year}`)
	    .then(resp => resp.json())
	    .then(json => {
        dispatch({ type: "FETCHED_DIRECTORY_SUBJECTS", payload: json.data.subjects})});
  };
};

export function fetchDirectoryCourses(semester, year, subject) { // CHECKED
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch(`https://classes.cornell.edu/api/2.0/search/classes.json?roster=${semester}${year}&subject=${subject}`)
	    .then(resp => resp.json())
	    .then(json => {
        dispatch({ type: "FETCHED_DIRECTORY_COURSES", payload: json.data.courses })});
  };
};

export function completeAssignment(studentAssignmentId) { // CHECKED
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch("http://localhost:3000/api/v1/students/complete_assignment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ studentAssignmentId })
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch({ type: "COMPLETED_ASSIGNMENT", payload: json.studentAssignment.studentAssignmentId })
      })
  };
};

export function selectAssignment(studentAssignmentId) {
  return {
    type: "SELECT_ASSIGNMENT",
    payload: studentAssignmentId
  }
};

export function selectCourse(studentCourseId) {
  return {
    type: "SELECT_COURSE",
    payload: studentCourseId
  }
};
