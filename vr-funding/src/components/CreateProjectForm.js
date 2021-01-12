import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProjects } from "../actions/index";

import Loading from "./Loading";

import { Card, Form, Input, InputNumber, Button } from "antd";

import "../App.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

// const initialFormValues = {
//   project_title: "",
//   project_type: "",
//   mission_statement: "",
//   project_description: "",
//   funding_amount: "",
//   amount_raised: "",
//   project_timeline: "",
// };

const CreateProjectForm = (props) => {
  // const [values, setValues] = useState(initialFormValues);

  const history = useHistory();

  // const onChange = (evt) => {
  //   evt.persist();
  //   const { name, value } = evt.target;
  //   setValues({ ...values, [name]: value });
  // };

  const onSubmit = (e) => {
    const newProject = e.project;

    // const newProject = {
    //   project_title: values.project_title,
    //   project_type: values.project_type,
    //   mission_statement: values.mission_statement,
    //   project_description: values.mission_statement,
    //   funding_amount: parseInt(values.funding_amount),
    //   amount_raised: parseInt(values.amount_raised),
    //   project_timeline: values.project_timeline,
    // };

    axiosWithAuth()
      .post("projects", newProject)
      .then((res) => {
        // setValues(initialFormValues);
        props.fetchProjects();
        history.push("/projects");
        console.log("wahoo!");
      })
      .catch((err) => {
        // setValues(initialFormValues);
      });
  };

  const commentedOutCode = () => {
    return {
      /* <div className="form-group-inputs">
            <label>
              Project Title
              <div style={{ width: "7%" }}></div>
              <input
                type="text"
                name="project_title"
                onChange={onChange}
                value={values.project_title}
                placeholder="Project Title"
                maxLength="20"
              ></input>
            </label>
            <label>
              Project Type
              <div style={{ width: "7%" }}></div>
              <input
                type="text"
                name="project_type"
                onChange={onChange}
                value={values.project_type}
                placeholder="Project Type"
                maxLength="20"
              ></input>
            </label>
            <label>
              Mission Statement
              <div style={{ width: "7%" }}></div>
              <input
                type="text"
                name="mission_statement"
                onChange={onChange}
                value={values.mission_statement}
                placeholder="Mission Statement"
                maxLength="100"
              ></input>
            </label>
            <label>
              Project Description
              <div style={{ width: "7%" }}></div>
              <input
                type="text"
                name="project_description"
                onChange={onChange}
                value={values.project_description}
                placeholder="Project Description"
                maxLength="100"
              ></input>
            </label>
            <label>
              Funding Amount
              <div style={{ width: "7%" }}></div>
              <input
                type="text"
                name="funding_amount"
                onChange={onChange}
                value={values.funding_amount}
                placeholder="Funding Amount"
                maxLength="20"
              ></input>
            </label>
            <label>
              Amount Raised
              <div style={{ width: "7%" }}></div>
              <input
                type="text"
                name="amount_raised"
                onChange={onChange}
                value={values.amount_raised}
                placeholder="Amount Raised"
                maxLength="20"
              ></input>
            </label>
            <label>
              Project Timeline
              <div style={{ width: "7%" }}></div>
              <input
                type="text"
                name="project_timeline"
                onChange={onChange}
                value={values.project_timeline}
                placeholder="ProjectTimeline"
                maxLength="20"
              ></input>
            </label>
          </div>
          <div className="submit">
            <Button>Submit</Button>
          </div> */
      // }
      // </form>
    };
  };

  return (
    <div>
      {props.isLoading === false ? (
        <div className="create-form-container">
          <Card title="Create New Project">
            {/* <form className="form container" onSubmit={onSubmit}> */}
            <Form name="Create a Project" onFinish={onSubmit} size="medium">
              <Form.Item
                name={["project", "project_title"]}
                label="Project Title"
                rules={[{ required: true, message: "Title Required" }]}
              >
                <Input value="banana" />
              </Form.Item>
              <Form.Item
                name={["project", "project_type"]}
                label="Project Type"
                rules={[{ required: true, message: "Project Type Required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["project", "mission_statement"]}
                label="Mission Statement"
                rules={[
                  { required: true, message: "Mission Statement Required" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["project", "project_description"]}
                label="Description"
                rules={[{ required: true, message: "Description Required" }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                name={["project", "funding_amount"]}
                label="Funding Amount"
                rules={[
                  {
                    type: "number",
                    min: 0,
                    required: true,
                    message: "Must be a number",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                name={["project", "amount_raised"]}
                label="Amount Raised"
                rules={[
                  {
                    type: "number",
                    min: 0,
                    required: true,
                    message: "Must be a number",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                name={["project", "project_timeline"]}
                label="Project Timeline"
                rules={[
                  {
                    required: true,
                    message: "Please Provide Project Timeline",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    errorText: state.errorText,
    isLoading: state.isLoading,
  };
};
export default connect(mapStateToProps, { fetchProjects })(CreateProjectForm);
