import type {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const validarTokenJWT = (handler : NextApiHandler) =>
    async (req : NextApiRequest, res : NextApiResponse) =>{

        try {

        const {CHAVE_JWT} = process.env;
        if(!CHAVE_JWT) {
            return res.status(500).json({erro: 'ENV JWT não informada'});
        }

        if(!req || !req.headers){
            return res.status(401).json({erro: 'não foi possível validar o token de acesso'});
        }

        if(req.method !== 'OPTIONS'){
            const authorization = req.headers['authorization'];
            if(!authorization){
                return res.status(401).json({erro: 'não foi possível validar o token de acesso'});  
            }

            const token = authorization.substring(7);
            if(!token){
                return res.status(401).json({erro: 'não foi possível validar o token de acesso'});     
            }

            const decoded = await jwt.verify (token, CHAVE_JWT) as JwtPayload;
            if(!decoded){
                return res.status(401).json({erro: 'não foi possível validar o token de acesso'}); 
            }

            if (!req.query){
                req.query = {};
            }
            console.log(decoded)
            req.query.userId = decoded._id;
            req.query.empresa = decoded.empresa;
        }

        } catch (e) {
           return res.status(401).json({erro: 'não foi possível validar o token de acesso'});  
        }

        
        return handler (req, res);
    }