const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
   const lasagne = Recipe.create({
     title : "Lasagne",
     level : "UltraPro Chef",
     ingredients : ["tomate","créme bachamel","pate pour les lasagne","jambon","fromage"],
     cuisine : "italienne",
     dishType : "main_course",
     image : "https://cdn.pratico-pratiques.com/app/uploads/sites/3/2021/01/05155406/lasagne-au-legumes-et-tofu.jpg",
     duration : 30,
     creator : "Léo Cheffi",
     created : new Date()
   })
  })
  .then(()=>{
    return Recipe.insertMany(data)
  })
  .then((data)=>{
    console.log('data:', data);
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},{duration : 100}, {new :true})
  })
  .then((result)=>{
    console.log("result", result)
  })
  .then(()=>{
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then((result)=>{
    console.log("result deleted", result)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  mongoose.connection.close()