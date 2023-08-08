import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Admin = ({ admin }) => {
  return (
    <Card className="m-3 p-3 rounded">
      <Link to={`/author/${admin._id}`}>
        <Card.Img src="/images/user.png" variant="top"></Card.Img>
      </Link>
      <Link to={`/author/${admin._id}`}>
        <Card.Title as="h6">
          <strong>{`${admin.first_name} ${admin.last_name} `}</strong>
        </Card.Title>
      </Link>
    </Card>
  );
};

export default Admin;
