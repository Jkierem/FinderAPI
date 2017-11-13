var BuildingModel = require('../models/buildingModel')

const createBuilding = (req,res) => {
  var newBuild = new BuildingModel()
  newBuild.name = req.body.name
  newBuild.pois = req.body.pois
  newBuild.save((err,build) =>{
    if( err ){
      res.status(500).json({ response: false , error:err})
    }else{
      res.status(200).json(build)
    }
  })
}

const getBuildings = (req,res) => {
  BuildingModel.find({},'_id name pois',(err, bud) =>{
    if(err){
      res.status(404).json({ response: false , error:err })
    }else{
      if( bud == null || bud == '' ){
        res.status(404).json({ response: false , message:"No buildings in your mango" })
      }else{
        res.status(200).json(bud)
      }
    }
  })
}

const updateBuilding = (req,res) => {
  BuildingModel.findOne({_id: req.params.buildId}, function(err,bud){
    if(err){
      res.status(500).json({ response:false , error:err})
    }else{
      bud.name = (req.body.name === undefined)? bud.name: req.body.name
      bud.pois = (req.body.pois === undefined)? bud.pois: req.body.pois
      bud.save((err,bud)=>{
        if(err){
          res.status(500).json({ response: false , message:`Error on update: `, error:err})
        }else{
          res.status(200).json({ response: true , user: bud})
        }
      })
    }
  })
}

const deleteBuilding = (req,res) => {
  BuildingModel.remove({
    _id: req.params.buildId
  }, function(err, bud) {
    if (err)
      res.status(500).send(err);
    res.status(200).json({ message: 'Building successfully deleted' });
  });
}

//* leaving method for legacy purposes
const getBuildingById = (req,res) =>{
  BuildingModel.findOne({_id: req.params.buidlId},'_id name pois', function(err , bud){
    if(err){
      res.status(404).json({ response: false , error:err })
    }else{
      if( bud == null || bud == '' ){
        res.status(404).json({ response: false , message:`${req.params.buildId} not found` })
      }else{
        res.status(200).json({ response: true , building: bud})
      }
    }
  })
}
//****** 

const getBuildingByName = (req,res) =>{
  BuildingModel.findOne({name: req.body.name},'_id name pois', function(err , bud){
    if(err){
      res.status(404).json({ response: false , error:err })
    }else{
      if( bud == null || bud == '' ){
        res.status(404).json({ response: false , message:`${req.params.name} not found` })
      }else{
        res.status(200).json({response: true , building: bud})
      }
    }
  })
}


module.exports={
  createBuilding,
  getBuildings,
  updateBuilding,
  deleteBuilding,
  getBuildingById,
  getBuildingByName
}
