import mongoose, {Schema} from "mongoose";

const usuarioSchema = new Schema({
    nome : {type: String, require: true},
    email : {type: String, require: true},
    senha : {type: String, require: true},
    tipoDeUsuario : {type: Boolean, require: true}
});

export const usuarioModel = (mongoose.models.usuarios || 
      mongoose.model('usuarios', usuarioSchema));