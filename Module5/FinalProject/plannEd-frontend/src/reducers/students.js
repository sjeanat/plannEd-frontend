export default function studentReducer(
  state = {
    calendar: {
      courses: [],
      dueDates: [],
      toDoItems: [],
      selectedEvent: {}
    },
    directory: {
      subjects: [],
      courses: [],
      addConflict: null
    },
    student: {
      id: null,
      email: "",
      firstName: "",
      lastName: ""
    },
    studentCourses: [],
    studentCourseIds: [],
    studentAssignments: {
      data: [],
      completedFilter: "None",
      courseFilter: "All Courses",
      sortBy: "Due Date",
      sortDirection: "Ascending",
      limit: 100,
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
    selectedForTodo: 0,
    slotSelected: false,
    selectedSlot: {
      startTime: null,
      endTime: null,
      info: null,
      title: null
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
        calendar: {
          courses: [],
          toDoItems: [],
          selectedEvent: {},
          dueDates: []
        },
        directory: {
          subjects: [],
          courses: [],
          addConflict: null
        },
        student: {
          id: null,
          email: "",
          firstName: "",
          lastName: ""
        },
        studentCourses: [],
        studentCourseIds: [],
        studentAssignments: {
          data: [],
          completedFilter: "None",
          courseFilter: "All Courses",
          sortBy: "Due Date",
          sortDirection: "Ascending",
          limit: null,
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
        selectedForTodo: 0,
        selectedAssignment: {
          id: [],
          subAssignments: [],
          firstChild: true
        },
        loading: false
      };
    case "ADD_COURSE_TIME_CONFLICT":
      return {
        ...state,
        directory: {
          ...state.directory,
          addConflict: action.payload
        }
      };
    case "REMOVE_ADD_CONFLICT":
      return {
        ...state,
        directory: {
          ...state.directory,
          addConflict: null
        }
      };
    case "ADDED_COURSE":
      //CREATE EVENTS FOR COURSE DATES
      // const beginDt = new Date(newCourse.sessionBeginDt);
      // const endDt = new Date(newCourse.sessionEndDt);
      // let timeStart = newCourse.timeStart.match(/[a-zA-Z]+|[0-9]+/g)
      // timeStart[0] = timeStart[2] === "PM" ? parseInt(timeStart[0]) + 12 : timeStart[0]
      // let timeEnd = newCourse.timeEnd.match(/[a-zA-Z]+|[0-9]+/g)
      // timeEnd[0] = timeEnd[2] === "PM" ? parseInt(timeEnd[0]) + 12 : timeEnd[0]
      // let updatedCourses = [];
      // const startDates = newCourse.pattern.split("").map(day => {
      //   let num;
      //   let bgnDt = new Date(beginDt);
      //   switch (day) {
      //     case "M":
      //       num = 7;
      //       break;
      //     case "T":
      //       num = 8;
      //       break;
      //     case "W":
      //       num = 9;
      //       break;
      //     case "R":
      //       num = 10;
      //       break;
      //     case "F":
      //       num = 11;
      //       break;
      //     default: break;
      //   };
      //   bgnDt.setDate(bgnDt.getDate() + (1 + num - bgnDt.getDay()) % 7);
      //   bgnDt.setHours(timeStart[0])
      //   bgnDt.setMinutes(timeStart[1])
      //   return bgnDt;
      // });
      //
      // const courseDates = [];
      // startDates.forEach(start => {
      //   let max = Math.round((endDt-start)/(1000*60*60*24))
      //   for (let i = 1; i <= Math.floor(max/7) + 1; i++) {
      //     let courseDt = new Date(start);
      //     courseDt.setDate(courseDt.getDate() + (i * 7));
      //     let courseDtEnd = new Date(courseDt);
      //     courseDtEnd.setHours(timeEnd[0]);
      //     courseDtEnd.setMinutes(timeEnd[1]);
      //     courseDates.push({
      //       'title': `${newCourse.subject} ${newCourse.catalogNbr}`,
      //       'startDate': courseDt,
      //       'endDate': courseDtEnd
      //     });
      //   };
      // })

      //CREATE EVENTS FOR COURSE ASSIGNMENTS
      // const assignmentDueDates = action.payload.dueDates.map(date => {
      //   return {
      //     'title': `Due ${date.title}`, //change title later
      //     'startDate': new Date(date.startDate),
      //     'endDate': new Date(date.endDate)
      //   }
      // });
      // const newAssignments = action.payload.studentAssignments;

      return {
        ...state,
        calendar: {
          ...state.calendar,
          courses: [...state.calendar.courses, ...action.payload.courseDates],
          dueDates: [...state.calendar.dueDates, ...action.payload.dueDates]
        },
        studentCourses: [...state.studentCourses, action.payload.studentCourse],
        studentCourseIds: [...state.studentCourseIds, action.payload.studentCourse.crseId],
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
      console.log('fetched_assignments payload:', action.payload)
      const fetchedAssignments = action.payload.studentAssignments;
      const fetchedDueDates = action.payload.dueDates;
      const fetchedCourseDates = action.payload.courseDates;
      const fetchedToDoItems = action.payload.toDoItems;
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          display: fetchedAssignments,
          data: fetchedAssignments
        },
        calendar: {
          ...state.calendar,
          courses: fetchedCourseDates,
          dueDates: fetchedDueDates,
          toDoItems: fetchedToDoItems
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

      const selectedIdsWithFetched = [...state.selectedAssignment.id, fetchedIds];

      let updatedSubAssignments = [];
      if (!hasParent) {
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
      const rootAssignments = action.payload.rootAssignments;
      const subRootAssignments = action.payload.subAssignments;
      const ids = action.payload.ids;

      const subAssignmentsWithComplete = state.selectedAssignment.subAssignments.map((subAss, idx) => {
        if (ids.includes(subAss.id)) {
          return {
            ...subAss,
            assignment: {
              ...subAss.assignment,
              completed: subRootAssignments[idx].completed
            }
          }
        } else {
          return subAss
        }
      })
      const rootAssignmentsWithComplete = state.studentAssignments.data.map((ass, idx) => {
        if (ids.includes(ass.studentAssignmentId)) {
          return {
            ...ass,
            completed: rootAssignments[idx].completed
          }
        } else {
          return ass
        }
      })
      //if parent assignment is complete update parent
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          data: rootAssignmentsWithComplete
        },
        selectedAssignment: {
          ...state.selectedAssignment,
          subAssignments: subAssignmentsWithComplete
        }
      }
    case "COMPLETED_PARENT":
      const withChildrenIds = action.payload.ids;
      const completed = action.payload.completed;
      const rootAssignmentsWithCompletedParent = state.studentAssignments.data.map(ass => {
        if (withChildrenIds.includes(ass.studentAssignmentId)) {
          return {
            ...ass,
            completed: completed
          }
        } else {
          return ass
        }
      });
      const subAssignmentsWithCompletedParent = state.selectedAssignment.subAssignments.map(ass => {
        if (withChildrenIds.includes(ass.id)) {
          return {
            ...ass,
            assignment: {
              ...ass.assignment,
              completed: completed
            }
          }
        } else {
          return ass
        }
      });
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          data: rootAssignmentsWithCompletedParent
        },
        selectedAssignment: {
          ...state.selectedAssignment,
          subAssignments: subAssignmentsWithCompletedParent
        }
      }
    case "SELECT_ASSIGNMENT":
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
          limit: "",
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
      const limitDate = !!state.studentAssignments.limit ? new Date(date.setDate(date.getDate() + state.studentAssignments.limit)) : new Date(date.setDate(date.getDate() + 100));
      console.log("assignments display before filter", assignmentsDisplay)


      assignmentsDisplay = assignmentsDisplay.filter(assignment => (new Date(assignment.dueDate)) < limitDate);
      //apply limit
      console.log("change assignments display:", assignmentsDisplay)
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
    case "SELECT_FOR_TO_DO":
      console.log("selected for to do:", action.payload)
      return {
        ...state,
        selectedForToDo: action.payload
      }
    case "DESELECT_FOR_TO_DO":
      console.log("reducer deselect to do")
      return {
        ...state,
        selectedForToDo: 0
      }
    case "SELECT_SLOT":
      return {
        ...state,
        slotSelected: true,
        selectedSlot: {
          ...state.selectedSlot,
          info: action.payload
        }
      }
    case "START_CHANGE":
      return {
        ...state,
        selectedSlot: {
          ...state.selectedSlot,
          startTime: action.payload
        }
      }
    case "END_CHANGE":
      console.log("end change", action.payload)
      return {
        ...state,
        selectedSlot: {
          ...state.selectedSlot,
          endTime: action.payload
        }
      }
    case "TITLE_CHANGE":
      return {
        ...state,
        selectedSlot: {
          ...state.selectedSlot,
          title: action.payload
        }
      }
    case "SUBMITTED_TO_DO":
      return {
        ...state,
        calendar: {
          ...state.calendar,
          toDoItems: [...state.calendar.toDoItems, action.payload]
        }
      }
    default:
      return state;
  }
};
