import type {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import mongoose from 'mongoose';


export const conectarMongoDB = (handler : NextApiHandler) =>
    async (req : NextApiRequest, res : NextApiResponse) =>{


        if (mongoose.connections[0].readyState){
            return handler(req,res);
        }


        const {CONEXAO_BD} = process.env
        if (!CONEXAO_BD){
            return res.status(500).json({erro: 'ENV do banco de dados não informada'});
        }


        mongoose.connection.on ('connection', () => console.log('Banco de dados conectado'));
        mongoose.connection.on('error', error => console.log(`Ocorreu um erro ao conectar ao Banco de Dados ${error}`));


        await mongoose.connect(CONEXAO_BD);
        return handler(req,res);
    }
