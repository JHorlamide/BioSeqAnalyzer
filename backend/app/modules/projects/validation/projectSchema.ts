import Joi from "joi"

export const createProjectSchema = Joi.object({
  projectTitle: Joi.string().min(5).required(),
  projectGoal: Joi.string().valid("Maximize", "Minimize").required(),
  measuredProperty: Joi.string().valid("Activity", "Solubility", "Thermostability").required(),
  uniprotId: Joi.string().max(6).optional(),
  proteinPDBID: Joi.string().max(4).optional(),
  proteinAminoAcidSequence: Joi.string().max(5).optional()
})