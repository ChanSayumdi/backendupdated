const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const database = require('../databaseHandle/connectDatabase');

router.post("/addDiseasedetail", function (req, res) {
    console.log(req.body); //diseaseDescription

    const diseasedetailData = [
        req.body.diseaseDetailId,
        req.body.diseaseDescription,
        req.body.reportAssign,
        req.body.diseaseDate
    ]

    database.addDiseasedetail(diseasedetailData, function (err, result) {
        if (err) {
            console.log(err);
            if (err.sqlState == "23000") {
                res.json({ success: false, msg: "already registerd" });
                return;
            }
            res.json({ success: false, msg: "something wrong please try again" });
        }
        else {
            res.json({ success: true, msg: "Disease Details added" });
        }
    });
})

router.post("/getuser", function (req, res) {
    console.log("getting");
    var diseaseDetailId= req.body.diseaseDetailId;
    console.log(req.body.diseaseDetailId)

    database.getUser(diseaseDetailId,(err,data)=>{
        if (err) throw err;
            //console.log(diseasedetail);
        if (!data) {
            //console.log(err);
            res.json({ success: false, msg: "diseasedetail not found" });
        }
        else{
            console.log(data);
            res.json({data})
        }
    });

});

module.exports = router;

