import { object, SchemaOf, number, string, array, InferType } from "yup";
import config from "config";
/* const libgenBookDataSchema = yup.object().shape({
  id: yup.number().positive().integer().defined(),
  title: yup.string().required(),
  md5: yup.string().required(),
  identifier: yup.array().of(yup.string()),
  filesize: yup.number().positive().integer(),
});
 */

//result schema sent as response to search query
export const LibGenBookResultSchema = object({
  id: number()
    .integer()
    .defined()
    .transform((id) => parseInt(id)),
  title: string().defined(),
  md5: string().defined(),
  identifier: array()
    .of(string().defined())
    .defined()
    .default([])
    .transform((currentValue, originalValue) => {
      if (!originalValue) return undefined;
      return originalValue.split(",");
    }),
  filesize: number()
    .positive()
    .integer()
    .defined()
    .transform((fileSize) => parseInt(fileSize)),
}).defined();

export const ResponseSchema = object({
  count: number().integer().defined().default(0),
  results: array().of(LibGenBookResultSchema).defined(),
});

export const LibGenSearchQuerySchema = object({
  bookIds: array().of(number().integer().defined()).defined(),
  fields: array().of(string().defined()).defined(),
}).defined();
//search query schema recieved as get request to /search endpoint
export const SearchParamsSchema = object({
  searchTerm: string().defined().min(2).max(100),
  column: string()
    .oneOf(Object.values(config.get("libgen.searchColumns")))
    .default("title")
    .defined(),
}).defined();
