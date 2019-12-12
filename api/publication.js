const router =require('express').Router();
const Publication=require('../models/publication');

//middlware for the DATE
const date=(req,res,next)=>{
    req.requestTime=new Date().toISOString()
    next()
}

//Create One Publication
router.route('/create').post(date,(req,res)=>{
    const id_pub=req.body.id_pub;
    const type=req.body.type;
    const contenu=req.body.contenu;
    const date=req.requestTime;
    const pub_product=req.body.pub_product;
    const newPublication =new Publication({
        id_pub,
        type,
        contenu,
        date,
        pub_product
    })
    newPublication.save()
        .then((publications)=>{
            res.json(publications)
        })
        .catch(err => res.status(400).json('Error'+err))

})
//Read All publication
router.route('/getall').get((req,res)=>{
    Publication.find()
        .then(publications=> res.json(publications))
        .catch(err=> res.status(400).json('Error'+err))
})
//Read One Publication By ID
router.route('/getOne/:id').get((req,res)=>{
    Publication.findById(req.params.id)
        .then(publications=>res.json(publications))
        .catch(err=> res.status(400).json('Error'+err))    
})
//Update One publication By ID
router.route('/update/:id').post(date,(req,res)=>{
    const id_pub=req.body.id_pub;
    const type=req.body.type;
    const contenu=req.body.contenu;
    const date=req.requestTime;
    const pub_product=req.body.pub_product;
    Publication.findOneAndUpdate(req.params.id)
        .then(publications=>{
            if(id_pub){
                publications.set('id_pub',id_pub)
            }
            if(type){
                publications.set('type',type) 
            }
            if(contenu){
                publications.set('contenu',contenu) 
            }
            if(date){
                publications.set('date',date) 
            }
            if(pub_product){
                publications.set('pub_product',pub_product) 
            }
            publications.save()
            res.json(publications)
        })
        .catch(err=>res.status(400).json('Error'+err))
})
//Delete One publications By ID
router.route('/delete/:id').delete((req,res)=>{
    Publication.findByIdAndDelete(req.params.id)
        .then(()=>res.json('publication deleted.'))
        .catch(err=> res.status(400).json('Error'+err))
})

module.exports=router;