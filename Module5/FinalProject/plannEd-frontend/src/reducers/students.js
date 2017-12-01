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
      id: [],
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
      console.log('fetched_assignments', action.payload)
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          display: action.payload,
          data: action.payload
        },
        loading: false
      };
    case "FETCHED_SUB_ASSIGNMENTS":
      const hasParent = action.payload.hasParent;
      const parentId = parseInt(action.payload.parentAssignmentId, 10);
      const subAssignments = action.payload.subAssignments;

      let fetchedIds = [];
      const newSubAssignments = subAssignments.map(subAss => {
        fetchedIds.push(subAss.studentAssignmentId);
        return {
          id: subAss.studentAssignmentId,
          assignment: subAss,
          parentId: parentId
        }
      })
      // debugger
      const selectedIdsWithFetched = [...state.selectedAssignment.id, fetchedIds];


      let updatedSubAssignments = [];
      if (!hasParent) {
        console.log("new state selectedAssignment",{
          ...state.selectedAssignment,
          id: [[parentId]],
          subAssignments: newSubAssignments
        })
        return {
          ...state,
          selectedAssignment: {
            ...state.selectedAssignment,
            id: [[parentId]],
            subAssignments: newSubAssignments
          }
        }
      } else {
          state.selectedAssignment.subAssignments.forEach(subAss => {
            if (subAss.id === parentId) {
              updatedSubAssignments = [...updatedSubAssignments, subAss, ...newSubAssignments];
            } else {
              updatedSubAssignments.push(subAss);
            };
          });
        return {
          ...state,
          selectedAssignment: {
            ...state.selectedAssignment,
            id: selectedIdsWithFetched,
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
    case "COMPLETED_SUB_ASSIGNMENT":
      const completedAssignment = action.payload;
      const subAssignmentsWithComplete = state.selectedAssignment.subAssignments.map(subAss => {
        if (subAss.id === completedAssignment.studentAssignmentId) {
          return {
            ...subAss,
            assignment: {
              ...subAss.assignment,
              completed: completedAssignment.completed
            }
          }
        } else {
          return subAss
        }
      })
      //if parent assignment is complete update parent
      return {
        ...state,
        selectedAssignment: {
          ...state.selectedAssignment,
          subAssignments: subAssignmentsWithComplete
        }
      }
    case "SELECT_ASSIGNMENT":
      console.log("select assignment")
      return {
        ...state,
        selectedAssignment: {
          subAssignments: [],
          firstChild: true,
          id: [action.payload]
        }
      };
    case "DESELECT_ASSIGNMENT":
      return {
        ...state,
        selectedAssignment: {
          id: [],
          subAssignments: [],
          firstChild: true
        }
      }
    case "DESELECT_SUB_ASSIGNMENT":
      const deselectParentId = action.payload;
      let selectedIds = state.selectedAssignment.id;
      let deselectIds = [];
      let updatedIds = [];
      //rebuild selectedIds with each loop
      //stop at (and don't include) selectedIds[key] (and beyond)
      //collect remaining Ids

      const subAssignmentsLessDeselected = state.selectedAssignment.subAssignments.filter(subAss => {
        if (subAss.parentId === deselectParentId) {
          deselectIds.push(subAss.id)
          return subAss.parentId !== deselectParentId
        } else {
          return subAss.parentId !== deselectParentId
        }
      });

      let continueSearch = true;
      selectedIds.forEach(idSet => {
        if (continueSearch) {

          idSet.forEach(id => {
            if (deselectIds.includes(id)) {
              continueSearch = false;
            }
          })
          if (continueSearch) {
            updatedIds.push(idSet)
          }
        }
      })

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
        assignmentsDisplay = assignmentsDisplay.filter(assignment => assignment.studentCourseId === parseInt(state.studentAssignments.courseFilter, 10));
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
      const limitDate = state.studentAssignments.limit === "" ? new Date(date.setDate(date.getDate() + 10)) : new Date(date.setDate(date.getDate() + parseInt(state.studentAssignments.limit, 10)))
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
