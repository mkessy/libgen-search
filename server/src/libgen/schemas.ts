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
  id: number().integer().defined(),
  title: string().defined(),
  md5: string().defined(),
  identifier: array()
    .of(string().defined())
    .defined()
    .transform((curVal, _prevVal) => {
      if (!curVal) return [];
      return curVal.split(",");
    }),
  filesize: number().positive().integer().defined(),
}).defined();

export const LibGenSearchQuerySchema = object({
  bookIds: array().of(number().integer().defined()).defined(),
  fields: array().of(string().defined()).defined(),
}).defined();
//search query schema recieved as get request to /search endpoint
export const SearchParamsSchema = object({
  searchTerm: string().defined().min(5).max(100),
  column: string()
    .oneOf(Object.values(config.get("libgen.searchColumns")))
    .default("title"),
}).defined();
