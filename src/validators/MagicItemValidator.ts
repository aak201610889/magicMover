import Joi, { ObjectSchema, ValidationResult } from 'joi';

interface ModelSchema {
  [key: string]: 'String' | 'Number' | 'Boolean' | 'Date' | 'Object' | ModelSchema | Array<any>;
}

// Convert model schema to Joi schema
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
      // Handle arrays with a well-defined item schema
      if (value.length > 0 && typeof value[0] === 'object') {
        joiSchema[key] = Joi.array().items(convertModelSchemaToJoi(value[0] as ModelSchema)).required();
      } else {
        // Handle case where array schema is not well-defined or contains primitive types
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
 * The model schema for MagicItem.
 * @type {ModelSchema}
 */



const modelSchema: ModelSchema = {
  "name": "String",
  "weight": "Number"
};
/**
 * Joi validation schema for MagicItem.
 * @type {ObjectSchema}
 */

const MagicItemSchema: ObjectSchema = Joi.object(convertModelSchemaToJoi(modelSchema));

/**
 * Validates MagicItem data against the defined Joi schema.
 * @param {Record<string, any>} data - The data to validate.
 * @returns {ValidationResult} - The result of the validation.
 */
export const validateMagicItem = (data: Record<string, any>): ValidationResult => {
  return MagicItemSchema.validate(data);
};
