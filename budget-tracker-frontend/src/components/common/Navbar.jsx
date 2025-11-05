import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Brand = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.5px;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 24px;
  align-items: center;

  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s ease-in-out;
    &:hover {
      opacity: 0.8;
    }
  }

  button {
    background: ${({ theme }) => theme.colors.accent};
    color: white;
    border: none;
    padding: 6px 14px;
    border-radius: 6px;
    cursor: pointer;
  }
`;

export default function Navbar() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <Header>
      <Brand>Budget Tracker</Brand>
      <NavLinks>
        {!isAuthenticated && (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/transactions">Transactions</Link>
            <Link to="/budget">Budget</Link>
            <Link to="/reports">Reports</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </NavLinks>
    </Header>
  );
}
