import React from "react";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";

const Wrap = styled.div`
  padding: 24px;
`;

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <Wrap>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name || user?.email || "User"}!</p>
      <p>This is a placeholder dashboard. Next we'll implement transactions list & add flow.</p>
      <button onClick={logout}>Logout</button>
    </Wrap>
  );
}
