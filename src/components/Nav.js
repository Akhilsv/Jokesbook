import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { DataContext } from '../DataContext';
import { GoHome } from 'react-icons/go';
import { CgAddR } from 'react-icons/cg';
import { BsPerson } from 'react-icons/bs';

function Nav() {
	const { status } = useContext(DataContext);
	const [isLoggedIn, setIsLoggedIn] = status;
	
	return (
		<>
			<NavContainer>
				<NavLogo>React</NavLogo>
				{isLoggedIn && (
					<NavMenuHolder>
						<NavLinks to='/jokes' activeClassName='selected'>
							<GoHome />
						</NavLinks>
						<NavLinks to='/new-joke' activeClassName='selected'>
							<CgAddR />
						</NavLinks>
						<NavLinks to='/profile' activeClassName='selected'>
							<BsPerson />
						</NavLinks>
					</NavMenuHolder>
				)}
			</NavContainer>
		</>
	);
}

const NavContainer = styled.div`
	width: 100%;
	height: 60px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 1.5rem;
	@media (max-width: 500px) {
		padding: 1rem 0rem 1rem 1rem;
	}
`;
const NavLogo = styled.h1`
	transition: all 0.4s;
	font-size: 2rem;
	color: #ffffff;
	@media (max-width: 700px) {
		font-size: 1.5rem;
	}
`;
const NavMenuHolder = styled.div`
	width: 30%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	@media (max-width: 800px) {
		width: 50%;
	}
`;
const NavLinks = styled(NavLink)`
	text-decoration: none;
	color: white;
	font-size: 1.5rem;
	transition: all 0.4s;
	&:hover {
		color: #80ff80;
	}
	&.selected {
		color: #09e209;
		opacity: 0.7;
	}
	/* @media (max-width: 700px) {
		font-size: 1.1rem;
	} */
`;

export default Nav;
