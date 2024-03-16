const admin = require('firebase-admin');

const serviceAccount = require("../connection.json");
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

                //await db.collection('Users').doc(uid).collection('h').doc().set(data);
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
const getBannerOffers = (req, res) => {
    
  async function run() {

    // const dataToInsert = [
    //   {
    //     imageURL: 'https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link'
    //   },
    //   {
    //     imageURL: 'https://drive.google.com/file/d/1JJdBTXKSMZmeySjv6YSFFSlF1biR4bq0/view?usp=drive_link'
    //   },
    //   {
    //     imageURL: 'https://drive.google.com/file/d/1oJ7TMruCgbhOHGOwWyQ4HKSUTD-v2iag/view?usp=drive_link'
    //   },
    //   {
    //     imageURL: 'https://drive.google.com/file/d/1j2DI1pzeiQWUhsf-DgJFlH3HvNgCdQwj/view?usp=drive_link'
    //   },
    //   {
    //     imageURL: 'https://drive.google.com/file/d/11nrnKJd7jCtc0NMFaddZdlp1rcuWxUXR/view?usp=drive_link'
    //   },
    //   {
    //     imageURL: 'https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link'
    //   }
    // ];

    // async function insertData(data) {
    //   try {
    //     const writeBatch = db.batch();
    
    //     data.forEach(docData => {
    //       const ref = db.collection('Banner Offers').doc(); // Generate unique IDs
    //       writeBatch.set(ref, docData);
    //     });
    
    //     await writeBatch.commit();
    //     console.log('Data successfully inserted!');
    //   } catch (error) {
    //     console.error('Error inserting data:', error);
    //   }
    // }

    // insertData(dataToInsert);
    
    const bannerOfferData = db.collection('Banner Offers');
    const snapshot = await bannerOfferData.get(); 
    
    if (snapshot.empty) {
      console.log('Enter the offers to DB first');
      res.json({
        status: "No Content",
        statusCode: 204,
        message: "Collection Seems To Be Empty",
        data,
        error: null
    })
      return;
    } 
    
    data = []
    console.log("Our Banner Offers Are:")
    snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    data.push({id: doc.id, imageURL: doc.data().imageURL})
    });

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


//demo URL: http://localhost:3000/categories
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

// }; 

//demo param: http://localhost:3000/menswear?productDesc=sampleDescription&productName=tshirt&id=111&photos=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link&price=3000&size=XXL&status=dispatched&deliveryDate=SomeDate&deliveryTime=SomeTime&productsLeft=10&vendorName=Vashishth
const postItemListCat1 = (req, res) => {

    let query = require('url').parse(req.url,true).query;
    let itemID = query.id;
    let productDesc = query.productDesc;
    let photos = query.photos;
    let price = query.price;
    let size = query.size;
    let status = query.status;
    let deliveryDate = query.deliveryDate;
    let deliveryTime = query.deliveryTime;
    let productsLeft = query.productsLeft;
    let vendorName = query.vendorName;
    let productName = query.productName;

            async function run() {
      
              const data = {
                productName: productName,
                productPrice: Number(price),
                productSize: size,
                productDescription: productDesc,
                productImages: photos,
                productLeft: Number(productsLeft),
                status: status,
                deliveryDate: deliveryDate,
                deliveryTime: deliveryTime,
                vendorName: vendorName,
                isActive: 1,
                reviews: Array(), 
                createdAt: Date.now()
              }

              console.log(data)
                
                await db.collection("Category1").doc(itemID).set(data);
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


//demo param: http://localhost:3000/womenswear?productDesc=sampleDescription&productName=tshirt&id=1111&photos=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link&price=3000&size=XXL&status=dispatched&deliveryDate=SomeDate&deliveryTime=SomeTime&productsLeft=10&vendorName=Vashishth

const postItemListCat2 = (req, res) => {

  let query = require('url').parse(req.url,true).query;
  let itemID = query.id;
  let productDesc = query.productDesc;
  let photos = query.photos;
  let price = query.price;
  let size = query.size;
  let status = query.status;
  let deliveryDate = query.deliveryDate;
  let deliveryTime = query.deliveryTime;
  let productsLeft = query.productsLeft;
  let vendorName = query.vendorName;
  let productName = query.productName;

          async function run() {
    
            const data = {
              productName: productName,
              productPrice: Number(price),
              productSize: size,
              productDescription: productDesc,
              productImages: photos,
              productLeft: Number(productsLeft),
              status: status,
              deliveryDate: deliveryDate,
              deliveryTime: deliveryTime,
              vendorName: vendorName,
              isActive: 1,
              reviews: Array(), 
              createdAt: Date.now()
            }

            console.log(data)
              
              await db.collection("Category2").doc(itemID).set(data);
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



// http://localhost:3000/menswear
const getItemListCat1 = (req, res) => {
    
  async function run() {
    
    const category1Data = db.collection('Category1');
    const snapshot = await category1Data.get(); 
    
    if (snapshot.empty) {
      console.log('Enter the items into Category-1(Menswear) Collection first');
      res.json({
        status: "No Content",
        statusCode: 204,
        message: "Collection Seems To Be Empty",
        data,
        error: null
    })
      return;
    } 
    
    data = []
    console.log("Items In Category-1(Menswear) Are:")
    snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    data.push(
      {
        id: doc.id, 
        productName: doc.data().productName,
        productPrice: doc.data().price,
        productSize: doc.data().size,
        productDescription: doc.data().productDesc,
        productImages: doc.data().photos,
        productLeft: doc.data().productsLeft,
        status: doc.data().status,
        deliveryDate: doc.data().deliveryDate,
        deliveryTime: doc.data().deliveryTime,
        vendorName: doc.data().vendorName,
        isActive: doc.data().isActive
      })
    });

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


// http://localhost:3000/womenswear
const getItemListCat2 = (req, res) => {
    
  async function run() {
    
    const category1Data = db.collection('Category2');
    const snapshot = await category1Data.get(); 
    
    if (snapshot.empty) {
      console.log('Enter the items into Category-2(Womenswear) Collection first');
      res.json({
        status: "No Content",
        statusCode: 204,
        message: "Collection Seems To Be Empty",
        data,
        error: null
    })
      return;
    } 
    
    data = []
    console.log("Items In Category-2(Womenswear) Are:")
    snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    data.push(
      {
        id: doc.id, 
        productName: doc.data().productName,
        productPrice: doc.data().price,
        productSize: doc.data().size,
        productDescription: doc.data().productDesc,
        productImages: doc.data().photos,
        productLeft: doc.data().productsLeft,
        status: doc.data().status,
        deliveryDate: doc.data().deliveryDate,
        deliveryTime: doc.data().deliveryTime,
        vendorName: doc.data().vendorName,
        isActive: doc.data().isActive
      })
    });

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




//http://www.localhost:3000/itemList
// const getItemList = (req, res) => {

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


//demo param: http://localhost:3000/userReview/menswear?ratings=5&rid=4444&itemid=111&uid=1111111111&textReview=extraordinaly%20product&imageReview=https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link
const postCat1Review = (req, res) => {
    
  //option-1
  let query = require('url').parse(req.url,true).query;
  let rid = query.rid;
  let itemid = query.itemid;
  let uid = query.uid;
  let textReview = query.textReview;
  let imageReview = query.imageReview;
  let ratings = query.ratings;

          async function run() {
    
              const data = {ratings: Number(ratings), textReview: String(textReview), imageReview: String(imageReview), createdAt: Date.now()};
              
              //userAddress: String(Address), userPincode: String(Pincode)
              //posting data into userData collection
              await db.collection('Users').doc(uid).collection("Reviews").doc(itemid).set(data);
              let FieldValue = require('firebase-admin').firestore.FieldValue;
              await db.collection('Category1').doc(itemid).update("reviews", FieldValue.arrayUnion(textReview));

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


//demo param: http://localhost:3000/userReview/womenswear?ratings=5&rid=4444&itemid=1111&uid=1111111111&textReview=extraordinaly%20product&imageReview=https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link
const postCat2Review = (req, res) => {
    
  //option-1
  let query = require('url').parse(req.url,true).query;
  let rid = query.rid;
  let itemid = query.itemid;
  let uid = query.uid;
  let textReview = query.textReview;
  let imageReview = query.imageReview;
  let ratings = query.ratings;

          async function run() {
    
              const data = {ratings: Number(ratings), textReview: String(textReview), imageReview: String(imageReview), createdAt: Date.now()};
              
              //userAddress: String(Address), userPincode: String(Pincode)
              //posting data into userData collection
              await db.collection('Users').doc(uid).collection("Reviews").doc(itemid).set(data);
              let FieldValue = require('firebase-admin').firestore.FieldValue;
              await db.collection('Category2').doc(itemid).update("reviews", FieldValue.arrayUnion(textReview));

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




module.exports = {postSignup, getLogin, getBannerOffers, postCat1Review, postCat2Review, postItemListCat1, postItemListCat2, getItemListCat1, getItemListCat2}



