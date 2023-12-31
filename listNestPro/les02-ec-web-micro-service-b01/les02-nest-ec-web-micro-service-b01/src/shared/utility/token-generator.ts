import jwt from 'jsonwebtoken'
import config from 'config'

export const generateAuthToken = async (userId: string) => {
    return await jwt.sign({
        _id: userId,
    }, config.get('jwtSecret'), {
        expiresIn: '30d'
    });
}

export const decodeAuthToken = async (token : string) => {
    return await jwt.verify(token, config.get('jwtSecret'));
}