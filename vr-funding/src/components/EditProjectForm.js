import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchUserProjects } from "../actions/index";

import axiosWithAuth from "../utils/axiosWithAuth";

const EditProjectForm = ({ project, ...props }) => {
  const [targetProject, setTargetProject] = useState(project);

  const handleChanges = (e) => {
    return setTargetProject({
      ...targetProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProject = {
      project_title: targetProject.project_title,
      project_type: targetProject.project_type,
      mission_statement: targetProject.mission_statement,
      project_description: targetProject.project_description,
      funding_amount: parseInt(targetProject.funding_amount),
      amount_raised: parseInt(targetProject.amount_raised),
      project_timeline: targetProject.project_timeline,
    };

    axiosWithAuth()
      .put(`projects/${project.project_id}`, updatedProject)
      .then((res) => {
        props.fetchUserProjects(window.localStorage.getItem("id"));
      })
      .catch((err) => {});
  };

  return (
    <div>
      <form className="form container" onSubmit={handleSubmit}>
        <div className="form-group-inputs">
          <label>
            Project Title
            <input
              type="text"
              name="project_title"
              onChange={handleChanges}
              value={targetProject.project_title}
              placeholder={project.project_title}
              maxLength="20"
            ></input>
          </label>
          <label>
            Project Type
            <input
              type="text"
              name="project_type"
              onChange={handleChanges}
              value={targetProject.project_type}
              placeholder={project.project_type}
              maxLength="20"
            ></input>
          </label>
          <label>
            Mission Statement
            <input
              type="text"
              name="mission_statement"
              onChange={handleChanges}
              value={targetProject.mission_statement}
              placeholder={project.mission_statement}
              maxLength="100"
            ></input>
          </label>
          <label>
            Project Description
            <input
              type="text"
              name="project_description"
              onChange={handleChanges}
              value={targetProject.project_description}
              placeholder={project.project_description}
              maxLength="100"
            ></input>
          </label>
          <label>
            Funding Amount
            <input
              type="text"
              name="funding_amount"
              onChange={handleChanges}
              value={targetProject.funding_amount}
              placeholder={project.funding_amount}
              maxLength="20"
            ></input>
          </label>
          <label>
            Amount Raised
            <input
              type="text"
              name="amount_raised"
              onChange={handleChanges}
              value={targetProject.amount_raised}
              placeholder={project.amount_raised}
              maxLength="20"
            ></input>
          </label>
          <label>
            Project Timeline
            <input
              type="text"
              name="project_timeline"
              onChange={handleChanges}
              value={targetProject.project_timeline}
              placeholder={project.project_timeline}
              maxLength="20"
            ></input>
          </label>
        </div>
        <div className="submit">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    role: "",
  };
};

export default connect(mapStateToProps, { fetchUserProjects })(EditProjectForm);
