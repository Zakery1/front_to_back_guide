import React, { Component } from 'react';
import axios from 'axios';
import CoolComponent from './coolComponent';

import './App.css';
import Banner from './Banner.js';

class App extends Component {
  constructor(){
    super()
    this.state = {
      countryNames: [],
      country: '',
      countryImage: '',
      countryReview: '',
      review: ''
    }
    console.log('constructor')
  }

  componentDidMount(){
    axios.get('/api/allCountries').then(res => {
      console.log(res.data);
      this.setState({
        countryNames: res.data,
        countryImage: res.data,
        countryReview: res.data
      })
    })
  }

  getCountryInfo = () => {
    // axios.get('/api/allCountries').then(res => {
    //   console.log(res.data);
    //   this.setState({
    //     countryNames: res.data,
    //     countryImage: res.data,
    //     countryReview: res.data
    //   })
    // })
  }

  addCountry = (param) => {
    const { country, countryImage, review } = this.state
    axios.post('/api/addCountries', { country, countryImage }).then(res => {
      console.log("----response",res)
      console.log('res data-----', res.data)
      axios.get('/api/allCountries').then(response => {
        console.log(res.data);
        this.setState({
          countryNames: response.data,
          countryImage: response.data,
          countryReview: response.data
        })
      })
    })
  }

  deleteCountry = (id) => {
    // console.log('deleteCountry id', id )
    // console.log('country', this.state.country)
    axios.delete(`/api/deleteCountries/${id}`).then(response => {
      // ff
      this.setState({countryNames: response.data})
    
    });
  }
  
  editReview = (id, review) => {
    console.log('reviewid', id)
    console.log('reviewReview', review)      
    axios.put(`/api/editReview/${id}`, {review}).then(response => {
      console.log(response)

  
        axios.get('/api/allCountries').then(res => {
          console.log(res.data);
          this.setState({
            countryNames: res.data,
            countryImage: res.data,
            countryReview: res.data
          })
        })
      
      // this.setState({countryReview: response.data})
    });
  }

  changeHandler = (val) => {
      this.setState({
        country: val
      })
  }

  changeHandelerImage = (val) => {
    this.setState({
      countryImage: val
    })
  }

  changeHandlerReview = (val) => {
    this.setState({
      review: val
    })
}

  render() {
   console.log('RENDER')
    let names = this.state.countryNames.map(country => {
      return <div className='country-name' key={country.id}>
                {country.name}
                <img src={country.image} />
                <div>review: {country.review}</div>
                <button onClick={()=> this.editReview(country.id, this.state.review )} className="reviewButton">edit review</button>
                <input onChange={(e) => this.changeHandlerReview(e.target.value)} type="text" className="reviewInput"/>
                <button className="delete-button" onClick={() => this.deleteCountry(country.id)}>X</button>
            </div>
    })
    console.log(this.state.country)
    console.log(names)
    return (
      <div className="App"> 
        
        <Banner/>
        <CoolComponent />
        {names}
       
       <div>
          <input className="new-country-input" onChange={(e) => this.changeHandler(e.target.value)}  placeholder="enter country name here"/>
          <input className="new-country-input" onChange={(e) => this.changeHandelerImage(e.target.value)} placeholder="enter image url here" />
    
          <button className="reviewButton" onClick={() => this.addCountry() }>Add Country</button>
          
       </div>
      </div>
    );
  }
}

export default App;
