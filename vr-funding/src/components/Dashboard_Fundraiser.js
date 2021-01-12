import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setRole, fetchUserProjects } from "../actions/index";
import styled from "styled-components";
import UserProjectsList from "./UserProjectsList";

const BtnStyled = styled.div`
  color: ${(pr) => pr.theme.primaryColor};
  background-color: ${(pr) => pr.theme.bgColorB};
  border: 2px solid ${(pr) => pr.theme.primaryColor};
  box-shadow: 0px 1px 6px -2px #807f7f;
  border-radius: 8px;
  padding: 10px;
  margin:10px;
  font-size: 1.3rem;
  font-weight: bold;
`;

const mockList = [
  {
    email: "sam@sam.com",
    role: "2",
  },
];

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
      <div class="container">
        {mockList.map((User) => (
          <div class="container">
            <h2>email here{User.email}</h2>
            <h2>role here {props.role}</h2>
            <div
             
              onClick={() => history.push("/createproject")}
            >
              <BtnStyled>Create Project</BtnStyled>
            </div>
          </div>
        ))}
      </div>
      <button style={{
                fontSize: "1.7rem",
                color: "#46e38f",
                backgroundColor: "#615e5e",
                margin:"15px",
              }} onClick={handleClick}>Load My Projects</button>
      {projectsVisible === true ? <UserProjectsList /> : null}
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
