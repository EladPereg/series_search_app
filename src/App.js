import { useState } from "react";
import "./App.css";
import axios from "axios";
import MoreInfo from "./components/MoreInfo";


function App() {
  const [name, setNmae] = useState('')
  const [arr, setArr] = useState([])
  const [infoFlag, setInfoFlag] = useState(false)
  const [infoArr, setInfoArr] = useState([])

  let resp;
  const doApi = async () => {
    while (arr.length != 0) {
      arr.pop()
      setArr([...arr])
    }
    let url = `https://api.tvmaze.com/search/shows?q=${name}`;
    resp = await axios.get(url);
    for (let i = 0; i < resp.data.length; i++) {
      arr.push(resp.data[i].show)
      setArr([...arr])
    }
    console.log(arr)
  };

  const showInfo = (n, r, p, s, i) => {
    infoArr.push(n, r, p, s, i)
    setInfoArr([...infoArr])
  }
  const showMovies = () => {
    let noPic = <img src="noPicture.jpg"></img>
    return arr.map((val) => {
      return <div id="oneMovie">
        <div style={{ width: '200px', height: '200px', backgroundImage: `url(${val.image == null ? noPic : val.image.original})`, backgroundSize: '70%', backgroundRepeat: 'no-repeat', marginLeft: '2px', marginTop: '9px', paddingLeft: '5px' }}>
          <p id="movieName">{val.name}</p>
          <p className="movieDetails">language: {val.language}</p>
          <p className="movieDetails">type: {val.type}</p>
          <p id="ratingId" className="movieDetails">rating: {val.rating.average == null ? '0' : val.rating.average}</p>
          <button onClick={() => { showInfo(val.name, val.rating, val.premiered, val.summary, val.image.medium); setInfoFlag(true) }} id="movieBtn">More info</button>
        </div>
      </div>
    })
  }

  const check = () => {
    if (arr.length == 0) {
      document.getElementById('lengthMSG').style.display = 'block'
    }
    else{
      return null
    }
  }

  if (arr.length != 0) {
    document.getElementById('startsMSG').style.display = 'none'
    document.getElementById('lengthMSG').style.display = 'none'
  }

  return (
    <div >
      <div id="navBar">
        <p id="mySeriesWeb">My Series Web</p>
        <input id="inp" onChange={(e) => { setNmae(e.target.value) }} type="text" placeholder="Series Name" /> <br />
        <button id="btn" onClick={() => { doApi(); setTimeout(check,1000); }}>search</button>
        <br />
        <p id="startsMSG">Welcome to the series search application, please enter the name of the series you would like to find</p>
         <p id="lengthMSG">Series name not found, please check that you entered the series name correctly </p>
        <div id="allMovies">
          {showMovies()}
        </div>
      </div>
      {infoFlag == true ? <MoreInfo setInfoFlag={setInfoFlag} infoArr={infoArr} setInfoArr={setInfoArr} /> : ''}
    </div>
  );
}

export default App;
