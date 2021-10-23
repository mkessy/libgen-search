import { object, SchemaOf, number, string, array, InferType } from "yup";

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
  identifier: array().of(string().defined()).defined(),
  filesize: number().positive().integer().defined(),
}).defined();

//search query schema recieved as get request to /search endpoint
export const SearchQuerySchema = object({
  queryString: string().defined(),
}).defined();
