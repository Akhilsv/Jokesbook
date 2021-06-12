import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { DataContext } from '../DataContext';
import { GoHome } from 'react-icons/go';
import { CgAddR } from 'react-icons/cg';
import { BsPerson } from 'react-icons/bs';
import DarkModeToggle from 'react-dark-mode-toggle';

function Nav({is,set}) {
	const { status } = useContext(DataContext);
	const [isLoggedIn, setIsLoggedIn] = status;
	
	return (
		<>
			<NavContainer>
				<NavLogo>React</NavLogo>
				<Toggle onChange={set} checked={is} size={60} />
				{isLoggedIn && (
					<>
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
					</>
				)}
			</NavContainer>
		</>
	);
}
const Toggle = styled(DarkModeToggle)`
	margin-left: 30px;
	flex: 1;
	@media (max-width: 600px) {
		position: absolute;
		right:0;
		margin-right:20px;
	}
`;
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
	font-size: 2rem;
	
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
	@media (max-width: 600px) {
		color: black;
		height: 50px;
		width: 100%;
		left: 0;
		background-color: ${(p) => p.theme.menuBackground};

		position: fixed;
		bottom: 0;
		/* border-radius: 20% / 5%; */
		border-top-left-radius: 200px;
		border-top-right-radius: 200px;
	}
`;
const NavLinks = styled(NavLink)`
	text-decoration: none;
	color: ${(p) => p.theme.fontColor};
	font-size: 1.5rem;
	transition: all 0.4s;

	&.selected {
		color: #09e209;
		opacity: 0.7;
	}
	/* @media (max-width: 700px) {
		font-size: 1.1rem;
	} */
`;

export default Nav;
