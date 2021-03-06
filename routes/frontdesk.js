const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const database = require('../databaseHandle/connectDatabase');

router.post("/addFrontdesk",function(req,res){
    
    const frontdeskData = [
        req.body.frontDeskId,
        req.body.NIC
    ]

    database.addFrontdesk(frontdeskData,function(err,result){
        if(err){
            console.log (err);
            if(err.sqlState =="23000"){
                res.json({success : false , msg : "already registerd"});
                return;
            }
            res.json({success : false , msg : "something wrong please try again"});
        }
        else{
            res.json({success : true , msg : "FrontDesk added"});
        }
    });
})

router.post("/getuser", function (req, res) {
    console.log("getting");
    var frontDeskId= req.body.frontDeskId;
    console.log(req.body.frontDeskId)

    database.getUser(frontDeskId,(err,data)=>{
        if (err) throw err;
            //console.log(frontdesk);
        if (!data) {
            //console.log(err);
            res.json({ success: false, msg: " not found" });
        }
        else{
            console.log(data);
            res.json({data})
        }
    });

});
module.exports = router;