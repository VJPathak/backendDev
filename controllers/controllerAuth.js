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

}; 


//demo URL: "http://localhost:3000/bannerOffers"
const getBannerOffers = (req, res) => {
    
  async function run() {
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


//demo param: http://localhost:3000/vendorSignup?vid=12345&phno=9191919191&vendorName=Vashishth%20Pathak&gstno=ab1245dgfhf&regno=4567dcbhd7&address=this%20is%20demo%20address&longitude=202013.1&latitude=465445.1
const postVendorSignup = (req, res) => {

  //option-1
  let query = require('url').parse(req.url,true).query;

  let vid = query.vid;
  let vendorName = query.vendorName;
  let phno = query.phno;
  let gstno = query.gstno;
  let regno = query.regno;
  let address = query.address;
  let latitude = query.latitude;
  let longitude = query.longitude;

  let location = {latitude: Number(latitude), longitude: Number(longitude)}

          async function run() {
    
              const data = {address: String(address), phno: Number(phno), vendorName: String(vendorName), gstNo: String(gstno), regNo: String(regno), location: location, isActive: 1, onBoarding: Date.now()};
              let data1 = { phno, vendorName, location};

              const vendorData = db.collection("Vendor's List");
              const snapshot = await vendorData.where('phno', '==', Number(phno)).get()

              if (snapshot.empty) {
                await db.collection("Vendor's List").doc(vid).set(data);
                await db.collection("Vendor's Names").doc("Vendors").update(vid,data1);
                await db.collection("Vendor's Names").doc("Geolocations").update(vid,{'Location':data1.location});

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

              res.json(resObj)
            }
            
          }

          run().catch(console.error);

}; 


//demo param: http://localhost:3000/vendorLogin?phno=9191919191
const getVendorLogin = (req, res) => {
    
  let query = require('url').parse(req.url,true).query;
  let phno = query.phno;

  console.log(phno); 

          async function run() {
    
              const loginData = db.collection("Vendor's List");
              const snapshot = await loginData.where('phno', '==', Number(phno)).get();
              if (snapshot.empty) {
                console.log('Please Enter Valid Phno');
                res.json({
                  status: "Unauthorized",
                  statusCode: 401,
                  message: "No data found",
                  error: "Yes"
              })
                return;
              }  
              
              data = []

              snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                let id = doc.id
                data.push({
                  vid: id,
                  phno: doc.data().phno,
                  address: doc.data().address,
                  gstNo: doc.data().gstNo,
                  regNo: doc.data().regNo,
                  location: doc.data().location,
                  vendorName: doc.data().vendorName
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


//demo param: http://localhost:3000/vendorUpdateData?vid=12345&phno=9191919100&vendorName=VJ%20Pathak&address=this%20is%20demo%20address&longitude=202013.1&latitude=465445.1
const postVendorUpdate = (req, res) => {

  //option-1
  let query = require('url').parse(req.url,true).query;

  let vid = query.vid;
  let vendorName = query.vendorName;
  let phno = query.phno;
  let address = query.address;
  let latitude = query.latitude;
  let longitude = query.longitude;

  let location = {latitude: Number(latitude), longitude: Number(longitude)}

          async function run() {
    
              const data = {address: String(address), phno: Number(phno), vendorName: String(vendorName), location: location};

                await db.collection("Vendor's List").doc(vid).update({vendorName: vendorName, phno: Number(phno), location: location, address: address});
                await db.collection("Vendor's Names").doc("Vendors").update(vid,{vendorName: vendorName, phno: Number(phno), location: location});
                await db.collection("Vendor's Names").doc("Geolocations").update(vid,{location: location});

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


// http://localhost:3000/addtomenswear?vid=12345&itemid=11&category=Menswear&subcategory=Shirts&type=Tshirt&price=1000&desc=Some%20Description&size={"XL":10,"XXL":13, "XXL": 5}&images=["https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link","https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link","https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link"]

// http://localhost:3000/addtomenswear?vid=835948&itemid=11&category=Menswear&subcategory=Shirts&name=Tshirt&price=1000&desc=Some%20Description&sSize=10&mSize=20&lSize=9&xlSize=40&xxlSize=40&image1=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link&image2=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link&image3=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link&image4=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link


// https://backendinit.onrender.com/addtomenswear?vid=835948&itemid=11&category=Menswear&subcategory=kurtas&type=Tshirt&price=1000&desc=Some%20Description&sSize=10&mSize=20&lSize=9&xlSize=40&xxlSize=40&image1=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link&image2=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link&image3=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link&image4=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link

// https://backendinit.onrender.com/addtomenswear?vid=835948&itemid=44&category=Menswear&subcategory=Shirts&name=Tshirt&price=1000&desc=Some%20Description&sSize=10&mSize=20&lSize=9&xlSize=40&xxlSize=40&image1=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605&image2=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605&image3=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605&image4=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605

const postAddToCategory1= (req, res) => {

  let query = require('url').parse(req.url,true).query;

  let vid = query.vid;
  let category = query.category;
  let subcat = query.subcategory;
  let itemid = query.itemid;
  let desc = query.desc;
  // let size = query.size;
  let price = query.price;
  let name = query.name;

  // const parsedUrlImage = url.parse(req.url,true);
  // const images = JSON.parse(parsedUrlImage.query.images);
  // console.log(images); 
  let image1 = query.image1;
  let image2 = query.image2;
  let image3 = query.image3;
  let image4 = query.image4;

  let images = []
  images[0] = image1;
  images[1] = image2;
  images[2] = image3;
  images[3] = image4;

  // const parsedUrlSizes = url.parse(req.url,true);
  // const size = JSON.parse(parsedUrlSizes.query.size);
  // console.log(size); 

  let sizes = {
    S: Number(query.sSize),
    M: Number(query.mSize),
    L: Number(query.lSize),
    XL: Number(query.xlSize),
    XXL: Number(query.xxlSize)
  }

          async function run() {
    
              const data = {Category: category, 
                            subCategory: subcat,
                            Description: desc, 
                            Name:name,
                            Images: images,
                            Price: Number(price),
                            Size: sizes,   
                            Category: category, 
                            outOfStock: false, 
                            lockinPeriod: 15,
                            lockinStart: Date.now()};

              const data1 = {
                            vid: vid,
                            Category: category, 
                            subCategory: subcat,
                            Description: desc, 
                            Name:name,
                            Images: images,
                            Price: Number(price),
                            Size: sizes,   
                            Category: category, 
                            outOfStock: false, 
                            lockinPeriod: 15,
                            lockinStart: Date.now()};

              const vendorItemData = db.collection("Vendor's List").doc(vid).collection("Menswear").doc(subcat);
              const snapshot = await vendorItemData.get()
            
              if (snapshot._fieldsProto == null) {
                console.log(snapshot._fieldsProto);
                console.log('no such db');
                await db.collection("Vendor's List").doc(vid).collection("Menswear").doc(subcat).set({[itemid]: data});
                let articles = []
                articles[0] = itemid
                await db.collection("Vendor's List").doc(vid).collection("Menswear").doc(subcat).update({articles : articles});
                
              }
              else{
                console.log(snapshot._fieldsProto);
                console.log("Db has data");
                await db.collection("Vendor's List").doc(vid).collection("Menswear").doc(subcat).update(itemid,data);
                const docRef = db.collection("Vendor's List").doc(vid).collection("Menswear").doc(subcat);

                // Use a transaction to ensure data consistency
                await db.runTransaction(async (transaction) => {
                  const doc = await transaction.get(docRef);
                  if (!doc.exists) {
                    throw new Error('Document does not exist');
                  }
              
                  // Get the existing array (similar to previous example)
                  let existingArray = doc.get("articles");
                  if (!existingArray) {
                    existingArray = [];
                  }
              
                  // Add the new element
                  existingArray.push(itemid);
              
                  // Update the document with the modified array
                  transaction.set(docRef, { ["articles"]: existingArray }, { merge: true });
                });
              
                
                console.log('Element pushed to array successfully!');
  
              }

              await db.collection("Vendor's List").doc(vid).collection("Catalogue").doc(itemid).set(data);
              await db.collection(subcat).doc(itemid).set(data1);

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



// http://localhost:3000/addtowomenswear?vid=835948&itemid=1111&category=Womenswear&subcategory=Sarees&name=Silk Saree&price=2500&desc=Some%20Description&sSize=10&mSize=20&lSize=9&xlSize=40&xxlSize=40&image1=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link&image2=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link&image3=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link&image4=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link
// https://backendinit.onrender.com/addtowomenswear?vid=835948&itemid=111&category=Womenswear&subcategory=kurtis&type=Shirt&price=2500&desc=Some%20Description&sSize=10&mSize=20&lSize=9&xlSize=40&xxlSize=40&image1=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link&image2=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link&image3=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link&image4=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link


// https://backendinit.onrender.com/addtowomenswear?vid=835948&itemid=4444&category=Womenswear&subcategory=Sarees&name=Nylon Saree&price=8500&desc=Some%20Description&sSize=10&mSize=20&lSize=9&xlSize=40&xxlSize=40&image1=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605&image2=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605&image3=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605&image4=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605

const postAddToCategory2= (req, res) => {

  //option-1
  let query = require('url').parse(req.url,true).query;

  let vid = query.vid;
  let category = query.category;
  let subcat = query.subcategory;
  let itemid = query.itemid;
  let desc = query.desc;
  // let size = query.size;
  let price = query.price;
  let name = query.name;

  // const parsedUrlImage = url.parse(req.url,true);
  // const images = JSON.parse(parsedUrlImage.query.images);
  // console.log(images); 

  let image1 = query.image1;
  let image2 = query.image2;
  let image3 = query.image3;
  let image4 = query.image4;

  let images = []
  images[0] = image1;
  images[1] = image2;
  images[2] = image3;
  images[3] = image4;

  // const parsedUrlSizes = url.parse(req.url,true);
  // const size = JSON.parse(parsedUrlSizes.query.size);
  // console.log(size); 

  let sizes = {
    S: Number(query.sSize),
    M: Number(query.mSize),
    L: Number(query.lSize),
    XL: Number(query.xlSize),
    XXL: Number(query.xxlSize)
  }

  async function run() {
    
    const data = {Category: category, 
                  subCategory: subcat,
                  Description: desc, 
                  Name:name,
                  Images: images,
                  Price: Number(price),
                  Size: sizes,   
                  Category: category, 
                  outOfStock: false, 
                  lockinPeriod: 15,
                  lockinStart: Date.now()};

    const data1 = {
                  vid: vid,
                  Category: category, 
                  subCategory: subcat,
                  Description: desc, 
                  Name:name,
                  Images: images,
                  Price: Number(price),
                  Size: sizes,   
                  Category: category, 
                  outOfStock: false, 
                  lockinPeriod: 15,
                  lockinStart: Date.now()};

    const vendorItemData = db.collection("Vendor's List").doc(vid).collection("Womenswear").doc(subcat);
    const snapshot = await vendorItemData.get()
  
    if (snapshot._fieldsProto == null) {
      console.log(snapshot._fieldsProto);
      console.log('no such db');
      await db.collection("Vendor's List").doc(vid).collection("Womenswear").doc(subcat).set({[itemid]: data});
      let articles = []
      articles[0] = itemid
      await db.collection("Vendor's List").doc(vid).collection("Womenswear").doc(subcat).update({articles : articles});
      
    }
    else{
      console.log(snapshot._fieldsProto);
      console.log("Db has data");
      await db.collection("Vendor's List").doc(vid).collection("Womenswear").doc(subcat).update(itemid,data);
      const docRef = db.collection("Vendor's List").doc(vid).collection("Womenswear").doc(subcat);

      // Use a transaction to ensure data consistency
      await db.runTransaction(async (transaction) => {
        const doc = await transaction.get(docRef);
        if (!doc.exists) {
          throw new Error('Document does not exist');
        }
    
        // Get the existing array (similar to previous example)
        let existingArray = doc.get("articles");
        if (!existingArray) {
          existingArray = [];
        }
    
        // Add the new element
        existingArray.push(itemid);
    
        // Update the document with the modified array
        transaction.set(docRef, { ["articles"]: existingArray }, { merge: true });
      });
    
      
      console.log('Element pushed to array successfully!');

    }

    await db.collection("Vendor's List").doc(vid).collection("Catalogue").doc(itemid).set(data);
    await db.collection(subcat).doc(itemid).set(data1);

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

// http://localhost:3000/addtokidswear?vid=835948&itemid=77&category=Kidswear&subcategory=Boy&name=Tshirt&price=1000&desc=Some%20Description&sSize=10&mSize=20&lSize=9&xlSize=40&xxlSize=40&image1=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link&image2=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link&image3=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link&image4=https://drive.google.com/file/d/1NhydgnDFkUB3MLj8gOHG7SqNSxdX3IrE/view?usp=drive_link

// https://backendinit.onrender.com/addtokidswear?vid=835948&itemid=5567&category=Kidswear&subcategory=Boy&name=Tshirt&price=1000&desc=Some%20Description&sSize=10&mSize=20&lSize=9&xlSize=40&xxlSize=40&image1=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605&image2=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605&image3=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605&image4=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605


const postAddToCategory3= (req, res) => {

  //option-1
  let query = require('url').parse(req.url,true).query;

  let vid = query.vid;
  let category = query.category;
  let subcat = query.subcategory;
  let itemid = query.itemid;
  let desc = query.desc;
  // let size = query.size;
  let price = query.price;
  let name = query.name;

  // const parsedUrlImage = url.parse(req.url,true);
  // const images = JSON.parse(parsedUrlImage.query.images);
  // console.log(images); 

  let image1 = query.image1;
  let image2 = query.image2;
  let image3 = query.image3;
  let image4 = query.image4;

  let images = []
  images[0] = image1;
  images[1] = image2;
  images[2] = image3;
  images[3] = image4;

  // const parsedUrlSizes = url.parse(req.url,true);
  // const size = JSON.parse(parsedUrlSizes.query.size);
  // console.log(size); 

  let sizes = {
    S: Number(query.sSize),
    M: Number(query.mSize),
    L: Number(query.lSize),
    XL: Number(query.xlSize),
    XXL: Number(query.xxlSize)
  }

  async function run() {
    
    const data = {Category: category, 
                  subCategory: subcat,
                  Description: desc, 
                  Name:name,
                  Images: images,
                  Price: Number(price),
                  Size: sizes,   
                  Category: category, 
                  outOfStock: false, 
                  lockinPeriod: 15,
                  lockinStart: Date.now()};

    const data1 = {
                  vid: vid,
                  Category: category, 
                  subCategory: subcat,
                  Description: desc, 
                  Name:name,
                  Images: images,
                  Price: Number(price),
                  Size: sizes,   
                  Category: category, 
                  outOfStock: false, 
                  lockinPeriod: 15,
                  lockinStart: Date.now()};

    const vendorItemData = db.collection("Vendor's List").doc(vid).collection("Kidswear").doc(subcat);
    const snapshot = await vendorItemData.get()
  
    if (snapshot._fieldsProto == null) {
      console.log(snapshot._fieldsProto);
      console.log('no such db');
      await db.collection("Vendor's List").doc(vid).collection("Kidswear").doc(subcat).set({[itemid]: data});
      let articles = []
      articles[0] = itemid
      await db.collection("Vendor's List").doc(vid).collection("Kidswear").doc(subcat).update({articles : articles});
      
    }
    else{
      console.log(snapshot._fieldsProto);
      console.log("Db has data");
      await db.collection("Vendor's List").doc(vid).collection("Kidswear").doc(subcat).update(itemid,data);
      const docRef = db.collection("Vendor's List").doc(vid).collection("Kidswear").doc(subcat);

      // Use a transaction to ensure data consistency
      await db.runTransaction(async (transaction) => {
        const doc = await transaction.get(docRef);
        if (!doc.exists) {
          throw new Error('Document does not exist');
        }
    
        // Get the existing array (similar to previous example)
        let existingArray = doc.get("articles");
        if (!existingArray) {
          existingArray = [];
        }
    
        // Add the new element
        existingArray.push(itemid);
    
        // Update the document with the modified array
        transaction.set(docRef, { ["articles"]: existingArray }, { merge: true });
      });
    
      console.log('Element pushed to array successfully!');

    }

    await db.collection("Vendor's List").doc(vid).collection("Catalogue").doc(itemid).set(data);
    await db.collection(subcat).doc(itemid).set(data1);

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


// http://localhost:3000/vendoritems/menswear?vid=835948
const getMenswearItems = (req, res) => {

  let query = require('url').parse(req.url,true).query;
  let vid = query.vid;
    
  async function run() {
    
    const category1Data = db.collection("Vendor's List").doc(vid).collection("Menswear");
    const snapshot = await category1Data.get(); 
    
    if (snapshot.empty) {
      console.log('Enter the items into Category-1(Menswear) Collection first');
      res.json({
        status: "No Content",
        statusCode: 204,
        message: "No data found",
        // data,
        error: "Yes"
    })
      // return;
    } 

else{
    console.log("Item In Category-1(Menswear) Are:")
    
    data = []

                snapshot.forEach(doc => {
                  console.log(doc.id, '=>', doc.data());
                  let id = doc.id
                  data.push({
                    itemID: id,
                    Category: doc.data().Category,
                    Description: doc.data().Description,
                    Images: doc.data().Images,
                    Price: doc.data().Price,
                    Size: doc.data().Size,
                    Name: doc.data().Name,
                    lockinPeriod: doc.data().lockinPeriod,
                    outOfStock: doc.data().outOfStock,
                    subCategory: doc.data().subCategory
                  })

                });



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
  }
      
    run().catch(console.error);

}; 


// http://localhost:3000/vendoritems/womenswear?vid=12345
const getWomenswearItems = (req, res) => {

  let query = require('url').parse(req.url,true).query;
  let vid = query.vid;
    
  async function run() {
    
    const category1Data = db.collection("Vendor's List").doc(vid).collection("Womenswear");
    const snapshot = await category1Data.get(); 
    
    if (snapshot.empty) {
      console.log('Enter the items into Category-2(Womenswear) Collection first');
      res.json({
        status: "No Content",
        statusCode: 204,
        message: "No data found",
        // data,
        error: "Yes"
    })
      // return;
    } 
else{
    console.log("Item In Category-2(Womenswear) Are:")
    
    data = []

                snapshot.forEach(doc => {
                  console.log(doc.id, '=>', doc.data());
                  let id = doc.id
                  data.push({
                    itemID: id,
                    Category: doc.data().Category,
                    Description: doc.data().Description,
                    Images: doc.data().Images,
                    Price: doc.data().Price,
                    Size: doc.data().Size,
                    Name: doc.data().Name,
                    lockinPeriod: doc.data().lockinPeriod,
                    outOfStock: doc.data().outOfStock,
                    subCategory: doc.data().subCategory
                  })

                });



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
    }
      
    run().catch(console.error);

}; 


// http://localhost:3000/pendingorders?vid=6CLUs5RxjtXL6WSrowewiFmmoVJ2
const getPendingOrders = (req, res) => {

  let query = require('url').parse(req.url,true).query;
  let vid = query.vid;
    
  async function run() {
    
    const pendingOrderData = db.collection("Vendor's List").doc(vid).collection("Pending Orders");
    const snapshot = await pendingOrderData.get(); 
    
    if (snapshot.empty) {
      console.log('Enter the items into Collection first');
      res.json({
        status: "No Content",
        statusCode: 204,
        message: "No data found",
        error: null
    })
      return;
    } 


    data = []

                snapshot.forEach(doc => {
                  console.log(doc.id, '=>', doc.data());
                  let id = doc.id
                  data.push({
                    id: id,
                    itemDetail: doc.data().itemDetail,
                    orderDateTime: doc.data().orderDate
                  })
                });

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


// http://localhost:3000/completedorders?vid=6CLUs5RxjtXL6WSrowewiFmmoVJ2
const getCompletedOrders = (req, res) => {

  let query = require('url').parse(req.url,true).query;
  let vid = query.vid;
    
  async function run() {
    
    const pendingOrderData = db.collection("Vendor's List").doc(vid).collection("Completed Orders");
    const snapshot = await pendingOrderData.get(); 
    
    if (snapshot.empty) {
      console.log('Enter the items into Collection first');
      res.json({
        status: "No Content",
        statusCode: 204,
        message: "No data found",
        error: null
    })
      return;
    } 


    data = []

                snapshot.forEach(doc => {
                  console.log(doc.id, '=>', doc.data());
                  let id = doc.id
                  data.push({
                    id: id,
                    itemDetail: doc.data().itemDetail,
                    orderDateTime: doc.data().orderDate
                  })
                });

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


// http://localhost:3000/catalogue?vid=835948
const getVendorCatalogue = (req, res) => {

  let query = require('url').parse(req.url,true).query;
  let vid = query.vid;
    
  async function run() {
    
    const catalogueData = db.collection("Vendor's List").doc(vid).collection("Catalogue");
    const snapshot = await catalogueData.get(); 
    
    if (snapshot.empty) {
      console.log('Enter the items into Collection first');
      res.json({
        status: "No Content",
        statusCode: 204,
        message: "No data found",
        error: null
    })
      return;
    } 


    data = []

                snapshot.forEach(doc => {
                  console.log(doc.id, '=>', doc.data());
                  let id = doc.id
                  data.push({
                    id: id,
                    category: doc.data().Category,
                    description: doc.data().Description,
                    images: doc.data().Images,
                    name: doc.data().Name,
                    price: doc.data().Price,
                    size: doc.data().Size,
                    lockinPeriod: doc.data().lockinPeriod,
                    lockinStart: doc.data().lockinStart,
                    outOfStock: doc.data().outOfStock,
                    subCategory: doc.data().subCategory
                  })
                });

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



// http://localhost:3000/deleteitem?vid=835948&itemid=11&category=Menswear&subcategory=Shirts

// https://backendinit.onrender.com/addtokidswear?vid=835948&itemid=5567&category=Kidswear&subcategory=Boy&name=Tshirt&price=1000&desc=Some%20Description&sSize=10&mSize=20&lSize=9&xlSize=40&xxlSize=40&image1=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605&image2=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605&image3=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605&image4=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605


const postDeleteItem = (req, res) => {

  let query = require('url').parse(req.url,true).query;
  let vid = query.vid;
  let itemid = query.itemid;
  let category = query.category;
  let subcat = query.subcategory;

  async function run() {

    // const geolib = require('geolib');

    // const distance = geolib.getDistance(
    //   { latitude: 26.8475148, longitude: 75.8273443 },
    //   { latitude: 26.8565941, longitude: 75.8241318 }
    // );
    
    // console.log("Distance to endpoint:", distance / 1000, "km");
    
    // const data = {outOfStock: true};

    const itemData = db.collection("Vendor's List").doc(vid).collection("Catalogue").doc(itemid);
    const snapshot = await itemData.get(); 
    console.log(snapshot._fieldsProto)

    // const itemData1 = db.collection("Vendor's List").doc(vid).collection(category).doc(subcat);
    // const snapshot1 = await itemData1.get(); 

    // const itemData2 = db.collection(subcat).doc(itemid);
    // const snapshot2 = await itemData2.get(); 

    if (snapshot._fieldsProto == null) {
      console.log('Enter the items into Collection first');
      res.json({
        status: "No Content",
        statusCode: 204,
        message: "No data found",
        error: null
    })
      return;
    } 

    // if (snapshot._fieldsProto == null || snapshot1._fieldsProto == null || snapshot2._fieldsProto == null) {
    //   console.log('Enter the items into Collection first');
    //   res.json({
    //     status: "No Content",
    //     statusCode: 204,
    //     message: "No data found",
    //     error: null
    // })
    //   return;
    // } 

    //await db.collection("Vendor's List").doc(vid).collection(category).doc(subcat).set({[itemid]: {"outOfStock":true}}, { merge: true });
    await db.collection("Vendor's List").doc(vid).collection("Catalogue").doc(itemid).update({"outOfStock":true});
    await db.collection(subcat).doc(itemid).update({"outOfStock":true});
    
    let resObj = {
      status: "success",
      statusCode: 200,
      message: "OK",
      error: null
  }
  res.json(resObj)
}

  run().catch(console.error);

}; 



// http://localhost:3000/edititem?vid=835948&itemid=11&category=Menswear&subcategory=Shirts&name=Tshirt&price=1000&desc=Some%20Description&sSize=10&mSize=20&lSize=9&xlSize=40&xxlSize=40&image1=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605&image2=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605&image3=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605&image4=https://firebasestorage.googleapis.com/v0/b/duds-68a6d.appspot.com/o/ProductMen%2F1000000033?alt=media&token=f1b07e4e-eb85-4ca5-89f5-a1227d9d6605

// vid, cat, subcat, vendorId

const postEditItem = (req, res) => {

  //option-1
  let query = require('url').parse(req.url,true).query;

  let vid = query.vid;
  let category = query.category;
  let subcat = query.subcategory;
  let itemid = query.itemid;
  let desc = query.desc;
  let price = query.price;
  let name = query.name; 

  let image1 = query.image1;
  let image2 = query.image2;
  let image3 = query.image3;
  let image4 = query.image4;

  let images = []
  images[0] = image1;
  images[1] = image2;
  images[2] = image3;
  images[3] = image4;

  let sizes = {
    S: Number(query.sSize),
    M: Number(query.mSize),
    L: Number(query.lSize),
    XL: Number(query.xlSize),
    XXL: Number(query.xxlSize)
  }

  async function run() {
    
    const data = {Category: category, 
                  subCategory: subcat,
                  Description: desc, 
                  Name:name,
                  Images: images,
                  Price: Number(price),
                  Size: sizes,   
                  Category: category, 
                  outOfStock: false, 
                  lockinPeriod: 15,
                  lockinStart: Date.now()};

    const data1 = {
                  vid: vid,
                  Category: category, 
                  subCategory: subcat,
                  Description: desc, 
                  Name:name,
                  Images: images,
                  Price: Number(price),
                  Size: sizes,   
                  Category: category, 
                  outOfStock: false, 
                  lockinPeriod: 15,
                  lockinStart: Date.now()};

    const itemData = db.collection("Vendor's List").doc(vid).collection("Catalogue").doc(itemid);
    const snapshot = await itemData.get(); 
    console.log(snapshot._fieldsProto)
              
    if (snapshot._fieldsProto == null) {
      console.log('Enter the items into Collection first');
      res.json({
        status: "No Content",
        statusCode: 204,
        message: "No data found",
        error: null
      })
      return;
    } 


    await db.collection("Vendor's List").doc(vid).collection(category).doc(subcat).set({[itemid]: data}, { merge: true });
    await db.collection("Vendor's List").doc(vid).collection("Catalogue").doc(itemid).update(data);
    await db.collection(subcat).doc(itemid).update(data1);

}

  run().catch(console.error);

}; 



module.exports = {postSignup, getLogin, getBannerOffers, postCat1Review, postCat2Review, postItemListCat1, postItemListCat2, 
getItemListCat1, getItemListCat2, postCoupon, getCoupon, postAddToCart, getCartItems, postAddress, getAddress, getCat1Reviews, getCat2Reviews, 
postVendorSignup, getVendorLogin, postVendorUpdate, postAddToCategory1, postAddToCategory2, postAddToCategory3, getMenswearItems, getWomenswearItems,
getPendingOrders, getCompletedOrders, getVendorCatalogue, postDeleteItem, postEditItem}

