import S from "fluent-json-schema";

export const getUserSchema = {
  params: S.object().prop("username", S.string())
};

export const createUserSchema = {
  body: S.object()
    .prop("name", S.string())
    .prop("surname", S.string())
    .prop("username", S.string())
};
