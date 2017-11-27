export default function studentReducer(
  state = {
    directory: {
      subjects: [],
      courses: []
    },
    student: {
      id: null,
      email: "",
      firstName: "",
      lastName: ""
    },
    studentCourses: [],
    studentAssignments: [],
    selectedSemester: "",
    selectedSubject: "",
    selectedCourse: {
      data: [],
      selectedLEC: {},
      selectedDIS: {},
      selectedSEM: {},
      selectedTA: {}
    },
    selectedAssignment: {},
    loading: false
  }, action) {
  switch (action.type) {
    case "SIGNED_UP":
      return {
        ...state,
        student: action.payload,
        loading: false
      };
    case "ENTER_EMAIL":
      return {
        ...state,
        student: {
          ...state.student,
          email: action.payload
        }
      }
    case "ENTER_FIRST_NAME":
      return {
        ...state,
        student: {
          ...state.student,
          firstName: action.payload
        }
      }
    case "ENTER_LAST_NAME":
      return {
        ...state,
        student: {
          ...state.student,
          lastName: action.payload
        }
      }
    case "SIGNED_IN_AND_FETCHED_COURSES":
      return {
        ...state,
        student: action.payload.student, //fix this later
        studentCourses: action.payload.studentCourses,
        loading: false
      };
    case "SIGN_OUT":
      return {
        ...state,
        student: {
          id: null,
          email: "",
          firstName: "",
          lastName: ""
        }
      };
    case "ADDED_COURSE":
    debugger
      return {
        ...state,
        studentCourses: [...state.studentCourses, action.payload.studentCourse],
        studentAssignments: [...state.studentAssignments, ...action.payload.studentAssignments],
        loading: false
      };
    case "FETCHED_ASSIGNMENTS":
      return {
        ...state,
        studentAssignments: action.payload,
        loading: false
      };
    case "FETCHED_SUB_ASSIGNMENTS":
      const withUpdatedSubAssignment = state.studentAssignments.map(studentAssignment => {
        if (studentAssignment.studentAssignmentId === action.payload.parentAssignmentId) {
          return {
            ...studentAssignment,
            subAssignmnets: action.payload.subAssignments
          };
        } else {
          return studentAssignment
        };
      });
      return {
        ...state,
        studentAssignments: withUpdatedSubAssignment,
        loading: false
      };
    case "FETCHED_DIRECTORY_COURSES":
      return {
        ...state,
        directory: {
          ...state.directory,
          courses: action.payload
        },
        loading: false
      };
    case "FETCHED_DIRECTORY_SUBJECTS":
      return {
        ...state,
        directory: {
          ...state.directory,
          subjects: action.payload
        },
        loading: false
      };
    case "SELECT_DIRECTORY_SEMESTER":
      return {
        ...state,
        selectedSemester: action.payload
      }
    case "SELECT_DIRECTORY_SUBJECT":
      return {
        ...state,
        selectedSubject: action.payload
      };
    case "COMPLETED_ASSIGNMENT":
      const withCompletedAssignment = state.studentAssignments.map(studentAssignment => {
        if (studentAssignment.studentAssignmentId === action.payload) {
          return {
            ...studentAssignment,
            completed: true
          };
        } else {
          return studentAssignment
        };
      });
      return {
        ...state,
        studentAssignments: withCompletedAssignment,
        loading: false
      };
    case "SELECT_ASSIGNMENT":
      const selectedAssignment = state.studentAssignments.filter(studentAssignment => {
        return studentAssignment.studentAssignmentId === action.payload
      })[0];
      return {
        ...state,
        selectedAssignment: selectedAssignment
      };
    case "SELECT_DIRECTORY_COURSE":
      // const selectedCourse = state.studentCourses.filter(studentCourse => {
      //   return studentCourse.studentCourseId === action.payload
      // })[0];
      return {
        ...state,
        selectedCourse: {
          ...state.selectedCourse,
          data: action.payload
        }
      }
    case "SELECT_DIRECTORY_COURSE_COMPONENT":
      return {
        ...state,
        selectedCourse: {
          ...state.selectedCourse,
          [`selected${action.payload.type}`]: action.payload.component
        }
      }
    case "LOADING":
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  };
};
