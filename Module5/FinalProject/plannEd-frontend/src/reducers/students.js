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
    selectedYear: "",
    selectedSubject: "",
    selectedCourse: {},
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
    case "SIGNED_IN":
      return {
        ...state,
        student: action.payload,
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
      return {
        ...state,
        studentCourses: [...state.studentCourses, action.payload.studentCourse],
        studentAssignments: [...state.studentAssignments, action.payload.studentAssignments],
        loading: false
      };
    case "FETCHED_ASSIGNMENTS":
      return {
        ...state,
        studentAssignments: action.payload,
        loading: false
      };
    case "FETCHED_SUB_ASSIGNMENTS":
      const updatedAssignments = state.studentAssignments.map(studentAssignment => {
        if (studentAssignment.studentAssignmentId === action.payload.parentAssignmentId) {
          return {
            ...student_assignmnet,
            subAssignmnets: action.payload.subAssignments
          };
        } else {
          return student_assignment
        };
      });
      return {
        ...state,
        studentAssignments: updatedAssignments,
        loading: false
      };
    case "FETCHED_COURSES":
      return {
        ...state,
        studentCourses: action.payload,
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
    case "DIRECTORY_YEAR":
      return {
        ...state,
        selectedYear: action.payload
      }
    case "DIRECTORY_SEMESTER":
      return {
        ...state,
        selectedSemester: action.payload
      }
    case "DIRECTORY_SUBJECT":
      return {
        ...state,
        selectedSubject: action.payload
      };
    case "COMPLETED_ASSIGNMENT":
      const updatedAssignments = state.studentAssignments.map(studentAssignment => {
        if (studentAssignment.studentAssignmentId === action.payload) {
          return {
            ...studentAssignmnet,
            completed: true
          };
        } else {
          return studentAssignment
        };
      });
      return {
        ...state,
        studentAssignments: updatedAssignments,
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
    case "SELECT_COURSE":
      const selectedCourse = state.studentCourses.filter(studentCourse => {
        return studentCourse.studentCourseId === action.payload
      })[0];
      return {
        ...state,
        selectedCourse: selectedCourse
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
