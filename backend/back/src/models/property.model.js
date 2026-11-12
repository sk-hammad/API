import mongoose, {Schema} from "mongoose";

const PropertySchema = new Schema({
    Pro_Name:{
        type : String,
        required: true,
    },

    Type:{
        type:String,
        enum: ["Rental", "Sale", "Pg", "Commercial"],
        required:true
    },


    RK_BHK:{
        type:String,
        required:true,
        enum: ["RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "6 BHK"]
    },

    Rent:{
        type : Number,
        required: true,
        min:0
    },

    Area: {
      type: Number,
      required: true,
      min: 1
    },

    Furnishing: {
      type: String,
      enum: ["Furnished", "Unfurnished", "Fully Furnished"],
      required: true
    },

},
    {
        timestamps:true
    }
);

const Property = mongoose.model("Property", PropertySchema);

export default Property;