import React, { Component } from 'react';
import '../css/AddMoive.css';
class AddMoive extends Component {
    constructor() {
        super();
        this.state = {
            submitData: [{
                id: "Name",
                name: "片名",
                value: ""
            }, {
                id: "Name_Tile",
                name: "类型",
                value: ""
            }, {
                id: "Director",
                name: "导演",
                value: ""
            }, {
                id: "Decsription",
                name: "简介",
                value: ""
            }, {
                id: "Date_Time",
                name: "上映时间",
                value: ""
            }, {
                id: "Image_Url",
                name: "图片",
                value: ""
            }, {
                id: "Sownload_Url",
                name: "下载地址",
                value: ""
            }, {
                id: "Create_Time",
                name: "添加时间",
                value: new Date()
            }, {
                id: "Create_User",
                name: "创建人",
                value: "1"
            }, {
                id: "Is_Delete",
                name: "是否删除",
                value: "2"
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
        let data = {}
        for (let i = 0; i < datalist.length; i++) {
            if (datalist[i].value === "") {
                alert(datalist[i].id + "不能为空");
                return
            }
            data[datalist[i].id] = datalist[i].value;
        }
        console.log(data);
    }
    onSubmitAnimation() {
        this.refs.addFromDiv.className = "addFromDiv addFromDivAnimation";
        setTimeout(() => {
            this.refs.addOverAnimation.className = "addOver addOverAnimation";
        }, 1800);
    }
    render() {
        let list = this.state.submitData.map((value, key) => {
            if (key >= 7) return null;
            let ontext;
            if (value.name === "图片" || value.name === "下载地址") {
                ontext = (<textarea name={key} value={value.value} onChange={this.valueChange}></textarea>);
            } else {
                ontext = (<input type="text" name={key} value={value.value} onChange={this.valueChange} />)
            }
            return (
                <div className="itemDiv" key={value.id}>
                    <input type="text" readOnly="true" disabled value={value.id} />
                    [<label >{value.name}:</label>]
                        {ontext}
                </div>
            )
        })
        return (
            <div className="addContent">
                <div className="addFromDiv" ref="addFromDiv">
                    {list}
                    <div className="buttonDiv">
                        <button onClick={this.onSubmit}>提交</button>
                        <button onClick={this.onSubmitAnimation}>重置</button>
                    </div>
                </div>
                <div className="addOver" ref="addOverAnimation">sss</div>
            </div>
        )
    }
}
export default AddMoive;