const express = require('express');
const router = express.Router();

// router.get('/', (req, res) => {
//     const str = [{
//         "name": "Cobra Kai",
//         "msg": "This is my first tweet" 
//     }];
//     res.end(JSON.stringify(str));
// });

router.post('/', express.json(), (req, res) => {
    const num = req.body;
    console.log(num);
    res.send(null);
});

module.exports=router;