import React from "react";
import { connect } from "react-redux";

import { Card } from "antd";

const Project = (props) => {
  const project = props.project;
  console.log("project component: ", props.project);
  return (
    <div>
      <Card title={project.project_title}>
        <p>Description: {project.project_description}</p>

        <p>
          Mission Statement:
          <br />
          {project.mission_statement}
        </p>

        <p>Timeline: {project.project_timeline}</p>

        <p>
          ${project.amount_raised}/${project.funding_amount}
        </p>

        {props.role === 2 ? <p>Click Here to Fund!</p> : null}
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    errorText: state.errorText,
    projects: state.projects,
    role: state.role,
  };
};

export default connect(mapStateToProps)(Project);
