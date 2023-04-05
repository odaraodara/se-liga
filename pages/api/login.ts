import {NextApiRequest, NextApiResponse} from 'next';
import {conectarMongoDB} from '../../middleware/conectarMongoDB';
import md5 from 'md5';
import {usuarioModel} from '../../models/usuarioModel';
import nc from 'next-connect';
import jwt from 'jsonwebtoken';

const endpointLogin = nc()

.post(

        async (req : NextApiRequest, res : NextApiResponse) =>{

        const {CHAVE_JWT} = process.env;  
        if(!CHAVE_JWT) {
            return res.status(500).json({erro: 'ENV JWT não informada'});
        }
        
        const {login, senha} = req.body;

        const usuarioLogin = await usuarioModel.find({email : login, senha : md5(senha)});
        if (usuarioLogin && usuarioLogin.length > 0){
            const usuarioEncontrado = usuarioLogin[0]

            const token = jwt.sign({_id : usuarioEncontrado._id}, CHAVE_JWT);
            
            return res.status(200).json({
                nome : usuarioEncontrado.nome,
                email : usuarioEncontrado.email,
                empresa : usuarioEncontrado.empresa,
                token
             });
        }
            return res.status(405).json({erro: 'Usuário ainda não cadastrado'});
    }
)

export default conectarMongoDB(endpointLogin);
