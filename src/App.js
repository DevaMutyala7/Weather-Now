import React,{useState} from 'react'
import './App.css'
import Api from './data/Api'
import icon from './images/icon.png'

export default function App(){
    let [query,setQuery] = useState('')
    let [weather,setWeather] = useState({})

    function converter(timestamp){
        let date = new Date(timestamp * 1000)

        let hours = 0 +date.getHours()

        let minutes = 0 + date.getMinutes()

        let time = hours + " : " + minutes

        return time
    }

    async function hitApi(e){
        if(query)
        {
             let weatherdata = await Api(query)
             setWeather(weatherdata)
             setQuery('')
        }

    }

    return (
        
        <div className="container">
            <div className="content">
                 <h1>Weather Now<span className="sunicon"><img src={icon} alt="sun" className="weathericon"/></span></h1>
                 <input 
                    className="search"
                    type="text"
                    value={query}
                    onChange={(e)=>{
                        setQuery(e.target.value)
                    }}
                    placeholder="Enter City Name"
                 />
                 <button onClick={(e)=>hitApi(e)} className="submit"> Search </button>
                 {weather.data && 
                    <div className="flex-container">
                        <div className="card-container">
                                <h2 className="city-name">{weather.data.name}<sup className="country">{weather.data.sys.country}</sup></h2>
                                <p className="temp">{Math.round(weather.data.main.feels_like-273.15)} <sup className="celsius">&deg; C</sup></p>
                                <div className="info">
                                    <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} alt="temperature"/>
                                    <p className="weather-desc">{weather.data.weather[0].description}</p>
                                </div>
                        </div>
                        <div className="card-container suntimings">
                            <div className="sunrise">
                                <p className="subheading">Sunrise</p>
                                <i className="fad fa-sunrise fa-4x rise"></i>
                                <p className="values">{converter(weather.data.sys.sunrise)} A.M</p>
                            </div>
                            <div className="sunset">
                                <p className="subheading">Sunset</p>
                                <i className="fad fa-sunset fa-4x set"></i>
                                <p className="values">{converter(weather.data.sys.sunset)} P.M</p>
                            </div>
                        </div>
                        <div className="card-container wind">
                                <div>
                                    <p className="subheading">Wind Speed</p>
                                    <i className="fas fa-wind fa-4x speed"></i>
                                    <p className="values">{weather.data.wind.speed} knot</p>
                                </div>
                                <div>
                                    <p className="subheading">direction</p>
                                    <i className="fas fa-compass fa-4x direction"></i>
                                    <p className="values">{weather.data.wind.deg} deg</p>
                                </div>
                        </div>
                        <div className="card-container humidity">
                                <div>
                                    <p className="subheading">Humidity</p>
                                    <i className="fa fa-humidity fa-4x humid"></i>
                                    <p className="values">{weather.data.main.humidity} %</p>
                                </div>
                                <div>
                                    <p className="subheading">Max Temperature</p>
                                    <i className="fas fa-temperature-high fa-4x max_temp"></i>
                                    <p className="values">{Math.round(weather.data.main.temp_max - 273.15)} <sup>&deg; c</sup></p>
                                </div>
                                <div>
                                    <p className="subheading">Min Temperature</p>
                                    <i className="fas fa-temperature-low fa-4x min_temp"></i>
                                    <p className="values">{Math.round(weather.data.main.temp_min - 273.15)} <sup>&deg; c</sup></p>
                                </div>
                        </div>
                    </div>
                 }
                 {weather.error && <h2 className="alert">You are currently offline or No city Found for your request</h2>}
            </div>
        </div>
    )
}