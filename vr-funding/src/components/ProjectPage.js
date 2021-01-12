import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

import { connect } from "react-redux";
import { fetchProjects } from "../actions/index";
import styled from "styled-components";

const ProjListStyled = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: space-between;
  margin: 10px;
`;

const ProjStyled = styled.div` 
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: space-between;
  border: 2px solid #46e38f;
  box-shadow: 0px 1px 6px -2px #807f7f;
  border-radius: 8px;
  margin-top:10px;
`;

const ProjStyledSubA = styled.div` 
  color: ${(pr) => pr.theme.secondaryColor};
  font-size: "1.5rem";
  font-weight: normal;
`;

const ProjStyledSubB = styled.div` 
  color: ${(pr) => pr.theme.secondaryColor};
  font-size: "3rem";
  font-weight: bold;
`;

const ProjectList = (props) => {
  const { projects } = props;

  const { url } = useRouteMatch();

  useEffect(() => {
    return props.fetchProjects();
  }, []);

  return (

    <ProjListStyled>
        {projects.map((project) => (
          <ProjStyled>
    
            <ProjStyledSubB> 
              <p>{project.project_title}</p>        
            </ProjStyledSubB>
         
            <ProjStyledSubA>         
              <p>{project.project_description}</p>         
            </ProjStyledSubA>

            <ProjStyledSubA>       
              <p>
              <ProjStyledSubB>Mission Statement:</ProjStyledSubB> <br />
                {project.mission_statement}
              </p>
            </ProjStyledSubA>

            <ProjStyledSubA>           
              <p><ProjStyledSubB>Timeline:</ProjStyledSubB> {project.project_timeline}</p>         
            </ProjStyledSubA>

            <ProjStyledSubA>           
              <p>
                ${project.amount_raised}/${project.funding_amount}
              </p>          
            </ProjStyledSubA>
            {props.role === 2 ? (
              <ProjStyledSubB>             
                <p>Click Here to Fund!</p>             
              </ProjStyledSubB>
            ) : null}
          </ProjStyled>
        ))}
  </ProjListStyled>
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
