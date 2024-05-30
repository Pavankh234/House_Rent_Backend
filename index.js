const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user : 'root',
    host : 'localhost',
    password : 'Pavankh1729$',
    database : 'houserent',
});

db.connect((err,res)=>{
    if(!err) {
        console.log('Database connected');
    }
    else {
        console.log(err);
    }
});


app.post('/ownersignup',(req,res)=>{
    const sql="INSERT INTO owner(`name`,`email`,`phonenumber`,`password`) VALUES(?)";
    const values=[
    req.body.name,
    req.body.email,
    req.body.phonenumber,
    req.body.password,
    ];

    db.query(sql,[values],(err,result)=>{
        if(err)
        {
            console.log(err);
            return res.json(err);
        } else {
            console.log('owner inserted Successfully');
            return res.json(result);
        }
    });
});

app.post('/tennentsignup',(req,res)=>{
    const sql="INSERT INTO tennent(`name`,`email`,`phonenumber`,`password`) VALUES(?)";
    const values=[
    req.body.name,
    req.body.email,
    req.body.phonenumber,
    req.body.password,
    ];

    db.query(sql,[values],(err,result)=>{
        if(err)
        {
            console.log(err);
            return res.json(err);
        } else {
            console.log('tennant inserted Successfully');
            return res.json(result);
        }
    });
});

app.post('/ownerlogin',(req,res)=>{
    const sql="SELECT * FROM owner WHERE email=? AND password=?";
    db.query(sql,[req.body.email , req.body.password],(err,data)=>{
        if(err) return res.status(500).json({message:"error occured"});
        if(data.length>0){
            //console.log(data);
            owner_id=data[0].id;
            console.log(owner_id);
            return res.status(200).json({ message: "Login Success", owner_id });
        }
        else{
            return res.status(401).json({ message: "Invalid Email or Password" });
        }
    });
});


app.post('/tennentlogin',(req,res)=>{
    const sql="SELECT * FROM tennent  WHERE email=? AND password=?";
    db.query(sql,[req.body.email , req.body.password],(err,data)=>{
        if(err) return res.status(500).json({message:"error occured"});
        if(data.length>0){
            tennant_id = data[0].tennant_id;
            console.log(tennant_id);
            // Send the success message and owner_id in the response
            return res.status(200).json({ message: "Login Success", tennant_id });
        }
        else{
            return res.status(401).json({ message: "Invalid Email or Password" });
        }
    });
});

// app.post('/ownerlanding',(req,res)=>{
//     const ownerId=req.body.owner_id;
//     const countHousesQuery="SELECT COUNT(*) AS houseCount FROM HOUSE WHERE owner_id=?";
//     db.query(countHousesQuery,[ownerId],(err,results)=>{
//         if(err){
//             console.log(err);
//             return res.json(err);
//         }
//         console.log(results);
//         const houseCount=results[0].houseCount;
//         // console.log("the house count is `${ houseCount}`");//
//         console.log(`the house count is ${houseCount}`);

//         if(houseCount>=3){
//             console.log("hi pavan");
//             return res.json({message:'Payment is required for additional houses',redirectToPayment:true});
//         } else {
//             const sql="INSERT INTO house (`address`,`rent_amt`,`number_of_occupants`,`city`,`contact_no`,`property_type`,`description`,`house_image`,`owner_id`) VALUES (?)";
//             const values = [
//                 req.body.address,
//                 req.body.rentAmount,
//                 req.body.occupants,
//                 req.body.city,
//                 req.body.contactNumber,
//                 req.body.propertyType,
//                 req.body.description,
//                 req.body.image,
//                 req.body.owner_id,
//             ];
//             db.query(sql,[values],(err,results)=>{
//                 if(err){
//                     console.log(err);
//                     return res.json(err)
//                 } else {
//                     console.log("home inserted successfully!");
//                     res.json({message:'Home added !',results});
//                 }
//             });
//         }
//     });
// });


//crashes here//
// app.post('/ownerlanding', (req, res) => {
//     const ownerId = req.body.owner_id;
//     const countHousesQuery = "SELECT COUNT(*) AS houseCount FROM HOUSE WHERE owner_id=?";
//     db.query(countHousesQuery, [ownerId], (err, results) => {
//         if (err) {
//             console.log(err);
//             return res.json(err);
//         } else {
//             console.log(results);
//             const houseCount = results[0].houseCount;
//             // console.log(`the house count is ${houseCount}`);

//             if (houseCount>3) {
//                 console.log("hi pavan");
//                 return res.json({ message: 'Payment is required for additional houses', redirectToPayment: true });
//             } else {
//                 const sql = "INSERT INTO house (`address`,`rent_amt`,`number_of_occupants`,`city`,`contact_no`,`property_type`,`description`,`house_image`,`owner_id`) VALUES (?)";
//                 const values = [
//                     req.body.address,
//                     req.body.rentAmount,
//                     req.body.occupants,
//                     req.body.city,
//                     req.body.contactNumber,
//                     req.body.propertyType,
//                     req.body.description,
//                     req.body.image,
//                     req.body.owner_id,
//                 ];
//                 db.query(sql, [values], (err, results) => {
//                     if (err) {
//                         console.log(err);
//                         return res.json(err)
//                     } else {
//                         console.log("home inserted successfully!");
//                         res.json({ message: 'Home added !', results });
//                     }
//                 });
//             }
//         }
//     });
// });

//crashes here//

app.post('/ownerlanding', (req, res) => {
    const sql = "INSERT INTO house (`address`,`rent_amt`,`number_of_occupants`,`city`,`contact_no`,`property_type`,`description`,`house_image`,`owner_id`) VALUES (?)";
    const values = [
        req.body.address,
        req.body.rentAmount,
        req.body.occupants,
        req.body.city,
        req.body.contactNumber,
        req.body.propertyType,
        req.body.description,
        req.body.image,
        req.body.owner_id,
    ];
    db.query(sql, [values], (err, results) => {
        if (err) {
            console.log(err);
            return res.json(err)
        } else {
            console.log("home inserted successfully!");
            res.json({ message: 'Home added !', results });
        }
    });
});





app.get('/ownerprofile/houses/:ownerId', (req, res) => {
    const ownerId = req.params.ownerId;
    const sql = "SELECT * FROM house WHERE owner_id = ?";
    db.query(sql, [ownerId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // console.log(results);//
        res.json(results);
    });
});

app.put('/edithouse/:id',(req,res)=>{
    const sql="UPDATE house set `address`=?,`rent_amt`=?,`number_of_occupants`=?,`city`=?,`contact_no`=?,`property_type`=?,`description`=?,`house_image`=?,`owner_id`=? WHERE `id`=?";
    const values = [
        req.body.address,
        req.body.rentAmount,
        req.body.occupants,
        req.body.city,
        req.body.contactNumber,
        req.body.propertyType,
        req.body.description,
        req.body.image,
        req.body.owner_id,
    ];
    const id=parseInt(req.params.id);
    db.query(sql,[...values,id],(err,result)=>{
        if(err)
            {
                console.log(err);
                return res.json(err);
            }else {
                console.log('Home updated successfully');
                res.status(200).json({ message: 'Home Updated', result });//wrote this line initially wrong//
                //  res.json({message:'Home Updated'},result);wrong line which was written//
            }
    });
});

//to delete the house that has been added//
app.delete('/house/:id',(req,res)=>{
    const sql="DELETE FROM house WHERE id=?";
    const id=req.params.id;
    db.query(sql,[id],(err,results)=>{
        if(err)
            {
                return res.json("Error in deleteing");
            }
            return res.json(results);
    });
});

app.listen(4000,()=>{
    console.log("Connected to backend");
})
