import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const navigate = useNavigate();
  const { Component } = props;
  const isAuth = useSelector((state) => state.role.isAuth);
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    } else if (isAuth) {
      navigate("/")
    }
  }, [isAuth]);
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
