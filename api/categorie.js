const router = require('express').Router();
const Categorie=require('../models/categorie');

//Create One Categorie
router.route('/create').post((req,res)=>{
    const nom_cat=req.body.nom_cat;
    const description_cat=req.body.description_cat;
    const newCategorie =new Categorie({
        nom_cat,
        description_cat
    })
    newCategorie.save()
        .then((categories)=>{
            res.json(categories)
        })
        .catch(err => res.status(400).json('Error'+err))

})

//Read All Categories
router.route('/getall').get((req,res)=>{
    Categorie.find()
        .then(categories=> res.json(categories))
        .catch(err=> res.status(400).json('Error'+err))
})
//Read One Categorie By ID
router.route('/getOne/:id').get((req,res)=>{
    Categorie.findById(req.params.id)
        .then(categories=>res.json(categories))
        .catch(err=> res.status(400).json('Error'+err))
        
})

//Update One Ctegorie By ID
router.route('/update_categorie/:id').post((req,res)=>{
    const nom_cat=req.body.nom_cat;
    const description_cat=req.body.description_cat;
    Categorie.findOneAndUpdate(req.params.id)
        .then(categories=>{
            if(nom_cat){
                categories.set('nom_cat',nom_cat)
            }
            if(description_cat){
                categories.set('description_cat',description_cat) 
            }
            categories.save()
            res.json(categories)
        })
        .catch(err=>res.status(400).json('Error'+err))
})

//Delete One Categorie By ID
router.route('/delete/:id').delete((req,res)=>{
    Categorie.findByIdAndDelete(req.params.id)
        .then(()=>res.json('categorie deleted.'))
        .catch(err=> res.status(400).json('Error'+err))
})

module.exports=router;




