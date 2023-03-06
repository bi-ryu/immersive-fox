import React from "react";
//components
import { Job, Label } from "../../../components";
//styles
import styles from "./styles.module.scss";

const JobList = () => {
  const jobList = [
    {
      titleJob: "Software Engineer, Machine Learning",
      location: "Full Time, UK",
      list: {
        Qualifications: [
          "Experience in one or more of the following areas: Deep Learning, data mining or artificial intelligence.",
          "Expert knowledge developing production-level ML products.",
          "Experience in demonstrating technical leadership working with teams, owning projects, defining and setting technical direction for projects.",
        ],
        "About the job": [
          "Compensation and/or shares are to be discussed depending on your level and location.",
          "Apply relevant AI and machine learning techniques to train an audio-driven facial reenactment model.",
          "Define use cases and develop methodology and benchmarks to evaluate different approaches.",
          "Improve generated video resolution to increase customer satisfaction level and support this product.",
          "Develop our text to speech generator. ",
        ],
        "Preferred Qualifications": [
          "MS degree in Computer Science or related quantitative field with 5+ years of machine learning related work or research, or PhD degree in Computer Science or related quantitative field.",
          "Experience developing machine learning algorithms or machine learning infrastructure in PyTorch / TensorFlow,",
          "Experience with filesystems, server architectures and distributed systems.",
        ],
      },
    },
    {
      titleJob: "Software Engineer, Web Development, Full stack",
      location: "Full Time, Remote",
      list: {
        Qualifications: [
          "JavaScript experience, including concepts like asynchronous programming, closures, types, and ES6. Experience with React is a bonus",
          "HTML/CSS experience, including concepts like layout, specificity, cross browser compatibility, and accessibility",
          "Experience with browser APIs and optimizing front end performance.",
        ],
        "About the job": [
          "Compensation and / or shares are to be discussed depending on your level and location.",
          "Develop our main website and web client.",
          "Architect efficient and reusable front-end systems that drive complex web.",
          "Collaborate with Product Designers and Software Engineers to deliver compelling user-facing product.",
          "Identify and resolve performance and scalability issues.",
        ],
        "Preferred Qualifications": [
          "BS/MS in Computer Science or a related technical field preferred.",
        ],
      },
    },
    {
      titleJob: "Product Designer, Web",
      location: "Full Time, Remote",
      list: {
        Qualifications: [
          "Design skills and the proven experience to lead in cross-functional environments.",
          "4+ years of experience in shipping software products.",
          "Portfolio featuring examples of interaction and visual work.",
          "Experience thinking at a high level about product strategy and vision.",
        ],
        "About the job": [
          "Compensation and / or shares are to be discussed depending on your level and location.",
          "Develop design of the web client for our AI video generation solution.",
          "Contribute to strategic decisions, working with the engineering team and customers.",
          "Design end-to-end flows and visuals and individually contribute to the feature set.",
          "Give and solicit feedback from others to raise the quality and craftsmanship of the product.",
          "Help build product strategy.",
          "Thrive in dynamic, fast-paced environments.",
        ],
      },
    },
  ];

  return (
    <div className={styles.jobList}>
      <div className="container">
        <div
          className={styles.jobList__title}
          data-aos="fade-left"
          data-aos-duration="800"
        >
          <Label label="open roles" />
          <h2>Find your next job at Immersive Fox</h2>
          <p>
            Join the team of high professionals working with deep AI domain
            expertise.
          </p>
        </div>
        {jobList.map((item, index) => (
          <Job {...item} index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
