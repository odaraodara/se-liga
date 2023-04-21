import mongoose, {Schema} from "mongoose";

const vagaSchema = new Schema({

    titulo : {type: String, require: true},
    local: {type: String, require: true},
    descricao : {type: String, require: true},
    requisitos : {type: String, require: true},
    dataInclusao : {type: Date, require: true}
});

export const vagasModel = (mongoose.models.vagas || 
      mongoose.model('vagas', vagaSchema));