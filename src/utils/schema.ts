import * as yup from 'yup';

import { FORM_ERROR_MESSAGES } from './constants/messages';

const regex_spacing = /^[^\s]*$/;
const regex_special = /^[^~!#$%^&*()_+|<>?:{}]*$/;
const regex_inword = /^[^ㄱ-ㅎ|ㅏ-ㅣ]*$/;

export const signUpSchema = yup.object({
  email: yup
    .string()
    .required(FORM_ERROR_MESSAGES.EMAIL_REQUIRED)
    .matches(regex_spacing, FORM_ERROR_MESSAGES.SPACING)
    .matches(regex_special, FORM_ERROR_MESSAGES.SPEACIAL)
    .email(FORM_ERROR_MESSAGES.EMAIL_PATTERN),
  nickname: yup
    .string()
    .required(FORM_ERROR_MESSAGES.NICKNAME_REQUIRED)
    .matches(regex_inword, FORM_ERROR_MESSAGES.NICKNAME_INWORD)
    .matches(regex_spacing, FORM_ERROR_MESSAGES.SPACING)
    .matches(regex_special, FORM_ERROR_MESSAGES.SPEACIAL)
    .min(2, FORM_ERROR_MESSAGES.MIN(2))
    .max(10, FORM_ERROR_MESSAGES.MAX(10)),
  password: yup
    .string()
    .required(FORM_ERROR_MESSAGES.PASSWORD_REQUIRED)
    .matches(regex_spacing, FORM_ERROR_MESSAGES.SPACING)
    .matches(regex_special, FORM_ERROR_MESSAGES.SPEACIAL)
    .min(4, FORM_ERROR_MESSAGES.MIN(4))
    .max(20, FORM_ERROR_MESSAGES.MAX(10)),
  passwordConfirm: yup
    .string()
    .required(FORM_ERROR_MESSAGES.CONFIRM_PASSWORD_REQUIRED)
    .oneOf([yup.ref('password')], FORM_ERROR_MESSAGES.CONFIRM_PASSWORD),
});
