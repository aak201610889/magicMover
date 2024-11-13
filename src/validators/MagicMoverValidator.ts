import Joi, { ObjectSchema, ValidationResult } from 'joi';

interface ModelSchema {
  [key: string]: 'String' | 'Number' | 'Boolean' | 'Date' | 'Object' | ModelSchema | Array<any>;
}

function convertModelSchemaToJoi(schema: ModelSchema): { [key: string]: Joi.Schema } {
  const joiSchema: { [key: string]: Joi.Schema } = {};

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
        joiSchema[key] = Joi.array().items(convertModelSchemaToJoi(value[0] as ModelSchema)).required();
      } else {
        joiSchema[key] = Joi.array().items(Joi.any()).required();
      }
    } else if (typeof value === 'object') {
      joiSchema[key] = Joi.object(convertModelSchemaToJoi(value as ModelSchema)).required();
    } else {
      throw new Error('Unsupported schema type for key: ' + key);
    }
  }

  return joiSchema;
}

/**
 * The model schema for MagicMover.
 * @type {ModelSchema}
 */

const modelSchema: ModelSchema = {
  "name": "String",
  "weightLimit": "Number",
};

/**
 * Joi validation schema for MagicMover.
 * @type {ObjectSchema}
 */
const MagicMoverSchema: ObjectSchema = Joi.object(convertModelSchemaToJoi(modelSchema));

/**
 * Validates MagicMover data against the defined Joi schema.
 * @param {Record<string, any>} data - The data to validate.
 * @returns {ValidationResult} - The result of the validation.
 */
export const validateMagicMover = (data: Record<string, any>): ValidationResult => {
  return MagicMoverSchema.validate(data);
};
