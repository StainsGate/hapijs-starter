import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";

import Joi from "joi";
const ValidationError = Joi.ValidationError;

const schema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
});

interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "Sophie", age: 37 },
  { name: "Dan", age: 42 },
];

export async function showPeople(
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  return h.view("people", { people: people });
}

export async function addPersonGet(
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  let data = {} as Person;
  return h.view("addPerson", { person: data });
}

export async function addPersonPost(
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  let data = {} as Person;
  try {
    data = request.payload as Person;
    const obj = schema.validate(data, { stripUnknown: true });
    if (obj.error) {
      throw obj.error;
    }
    data = obj.value as Person;
    people.push(data);
    return h.redirect("/people");
  } catch (err) {
    const errors: { [key: string]: string } = {};
    if (err instanceof ValidationError && err.isJoi) {
      for (const detail of err.details) {
        errors[detail.context!.key!] = detail.message;
      }
    } else {
      console.error("error", err, "adding person");
    }
    return h.view("addPerson", { person: data, errors: errors });
  }
}
