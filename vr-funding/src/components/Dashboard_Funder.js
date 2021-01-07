import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setRole } from "../actions/index";

const Dashboard_Funder = (props) => {
  console.log("rendered");
  const { uList } = props;
  const history = useHistory();
  console.log("array", uList);

  useEffect(() => {
    props.setRole();
  }, []);

  return (
    <div class="container">
      {uList.map((User) => (
        <div class="container">
          <h2>email here{User.email}</h2>
          <h2>role here{props.role}</h2>
          <div
            class="container"
            onClick={() => history.push(`/components/ProjectPage`)}
          >
            Browse Projects
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    role: state.role,
  };
};

export default connect(mapStateToProps, { setRole })(Dashboard_Funder);
