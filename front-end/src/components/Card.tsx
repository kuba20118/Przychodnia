import React from "react";

type CardPropsT = {
  title?: string;
  subtitle?: string;
  content: React.ReactNode;
};

const Card: React.FC<CardPropsT> = ({ title, subtitle, content }) => (
  <div className="card">
    <div className="header">
      <h4 className="title">{title}</h4>
      <p className="subtitle">{subtitle!}</p>
    </div>
    <div className="content">{content}</div>
  </div>
);
export default Card;
