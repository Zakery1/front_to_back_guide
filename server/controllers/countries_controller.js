let countries = require('./countries');
let reloadedCountries = require('./reloadedCountries');

module.exports = {
    create(req, res) {
    console.log('create---', req.body)
    const { country, countryImage } = req.body;
    console.log('req.body',req.body)
    countries.push({
        id: countries.length + 1,
        name: country,
        image: countryImage,
    });
    
        // const countryName = req.params.name;
        // let index = countries.findIndex(element => element.name == countryName);

        res.status(200).json(countries)
    },
    read: (req, res) => {
        // console.log(req.params.name)
        // const countryName = req.param.name;
        
        // let index = countries.findIndex(element => element.name == countryName);
        
        res.status(200).send(countries)
    },
    update: (req, res) => {
        console.log("+++++update---",req.params)
        console.log('update----', req.body.review)
        const { id } = req.params;
        const { review } = req.body;

        const countriesIndex = countries.findIndex( country => country.id == id );
        let country = countries[ countriesIndex ];
        countries[ countriesIndex ] = {
            id: parseInt(id),
            name: country.name,
            image: country.image,
            continent: country.continent,
            review: review || countries.review,
            language: country.language,
            population: country.population
            
            // image: image || countries.image,
            
        }
        res.status(200).send(countries)

        // const reviewIndex = countries.findIndex(element => element.id == id );
        // let newReview = newReview[reviewIndex];
        // console.log(newReview)
        // if(reviewIndex != -1){
        //     newReview[reviewIndex] = {
        //         id: newReview.id,
        //         review: review || newReview.review
        //     };
           
        // }
        // res.status(200).send(countries)
    },
    delete: ( req, res ) => {
        const deleteCountry = +req.params.id;
        const countryIndex = countries.findIndex(country => country.id === deleteCountry)
        countries.splice( countryIndex, 1);
        // let index = countries.findIndex(element => element.name == deleteCountry);
        // updateCountries = countries.filter(country =>{
        //     console.log("=======country.id: ", country.id)
        //     const isTrue = country.id !== parseInt(req.params.id)   
        //     console.log("@@@@@ typeOf req.params.id: ", typeof(req.params.id))
        //     console.log("@@@@@ typeOf country.id: ", typeof(country.id))
        //     console.log("===== isTrue: ", isTrue)
        //     return isTrue
        // countries.splice( index, 1);
        res.status(200).send(countries)
    },

    deleteAll: (req, res ) => {

        countries = [];
        res.status(200).json(countries)
    },
    reloadAll: (req, res) => {
        // console.log(req.params.name)
        // const countryName = req.param.name;
        console.log('hit')
        // let index = countries.findIndex(element => element.name == countryName);
        countries = reloadedCountries;
        res.status(200).send(countries)
    }

}
    