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
    studentAssignments: {
      data: [],
      completedFilter: "None",
      courseFilter: "All Courses",
      sortBy: "Due Date",
      sortDirection: "Ascending",
      limit: "",
      display: []
    },
    selectedSemester: "",
    selectedSubject: "",
    selectedCourse: {
      data: null,
      selectedLEC: null,
      selectedDIS: null,
      selectedSEM: null,
      selectedTA: null
    },
    selectedAssignment: {
      id: null,
      subAssignments: [],
      firstChild: true
    },
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
      return {
        ...state,
        studentCourses: [...state.studentCourses, action.payload.studentCourse],
        studentAssignments: {
          ...state.studentAssignments,
          data: [...state.studentAssignments.data, ...action.payload.studentAssignments]
        },
        selectedCourse: {
          data: null,
          selectedLEC: null,
          selectedDIS: null,
          selectedSEM: null,
          selectedTA: null
        },
        loading: false
      };
    case "FETCHED_ASSIGNMENTS":
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          display: action.payload,
          data: action.payload
        },
        loading: false
      };
    case "OLD_FETCHED_SUB_ASSIGNMENTS": //will need work here
      console.log("fetched_sub_assignments")
      const withUpdatedSubAssignment = state.studentAssignments.data.map(studentAssignment => {
        let updated;
        if (studentAssignment.studentAssignmentId === parseInt(action.payload.parentAssignmentId)) {
          updated = {
            ...studentAssignment,
            subAssignments: action.payload.subAssignments
          };
        } else {
          updated = studentAssignment
        }
        return updated;
      });
      console.log("with updated sub assignment", withUpdatedSubAssignment)
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          data: withUpdatedSubAssignment
        },
        loading: false
      };
    case "FETCHED_SUB_ASSIGNMENTS":
      console.log("fetched_sub_assignments:", action.payload.subAssignments)
      const parentId = action.payload.parentAssignmentId;
      const subAssignments = action.payload.subAssignments;


      const newSubAssignments = subAssignments.map(subAss => {
        return {
          id: subAss.studentAssignmentId,
          assignment: {
            ...subAss,
            selectedNow: true
          },
          parentId: subAss.parentStudentAssignmentId
        }
      })

      let updatedSubAssignments = [];
      if (state.selectedAssignment.subAssignments.length === 0) {
        console.log("selected assignment:", subAssignments[0].parentStudentAssignmentId)
        return {
          ...state,
          selectedAssignment: {
            ...state.selectedAssignment,
            id: subAssignments[0].parentStudentAssignmentId,
            subAssignments: newSubAssignments
          }
        }
      } else {
          state.selectedAssignment.subAssignments.forEach(subAss => {
            console.log("subAss:", subAss)
          if (subAss.id === parseInt(parentId)) {
            let arr = [subAss, ...newSubAssignments];
            updatedSubAssignments.push(subAss);
            for (let i = 0; i < newSubAssignments.length; i++) {
              updatedSubAssignments.push(newSubAssignments[i]);
            }
          } else {
            updatedSubAssignments.push(subAss);
          }
        })
        console.log("second sub assignment added")
        console.log("updatedSubAssignments:", updatedSubAssignments)
        return {
          ...state,
          selectedAssignment: {
            ...state.selectedAssignment,
            subAssignments: updatedSubAssignments
          }
        }
      }
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
    case "COMPLETED_ASSIGNMENT": ///will need work so you can complete mid-filter
      const dataWithCompletedAssignment = state.studentAssignments.data.map(studentAssignment => {
        if (studentAssignment.studentAssignmentId === action.payload.studentAssignmentId) {
          return {
            ...action.payload
          };
        } else {
          return studentAssignment
        }
      });

      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          data: dataWithCompletedAssignment
        },
        loading: false
      };
    case "SELECT_ASSIGNMENT":
      console.log("select assignment:", action.payload)
      return {
        ...state,
        selectedAssignment: {
          subAssignments: [],
          firstChild: true,
          id: { 1: action.payload }
        }
      };
    case "DESELECT_ASSIGNMENT":
      return {
        ...state,
        selectedAssignment: {
          id: null,
          subAssignments: [],
          firstChild: true
        }
      }
    case "DESELECT_SUB_ASSIGNMENT":
      let subAssignmentsLessDeselected = [];
      let updatedIds = {};
      let selectedIds = this.props.selectedAssignment.id
      // for (key in selectedIds) {
      //   //rebuild selectedIds with each loop
      //     //stop at (and don't include) selectedIds[key] (and beyond)
      //     //collect remaining Ids
      // }
      // //use remaining Ids to filter out subAssignments
      return {
        ...state,
        selectedAssignment: {
          ...state.selectedAssignment,
          id: updatedIds,
          subAssignments: subAssignmentsLessDeselected
        }
      }
    case "SELECT_DIRECTORY_COURSE":
      return {
        ...state,
        selectedCourse: {
          data: action.payload,
          selectedLEC: null,
          selectedDIS: null,
          selectedSEM: null,
          selectedTA: null
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
    case "RESET_ASSIGNMENTS_DISPLAY": //implement and make sure settings are default
      return { // NEEDED?????????????
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          completedFilter: "None",
          courseFilter: "All",
          sortBy: "Due Date",
          sortDirection: "Ascending",
          limit: "None",
          display: state.studentAssignments.data
        }
      }
    case "CHANGE_ASSIGNMENTS_DISPLAY":
      let assignmentsDisplay = state.studentAssignments.data;
      switch (state.studentAssignments.completedFilter) {
        case "None":
          break;
        case "Completed":
          assignmentsDisplay = assignmentsDisplay.filter(assignment => assignment.completed);
          break;
        case "Incomplete":
          assignmentsDisplay = assignmentsDisplay.filter(assignment => !assignment.completed);
          break;
        default: break;
      };
      if (state.studentAssignments.courseFilter !== "All Courses") {
        assignmentsDisplay = assignmentsDisplay.filter(assignment => assignment.studentCourseId === parseInt(state.studentAssignments.courseFilter));
      };
      switch (state.studentAssignments.sortBy) {
        case "Due Date":
          assignmentsDisplay = assignmentsDisplay.sort((a,b) => {
            let dateA = new Date(a.dueDate);
            let dateB = new Date(b.dueDate);
            return dateA - dateB;
          });
          if (state.studentAssignments.sortDirection === "Descending") {
            assignmentsDisplay = assignmentsDisplay.reverse();
          };
          break;
        // case "Course":
        default: break;
      };
      let date = new Date();
      const limitDate = state.studentAssignments.limit === "" ? new Date(date.setDate(date.getDate() + 10)) : new Date(date.setDate(date.getDate() + parseInt(state.studentAssignments.limit)))
      assignmentsDisplay = assignmentsDisplay.filter(assignment => (new Date(assignment.dueDate)) < limitDate);
      //apply limit
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          display: assignmentsDisplay
        }
      };
    case "FILTER_BY_COURSE":
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          courseFilter: action.payload
        }
      }
    case "FILTER_BY_COMPLETED":
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          completedFilter: "Completed"
        }
      }
    case "FILTER_BY_INCOMPLETE":
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          completedFilter: "Incomplete"
        }
      }
    case "REMOVE_COMPLETED_FILTER":
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          completedFilter: "None"
        }
      }
    case "SORT_BY":
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          sortBy: action.payload
        }
      }
    case "SORT_DIRECTION":
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          sortDirection: action.payload
        }
      }
    case "LIMIT_CHANGE":
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          limit: action.payload
        }
      }
    default:
      return state;
  }
};
