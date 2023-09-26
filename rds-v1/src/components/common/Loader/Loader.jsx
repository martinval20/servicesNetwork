import React from "react";
import { Space, Spin } from "antd";
import "./Loader.scss"


export default function Loader() {
  return (
    <div className="loader">
    <p>Cargando... No les pagamos lo suficiente a los programadores</p>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
}
