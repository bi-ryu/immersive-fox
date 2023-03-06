import React from "react";
//blocks
import { IntroJobs, JobList } from "../../blocks";
import { ScrollToTop } from "../../hooks";

const Jobs = () => {
  return (
    <>
      <ScrollToTop />
      <IntroJobs />
      <JobList />
    </>
  );
};

export default Jobs;
