import "./Form.scss";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";


function Form({ setUsers, setIsLoading, setIsSubmited }) {
   const [controller, setController] = useState(null);


  const formik = useFormik({
    initialValues: {
      email: "",
      number: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Неправильный формат email")
        .required("Обязательное поле"),
      number: Yup.string().matches(
        /^\d{2}-\d{2}-\d{2}$/,
        "Неправильный формат числа"
      ),
    }),
    onSubmit: (values) => {
      setIsSubmited(true);
      if (controller) {
        controller.abort();
      } else {
        setUsers([]);
      }
      setIsLoading(true);
      const newController = new AbortController();
      const signal = newController.signal;
      setController(newController);

      fetch(
        `/api/users?email=${values.email}&number=${values.number.replace(
          /-/g,
          ""
        )}`,
        { signal }
      )
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("Request aborted");
          } else {
            console.log(error);
          }
        })
        .finally(() => {
          setController(null);
        });
    },
  });

  const onChangeTagInput = (e) => {
    const input = e.target.value;
    const formattedInput = input
      .replace(/[^0-9]/g, "")
      .replace(/(\d{2})(?=\d)/g, "$1-");
    formik.setFieldValue("number", formattedInput);
  };

  return (
    <>
      <h1>Поиск пользователей</h1>
      <form onSubmit={formik.handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <span className="error">{formik.errors.email}</span>
        )}
        <br />
        <label>Число</label>
        <input
          type="text"
          name="number"
          value={formik.values.number}
          onChange={onChangeTagInput}
          onBlur={formik.handleBlur}
          placeholder="xx-xx-xx"
        />
        {formik.touched.number && formik.errors.number && (
          <span className="error">{formik.errors.number}</span>
        )}
        <br />
        <button
          type="submit"
          className={`button ${
            formik.isValid && formik.dirty ? "" : "disabled"
          }`}
          disabled={!formik.isValid || !formik.dirty}
        >
          Отправить
        </button>
      </form>
    </>
  );
}

export default Form;
