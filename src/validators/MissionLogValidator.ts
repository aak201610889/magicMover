import Joi, { ObjectSchema } from 'joi'; 

type Schema = {
  [key: string]: string | 'Date' | 'Boolean' | 'Number' | 'String' | Array<any> | object;
};

function convertModelSchemaToJoi(schema: Schema): Record<string, Joi.Schema> {
  const joiSchema: Record<string, Joi.Schema> = {};

  for (const [key, value] of Object.entries(schema)) {
    if (value === 'String') {
      joiSchema[key] = Joi.string().required();
    } else if (value === 'Number') {
      joiSchema[key] = Joi.number().required();
    } else if (value === 'Boolean') {
      joiSchema[key] = Joi.boolean().required();
    } else if (value === 'Date') {
      joiSchema[key] = Joi.date().required();
    } else if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'object') {
        joiSchema[key] = Joi.array().items(convertModelSchemaToJoi(value[0])).required();
      } else {
        joiSchema[key] = Joi.array().items(Joi.any()).required();
      }
    } else if (typeof value === 'object') {
      joiSchema[key] = Joi.object(convertModelSchemaToJoi(value as Schema)).required();    } else {
      throw new Error('Unsupported schema type for key: ' + key);
    }
  }

  return joiSchema;
}
/**
 * The model schema for MissionLog.
 * @type {ModelSchema}
 */

const modelSchema: Schema = {
  mover: 'String',
  activity: 'String',
};
/**
 * Joi validation schema for MissionLog.
 * @type {ObjectSchema}
 */
const MissionLogSchema: ObjectSchema = Joi.object(convertModelSchemaToJoi(modelSchema));
/**
 * Validates MissionLog data against the defined Joi schema.
 * @param {any} data - The data to validate.
 * @returns {ValidationResult} - The result of the validation.
 */

export const validateMissionLog = (data: any) => {
  return MissionLogSchema.validate(data);
};
