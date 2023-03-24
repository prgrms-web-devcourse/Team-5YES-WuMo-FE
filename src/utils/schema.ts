import * as yup from 'yup';

import { FORM_ERROR_MESSAGES } from './constants/messages';

const regex_spacing = /^[^\s]*$/;
const regex_inword = /^[^ㄱ-ㅎ|ㅏ-ㅣ]*$/;
const regex_password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
const regex_nickname = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
const regex_email_nospecial = /^[a-zA-Z0-9@.]*$/;
const regex_nospecial = /^[a-zA-Z0-9]*$/;

export const signUpSchema = yup.object({
  email: yup
    .string()
    .required(FORM_ERROR_MESSAGES.EMAIL_REQUIRED)
    .matches(regex_spacing, FORM_ERROR_MESSAGES.SPACING)
    .matches(regex_email_nospecial, FORM_ERROR_MESSAGES.SPEACIAL)
    .email(FORM_ERROR_MESSAGES.EMAIL_PATTERN),
  nickname: yup
    .string()
    .required(FORM_ERROR_MESSAGES.NICKNAME_REQUIRED)
    .matches(regex_inword, FORM_ERROR_MESSAGES.NICKNAME_INWORD)
    .matches(regex_spacing, FORM_ERROR_MESSAGES.SPACING)
    .matches(regex_nickname, FORM_ERROR_MESSAGES.NICKNAME_PATTERN)
    .max(20, FORM_ERROR_MESSAGES.MAX(20)),
  password: yup
    .string()
    .required(FORM_ERROR_MESSAGES.PASSWORD_REQUIRED)
    .matches(regex_password, FORM_ERROR_MESSAGES.PASSWORD_PATTERN)
    .matches(regex_spacing, FORM_ERROR_MESSAGES.SPACING)
    .matches(regex_nospecial, FORM_ERROR_MESSAGES.SPEACIAL)
    .min(8, FORM_ERROR_MESSAGES.MIN(8))
    .max(12, FORM_ERROR_MESSAGES.MAX(12)),
  passwordConfirm: yup
    .string()
    .required(FORM_ERROR_MESSAGES.CONFIRM_PASSWORD_REQUIRED)
    .oneOf([yup.ref('password')], FORM_ERROR_MESSAGES.CONFIRM_PASSWORD),
});

export const signInSchema = yup.object({
  email: yup
    .string()
    .required(FORM_ERROR_MESSAGES.EMAIL_REQUIRED)
    .email(FORM_ERROR_MESSAGES.EMAIL_PATTERN),
  password: yup.string().required(FORM_ERROR_MESSAGES.PASSWORD_REQUIRED),
});

export const userEditSchema = yup.object({
  nickname: yup
    .string()
    .required(FORM_ERROR_MESSAGES.NICKNAME_REQUIRED)
    .matches(regex_inword, FORM_ERROR_MESSAGES.NICKNAME_INWORD)
    .matches(regex_spacing, FORM_ERROR_MESSAGES.SPACING)
    .matches(regex_nickname, FORM_ERROR_MESSAGES.NICKNAME_PATTERN)
    .max(20, FORM_ERROR_MESSAGES.MAX(20)),
});
