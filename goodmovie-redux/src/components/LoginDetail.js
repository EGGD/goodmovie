import React from 'react';
import img from '../init/images'
const LoginDetail = ({ active, onClick }) => {
    console.log(active);
    let onDetailFlg = active.headerFilter.filter((value) => value.showDataFlg === true)[0].name;
    let loginDetail = active.loginDetailFilter;
    let showModulesFilter = active.showModulesFilter;
    return (
        // <div className="divAbsolute">
        //     <img alt="left" src={img.leftimg} className={this.state.showindex === 2 ? '' : 'displayNone'} onClick={this.divAbsolute.bind(this, 'left')} />
        //     <img alt="top" src={img.topimg} onClick={this.divAbsolute.bind(this, 'top')} />
        //     {/* {onlogin} */}
        //     <img alt="Conversion" src={img.Conversion} className={this.state.showindex === 2 ? '' : 'displayNone'} onClick={this.divAbsolute.bind(this, 'Conversion')} />
        //     {this.state.notSeenList.total}°
        // </div>
        <div className="divAbsolute">
            <img alt="top" src={img.topimg} />
            <img alt="login" src={loginDetail !== {} ? img.login : img.out} onClick={onClick} />
            <img alt="Conversion" src={img.Conversion} className={onDetailFlg === 'Detail_Movies' ? '' : 'displayNone'} />
            {active.showModulesFilter.total}
        </div>
    )
}
export default LoginDetail;

