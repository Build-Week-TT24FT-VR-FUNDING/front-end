import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setRole, fetchUserProjects } from "../actions/index";
import UserProjectsList from "./UserProjectsList";

import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

import "../App.css";

const DashboardFundraiser = (props) => {
  // const { uList } = props;
  const history = useHistory();

  const [projectsVisible, setProjectsVisible] = useState(false);

  useEffect(() => {
    props.setRole();
    props.fetchUserProjects(window.localStorage.getItem("id"));
  }, []);

  const handleClick = (e) => {
    setProjectsVisible(!projectsVisible);
  };

  return (
    <div>
      <div class="dashboard-container">
        <div className="helloCard-container">
          <div className="helloCard-welcome">
            <Avatar size={64} icon={<UserOutlined />} />
            <h2>Welcome, email</h2>
            <h2>role: {props.role === 1 ? "Fundraiser" : "Funder"}</h2>
            <div onClick={() => history.push("/createproject")}>
              <Button>Create Project</Button>
            </div>
            <Button onClick={handleClick}>Load My Projects</Button>
            <br />
            <br />
            {projectsVisible === true ? <UserProjectsList /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    id: state.id,
    role: state.role,
    userProjects: state.userProjects,
  };
};
export default connect(mapStateToProps, { setRole, fetchUserProjects })(
  DashboardFundraiser
);
