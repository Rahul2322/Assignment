const { ErrorHandler } = require('../utils/errorHandler');
const { schema } = require('../utils/validation');

exports.userValidation = (req,res,next)=>{
    const { error } =  schema.validate(req.body);
    if(error){
        throw new ErrorHandler( error.details[0].message,500)
        // return res.status(400).json({ error: error.details[0].message });
    }
   next();
}
