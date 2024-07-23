const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Create a Schema object
const Schema = mongoose.Schema;
// Create a Model object
const studentSchema = new Schema({
  myName: { type: String, required: true },
  mySID: { type: Number, required: true }
});
const Student = mongoose.model("Student", studentSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.post('/', async (req, res) => {
  // get the data from the form
  const URI = req.body.myuri;

  // connect to the database and log the connection
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(async () => {
      console.log("connected to MongoDB");

      // add the student to the database
      const newStudent = new Student({
        myName: "Yalda Porrangi",
        mySID: 300370005
      });

      try {
        await newStudent.save();
        console.log("Student added to the database");
        res.send(`<h1>Document Added</h1>`);
      } catch (error) {
        console.error("Error adding student to the database: ", error);
        res.status(500).send("Error adding student to the database");
      }

    })
    .catch((error) => {
      console.log("error connecting to MongoDB: " + error);
      res.status(500).send("Error connecting to MongoDB");
    });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
