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
                await db.collection('userData').doc(uid).set(data);
                }
        
            run().catch(console.error);

}; 

//demo param: "http://localhost:3000/login?phno=123"
const getLogin = (req, res) => {
    
    let query = require('url').parse(req.url,true).query;
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


//demo URL: "http://localhost:3000/bannerOffers"
const getBannerOffers = (req, res) => {
    
  async function run() {
    
    const bannerOfferData = db.collection('bannerOffers');
    const snapshot = await bannerOfferData.get(); 
    
    if (snapshot.empty) {
      console.log('Enter the offers to DB first');
      return;
    } 
    
    console.log("Our Banner Offers Are:")
    snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    });
        
    }
      
    run().catch(console.error);

}; 


//demo URL: http://localhost:3000/categories
const getCategories = (req, res) => {
    
  async function run() {
    
    const categoriesData = db.collection('categories');
    const snapshot = await categoriesData.get(); 
    
    if (snapshot.empty) {
      console.log('Enter the categories to DB first');
      return;
    } 
    
    console.log("Our Categories Are:")
    snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    });
        
    }
      
    run().catch(console.error);


  //incase we want-to insert data categories collection
   /* const dataToInsert = [
      {
        type: 'Womens Wear'
      },
      {
        type: 'WFH Casual Wear'
      }
    ];

    async function insertData(data) {
      try {
        const writeBatch = db.batch();
    
        data.forEach(docData => {
          const ref = db.collection('categories').doc(); // Generate unique IDs
          writeBatch.set(ref, docData);
        });
    
        await writeBatch.commit();
        console.log('Data successfully inserted!');
      } catch (error) {
        console.error('Error inserting data:', error);
      }
    }

    insertData(dataToInsert);*/

}; 


//http://www.localhost:3000/itemList
const getItemList = (req, res) => {

  //to insert the data into itemList collection
  /*const dataToInsert = [
    {
      productName: 'BULLMER',
      productCategory: 'Mens Wear',
      productPrice: 3000,
      productSize: ['S', 'M', 'L', 'XL', 'XXL'],
      productDescription: "Graphic Printed Round Neck Oversized Cotton T-shirt",
      productImages: ['https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link',
      'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link',
      'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link',
      'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link',
      'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link',
      'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link',
      'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link',
      'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link',
      'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link',
      'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link'],
      productLeft: 10

      //new modifications
      vendorName:"Vashishth Pathak",

    }
  ];

  async function insertData(data) {
    try {
      const writeBatch = db.batch();
  
      data.forEach(docData => {
        const ref = db.collection('itemsList').doc(); // Generate unique IDs
        writeBatch.set(ref, docData);
      });
  
      await writeBatch.commit();
      console.log('Data successfully inserted!');
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }

  insertData(dataToInsert);*/

    
  async function run() {
    
    const bannerOfferData = db.collection('itemsList');
    const snapshot = await bannerOfferData.get(); 
    
    if (snapshot.empty) {
      console.log('Enter the Items List to DB first');
      return;
    } 
    
    let viewData = []
    console.log("Our Items List is:")
    snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());


    // viewData.push({data : doc.data()})

    viewData.push({
      productName: doc.data().productName,
      productCategory: doc.data().productCategory,
      productPrice: doc.data().productPrice,
      productSize: doc.data().productSize,
      productDescription: doc.data().productDescription,
      productImages: doc.data().productImages,
      productLeft: doc.data().productLeft

      //new modifications
      //vendorName:"Vashishth Pathak",

    })

    
    });
    console.log(viewData)
    // res.render("showData", {data : viewData});
    }
      
    run().catch(console.error);

};

module.exports = {postSignup, getLogin, getBannerOffers, getCategories, getItemList}
