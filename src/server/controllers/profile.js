const services = require('../../services');
const { badRequest } = require('../../statusCode');
const  jwt=require('jsonwebtoken');
async function getUserInfo(req, res){
    try {
        const user=jwt.decode(req.cookies.AuthToken);
        const {message, code} = await services.getUserByID(user.userId);
        res.status(code).send(message);
    } catch (err) {
        res.status(badRequest).send({error: err.message});
    }
}


module.exports={
    getUserInfo,
};
