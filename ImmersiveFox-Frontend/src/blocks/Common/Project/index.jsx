import React from "react";
import clsx from "clsx";
import { useFormik } from "formik";
//config
import { SCHEDULE_URL } from "../../../config";
//validation
import { formSchema } from "../../../utils/validation";
//utils
import { sendMessage } from "../../../utils/emailjs";
//hooks
import { useCurrentLocation } from "../../../hooks";
//components
import { Input, Label, Button } from "../../../components";
//assets
import { At, Calendar, OrLine } from "../../../assets/icons";
//styles
import styles from "./styles.module.scss";

const Project = () => {
  const location = useCurrentLocation();
  const formik = useFormik({
    initialValues: {
      userEmail: "",
      userName: "",
      userStory: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      sendMessage(values, resetForm);
    },
  });

  const onSend = () => {
    formik.submitForm();
  };
  const openSchedule = () => {
    window.open(SCHEDULE_URL, "_blank");
  };

  return (
    <div className={styles.project} id="connectWithUs">
      <div className="container">
        <div
          className={styles.project__wrapper}
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className={styles.project__title}>
            <Label label="Get in Touch" lineColor="#191D26" />
            <h2>Have a project in mind?</h2>
          </div>
          <div className={styles.project__form}>
            <div className={styles.project__input}>
              <p>Hey, my name is</p>
              <div className={clsx(styles.input_1, styles.input)}>
                <Input
                  value={formik.values.userName}
                  name="userName"
                  onChange={formik.handleChange}
                  placeholder="Type Here"
                  error={formik.errors.userName}
                />
              </div>
            </div>
            <div className={styles.project__input}>
              <p>and I would like to</p>
              <div className={clsx(styles.input_2, styles.input)}>
                <Input
                  value={formik.values.userStory}
                  name="userStory"
                  onChange={formik.handleChange}
                  placeholder="Tell us your story"
                  error={formik.errors.userStory}
                />
              </div>
              .
            </div>
          </div>
          <div className={styles.project__form}>
            <div className={styles.project__input}>
              <p>Get in touch with me at</p>
              <br />
              <div className={clsx(styles.input_3, styles.input)}>
                <Input
                  value={formik.values.userEmail}
                  name="userEmail"
                  onChange={formik.handleChange}
                  placeholder="Type Email Address Here"
                  error={formik.errors.userEmail}
                />
              </div>
              !
            </div>
          </div>
          <Button title="Send" Icon={At} fullDark onClick={onSend} />
          {location === "/" && (
            <>
              <div className={styles.or}>
                <OrLine />
                or
              </div>
              <Button
                title="Schedule a Meeting"
                onClick={openSchedule}
                Icon={Calendar}
                emptyDark
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
