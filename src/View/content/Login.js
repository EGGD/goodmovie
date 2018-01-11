import React, { Component } from 'react';
import '../css/AddMoive.css';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            submitData: [{
                id: "name",
                name: "账号名",
                value: ""
            }, {
                id: "password",
                name: "密码",
                value: ""
            }]
        }
        this.valueChange = this.valueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitAnimation = this.onSubmitAnimation.bind(this);
    }
    valueChange(event) {
        let onsetData = this.state.submitData;
        onsetData[event.target.name].value = event.target.value;
        this.setState({
            submitData: onsetData
        })
    }
    onSubmit() {
        const datalist = this.state.submitData;
        let data = {}, that = this;
        for (let i = 0; i < datalist.length; i++) {
            data[datalist[i].id] = datalist[i].value;
        }
        // console.log(data);
        fetch('http://localhost:3001/postUser', {
            method: "POST",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => {
            res.json().then(data => {
                if (data.code === '200') {
                    console.log(data.msg);
                    localStorage.setItem("user", JSON.stringify(data.msg));
                    that.props.showOnLogin();
                    alert("登录成功");
                } else {
                    alert("账号或密码不正确")
                }
            })
        });
    }
    onSubmitAnimation() {
        this.refs.addFromDiv.className = "addFromDiv addFromDivAnimation";
        setTimeout(() => {
            this.refs.addOverAnimation.className = "addOver addOverAnimation";
        }, 1800);
    }
    componentDidMount() {
        var divlist = document.getElementsByClassName("itemDiv");
        for (let i = 0; i < divlist.length; i++) {
            setTimeout(() => {
                divlist[i].classList.add("itemDivLoadAnimation");
            }, 70 * i);
        }
    }
    render() {
        let list = this.state.submitData.map((value, key) => {
            let iput;
            if (value.id === 'password') {
                iput = (<input type="password" name={key} value={value.value} onChange={this.valueChange} />)
            } else {
                iput = (<input type="text" name={key} value={value.value} onChange={this.valueChange} />)
            }
            return (
                <div className="itemDiv" key={value.id}>
                    <input type="text" readOnly="true" disabled value={value.id} />
                    [<label >{value.name}:</label>]
                    {/* <input type="password" name={key} value={value.value} onChange={this.valueChange} /> */}
                    {iput}
                </div>
            )
        })
        return (
            <div className="addContent">
                <div className="addFromDiv" ref="addFromDiv">
                    {list}
                    <div className="buttonDiv">
                        <button onClick={this.onSubmit}>提交</button>
                    </div>
                </div>
                <div className="addOver" ref="addOverAnimation">sss</div>
            </div>
        )
    }
}
export default Login;