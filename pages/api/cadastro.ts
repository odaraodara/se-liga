import type {NextApiRequest, NextApiResponse} from 'next';
import nc from 'next-connect';
import type {requisicaoCadastro} from '../../types/requisicaoCadastro';
import {usuarioModel} from '../../models/usuarioModel';
import { conectarMongoDB } from '@/middleware/conectarMongoDB';
import md5 from 'md5';


const endpointCadastro = nc()


.post( async (req : NextApiRequest, res : NextApiResponse) => {


    const usuario = req.body as requisicaoCadastro


    if(!usuario.nome || usuario.nome.length < 2){
        return res.status(400).json({erro : 'Nome invalido'});
    }


    if(!usuario.email || usuario.email.length < 5
        || !usuario.email.includes('@')){
        return res.status(400).json({erro : 'Email invalido'});
    }

    
    const emailDuplicado = await usuarioModel.find({email : usuario.email});
    if(emailDuplicado && emailDuplicado.length > 0 ){
        return res.status(400).json({erro : 'Esse email já está cadastrado'});
    }

    const padraoSenhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;


    if (!usuario.senha || !padraoSenhaRegex.test(usuario.senha)){
        return res.status(400).json({erro : 'Senha invalida'});
    }

    
    const usuarioASerSalvo ={
        nome: usuario.nome,
        email: usuario.email,
        senha: md5(usuario.senha),
        empresa : usuario.empresa
    }

    await usuarioModel.create(usuarioASerSalvo);
    return res.status(200).json({msg: 'Usuário Cadastrado com Sucesso'})
   
})


export default conectarMongoDB(endpointCadastro);