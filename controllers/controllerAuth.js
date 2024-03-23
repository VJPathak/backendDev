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
                
                const loginData = db.collection('Users');
                const snapshot = await loginData.where('Number', '==', phno).get()

                if (snapshot.empty) {
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

                else{
                  let resObj = {
                    status: "Failed",
                    statusCode: 409,
                    message: "Ph no. already registered",
                    data,
                    error: "Yes"

                }

                //userAddress: String(Address), userPincode: String(Pincode)
                //posting data into userData collection

                //await db.collection('Users').doc(uid).collection('h').doc().set(data);
                res.json(resObj)
              }
              
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


//demo param: http://localhost:3000/menswear?productDesc=sampleDescription&productName=pant&id=222&photos=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link&price=1200&size=XL&status=dispatched&deliveryDate=SomeDate&deliveryTime=SomeTime&productsLeft=40&vendorName=VJPathak
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
    
    data1 = []
    console.log("Items In Category-1(Menswear) Are:")
    snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    data1.push(
      {
        id: doc.id, 
        productName: doc.data().productName,
        productPrice: doc.data().productPrice,
        productSize: doc.data().productSize,
        productDescription: doc.data().productDesc,
        productImages: doc.data().productImages,
        productLeft: doc.data().productsLeft,
        status: doc.data().status,
        deliveryDate: doc.data().deliveryDate,
        deliveryTime: doc.data().deliveryTime,
        vendorName: doc.data().vendorName,
        isActive: doc.data().isActive
      })
    });
data = []
for(i=0;i<data1.length-2;i++){
  data.push(data1[i])
}
console.log("data is:")
console.log(data)

    let resObj = {
      status: "success",
      statusCode: 200,
      message: "OK",
      data,
      error: null
  }

console.log(data.length + 1)
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
    
    data1 = []
    console.log("Items In Category-2(Womenswear) Are:")
    snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    data1.push(
      {
        id: doc.id, 
        productName: doc.data().productName,
        productPrice: doc.data().productPrice,
        productSize: doc.data().productSize,
        productDescription: doc.data().productDesc,
        productImages: doc.data().productImages,
        productLeft: doc.data().productsLeft,
        status: doc.data().status,
        deliveryDate: doc.data().deliveryDate,
        deliveryTime: doc.data().deliveryTime,
        vendorName: doc.data().vendorName,
        isActive: doc.data().isActive
      })
    });

      data = []
      for(i=0;i<data1.length-2;i++){
        data.push(data1[i])
      }
      console.log("data is:")
      console.log(data)

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


// http://localhost:3000/userReview/menswear?username=Vashishth&ratings=4.9&rid=4444&itemid=111&uid=22231&textReview=I'm obsessed with this sweater! It's cozy without being bulky and the knit pattern adds a nice touch. Perfect for layering or wearing on its own.&imageReview=https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link

// http://localhost:3000/userReview/menswear?username=Jignesh&ratings=4.5&rid=4444&itemid=222&uid=22231&textReview=A delightful read that whisked me away to another world; the characters were so vivid and the storyline kept me hooked till the very end!&imageReview=https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link

// http://localhost:3000/userReview/menswear?username=Vashishth&ratings=3.5&rid=4444&itemid=333&uid=22231&textReview=This [clothing product] exceeded my expectations! The fabric is soft, the design is chic, and it's incredibly versatile. Couldn't be happier with my purchase!&imageReview=https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link

// http://localhost:3000/userReview/menswear?username=Jignesh&ratings=2.5&rid=4444&itemid=444&uid=22231&textReview=Absolutely love the fit and feel of this shirt! It's incredibly comfortable and the fabric is so soft. Definitely a new favorite in my wardrobe!&imageReview=https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link

// http://localhost:3000/userReview/menswear?username=Vashishth&ratings=1&rid=4444&itemid=555&uid=22231&textReview=I'm obsessed with this sweater! It's cozy without being bulky and the knit pattern adds a nice touch. Perfect for layering or wearing on its own.&imageReview=https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link



// http://localhost:3000/userReview/menswear?username=Vashishth&ratings=4&rid=4444&itemid=111&uid=1111111111&textReview=extraordinaly%20product&imageReview=https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link




const postCat1Review = (req, res) => {
    
  //option-1
  let query = require('url').parse(req.url,true).query;
  let rid = query.rid;
  let itemid = query.itemid;
  let uid = query.uid;
  let textReview = query.textReview;
  let imageReview = query.imageReview;
  let ratings = query.ratings;
  let username = query.username;

          async function run() {
    
              const data = {ratings: Number(ratings), textReview: String(textReview), imageReview: String(imageReview), createdAt: Date.now()};
              
              //userAddress: String(Address), userPincode: String(Pincode)
              //posting data into userData collection
              await db.collection('Users').doc(uid).collection("Reviews").doc(itemid).set(data);
              let FieldValue = require('firebase-admin').firestore.FieldValue;
              // await db.collection('Category1').doc(itemid).update("reviews", FieldValue.arrayUnion(textReview));


              const docRef = db.collection('Category1').doc(itemid);

              // Use a transaction to ensure data consistency
              await db.runTransaction(async (transaction) => {
                const doc = await transaction.get(docRef);
                if (!doc.exists) {
                  throw new Error('Document does not exist');
                }
            
                // Get the existing array (similar to previous example)
                let existingArray = doc.get("Reviews");
                if (!existingArray) {
                  existingArray = [];
                }
            
                // Add the new element
                existingArray.push({createdAt: Date.now(), createdBy: uid, textReview: textReview, ratings: ratings, image: imageReview, userName: username});
            
                // Update the document with the modified array
                transaction.set(docRef, { ["Reviews"]: existingArray }, { merge: true });
              });
            
              console.log('Element pushed to array successfully!');





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



//demo param: http://localhost:3000/userReview/womenswear?username=Vashishth&ratings=3.5&rid=4444&itemid=1111&uid=22231&textReview=I'm obsessed with this sweater! It's cozy without being bulky and the knit pattern adds a nice touch. Perfect for layering or wearing on its own.&imageReview=https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link

//demo param: http://localhost:3000/userReview/womenswear?username=Jignesh&ratings=4.5&rid=4444&itemid=2222&uid=22231&textReview=This skirt is a game-changer! The fit is flattering and the length is just right. Plus, the material doesn't wrinkle easily, making it ideal for traveling&imageReview=https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link

//demo param: http://localhost:3000/userReview/womenswear?username=Vashishth&ratings=5.0&rid=4444&itemid=3333&uid=22231&textReview=These leggings are a dream! They're incredibly comfortable for workouts but stylish enough to wear for errands or lounging. Plus, they hold their shape wash after wash!&imageReview=https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link

//demo param: http://localhost:3000/userReview/womenswear?username=Jignesh&ratings=3.5&rid=4444&itemid=4444&uid=22231&textReview=I'm in love with this jumpsuit! It's effortlessly chic and the adjustable waist tie gives it a tailored look. The fabric is also super soft against the skin.&imageReview=https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link



//demo param: http://localhost:3000/userReview/womenswear?username=Vashishth&ratings=4.5&rid=4444&itemid=1111&uid=1111111111&textReview=extraordinaly%20product&imageReview=https://drive.google.com/file/d/1QjeEhlJb7nX0iQUIEAGBKZNTjq1P9I2I/view?usp=drive_link
const postCat2Review = (req, res) => {
    
  //option-1
  let query = require('url').parse(req.url,true).query;
  let rid = query.rid;
  let itemid = query.itemid;
  let uid = query.uid;
  let textReview = query.textReview;
  let imageReview = query.imageReview;
  let ratings = query.ratings;
  let username = query.username;

          async function run() {
    
              const data = {ratings: Number(ratings), textReview: String(textReview), imageReview: String(imageReview), createdAt: Date.now()};
              
              //userAddress: String(Address), userPincode: String(Pincode)
              //posting data into userData collection
              await db.collection('Users').doc(uid).collection("Reviews").doc(itemid).set(data);
              let FieldValue = require('firebase-admin').firestore.FieldValue;
              // await db.collection('Category2').doc(itemid).update("reviews", FieldValue.arrayUnion(textReview));

            

              const docRef = db.collection('Category2').doc(itemid);

              // Use a transaction to ensure data consistency
              await db.runTransaction(async (transaction) => {
                const doc = await transaction.get(docRef);
                if (!doc.exists) {
                  throw new Error('Document does not exist');
                }
            
                // Get the existing array (similar to previous example)
                let existingArray = doc.get("Reviews");
                if (!existingArray) {
                  existingArray = [];
                }
            
                // Add the new element
                existingArray.push({createdAt: Date.now(), createdBy: uid, textReview: textReview, ratings: ratings, image: imageReview, userName: username});
            
                // Update the document with the modified array
                transaction.set(docRef, { ["Reviews"]: existingArray }, { merge: true });
              });
            
              console.log('Element pushed to array successfully!');



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


// http://localhost:3000/coupons?cid=WELCOME150&percent=0&priceoff=150&tas=get Rs 150 off
const postCoupon = (req, res) => {
    
  //option-1
  let query = require('url').parse(req.url,true).query;

  let cid = query.cid;
  let percent = query.percent;
  let priceOff = query.priceoff;
  let tc = query.tas;

          async function run() {
    
              const data = {percent: Number(percent), priceOff: Number(priceOff), tc: tc, createdAt: Date.now()};
              
              //userAddress: String(Address), userPincode: String(Pincode)
              //posting data into userData collection
              await db.collection('Coupons').doc(cid).set(data);

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


// http://localhost:3000/coupons
const getCoupon = (req, res) => {
    
  async function run() {
    
    const couponData = db.collection('Coupons');
    const snapshot = await couponData.get(); 
    
    if (snapshot.empty) {
      console.log('Enter the Coupon Details into the Collection first');
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
    console.log("Items In Coupons Collection Are:")
    snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    data.push(
      {
        id: doc.id, 
        createdAt: doc.data().createdAt,
        percent: doc.data().percent,
        priceOff: doc.data().priceOff,
        tc: doc.data().tc
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

// http://localhost:3000/addtocart?uid=1111111111&category=Menswear&itemid=111&title=Tshirt&desc=Some%20Description&quantity=2&size=XXL&price=3000&discount=10&image=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link
const postAddToCart = (req, res) => {
    
  //option-1
  let query = require('url').parse(req.url,true).query;

  let uid = query.uid;
  let productCategory = query.category;
  let itemID = query.itemid;
  let productTitle = query.title;
  let productDesc = query.desc;
  let productQuantity = query.quantity;
  let productSize = query.size;
  let productPrice = query.price;
  let productImage = query.image;
  let productDiscount = query.discount;

          async function run() {
    
              const data = {productTitle: productTitle, 
                            Description: productDesc, 
                            Units: Number(productQuantity), 
                            Pictures: productImage,
                            Price: Number(productPrice),
                            Discount: Number(productDiscount),
                            Size: productSize,   
                            Category: productCategory, 
                            outOfStock: false, 
                            createdAt: Date.now()};
              
              //userAddress: String(Address), userPincode: String(Pincode)
              //posting data into userData collection
              await db.collection('Users').doc(uid).collection('Add to Cart').doc(itemID).set(data);

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


// http://localhost:3000/viewcart?uid=1111111111
const getCartItems = (req, res) => {
    
  let query = require('url').parse(req.url,true).query;
  let uid = query.uid;

  async function run() {
    
    const cartData = db.collection('Users').doc(uid).collection('Add to Cart');
    const snapshot = await cartData.get(); 
    
    if (snapshot.empty) {
      console.log('Enter the Cart Items into the Collection first');
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
    console.log(" Cart Items In Collection Are:")
    snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    data.push(
      {                     
                            Category: doc.data().Category,
                            productTitle: doc.data().productTitle, 
                            Description: doc.data().Description, 
                            Units: doc.data().Units, 
                            Pictures: doc.data().Pictures,
                            Price: doc.data().Price,
                            Discount: doc.data().Discount,
                            Size: doc.data().Size,   
                            outOfStock: doc.data().outOfStock, 
                            createdAt: doc.data().createdAt})
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

// http://localhost:3000/addaddress?uid=1111111111&type=home&pincode=303012&address1=someAddress123&address2=anotherAddress456&state=Gujarat&city=gandhingar&latitude=7897644345&longitude=345678765 
const postAddress = (req, res) => {
    
  //option-1
  let query = require('url').parse(req.url,true).query;

  let uid = query.uid;
  let type = query.type;
  let pincode = query.pincode;
  let Address1 = query.address1;
  let Address2 = query.address2;
  let State = query.state;
  let City = query.city;
  let Latitude = query.latitude;
  let Longitude = query.longitude;

          async function run() {
    
              const data = {Pincode: pincode, 
                            Address1: Address1, 
                            Address2: Address2, 
                            State: State,
                            City: City,
                            Latitude: Number(Latitude),
                            Longitude: Number(Longitude)};
              
              // //userAddress: String(Address), userPincode: String(Pincode)
              // //posting data into userData collection
              // await db.collection('Users').doc(uid).update(data);


              const docRef = db.collection('Users').doc(uid);

              // Use a transaction to ensure data consistency
              await db.runTransaction(async (transaction) => {
                const doc = await transaction.get(docRef);
                if (!doc.exists) {
                  throw new Error('Document does not exist');
                }
            
                // Get the existing array (similar to previous example)
                let existingArray = doc.get("Address");
                if (!existingArray) {
                  existingArray = [];
                }
            
                // Add the new element
                existingArray.push({createdAt: Date.now(), type: type, Pincode: Number(pincode), 
                                Address1: Address1, 
                                Address2: Address2, 
                                State: State,
                                City: City,
                                Latitude: Number(Latitude),
                                Longitude: Number(Longitude)});
            
                // Update the document with the modified array
                transaction.set(docRef, { ["Address"]: existingArray }, { merge: true });
              });
            
              console.log('Data pushed to array successfully!');

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


// http://localhost:3000/getaddress?uid=1111111111
const getAddress = (req, res) => {
    
  let query = require('url').parse(req.url,true).query;
  let uid = query.uid;

          async function run() {

            const addressData = db.collection('Users').doc(uid);
            const snapshot = await addressData.get(); 
            
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
            
            // data = {
            //   Pincode: snapshot._fieldsProto.Pincode.stringValue, 
            //   Address1: snapshot._fieldsProto.Address1.stringValue, 
            //   Address2: snapshot._fieldsProto.Address2.stringValue, 
            //   State: snapshot._fieldsProto.State.stringValue,
            //   City: snapshot._fieldsProto.City.stringValue,
            //   Latitude: snapshot._fieldsProto.Latitude.stringValue,
            //   Longitude: snapshot._fieldsProto.Longitude.stringValue,
            //   Name: snapshot._fieldsProto.Name.stringValue,
            //   Number:snapshot._fieldsProto.Number.stringValue
            // }
            // console.log("Our Address Is:")

            // console.log(snapshot._fieldsProto.Email.stringValue)



            len = snapshot. _fieldsProto.Address.arrayValue.values.length;
            data = []
                for(i=0;i<len;i++){
                data1 = snapshot. _fieldsProto.Address.arrayValue.values[i].mapValue;
            
                console.log(data1)

                data.push({
                  createdAt: data1.fields.createdAt.integerValue, 
                  State: data1.fields.State.stringValue, 
                  Address2: data1.fields.Address2.stringValue, 
                  Latitude: data1.fields.Latitude.integerValue,
                  Address1: data1.fields.Address1.stringValue,
                  City: data1.fields.City.stringValue,
                  type: data1.fields.type.stringValue,
                  Longitude: data1.fields.Longitude.integerValue,
                  Pincode: data1.fields.Pincode.integerValue
                })
                }
            
            // console.log("data is:")
            console.log(data)



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

// http://localhost:3000/cat1reviews?pid=111
const getCat1Reviews = (req, res) => {

  let query = require('url').parse(req.url,true).query;
  let pid = query.pid;
    
  async function run() {
    
    const category1Data = db.collection('Category1').doc(pid);
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

    console.log("Reviews of Item In Category-1(Menswear) Are:")

    len = snapshot. _fieldsProto.Reviews.arrayValue.values.length;
data = []
    for(i=0;i<len;i++){
    data1 = snapshot. _fieldsProto.Reviews.arrayValue.values[i].mapValue;

    data.push({image: data1.fields.image.stringValue, createdAt: data1.fields.createdAt.integerValue, 
      createdBy: data1.fields.createdBy.stringValue, ratings: data1.fields.ratings.stringValue, userName: data1.fields.userName.stringValue, 
      textReview: data1.fields.textReview.stringValue})
    }

// console.log("data is:")
console.log(data)

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

// http://localhost:3000/cat2reviews?pid=1111
const getCat2Reviews = (req, res) => {

  let query = require('url').parse(req.url,true).query;
  let pid = query.pid;
    
  async function run() {
    
    const category1Data = db.collection('Category2').doc(pid);
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

    console.log("Reviews of Item In Category-2(Womenswear) Are:")
    
    len = snapshot. _fieldsProto.Reviews.arrayValue.values.length;
data = []
    for(i=0;i<len;i++){
    data1 = snapshot. _fieldsProto.Reviews.arrayValue.values[i].mapValue;

    data.push({image: data1.fields.image.stringValue, createdAt: data1.fields.createdAt.integerValue, 
      createdBy: data1.fields.createdBy.stringValue, ratings: data1.fields.ratings.stringValue, userName: data1.fields.userName.stringValue, 
      textReview: data1.fields.textReview.stringValue})
    }


console.log("data is:")
console.log(data)

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






module.exports = {postSignup, getLogin, getBannerOffers, postCat1Review, postCat2Review, postItemListCat1, postItemListCat2, 
getItemListCat1, getItemListCat2, postCoupon, getCoupon, postAddToCart, getCartItems, postAddress, getAddress, getCat1Reviews, getCat2Reviews}






