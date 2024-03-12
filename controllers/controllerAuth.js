const admin = require('firebase-admin');

const serviceAccount = require("../config/firestoreDB.json");
const validate = require("../config/validators")

//initializing our secret key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


//demo param: "http://localhost:3000/signup?uid=1111111111&age=22&name=Vashishth%20Pathak&phno=123"
const postSignup = (req, res) => {
    
    //option-1
    let query = require('url').parse(req.url,true).query;
    let uid = query.uid;
    let age = query.age;
    let name = query.name;
    let phno = query.phno;

    validate.validateLength(phno, 10, 12)

    //Option-2
    // let name = req.body.name;
    // let phno = req.body.phno;
    // let age = req.body.gender;

    console.log(name, age, phno); 

            async function run() {
      
                const data = {userId: String(uid), userName: String(name), userPhno: String(phno), userAge: String(age), isActive: 1, createdAt: Date.now()};
                //posting data into userData collection
                await db.collection('userData').add(data);
                }
        
            run().catch(console.error);

}; 

//demo param: "http://localhost:3000/login?phno=123"
const getLogin = (req, res) => {
    
//     //option-1
    let query = require('url').parse(req.url,true).query;
    // let name = query.name;
    let phno = query.phno;

    //assigning phno length validator
    validatePhnoLen = validate.validateLength(phno,10,12)

    console.log(phno); 

    if(validatePhnoLen!=0){
            async function run() {
      
                const loginData = db.collection('userData');
                const snapshot = await loginData.where('userPhno', '==', phno).get();
                if (snapshot.empty) {
                  console.log('Please Enter Valid Phno');
                  return;
                }  
            
                snapshot.forEach(doc => {
                  console.log(doc.id, '=>', doc.data());
                  let id = doc.id
                  req.session.userId = id;
                  req.session.save();
                });
            
                console.log(req.session.userId)
                }
        
            run().catch(console.error);
    }
    else{
        console.log("Phno should be of 10 digits")
    }

}; 

module.exports = {postSignup, getLogin}