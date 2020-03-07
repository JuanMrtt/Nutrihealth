const express = require('express');
const router = express.Router();

const User = require('../models/User.model')
const UserFile = require('../models/UserFile.model')
const Recipes = require('../models/Recipes.model')


router.post('/', (req, res, next) => {

  const { height, weight, age, activitylevel, goal, city, intolerances, foodPreferences } = req.body

  const newUserFile = {
    height,
    weight,
    age,
    activitylevel,
    goal,
    city,
    intolerances,
    foodPreferences,
    user: req.user._id
  }

  UserFile.findOne({ user: req.user._id })
    .then(userPreferencesFounded => {
      if (userPreferencesFounded) {

        const userPreferencesFoundedId = userPreferencesFounded._id

        // ACTUALIZAS EL USER FILE CON LOS CAMPOS, Y ACTUALIZAS EL CAMPO DE PREFERENCIAS DEL MODELO USUARIO
        UserFile.findByIdAndUpdate(userPreferencesFoundedId, { ...newUserFile }, { new: true })
          .then(x => console.log(x, "actualizado"))
          .catch(err => console.log(err))

      } else {
        UserFile.create(newUserFile)
          .then(theUserFile => User.findByIdAndUpdate(req.user._id, { userfile: theUserFile._id }, { new: true }))
          .then(userUpdated => res.json(userUpdated))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})


// Busca si los userFiles está ya creado por el USUARIO. Si lo está, ACTUALIZAS los campos, sino lo crea!


// UserFile.create(newUserFile)
//   .then(theUserFile => {
//     User.findByIdAndUpdate(req.user._id, { userfile: theUserFile._id }, { new: true })
//       .then(theUserUpdated => res.json(theUserUpdated))
//       .catch(err => console.log(err))
//   })
//   .catch(err => console.log(err))

// UserFile.create(newUserFile)
//     .then(theUserFile => User.findByIdAndUpdate(req.user._id, { userfile: theUserFile._id }, { new: true }))
//     .then(userUpdated => res.json(userUpdated))
//     .catch(err => console.log(err))
// })


router.post('/fav', (req, res, next) => {

  const { label, image, ingredients, url, dietLabels } = req.body

  const newRecipe = { label, image, ingredients, url, dietLabels }


  Recipes.findOne({ label: label })
    .then(foundRecipe => {

      if (foundRecipe) {

        const foundRecipeId = foundRecipe._id

        User.findOne({ _id: req.user._id })
          .then(theUser => {

            if (theUser.recipes.includes(foundRecipeId)) {
              res.status(400).json({ message: "Your already have this recipe as favorites" })

            } else {
              theUser.update({ $push: { recipes: foundRecipeId } }, { new: true })
                .then(userUpdated => res.json(userUpdated))
                .catch(err => console.log(err))
            }
          })
          .catch(err => res.json(err))

      } else {

        Recipes.create(newRecipe)
          .then(newRecipe => User.findByIdAndUpdate(req.user._id, { $push: { recipes: newRecipe._id } }, { new: true }))
          .then(userUpdated => res.json(userUpdated))
          .catch(err => res.json(err))
      }
    })
    .catch(err => console.log(err))
}
)

module.exports = router
