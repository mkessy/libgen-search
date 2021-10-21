import { object, SchemaOf, number, string, array, InferType } from "yup";
import { LibGenBookResult } from "../types";

/* const libgenBookDataSchema = yup.object().shape({
  id: yup.number().positive().integer().defined(),
  title: yup.string().required(),
  md5: yup.string().required(),
  identifier: yup.array().of(yup.string()),
  filesize: yup.number().positive().integer(),
});
 */

export const LibGenBookResultSchema = object({
  id: number().integer().defined(),
  title: string().defined(),
  md5: string().defined(),
  identifier: array().of(string().defined()).defined(),
  filesize: number().positive().integer().defined(),
}).defined();
