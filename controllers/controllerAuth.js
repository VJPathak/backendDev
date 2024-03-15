const admin = require('firebase-admin');

const serviceAccount = require("../config/connection.json");
// const validate = require("../config/validators")

//initializing our secret key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


//demo param: http://localhost:3000/signup?uid=1111111111&name=Vashishth%20Pathak&email=pathakvashishth05@gmail.com&phno=12366666666&address=this%20is%20demo%20address&pincode=202013
const postSignup = (req, res) => {
    
    //option-1
    let query = require('url').parse(req.url,true).query;
    let uid = query.uid;
    let name = query.name;
    let phno = query.phno;
    let email = query.email;
    let address = query.address;
    let pincode = query.pincode;

    console.log(name, phno); 

            async function run() {
      
                const data = {Address: String(address), Name: String(name), Email: String(email), Number: String(phno), Pincode: String(pincode), isActive: 1, createdAt: Date.now()};
                
                //userAddress: String(Address), userPincode: String(Pincode)
                //posting data into userData collection
                await db.collection('Users').doc(uid).set(data);
                let resObj = {
                  status: "success",
                  statusCode: 200,
                  message: "OK",
                  data,
                  error: null
              }
              res.json(resObj)
            }

            run().catch(console.error);

}; 

//demo param: "http://localhost:3000/login?phno=123"
const getLogin = (req, res) => {
    
    let query = require('url').parse(req.url,true).query;
    let phno = query.phno;

    console.log(phno); 

            async function run() {
      
                const loginData = db.collection('Users');
                const snapshot = await loginData.where('Number', '==', phno).get();
                if (snapshot.empty) {
                  console.log('Please Enter Valid Phno');
                  res.json({
                    status: "Unauthorized",
                    statusCode: 401,
                    message: "Credentials Should be Correct",
                    error: "Yes"
                })
                  return;
                }  
                
                data = []

                snapshot.forEach(doc => {
                  console.log(doc.id, '=>', doc.data());
                  let id = doc.id
                  data.push({
                    uid: id,
                    name: doc.data().Name,
                    phno: doc.data().Number,
                    email: doc.data().Email
                  })
                  req.session.userId = id;
                  req.session.save();
                });
                
                // res.json(viewData)
                

                let resObj = {
                  status: "success",
                  statusCode: 200,
                  message: "OK",
                  data,
                  error: null
              }
              res.json(resObj)
                console.log(req.session.userId)
                }
        
            run().catch(console.error);
    // }
    // else{
    //     console.log("Phno should be of 10 digits")
    // }

}; 


//demo URL: "http://localhost:3000/bannerOffers"
// const getBannerOffers = (req, res) => {
    
//   async function run() {
    
//     const bannerOfferData = db.collection('bannerOffers');
//     const snapshot = await bannerOfferData.get(); 
    
//     if (snapshot.empty) {
//       console.log('Enter the offers to DB first');
//       res.json({
//         status: "No Content",
//         statusCode: 204,
//         message: "Collection Seems To Be Empty",
//         data,
//         error: null
//     })
//       return;
//     } 
    
//     data = []
//     console.log("Our Banner Offers Are:")
//     snapshot.forEach(doc => {
//     console.log(doc.id, '=>', doc.data());
//     data.push({id: doc.id, imageURL: doc.data().imageURL})
//     });

//     let resObj = {
//       status: "success",
//       statusCode: 200,
//       message: "OK",
//       data,
//       error: null
//   }


//     res.json(resObj)
        
//     }
      
//     run().catch(console.error);

// }; 


// //demo URL: http://localhost:3000/categories
// const getCategories = (req, res) => {
    
//   async function run() {
    
//     const categoriesData = db.collection('categories');
//     const snapshot = await categoriesData.get(); 
    
//     if (snapshot.empty) {
//       console.log('Enter the categories to DB first');
//       res.json({
//         status: "No Content",
//         statusCode: 204,
//         message: "Collection Seems To Be Empty",
//         data,
//         error: null
//     })
//       return;
//     } 
    
//     let data = []
//     console.log("Our Categories Are:")
//     snapshot.forEach(doc => {
//     console.log(doc.id, '=>', doc.data().type);

//     data.push({
//       type: doc.data().type
//     })


//     });

//     let resObj = {
//       status: "success",
//       statusCode: 200,
//       message: "OK",
//       data,
//       error: null
//   }


//     res.json(resObj)

//     }
//     // console.log(viewData) 
    
//     run().catch(console.error);


//   //incase we want-to insert data categories collection
//    /* const dataToInsert = [
//       {
//         type: 'Womens Wear'
//       },
//       {
//         type: 'WFH Casual Wear'
//       }
//     ];

//     async function insertData(data) {
//       try {
//         const writeBatch = db.batch();
    
//         data.forEach(docData => {
//           const ref = db.collection('categories').doc(); // Generate unique IDs
//           writeBatch.set(ref, docData);
//         });
    
//         await writeBatch.commit();
//         console.log('Data successfully inserted!');
//       } catch (error) {
//         console.error('Error inserting data:', error);
//       }
//     }

//     insertData(dataToInsert);*/

// }; 


// //http://www.localhost:3000/itemList
// const getItemList = (req, res) => {

//   //to insert the data into itemList collection
//   /*const dataToInsert = [
//     {
//       productName: 'BULLMER',
//       productCategory: 'Mens Wear',
//       productPrice: 3000,
//       productSize: ['S', 'M', 'L', 'XL', 'XXL'],
//       productDescription: "Graphic Printed Round Neck Oversized Cotton T-shirt",
//       productImages: ['https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link',
//       'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link',
//       'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link',
//       'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link',
//       'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link',
//       'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link',
//       'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link',
//       'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link',
//       'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link',
//       'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link'],
//       productLeft: 10

//       //new modifications
//       vendorName:"Vashishth Pathak",

//     }
//   ];

//   async function insertData(data) {
//     try {
//       const writeBatch = db.batch();
  
//       data.forEach(docData => {
//         const ref = db.collection('itemsList').doc(); // Generate unique IDs
//         writeBatch.set(ref, docData);
//       });
  
//       await writeBatch.commit();
//       console.log('Data successfully inserted!');
//     } catch (error) {
//       console.error('Error inserting data:', error);
//     }
//   }

//   insertData(dataToInsert);*/

//   async function run() {
    
//     const bannerOfferData = db.collection('itemsList');
//     const snapshot = await bannerOfferData.get(); 
    
//     if (snapshot.empty) {
//       console.log('Enter the Items List to DB first');
//       res.json({
//         status: "No Content",
//         statusCode: 204,
//         message: "Collection Seems To Be Empty",
//         data,
//         error: null
//     })
//       return;
//     } 
    
//     let data = []
//     console.log("Our Items List is:")
//     snapshot.forEach(doc => {
//     console.log(doc.id, '=>', doc.data());


//     // viewData.push({data : doc.data()})

//     data.push({
//       productName: doc.data().productName,
//       productCategory: doc.data().productCategory,
//       productPrice: doc.data().productPrice,
//       productSize: doc.data().productSize,
//       productDescription: doc.data().productDescription,
//       productImages: doc.data().productImages,
//       productLeft: doc.data().productLeft

//       //new modifications
//       //vendorName:"Vashishth Pathak",

//     })

    
//     });
//     console.log(data)
//     let resObj = {
//       status: "success",
//       statusCode: 200,
//       message: "OK",
//       data,
//       error: null
//   }
//     res.json(resObj)
//     // res.render("showData", {data : viewData});
//     }
      
//     run().catch(console.error);

// };


// //demo param: http://localhost:3000/userReview?rid=4444&uid=111&textReview=extraordinaly%20product&imageReview=https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link
// const postReview = (req, res) => {
    
//   //option-1
//   let query = require('url').parse(req.url,true).query;
//   let rid = query.rid;
//   let uid = query.uid;
//   let textReview = query.textReview;
//   let imageReview = query.imageReview;

//           async function run() {
    
//               const data = {reviewId: String(rid), userId: String(uid), textReview: String(textReview), imageReview: String(imageReview), createdAt: Date.now()};
              
//               //userAddress: String(Address), userPincode: String(Pincode)
//               //posting data into userData collection
//               await db.collection('userReviews').doc(rid).set(data);
//               let resObj = {
//                 status: "success",
//                 statusCode: 200,
//                 message: "OK",
//                 data,
//                 error: null
//             }
//             res.json(resObj)
//           }

//           run().catch(console.error);

// }; 


// //demo param: http://localhost:3000/userReview
// const getReview = (req, res) => {
    
//   async function run() {
    
//     const bannerOfferData = db.collection('userReviews');
//     const snapshot = await bannerOfferData.get(); 
    
//     if (snapshot.empty) {
//       console.log('Enter the reviews to DB first');
//       res.json({
//         status: "No Content",
//         statusCode: 204,
//         message: "Collection Seems To Be Empty",
//         data,
//         error: null
//     })
//       return;
//     } 
    
//     data = []
//     console.log("Our Reviews Are:")
//     snapshot.forEach(doc => {
//     console.log(doc.id, '=>', doc.data());
//     data.push({id: doc.id, uid: doc.data().userId, textReview: doc.data().textReview, imageReview: doc.data().imageReview, published: doc.data().createdAt})
//     });

//     let resObj = {
//       status: "success",
//       statusCode: 200,
//       message: "OK",
//       data,
//       error: null
//   }
//     res.json(resObj)
        
//     }
      
//     run().catch(console.error);

// }; 




module.exports = {postSignup, getLogin}
  //, getBannerOffers, getCategories, getItemList, postReview, getReview}



