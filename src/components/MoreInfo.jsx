import React from 'react'

export default function MoreInfo(props) {
    return (
        <div id='light_window'>
            <div id='light_inside'>
                <img id='img' src={props.infoArr[4] ==null ? '0' :props.infoArr[4] }></img>
                <h1 id='title'>{props.infoArr[0]}</h1>
                <p className='insideInfo'>Rating: {props.infoArr[1].average == null ? '0' : props.infoArr[1].average}</p>
                <p className='insideInfo'>Date: {props.infoArr[2]}</p>
                <p id='plot'>Plot:{props.infoArr[3] }</p>
                <button id='infoBtn' onClick={() => { props.setInfoArr([]); props.setInfoFlag(false) }}>close</button>
            </div>
        </div>
    )
}