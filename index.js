const express = require('express')
const bodyParser = require('body-parser') /*middlewear*/
const app = express()
const cors = require('cors');
const port = process.env.PORT || 3000


app.get('/', (req, res) => {
  res.send("Het werkt")
})
app.use(bodyParser.json());

//mongo config
const {
  MongoClient,
  ObjectId
} = require('mongodb');
const config = require('./config.json')
//new mongo client
const client = new MongoClient(config.baseUrl);

//Root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/info.html');
})

//app routes
app //GET all user-data from db
  .get('/user-data', async (req, res) => {

    try {
      //connect db
      await client.connect();

      //retrieve user data
      const coll = client.db('course-project').collection('user-data')
      const userData = await coll.find({}).toArray();

      //send back the file
      res.status(200).send(userData)

    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "ERROR couldn't get user data",
        value: error
      })
    }

  })
  //GET all Users from db
  .get('/Users', async (req, res) => {

    try {
      //connect db
      await client.connect();

      //retrieve user data
      const coll = client.db('course-project').collection('Users')
      const Users = await coll.find({}).toArray();

      //send back the file
      res.status(200).send(Users)

    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "ERROR couldn't get Users",
        value: error
      })
    }

  })
  //GET all daily-intake from db
  .get('/daily-intake', async (req, res) => {

    try {
      //connect db
      await client.connect();

      //retrieve user data
      const coll = client.db('course-project').collection('daily-intake')
      const dailyIntake = await coll.find({}).toArray();

      //send back the file
      res.status(200).send(dailyIntake)

    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "ERROR couldn't get daily-intake",
        value: error
      })
    }

  })
  //GET all meals from db
  .get('/meals', async (req, res) => {

    try {
      //connect db
      await client.connect();

      //retrieve user data
      const coll = client.db('course-project').collection('meals')
      const meals = await coll.find({}).toArray();

      //send back the file
      res.status(200).send(meals)

    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "ERROR couldn't get daily-intake",
        value: error
      })
    }

  })



  //GET all daily-intake:date from db
  .get('/daily-intake/:date', async (req, res) => {
    //date is located in the query: req.params.date

    try {
      //connect db
      await client.connect();

      //retrieve daily-intake data
      const coll = client.db('course-project').collection('daily-intake')

      //only look for a daily-intake with date
      const query = {
        date: date(req.params.date)
      };

      const getDaily = await coll.find(query)

      if (getDaily) {
        //send back the file
        res.status(200).send(getDaily);
        return;
      } else {
        res.status(400).send("Daily intake could not be found with date " + req.params.date)
      }

    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "we coulnd't get your daily intake",
        value: error
      })
    }

  })

  //GET all daily-intake:date from db
  .get('/meals/:date', async (req, res) => {
    //date is located in the query: req.params.date

    try {
      //connect db
      await client.connect();

      //retrieve daily-intake data
      const coll = client.db('course-project').collection('meals')

      //only look for a meal with date
      const query = {
        date: date(req.params.date)
      };

      const getDailyMeals = await coll.find(query)

      if (getDailyMeals) {
        //send back the file
        res.status(200).send(getDailyMeals);
        return;
      } else {
        res.status(400).send("meals could not be found with date " + req.params.date)
      }

    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "we coulnd't get your daily meals",
        value: error
      })
    }

  })



  //POST meal to db
  .post('/saveMeal', async (req, res) => {

    try {
      //connect db
      await client.connect();

      //retrieve meals data
      const coll = client.db('course-project').collection('meals');

      // create new meal object
      let newMeal = {
        "Calcium": req.body.Calcium,
        "Carbohydrate": req.body.Carbohydrate,
        "Cholesterol": req.body.Cholesterol,
        "Energy": req.body.Energy,
        "FattyAcidsTotalMononsaturated": req.body.FattyAcidsTotalMononsaturated,
        "FattyAcidsTotalPolyunsaturated": req.body.FattyAcidsTotalPolyunsaturated,
        "FattyAcidsTotalSaturated": req.body.FattyAcidsTotalSaturated,
        "totalLipid": req.body.totalLipid,
        "Iron": req.body.Iron,
        "FiberTotal": req.body.FiberTotal,
        "FolicAcid": req.body.FolicAcid,
        "FolateDFE": req.body.FolateDFE,
        "FolateFood": req.body.FolateFood,
        "Potassium": req.body.Potassium,
        "Magnesium": req.body.Magnesium,
        "Sodium": req.body.Sodium,
        "Niacin": req.body.Niacin,
        "Phosphorus": req.body.Phosphorus,
        "Protein": req.body.Protein,
        "Riboflavin": req.body.Riboflavin,
        "SugarsTotal": req.body.SugarsTotal,
        "Thiamin": req.body.Thiamin,
        "VitaminE": req.body.VitaminE,
        "VitaminA": req.body.VitaminA,
        "VitaminB6": req.body.VitaminB6,
        "VitaminB12": req.body.VitaminB12,
        "VitaminC": req.body.VitaminC,
        "VitaminD": req.body.VitaminD,
        "VitaminK": req.body.VitaminK,
        "Water": req.body.Water,
        "Zink": req.body.Zink,
        "ingredientName": req.body.ingredientName,
        "amount": req.body.amount
      }

      //insert into db
      let insertResult = await coll.insertOne(newMeal)

      //succes message
      res.status(201).json(newMeal)
      return;

    } catch (error) {
      console.log(error);
      res.status(500).send("An error has occured")
    } finally {
      await client.close()
    }

  })



//PUT dailyTotal from db
.put('/updatedailyTotal/:id', async (req, res) => {
    try {
      //connect db
      await client.connect();

      //retrieve dailyTotal data from db
      const coll = client.db('course-project').collection('dailyTotal')

      //only look for a dailyTotal with id
      const query = {
         _id: ObjectId(req.params.id)
       // date: date(req.params.date)
      };

      const updateDocument = {
        $set: {
          name: req.body.name,
          points: req.body.points,
          course: req.body.course,
          session: req.body.session,
          Calcium: req.body.Calcium,
          Carbohydrate: req.body.Carbohydrate,
          Cholesterol: req.body.Cholesterol,
          Energy: req.body.Energy,
          FattyAcidsTotalMononsaturated: req.body.FattyAcidsTotalMononsaturated,
          FattyAcidsTotalPolyunsaturated: req.body.FattyAcidsTotalPolyunsaturated,
          FattyAcidsTotalSaturated: req.body.FattyAcidsTotalSaturated,
          totalLipid: req.body.totalLipid,
          Iron: req.body.Iron,
          FiberTotal: req.body.FiberTotal,
          FolicAcid: req.body.FolicAcid,
          FolateDFE: req.body.FolateDFE,
          FolateFood: req.body.FolateFood,
          Potassium: req.body.Potassium,
          Magnesium: req.body.Magnesium,
          Sodium: req.body.Sodium,
          Niacin: req.body.Niacin,
          Phosphorus: req.body.Phosphorus,
          Protein: req.body.Protein,
          Riboflavin: req.body.Riboflavin,
          SugarsTotal: req.body.SugarsTotal,
          Thiamin: req.body.Thiamin,
          VitaminE: req.body.VitaminE,
          VitaminA: req.body.VitaminA,
          VitaminB6: req.body.VitaminB6,
          VitaminB12: req.body.VitaminB12,
          VitaminC: req.body.VitaminC,
          VitaminD: req.body.VitaminD,
          VitaminK: req.body.VitaminK,
          Water: req.body.Water,
          Zink: req.body.Zink
        }
      };
      // updates document based on query
      await coll.updateOne(query, updateDocument)
      res.status(200).json({
        message: 'Succesfully Updated dailyTotal: ' + req.body.date
      });

    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "couldn't update dailyTotal",
        value: error
      })
    }


  })

  //DELETE meals from db
  .delete('/deleteMeal/:id', async (req, res) => {
    //id is located in the query: req.params.id
    try {
      //connect db
      await client.connect();

      //retrieve meals data
      const coll = client.db('course-project').collection('meals')

      //only look for a meal with id
      const query = {
        _id: ObjectId(req.params.id)
      };

      //DELETE meal
      await coll.deleteOne(query)
      res.status(200).json({
        message: 'Succesfully Deleted!'
      });


    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "something went wrong, couldn't delete that meal",
        value: error
      })
    }
  })

app.listen(port, () => {
  console.log(`REST API is running at http://localhost:${port}`);
})