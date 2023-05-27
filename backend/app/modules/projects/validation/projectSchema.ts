import Joi from "joi"
import config from "../../../config/appConfig"

export const createProjectSchema = Joi.object({
  projectTitle: Joi.string().min(5).required(),
  projectGoal: Joi.string().valid("Maximize", "Minimize").required(),
  measuredProperty: Joi.string().valid("Activity", "Solubility", "Thermostability").required(),
  uniprotId: Joi.string().max(6).optional(),
  proteinPDBID: Joi.string().max(4).optional(),
  proteinAminoAcidSequence: Joi.string().optional()
})

export const paginationParams = Joi.object({
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
  search: Joi.string().allow("").empty().optional(),
})

export const projectUploadSchema = Joi.object({
  file: Joi.object({
    mimetype: Joi.string().valid('text/csv').required(),
    size: Joi.number().max(config.MaxFileSize).required(),
  }).unknown(true).required()
})
