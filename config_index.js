const express = require('express')
const path = require('path')
const app = express()



app.use('/', express.static('dist'));

app.listen(8889, () => {
  console.log(`App listening at port 8889`)
});
