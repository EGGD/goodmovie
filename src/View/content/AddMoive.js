import React, { Component } from 'react';
import '../css/AddMoive.css';
class AddMoive extends Component {
    constructor(){
        super();
        this.state={
            submitData:[{
                id:"Name",
                name:"片名",
                value:""
            },{
                id:"Name_Tile",
                name:"类型",
                value:""
            },{
                id:"Director",
                name:"导演",
                value:""
            },{
                id:"Decsription",
                name:"简介",
                value:""
            },{
                id:"Date_Time",
                name:"上映时间",
                value:""
            },{
                id:"Create_Time",
                name:"添加时间",
                value:new Date()
            },{
                id:"Create_User",
                name:"创建人",
                value:"1"
            },{
                id:"Is_Delete",
                name:"是否删除",
                value:"2"
            }]
        }
        this.valueChange=this.valueChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    valueChange(event){
        let onsetData=this.state.submitData;
        onsetData[event.target.alt].value=event.target.value;
        this.setState({
            submitData:onsetData
        })
    }
    onSubmit(){
        const datalist=this.state.submitData;
        let data={}
        for(let i=0;i<datalist.length;i++){
            if(datalist[i].value===""){
                alert(datalist[i].id+"不能为空");
                return
            }
            data[datalist[i].id]=datalist[i].value;
        }
        console.log(data);
    }
    render() {
        let list=this.state.submitData.map((value,key)=>{
            return(
                <div className="itemDiv" key={value.id}>
                    <label >{value.name}:</label>
                    <input type="text" alt={key} value={value.value} onChange={this.valueChange}/>
                </div>
            )
        })
        return (
            <div>
                
                {list}
                <button onClick={this.onSubmit}>提交</button>
            </div>
        )
    }
}
export default AddMoive;