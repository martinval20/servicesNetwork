import React from "react";
import { Space, Spin } from "antd";
import "./Loader.scss"


export default function Loader() {
  return (
    <div className="loader">
    <p>Cargando... Tranquilo, no hiciste nada mal</p>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
}
