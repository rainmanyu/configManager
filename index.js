const express = require('express')
const path = require('path')
const app = express()



app.use('/', express.static('dist'));

app.listen(9888, () => {
  console.log(`App listening at port 9888`)
});
