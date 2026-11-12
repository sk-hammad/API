import Property from "../models/property.model.js";

const AddProperty = async (req,res) => {
    try{
        const {Pro_Name, Type, RK_BHK, Rent, Area, Furnishing} = req.body;

        if (!Pro_Name || 
            !Type || 
            !RK_BHK || 
            Rent === undefined||
            Rent === null ||
            Area === undefined ||
            Area === null ||
            !Furnishing){
            return res.status(400).json({
                message: "All felds are required "
            });
        };

        const property = await Property.create({
            Pro_Name,
            Type,
            RK_BHK,
            Rent,
            Area, 
            Furnishing
        });

        res.status(200).json({
            message: "Data inserted succesfully",
            property: {
                id:property._id,
                Property_Name:property.Pro_Name,
                Type: property.Type,
                RK_BHK:property.RK_BHK,
                Rent:property.Rent,
                Area: property.Area,
                Furnishing: property.Furnishing
            }
        });
    }catch(error){
        res.status(400).json({
            message:"internal server error",
            error: error.message
        })
    };
};


const ShowProperty = async(req,res) => {
    try{
        const properties = await Property.find();

        if(properties.length === 0){
            return res.status(400).json({
                message:"No properties found"
            });
        };

        return res.status(200).json({
            message:"properties fetch succefully",
            totalproperties: properties.length,
            Propertiess: properties
        });
    }catch(error){
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

const  UpdateProperty = async (req,res) =>{
    try{
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                message:"no data found"
            });
        };

        const properties = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true, runValidators:true}
        );

        if(!properties){
            return res.status(400).json({
                message:"Property not found"
            });
        };

        return res.status(200).json({
            message:"property updated successfully",
            Data: properties
        });

    }catch(error){
        return res.status(400).json({
        message: "internal server error",
        error: error.message
        });
    }
};

const DeleteProperty = async(req,res)=>{
    try{
        const deleted = await Property.findByIdAndDelete(req.params.id)

        if(!deleted){
            return res.status(400).json({
                message:"property not found"
            });
        };

        return res.status(200).json({
            message:"property deleted succesfully"
        });

    }catch(error){
        return res.status(400).json({
        message: "internal server error",
        error: error.message
        });
    }
}



export {AddProperty, ShowProperty, UpdateProperty, DeleteProperty};