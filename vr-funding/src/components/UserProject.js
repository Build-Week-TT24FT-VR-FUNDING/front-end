import React, { useState } from "react";
import { connect } from "react-redux";
import "../App.css";

import axiosWithAuth from "../utils/axiosWithAuth";
import { fetchUserProjects } from "../actions/index";

import EditProjectForm from "./EditProjectForm";

const UserProject = ({ project, ...props }) => {
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleEdit = (e) => {
    setShowForm(!showForm);
  };

  const handleShowDelete = (e) => {
    setShowDelete(!showDelete);
  };

  const handleDelete = (e) => {
    setShowDelete(!showDelete);
    axiosWithAuth()
      .delete(`projects/${project.project_id}`)
      .then((res) => {
        props.fetchUserProjects(window.localStorage.getItem("id"));
      });
  };

  return (
    <div className="project-card-container">
      <div>{project.project_title}</div>
      <div>{project.project_description}</div>
      <div>{project.project_type}</div>
      <div>{project.mission_statement}</div>
      <div>{project.funding_amount}</div>
      <div>{project.amount_raised}</div>
      <div>{project.project_timeline}</div>
      <div className="buttons-container">
        <button onClick={handleEdit}>Edit Project</button>
        <button onClick={handleShowDelete}>Delete Project</button>
      </div>

      {showForm === true ? (
        <div className="">
          <EditProjectForm project={project} />
        </div>
      ) : null}

      {showDelete === true ? (
        <div>
          <div>Are you sure you would like to delete?</div>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleShowDelete}>Cancel</button>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userProjects: state.userProjects,
  };
};

export default connect(mapStateToProps, { fetchUserProjects })(UserProject);
