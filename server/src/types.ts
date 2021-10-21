import { LibGenBookResultSchema } from "./libgen/schemas";
import { InferType } from "yup";

export type LibGenBookResult = InferType<typeof LibGenBookResultSchema>;
