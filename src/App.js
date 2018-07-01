import React, { Component } from 'react';
import axios from 'axios';

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
    
  }

  getCountryInfo = () => {
    axios.get('/api/allCountries').then(res => {
      console.log(res.data);
      this.setState({
        countryNames: res.data,
        countryImage: res.data,
        countryReview: res.data
      })
    })
  }

  addCountry = () => {
    axios.post('/api/addCountries', {country: this.state.country}).then(res => {
      console.log(res)
      this.setState({
        countryNames: res.data,
        country: '',
        countryImage: '',
        countryReview:''
      })

    })
  }

  deleteCountry = (id) => {
    // console.log('deleteCountry id', id )
    // console.log('country', this.state.country)
    axios.delete(`/api/deleteCountries/${id}, `).then(response => {
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
                <input onChange={(e) => this.changeHandlerReview(e.target.value)} type="text"/>
                <button className="delete-button" onClick={() => this.deleteCountry(country.id)}>X</button>
            </div>
    })
    console.log(this.state.country)
    return (
      <div className="App">
        <div>{this.state.review}</div>
        <Banner/>
      {names}
       <button onClick={() => this.getCountryInfo()}>Country</button>
       <div>
          <input onChange={(e) => this.changeHandler(e.target.value)} value={this.state.country}/>
          <button onClick={() => this.addCountry()}>Add Country</button>
          <button onClick={(e) => this.deleteCountry(e)}>Delete Country</button>
          <button onClick={(e) => this.editReview(e)}>Edit Review</button>
       </div>
      </div>
    );
  }
}

export default App;
