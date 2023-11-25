import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
        }}
      >
        <p style={{ fontSize: "20px", textAlign: "center", padding: "20px" }}>
          Built by Jay Patel and helped by:
          <span>
            <Link
              style={{ color: "white" }}
              className="nav-link"
              to={"https://youtube.com/indiancoders"}
            >
              Indian Coders
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
