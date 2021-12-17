import jwt from 'jsonwebtoken';

const secret = 'test';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        
        if(!token) return res.status(401).send({
            ok: false,
            error: "Access denied. No token provided."
        })
        
        let decodeData;

        if(token){
            decodeData = jwt.verify(token, secret);
            req.userId = decodeData.id
            req.email = decodeData.email;
            req.role = decodeData.role;

            next();
        }       

    } catch (error) {
        return res.status(401).send({
            error: "Access denied. Not Authorized."
        })
    }
    
}

export default auth;