import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProjects, fetchUserProjects } from "../actions/index";

import UserProject from "./UserProject";

const UserProjectsList = (props) => {
  //projects.map
  //render project component
  //edit button
  //delete button
  return (
    <div>
      {props.userProjects.map((project) => {
        return (
          <div>
            <UserProject project={project} key={project.project_id} />
            <br />
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    id: state.id,
    projects: state.projects,
    userProjects: state.userProjects,
  };
};
export default connect(mapStateToProps, { fetchProjects, fetchUserProjects })(
  UserProjectsList
);
