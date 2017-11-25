import React, { Component } from 'react';

export default class SignInForm extends Component {

  // handleChange = (event) => {
  //   this.props.onUpdateEmail(event.target.value)
  // };
  //
  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   this.props.onSignin(this.props.email);
  // };

  render() {
    return (
      <div>
        <form>
          <input type="text" />
          <input type="submit" value="sign in"/>
        </form>
      </div>
    );
  };
};
