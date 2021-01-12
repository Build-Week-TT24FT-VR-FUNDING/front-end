import React from "react";

import { Space, Spin } from "antd";

import "../App.css";

const Loading = () => {
  return (
    <div className="loader-container">
      <Space direction="vertical" size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default Loading;
