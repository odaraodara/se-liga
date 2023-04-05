import {NextApiRequest, NextApiResponse} from 'next';
import {conectarMongoDB} from '../../middleware/conectarMongoDB';
import md5 from 'md5';
import {usuarioModel} from '../../models/usuarioModel';
import nc from 'next-connect';

const endpointLogin = nc()

.post(
    async (req : NextApiRequest, res : NextApiResponse) =>{
        const {login, senha} = req.body;

        const usuarioLogin = await usuarioModel.find({email : login, senha : md5(senha)});
        if (usuarioLogin && usuarioLogin.length > 0){
            const usuarioEncontrado = usuarioLogin[0]
            return res.status(200).json({msg: `Olá ${usuarioEncontrado.nome}, seu login foi autenticado com sucesso!`});
        }
            return res.status(405).json({erro: 'Usuário ainda não cadastrado'});
    }
)

export default conectarMongoDB(endpointLogin);
