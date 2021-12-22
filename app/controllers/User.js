const UserModel = require('../model/user')

exports.create = async (req, res)=>{
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone){
        res.status(400).send({message: "Please fill the required field!"});
    }

    const user = new UserModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    });

    await user.save().then(data => {
        res.send({
            message:"User created Successfully!",
            user:data
        });
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occured while creating new user"
        });
    });
};

exports.findAll = async (req, res)=>{
    try{
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch(error){
        res.status(404).json({message: error.message});
    };
};

exports.findOne = async (req, res) =>{
    try{
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error){
        res.status(404).json({message: error.message});
    }
};


exports.update = async(req, res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Updating Data cannot be empty!"
        });
    }

    const id = req.params.id;
    
    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data=>{
        if(!data){
            res.status(404).send({
                message: `User not Found!`
            });
        }else{
            res.send({message: "User Updated Successfully!"})
        }
    }).catch(err=>{
        res.status(500).send({
            message: err.message
        });
    });
};


exports.destroy = async (req, res)=>{
    await UserModel.findByIdAndRemove(req.params.id).then(data=>{
        if(!data){
            res.status(404).send({
                message: `User not Found!`
            });
        }else{
            res.send({
                message: "User Deleted Successfully!"
            });
        }
    }).catch(err=>{
        res.status(500).send({
            message: err.message
        });
    });
};