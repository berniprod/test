const router =require('express').Router();
const {Product,Files}=require('../models/product');
const multer=require('multer')


//middlware for the DATE
const date=(req,res,next)=>{
    req.requestTime=new Date().toISOString()
    next()
}
//multer config

const   storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
  })
const uploads = multer({ storage: storage })

//Create One Product
router.route('/create').post((req,res)=>{
    const code_product=req.body.code_product;
    const nom_product=req.body.nom_product;
    const description=req.body.description;
    const prix=req.body.prix;
    const prod_categorie=req.body.prod_categorie;
    const newProduct =new Product({
        code_product,
        nom_product,
        description,
        prix,
        prod_categorie
    })
    newProduct.save()
        .then((products)=>{
            res.json(products)
        })
        .catch(err => res.status(400).json('Error'+err))

})
//Read All Categories
router.route('/getall').get((req,res)=>{
    Product.find()
        .then(products=> res.json(products))
        .catch(err=> res.status(400).json('Error'+err))
})
//Read One Product By ID
router.route('/getOne/:id').get((req,res)=>{
    Product.findById(req.params.id)
        .then(products=>res.json(products))
        .catch(err=> res.status(400).json('Error'+err))    
})
//Update One Product By ID
router.route('/update/:id').post((req,res)=>{
    const code_product=req.body.code_product;
    const nom_product=req.body.nom_product;
    const description=req.body.description;
    const prix=req.body.prix;
    const prod_categorie=req.body.prod_categorie;
    Product.findOneAndUpdate(req.params.id)
        .then(products=>{
            if(code_product){
                products.set('code_product',code_product)
            }
            if(nom_product){
                products.set('nom_product',nom_product) 
            }
            if(description){
                products.set('description',description) 
            }
            if(prix){
                products.set('prix',prix) 
            }
            if(prod_categorie){
                products.set('prod_categorie',prod_categorie) 
            }
            products.save()
            res.json(products)
        })
        .catch(err=>res.status(400).json('Error'+err))
})
//Delete One Product By ID
router.route('/delete/:id').delete((req,res)=>{
    Product.findByIdAndDelete(req.params.id)
        .then(()=>res.json('product deleted.'))
        .catch(err=> res.status(400).json('Error'+err))
})
//Multiple files upload
router.route('/upload/:id').post(date,uploads.array('files',10),(req,res)=>{
    const files=req.files
    if(!files){
        res.status(400).json('please upload one file please')
    }
    Product.findByIdAndUpdate(req.params.id)
        .then(product=>{
            var compteur;
            var file=[]
            for(compteur=0;compteur<files.length;compteur++){
                const originalname=files[compteur].originalname
                const mimetype=files[compteur].mimetype
                const encoding=files[compteur].encoding
                const createdAt=req.requestTime
                const newFiles=new Files({
                    originalname,
                    mimetype,
                    encoding,
                    createdAt
                })
                console.log(newFiles)
                file.push(newFiles)
            }
            product.image_Product=file
            product.save()
                .then((product)=>res.json(product.image_Product))
                .catch((err)=> {res.status(400).json('Error'+err)})
            
            
        })
        .catch(err=>res.status(400).json('Error'+err))

})

module.exports=router;