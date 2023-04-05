import type {NextApiRequest, NextApiResponse} from 'next';
import nc from 'next-connect';
import {validarTokenJWT} from '../../middleware/validarTokenJWT';
import {conectarMongoDB} from '../../middleware/conectarMongoDB';

const endpointAreaEmpresa = nc()

.post( async (req : NextApiRequest, res: NextApiResponse) => {

    return res.status(200).json({msg: 'Usuário autenticado com suucesso'});

})

export default validarTokenJWT (endpointAreaEmpresa); 