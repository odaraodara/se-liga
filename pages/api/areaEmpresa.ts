import type {NextApiRequest, NextApiResponse} from 'next';
import nc from 'next-connect';
import {validarTokenJWT} from '../../middleware/validarTokenJWT';
import {conectarMongoDB} from '../../middleware/conectarMongoDB';
import {verificarTipo} from '../../middleware/verificarTipo';
import type {requisicaoVagas} from '../../types/requisicaoVagas';
import {vagasModel} from '../../models/vagasModel';




    const endpointAreaEmpresa = nc()

    .get (async (req : NextApiRequest, res: NextApiResponse) => {

        const vaga = await vagasModel.find();
        return res.status(200).json({data : vaga})
    
    })

       
    .post( async (req : NextApiRequest, res: NextApiResponse) => {

        try {
            const vagas = req.body as requisicaoVagas

        if (!vagas.titulo|| vagas.titulo === "") {
            return res.status(400).json({erro: "O campo do título é obrigatório." });
          }
        
        if (!vagas.local|| vagas.local === "") {
            return res.status(400).json({erro: "O campo do local é obrigatório." });
          }  

        if (!vagas.descricao|| vagas.descricao === "") {
            return res.status(400).json({erro: "O campo da descrição é obrigatório." });
          }  

        if (!vagas.requisitos|| vagas.requisitos === "") {
            return res.status(400).json({erro: "O campo dos requisitos é obrigatório." });
          }    

        const novaVaga = {
            titulo: vagas.titulo,
            local: vagas.local,
            descricao : vagas.descricao,
            requisitos : vagas.requisitos,
            dataInclusao : new Date().toISOString()
        }; 
            await vagasModel.create(novaVaga);

          return res.status(201).json({ msg: "Vaga cadastrada com sucesso." }); 
            
        } catch (e) {
            return res.status(500).json({ erro: "ocorreu um erro ao cadastrar a vaga." }); 
        }
      
    }) 

    .delete( async (req : NextApiRequest, res: NextApiResponse) => {

        const {idVaga} = req.query;
        const vagaEncontrada = await vagasModel.findById(idVaga);

        if(!vagaEncontrada){
            return res.status(404).json({ erro: "Vaga não encontrada" });
        }
        await vagasModel.findByIdAndDelete(idVaga);
        return res.status(200).json({msg: "Vaga deletada"});
    })

    .put( async (req :NextApiRequest, res:NextApiResponse) => {
        const vagaEditada = req.body as requisicaoVagas;
        const {idVaga} = req.query;

        const vagaEncontrada = await vagasModel.findById(idVaga);
        if (!vagaEncontrada) {
            return res.status(404).json({ erro: "Vaga não encontrada" });
          }
        
        vagaEncontrada.titulo = vagaEditada.titulo;
        vagaEncontrada.local = vagaEditada.local;
        vagaEncontrada.descricao = vagaEditada.descricao;
        vagaEncontrada.requisitos = vagaEditada.requisitos;
        vagaEncontrada.dataInclusao = new Date().toISOString;
        
        await vagasModel.findByIdAndUpdate(
            {_id : vagaEncontrada._id},
            vagaEncontrada
        )

        return res.status(204).json({});

    })

    
    export default validarTokenJWT (verificarTipo (conectarMongoDB (endpointAreaEmpresa))) ; 



