import React from 'react';

const Results = function (props) {
    const resultsData = props.searchRes.map(function (item) {
        return <div className='flight-section-box'>
            <div>
                <h2>{item.fare}</h2>
                <p className='ai-number'>{item.aiNumber}</p>
                <p>{item.srcCityCode + ' > ' + item.destCityCode}</p>
                <p>Depart: {item.depart}</p>
                <p>Arrive: {item.arrival}</p>
            </div>
        </div>
    })
    return <div>{resultsData}</div>
};

export default Results;