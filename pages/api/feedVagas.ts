import {NextApiRequest, NextApiResponse} from 'next';
import {conectarMongoDB} from '../../middleware/conectarMongoDB';
import nc from 'next-connect';
import {validarTokenJWT} from '../../middleware/validarTokenJWT';   
import {verificarTipo} from '../../middleware/verificarTipo';   
import { vagasModel } from '@/models/vagasModel';


const endpointFeedVagas = nc()

.get(async (req : NextApiRequest, res: NextApiResponse) => {

    const vaga = await vagasModel.find();
    return res.status(200).json({data : vaga})

})





export default validarTokenJWT (verificarTipo (conectarMongoDB (endpointFeedVagas))) ; 