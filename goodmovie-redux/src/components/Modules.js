import React from 'react';
import { connect } from 'react-redux';
import Seen from './Seen';
import DetailMovie from './DetailMovie';

const Modules = ({ active, onClick,onsetClick }) => {
    let modulesData = active.showModulesFilter;
    let headerData = active.headerFilter;
    // console.log(active);
    let Content2 = headerData.map((e, index) => {
        if (e.showDataFlg && e.name === 'NotSeen_Movies')
            return <Seen onClick={onClick} data={modulesData.notSeenData} key={index} />;
        else if (e.showDataFlg && e.name === 'HaveSeen_Movies')
            return <Seen onClick={onClick} data={modulesData.haveSeenData} key={index} />;
        else if (e.showDataFlg && e.name === 'Detail_Movies')
            return <DetailMovie onClick={onsetClick} data={modulesData.detail} key={index}/>
        else if (e.showDataFlg && e.name === 'Login')
            return e.name;
        else if (e.showDataFlg && e.name === 'Add_Movies')
            return e.name;
    });


    return (
        <ul className="content">
            {Content2}
        </ul>
    )
}
export default Modules;
