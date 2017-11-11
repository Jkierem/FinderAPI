var PoiModel = require('../models/poiModel')

let poiAttributes = 'name kind neighbors';

const getPois = (req,res) =>{
  PoiModel.find({},poiAttributes,(err,poi)=>{
    if(err){
      res.status(404).json({ response: false , error:err })
    }else{
      if( poi == null || poi == '' ){
        res.status(404).json({ response: false , message:"No points of interest in your mango" })
      }else{
        res.status(200).json(poi)
      }
    }
  })
}

const createPoi = (req,res) =>{
  var newPoi = new PoiModel()
  newPoi.name = req.body.name
  newPoi.kind = req.body.kind
  newPoi.neighbors = req.body.neighbors
  newPoi.save((err,poi)=>{
    if(err){
      res.status(500).json({ response: false , error:err})
    }else{
      res.status(200).json(poi)
    }
  })
}

const updatePoi = (req,res) =>{
  PoiModel.findOne({_id: req.params.poiId}, (err,poi)=>{
    if(err){
      res.status(500).json({ response: false , error:err})
    }else{
      const { name , kind , neighbors } = req.body
      poi.name = (name === undefined )? poi.name : name
      poi.kind = (kind === undefined )? poi.kind : kind
      poi.neighbors = (neighbors === undefined)? poi.neighbors : neighbors
      poi.save((err,poi)=>{
        if(err){
          res.status(500).json({response: false , error:err})
        }else{
          res.status(200).json({response: true , poi:poi })
        }
      })
    }
  })
}

const getPoiById = (req,res) =>{
  PoiModel.find({_id:req.params.poiId},poiAttributes,(err,poi)=>{
    if(err){
      res.status(500).json({response: false , error:err})
    }else{
      if( poi == null || poi == '' ){
        res.status(404).json({response: false , message: `Could not find poi with id ${req.params.poiId}`})
      }else{
        res.status(200).json(poi)
      }
    }
  })
}

const deletePoi = (req,res) =>{
  PoiModel.remove({
    _id: req.params.poiId
  }, function(err, poi) {
    if (err)
      res.status(500).send(err);
    res.status(200).json({ message: 'Poi successfully deleted' });
  });
}

const getPoiByName = (req,res) =>{
  PoiModel.find({name:req.params.name},poiAttributes,(err,poi)=>{
    if(err){
      res.status(500).json({response: false , error:err})
    }else{
      if( poi == null || poi == '' ){
        res.status(404).json({response: false , message: `Could not find poi with name ${req.params.name}`})
      }else{
        res.status(200).json(poi)
      }
    }
  })
}


module.exports ={
  getPois,
  createPoi,
  updatePoi,
  getPoiById,
  deletePoi,
  getPoiByName
}
