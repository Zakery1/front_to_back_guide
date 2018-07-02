
import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class CoolComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            temperature: null,
            weather:'',
            icon:'',
            zipCode: '85253',
            cityName: 'Paradise Valley',
            countrycode: 'us'

        }
        this.getWeather = this.getWeather.bind(this)
    }   
    componentDidMount(){
        function kelvToFaren(kelv){
            return Math.floor((kelv * (9/5)- 459.67));
        }
    }
    getWeather(){
        function kelvToFaren(kelv){
            return Math.floor((kelv * (9/5)- 459.67));}
         axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName},${this.state.countrycode}&APPID=07645a2f33409ec8cfa3f1508600b26b`).then(response => {

            var tempKelvin = response.data.main.temp;
            var weather = response.data.weather[0].description;
            var icon = response.data.weather[0].icon;
            var cityname = response.data.name;
            var countrycode = response.data.country;
            console.log(response.data)
            this.setState({
                temperature: kelvToFaren(tempKelvin),
                weather: weather,
                icon: icon,
                cityName: cityname,
                countrycode: countrycode
            })   
        })
    
    }
    

    updateZip(zip){
        function kelvToFaren(kelv){
            return Math.floor((kelv * (9/5)- 459.67));
        }
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName},${this.state.countrycode}&APPID=07645a2f33409ec8cfa3f1508600b26b`).then(response => {
            var tempKelvin = response.data.main.temp;
            var weather = response.data.weather[0].description;
            var icon = response.data.weather[0].icon;
            var cityname = response.data.name;
            var countryname = response.data.country;
            console.log(response.data.name)
            this.setState({
                temperature: kelvToFaren(tempKelvin),
                weather: weather,
                icon: icon,
                cityName: cityname,
                countryName: countryname
            })     
        })
    }

    render(){
        return(
            <div className='movie-displayer weatherTile'>
                <h2 className='weather-h2'>Weather:</h2>
                <p> the temperature in {this.state.cityName}:</p>
                <p className='temp'>{this.state.temperature}&#8457;</p>
                <input className='input-periphs weatherZip' onChange={(e) => this.setState({cityName: e.target.value})} placeholder='Enter City Name'/>
                <input className='input-periphs weatherZip' onChange={(e) => this.setState({countrycode: e.target.value})} placeholder='Enter Country Initials'/>
                <button className="reviewButton btn input-periphs" onClick={() => this.updateZip(this.state.cityName)} >Submit</button>
            </div>
        )
    }
}

export default CoolComponent;