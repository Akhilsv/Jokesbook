import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import db, { auth } from '../Firebase';
import { DataContext } from '../DataContext';

const NewJoke = () => {
	const { currentUser } = useContext(DataContext);
	const [errorMessage, setErrorMessage] = useState('');
	const [title, setTitle] = useState('');
	const [joke, setJoke] = useState('');
	const [type, setType] = useState('');
	let history = useHistory();
	const titleHandler = (e) => {
		setTitle(e.target.value);
		setErrorMessage('');
	};
	const jokeHandler = (e) => {
		setJoke(e.target.value);
		setErrorMessage('');
	};
	const radioButtonhandler = (e) => {
		console.log(e.target.value);
		setType(e.target.value);
	};
	const submithandler = (e) => {
		e.preventDefault();
		const date = new Date();
		const day = date.toLocaleString('en-US', { day: '2-digit' });
		const year = date.getFullYear();
		const month = date.toLocaleString('en-US', { month: 'short' });

		if (joke.trim() === '' || title.trim() === '') {
			return setErrorMessage('Input Must be valid');
		}
		const newJoke = {
			id: Math.random().toString(),
			name: currentUser.displayName,
			title,
			joke,
			type,
			date: [day, month, year], //inbulit time stamp ede nodu firebase ali avre date time haku tharee
		};

		setErrorMessage('Submitted');

		let user = auth.currentUser;
		db.collection(`${user.uid}`)
			.add(newJoke)
			.then(() => console.log('Added to personal account'))
			.catch((e) => console.log(e));
		if (type === 'public') {
			db.collection(`public`)
				.doc(`${newJoke.id}`)
				.set(newJoke)
				.then(() => console.log('Added to public post'))
				.catch((e) => console.log(e));
		}
		history.push('/jokes');
		setTitle('');
		setJoke('');
		setType('');
	};

	return (
		<>
			<FormHolder>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<Form onSubmit={submithandler}>
					{/* <Label>Joker name</Label>
					<Input value={name} onChange={nameHandler}></Input> */}
					<Label>Title</Label>
					<Input value={title} onChange={titleHandler}></Input>
					<Label>Write your joke</Label>

					<JokeInput onChange={jokeHandler} value={joke}></JokeInput>
					<Holder>
						<RadioButtonHolder>
							<RadioButtonInput
								type='radio'
								name='type'
								value='public'
								id='public'
								required
								onClick={radioButtonhandler}
							/>
							<RadioLabel htmlFor='public'>Public</RadioLabel>
							<RadioButtonInput
								type='radio'
								name='type'
								value='private'
								id='private'
								onClick={radioButtonhandler}
								required
							/>
							<RadioLabel htmlFor='private'>Private</RadioLabel>
						</RadioButtonHolder>
						<Button>Submit</Button>
					</Holder>
				</Form>
			</FormHolder>
		</>
	);
};
const FormHolder = styled.div`
	width: 700px;
	height: 76vh;
	margin: 30px auto 0px auto;
	@media (max-width: 700px) {
		width: 95vw;
	}
`;
export const Form = styled.form`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	transition: all 0.4s;
`;
export const Input = styled.input`
	height: 50px;
	width: 90%;
	font-size: 1rem;
	padding: 0 2rem;
	outline: none;
	border: solid 2px #33dd33;
	color: #f3f3f3ea;
	background: none;
	border-radius: 20px;
	transition: all 0.5s;
	text-transform: capitalize;
	&:hover {
		border-color: #ebf7eb;
		color: #ffffff;
	}
`;
const JokeInput = styled.textarea`
	height: 125px;
	width: 90%;
	font-size: 1rem;
	padding: 0.3rem 2rem;
	outline: none;
	border: solid 2px #33dd33;
	color: #f3f3f3dd;
	background: none;
	border-radius: 10px;
	transition: all 0.5s;
	&:hover {
		color: #33dd33;
		border-color: #ebf7eb;
	}
`;
export const Button = styled.button`
	outline: none;
	color: #33dd33;
	border: solid 2px #ffffff;
	background: none;
	border-radius: 30px;
	padding: 7px 15px;
	font-weight: 600;
	transition: all 0.5s;
	&:hover {
		color: #ffffff;
		border-color: #33dd33;
	}
`;
const ErrorMessage = styled.h1`
	transition: all 0.5s;
	font-size: 0.7rem;
	text-align: center;
	color: #33dd33;
`;
export const Label = styled.label`
	width: 89%;
	padding: 10px;
	color: #ffffff7b;
	float: left;
`;
const Holder = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 30px;
`;
const RadioButtonHolder = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 200px;
`;
const RadioButtonInput = styled.input`
	width: 15px;
	appearance: none;
	height: 15px;
	border-radius: 50%;
	cursor: pointer;
	background: #cac8c8ce;
	&:hover {
		background: #33dd338f;
	}
	&:checked {
		background: #33dd33;
	}
`;

const RadioLabel = styled.label`
	cursor: pointer;
	color: #ffffff96;
`;
export default NewJoke;
