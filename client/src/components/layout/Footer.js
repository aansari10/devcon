import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-3">
      Copyright &copy; {new Date().getFullYear()} DevCon{" "}
      <span style={{ float: "right" }}>
        Dev By:
        <strong>Aamir Ansari</strong>
      </span>
    </footer>
  );
}
