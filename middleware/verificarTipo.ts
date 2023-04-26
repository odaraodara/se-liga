import type {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';


export const verificarTipo = (handler : NextApiHandler) =>
    async (req : NextApiRequest, res : NextApiResponse) =>{

        const {empresa} = req.query
        if (!empresa) {
           
            return res.status(400).json({erro: 'Área restrita para empresas'});
       }
      
        return handler (req, res);
    }