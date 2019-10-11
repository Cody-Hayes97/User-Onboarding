import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function UserForm(props) {
  const [users, setUser] = setState([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(20)
      .required("Must enter a name"),
    email: Yup.string()
      .email("must be a valid email address")
      .max(255)
      .required("Must enter an email"),
    password: Yup.string()
      .min(8, "password is too short, should be at least 8 characters")
      .required("Must enter a password")
  });

  return (
    <Formik>
      <Form>
        <Field type="text" name="name" placeholder="Enter your name" />
        <Field type="email" name="email" placeholder="Enter your email" />
        <Field
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <label htmlfor="check-box">
          Terms of Service
          <Field
            id="check-box"
            type="checkbox"
            name="name"
            placeholder="Enter your name"
          />
        </label>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
