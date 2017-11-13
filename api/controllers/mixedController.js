var PoiModel = require('../models/poiModel')
var BuildingModel = require('../models/buildingModel')

let poiAttributes = '_id name kind description neighbors';

const getUsefulPois = (req , res) =>{
  PoiModel.find({kind: "Cafeteria"},poiAttributes,(err,poi) =>{
    if(err){
      res.status(404).json({ response: false , error:err })
    }else{
      BuildingModel.find({},"_id name pois",(err,bud)=>{
        if(err){
          res.status(404).json({ response: false , error:err })
        }else{
          res.status(200).json({ response: true , buildings:bud, pois:poi})
        }
      })
    }
  })
}

module.exports={
  getUsefulPois
}
