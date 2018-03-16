//登录页面内容
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onLogin } from '../actions';
import history from '../init/history';
import '../css/AddMoive.css';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Password: ""
    }
    this.onLoginChange = this.onLoginChange.bind(this);
  };
  onLoginChange(event) {
    let onsetData = this.state;
    onsetData[event.target.name] = event.target.value;
    this.setState({
      ...onsetData
    })
  };
  render() {
    let showLogin = JSON.stringify(this.props.LoginFilter) !== '{}' ? true : false;
    if (showLogin) 
      history.goBack()
    return (
      <div className="addContent">
        <div className="addFromDiv" >
          <div className="itemDiv itemDivLoadAnimation" >
            <input type="text" readOnly="true" value="Name" />
            [<label >账号:</label>]
          <input type="text" name="Name" onChange={this.onLoginChange} />
          </div>
          <div className="itemDiv itemDivLoadAnimation" >
            <input type="text" readOnly="true" value="Password" />
            [<label >密码:</label>]
          <input type="password" name="Password" onChange={this.onLoginChange} />
          </div>
          <div className="buttonDiv">
            <button onClick={e => {
              this.props.onClick(this.state)
            }
            }>提交</button>
          </div>
        </div>
      </div>
    )
  }
}
Login = connect(
  state => state,
  dispatch => ({
    onClick: (value) => {
      dispatch(onLogin(value));
    }
  })
)(Login)

export default Login;