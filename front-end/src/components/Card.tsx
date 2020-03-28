import React from "react";

type CardPropsT = {
  readonly title?: string;
  readonly subtitle?: string;
  readonly content: React.ReactNode;
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
