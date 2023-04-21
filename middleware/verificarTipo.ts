import type {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import type {requisicaoCadastro} from '../types/requisicaoCadastro';

export const verificarTipo = (handler : NextApiHandler) =>
    async (req : NextApiRequest, res : NextApiResponse) =>{

        const usuarioTipo = req.body as requisicaoCadastro;
        if (usuarioTipo.empresa === false) {
           
            return res.status(400).json({erro: 'Área restrita para empresas'});
       }
      
        return handler (req, res);
    }