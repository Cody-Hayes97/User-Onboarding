import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Error from "./Error";
import UserData from "./DisplayUsers";

export default function UserForm() {
  const [user, setUser] = useState([]);

  console.log(user);

  //   useEffect(() => {
  //     if (props.status) {
  //       setUser([...user, props.status]);
  //     }
  //   }, [props.status]);

  //   const handleSubmit = (e, values) => {
  //     e.preventDefault();
  //     console.log("submitted!");
  //     axios
  //       .post("https://reqres.in/api/users", e.target.value)
  //       .then(response => {
  //         console.log(response);
  //         setUser(response.data);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   };

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
      .required("Must enter a password"),
    checkbox: Yup.bool().required("please agree to the terms and conditions")
  });

  return (
    <div>
      <Formik
        initialValues={{ name: "", email: "", password: "", checkbox: false }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          axios
            .post("https://reqres.in/api/users", values)
            .then(response => {
              console.log(response);
              setUser(response.data);
              setSubmitting(false);
              resetForm();
            })
            .catch(err => {
              console.log(err);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              type="text"
              name="name"
              placeholder="Enter your name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.name && errors.name ? "has-error" : null}
            />
            <Error touched={touched.name} message={errors.name} />
            <Field
              type="email"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && errors.email ? "has-error" : null}
            />
            <Error touched={touched.email} message={errors.email} />
            <Field
              type="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                touched.password && errors.password ? "has-error" : null
              }
            />
            <Error touched={touched.password} message={errors.password} />
            <label htmlFor="check-box">
              Terms of Service
              <Field
                id="check-box"
                type="checkbox"
                name="checkbox"
                placeholder="Enter your name"
              />
            </label>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <UserData userList={user} />
    </div>
  );
}
