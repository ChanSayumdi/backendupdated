const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const database = require('../databaseHandle/connectDatabase');

router.post("/addPrescription", function (req, res) {

    const prescriptionData = [
       
        req.body.prescriptionId,
        req.body. issueDate,
        req.body.expireDate,
        req.body. madicineName,
        req.body.doctorRegNo,
        req.body. diseaseDetailId,
        req.body.recommandedTest
    ]

    
    database.addPrescription(prescriptionData, function (err, result) {
        if (err) {
            console.log(err);
            if(err.sqlState =="23000"){
                res.json({success : false , msg : "already registerd"});
                return;
            }
            res.json({ success: false, msg: "something wrong please try again" });
        }
        else {
            res.json({ success: true, msg: "Prescription added" });
        }
    });
})

router.post("/getuser", function (req, res) {
    console.log("getting");
    var prescriptionId= req.body.prescriptionId;
    console.log(req.body.prescriptionId)

    database.getUser(prescriptionId,(err,data)=>{
        if (err) throw err;
            //console.log(prescription);
        if (!data) {
            //console.log(err);
            res.json({ success: false, msg: "prescription not found" });
        }
        else{
            console.log(data);
            res.json({data})
        }
    });

});



module.exports = router;