import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineDelete } from 'react-icons/ai';

const Delete = ({ state, fun }) => {
	const [popup, setPopup] = state;
	const deleteHandler = () => {
		fun();
	};
	const cancelHandler = () => {
		setPopup(false);
	};
	
	return (
		<>
			<BackDrop >
				<MessageHolder>
					<Icon />
					<Header>
						<h1>Are you sure?</h1>
					</Header>
					<Body>
						<h1>
							Do you really want to delete this post? This process cannot be
							undone
						</h1>
					</Body>
					<Footer>
						<button onClick={deleteHandler}>Delete</button>
						<button onClick={cancelHandler}>Cancel</button>
					</Footer>
				</MessageHolder>
			</BackDrop>
		</>
	);
};

const BackDrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 555;
	background-color: #000000e2;
`;
const MessageHolder = styled.div`
	position: relative;
	width: 50%;
	height: 300px;
	border-radius: 10px;
	padding: 10px 0;
	z-index: 555;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	background-color: ${(p) => p.theme.background};
	@media (max-width: 1000px) {
		width: 90vw;
		height: 60vh;
	}
`;
const Header = styled.div`
	width: 100%;
	height: 80px;
	display: flex;
	justify-content: center;
	align-items: center;

	& h1 {
		font-size: 1.5rem;
		color: ${(p) => p.theme.fontColor};
	}
`;

const Icon = styled(AiOutlineDelete)`
	width: 70px;
	height: 70px;
	padding: 10px;
	background-color: #fccad2;
	color: red;
	border-radius: 50%;
`;
const Body = styled.div`
	width: 70%;
	padding: 20px;
	text-align: center;
	& h1 {
		color: #313131f4;
		font-size: 1rem;
	}
	@media (max-width: 600px) {
		width: 95%;
	}
`;
const Footer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	& button {
		outline: none;
		border: none;
		width: 80px;
		background: ${(props) => (props ? '#f58f8f' : '#888888')};
		height: 40px;
		font-size: 1rem;
		font-weight: 600;
		margin-right: 30px;
		border-radius: 15px;
		@media (max-width: 700px) {
			margin-right: 0;
		}
	}
	@media (max-width: 700px) {
		justify-content: space-around;
	}
`;
export default Delete;
