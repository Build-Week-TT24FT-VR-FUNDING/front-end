import React, { useEffect } from "react";

import { connect } from "react-redux";
import { fetchProjects } from "../actions/index";

import Project from "./Project";
import Loading from "./Loading";

import { List } from "antd";

import "../App.css";

const ProjectList = (props) => {
  const { projects } = props;

  console.log("projects: ", projects);

  useEffect(() => {
    return props.fetchProjects();
  }, []);

  return (
    <div className="project-page-container">
      {props.isLoading === true ? <Loading /> : <h2>Project List</h2>}
      <br />
      <br />
      <div>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={projects}
          renderItem={(project) => (
            <List.Item>
              <Project key={project.project_id} project={project} />
            </List.Item>
          )}
        />

        {/* {projects.length > 0
        ? projects.map((project) => {
            console.log(project);
            return <Project key={project.project_id} project={project} />;
          })
        : null} */}
      </div>
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
export default connect(mapStateToProps, { fetchProjects })(ProjectList);
