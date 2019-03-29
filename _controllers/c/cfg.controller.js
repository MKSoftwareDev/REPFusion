'use strict'
//models
var Cfg = require ('../../_models/c/cfg.model');


//lista
function cfg_lst (req, res){
    Cfg.find({},(err,cfg)=>{
        if (err){
            res.status(500).send({messaje:err.message});
        } else {
            if(!cfg){
                res.status(404).send({message:'No se encontro el registro'});
            } else {
                res.status(200).send({cfg});
                //console.log(cfg);               
            }
        }
    });
}

module.exports={
    cfg_lst
};