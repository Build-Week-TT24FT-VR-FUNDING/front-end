import React, { useState } from "react";
import { connect } from "react-redux";
import "../App.css";

import axiosWithAuth from "../utils/axiosWithAuth";
import { fetchUserProjects } from "../actions/index";

import EditProjectForm from "./EditProjectForm";

import { Button, Card, Descriptions, Popconfirm, message } from "antd";

const UserProject = ({ project, ...props }) => {
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleEdit = (e) => {
    setShowForm(!showForm);
  };

  // const handleShowDelete = (e) => {
  //   setShowDelete(!showDelete);
  // };

  const handleDelete = (e) => {
    message.success("Project Deleted!");
    axiosWithAuth()
      .delete(`projects/${project.project_id}`)
      .then((res) => {
        props.fetchUserProjects(window.localStorage.getItem("id"));
      });
  };

  const handleCancel = () => {
    message.error("Aborted");
  };

  return (
    <div className="project-card-container">
      <Card title={project.project_title} style={{ width: 300 }}>
        <Descriptions label="Description" layout="vertical" bordered>
          <Descriptions.Item label="Description">
            {project.project_description}
          </Descriptions.Item>
        </Descriptions>
        {/* <br />
        Type: <br />
        {project.project_type}
        <br />
        Mission Statement: <br />
        {project.mission_statement}
        <br />
        Progress: <br />${project.funding_amount}/{project.amount_raised}
        <br />
        {project.project_timeline}
        <br /> */}
        <br />
        <div className="buttons-container">
          <Button onClick={handleEdit}>Edit Project</Button>
          <Popconfirm
            title="Are you sure you'd like to delete this project?"
            onConfirm={handleDelete}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete Project</Button>
          </Popconfirm>
        </div>
        {showForm === true ? (
          <div className="">
            <EditProjectForm project={project} />
          </div>
        ) : null}
        {/* {showDelete === true ? (
          <div>
            <div>Are you sure you would like to delete?</div>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleShowDelete}>Cancel</Button>
          </div>
        ) : null} */}
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userProjects: state.userProjects,
  };
};

export default connect(mapStateToProps, { fetchUserProjects })(UserProject);
