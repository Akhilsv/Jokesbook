import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { DataContext } from '../DataContext';
import { auth } from '../Firebase';
import { Form, Label, Input, Button } from './NewJoke';

function Auth() {
	const [login, setLogin] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const { status } = useContext(DataContext);
	const [isLoggedIn, setIsLoggedIn] = status;
	const history = useHistory();
	const emailHandler = (e) => {
		setEmail(e.target.value);
		setErrorMessage('');
	};
	const passwordHandler = (e) => {
		setPassword(e.target.value);
		setErrorMessage('');
	};
	const userNameHandler = (e) => {
		setUsername(e.target.value);
		setErrorMessage('');
	};
	const changeHaandler = () => {
		setLogin(!login);
	};
	const submithandler = (e) => {
		e.preventDefault();
		if (!login) {
			auth
				.createUserWithEmailAndPassword(email, password)
				.then((res) => {
					const user = auth.currentUser;
					user.updateProfile({
						displayName: username,
					});
					setIsLoggedIn(true);
					history.push('/jokes');
				})

				.catch((error) => {
					console.log(error.message);
				});
		} else {
			auth
				.signInWithEmailAndPassword(email, password)
				.then((res) => {
					setIsLoggedIn(true);
					history.push('/jokes');
				})
				.catch((error) => {
					setErrorMessage(error.message);
				});
		}
	};
	return (
		<>
			<FormHolder>
				<Form onSubmit={submithandler}>
					<H1>{!login ? 'SIGN-UP' : 'LOGIN'}</H1>
					<ErrorMessage>{errorMessage ? errorMessage : <br />}</ErrorMessage>
					{!login && <Label>Username</Label>}
					{!login && <Input value={username} onChange={userNameHandler} />}
					<Label>Email</Label>
					<Input value={email} onChange={emailHandler}></Input>
					<Label>Password</Label>
					<Input onChange={passwordHandler} value={password}></Input>
					<H2 onClick={changeHaandler}>
						<P>{login ? `Don't have account?` : `already have an account`}</P>
					</H2>
					<Button>Submit</Button>
				</Form>
			</FormHolder>
		</>
	);
}
const FormHolder = styled.div`
	width: 600px;
	height: 80vh;
	margin: 10px auto 0px auto;
	@media (max-width: 700px) {
		width: 95vw;
	}
`;
const H1 = styled.h1`
	color: white;
	font-size: 18px;
`;
const H2 = styled.h2`
	margin-top: 10px;
	color: #ffffffd5;
	font-size: 13px;
`;
const P = styled.p`
	cursor: pointer;
	margin:10px 0px;
`;
const ErrorMessage = styled.p`
	margin-top: 10px;
	text-align: center;
	color: #ff0000d3;
	font-weight: 600;
`;
export default Auth;
