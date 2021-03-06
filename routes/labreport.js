const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const database = require('../databaseHandle/connectDatabase');

router.post("/addLabreport", function (req, res) {

    const labreportData = [
        req.body.reportNo,
        req.body.reportName,
        req.body.pdfLocation,
       
       
    ]
    database.addLabreport(labreportData, function (err, result) {
        if (err) {
            console.log(err);
            if(err.sqlState =="23000"){
                res.json({success : false , msg : "already registerd"});
                return;
            }
            res.json({ success: false, msg: "something wrong please try again" });
        }
        else {
            res.json({ success: true, msg: "Lab Reoprt SUCCESSFULY added" });
        }
    });
})

router.post("/getuser", function (req, res) {
    console.log("getting");
    var reportNo= req.body.reportNo;
    console.log(req.body.reportNo)

    database.getUser(reportNo,(err,data)=>{
        if (err) throw err;
            //console.log(labreport);
        if (!data) {
            //console.log(err);
            res.json({ success: false, msg: "Lab Report not found" });
        }
        else{
            console.log(data);
            res.json({data})
        }
    });

});

module.exports = router;