import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDirectorySubjects, fetchDirectoryCourses, enterDirectorySubject, enterDirectorySemester } from '../actions/students';
import SearchIcon from '../components/svgs/SearchIcon';

class DirectorySearchForm extends Component {

  componentDidMount() {
    this.props.onUpdateSemester("FA17");
    this.props.onFetchSubjects("FA17");
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onFetchCourses(this.props.selectedSemester, this.props.selectedSubject);
  };

  handleSemesterChange = (event) => {
    this.props.onUpdateSemester(event.target.value);
    this.props.onFetchSubjects(event.target.value);
  };

  handleSubjectChange = (event) => {
    this.props.onUpdateSubject(event.target.value.toUpperCase());
  };

  render() {
    const subjectOptions = this.props.directorySubjects.map((subj, idx) => {
      return <option key={idx} value={subj.value}>{subj.descrformal}</option>
    })
    return (
      <div className="directory-search-form-wrapper">
        <form className="directory-form" onSubmit={this.handleSubmit}>
          <span className="course-form-label">Semester:</span>
          <div className="form-select-container">
            <select className="form-select" onChange={this.handleSemesterChange} placeholder="select subject">
              <option value="FA17">FA17</option>
              <option value="WI17">WI17</option>
              <option value="SP18">SP18</option>
            </select>
          </div>
          <span className="course-form-label">Subject:</span>
          <div className="form-select-container">
            <input className="course-form-input" list="subjects" name="subjects" onChange={this.handleSubjectChange}/>
          </div>
          <datalist id="subjects">
            {subjectOptions}
          </datalist>
          <button className="button-search" type="submit" value="Search"><SearchIcon /></button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    directorySubjects: state.directory.subjects,
    selectedSemester: state.selectedSemester,
    selectedSubject: state.selectedSubject
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onFetchSubjects: (semester) => {
      dispatch(fetchDirectorySubjects(semester))
    },
    onFetchCourses: (semester, subject) => {
      dispatch(fetchDirectoryCourses(semester, subject));
    },
    onUpdateSemester: (semester) => {
      dispatch(enterDirectorySemester(semester));
    },
    onUpdateSubject: (subject) => {
      dispatch(enterDirectorySubject(subject));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectorySearchForm);
