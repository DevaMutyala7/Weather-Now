import axios from 'axios'

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f33a484cf794d08d0148764789aaba32';


export default async function Api(query){
    let result = await axios.get(URL,{
        params : {
            q: query,
            units: 'metrics',
            APPID: API_KEY 
        }
    }).then(response => response)
    .catch((error)=> {
        return {error}
    })

    return result
}