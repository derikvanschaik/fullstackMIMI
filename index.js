const express = require('express');
const cors = require("cors"); 
const app = express();
const port = 3000; 

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
    const data = []; 
    for(let i = 0; i < 100; i++){
        data.push("mindmap" + i); 
    }
    res.send({mindmaps: data});  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})