import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import styled from 'styled-components';
import { BsPerson } from 'react-icons/bs';
import db from '../Firebase';
import { Loading, LoadHolder } from '../components/Loading';
import Comment from '../components/Comments/Comment';

const JokeContent = () => {
	let history = useHistory();
	const [joke, setJoke] = useState('');
	const [loading, setLoading] = useState(true);
	const params = useParams();
	useEffect(() => {
		db.collection('public')
			.doc(`${params.jokeId}`)
			.get()
			.then((res) => {
				if (res.exists) {
					return setJoke(res.data()), setLoading(false);
				} else {
					console.log('no data');
				}
			});
	}, []);



	const backHandler = () => {
		history.push('/jokes');
	};
	return (
		<>
			{loading && (
				<LoadHolder>
					{' '}
					<Loading />
				</LoadHolder>
			)}
			{!loading && (
				<>
					<Header>
						<ProfileHolder>
							<ProfileIcon></ProfileIcon>
							<JokerName>{joke.name}</JokerName>
						</ProfileHolder>
						<DateHolder>{`${joke.date[0]} ${joke.date[1]}`}</DateHolder>
					</Header>
					<JokeBody>{joke.joke}</JokeBody>
					{/* <ButtonHolder>
						<Button onClick={backHandler}>Back</Button>
					</ButtonHolder> */}
					<Comment />
				</>
			)}
		</>
	);
};

const Header = styled.div`
	width: 80vw;
	margin: 30px auto;
	border: solid 1px #33dd33;
	border-radius: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
`;
const ProfileHolder = styled.div`
	width: 90px;
	display: flex;
	justify-content: space-around;
`;
const JokerName = styled.h1`
	font-size: 1rem;
	font-weight: 600;
	color: #ffffffc7;
`;
const ProfileIcon = styled(BsPerson)`
	fill: white;
	padding: 2px;
	font-size: 1.5rem;
	border-radius: 50px;
`;

const DateHolder = styled.h1`
	font-weight: 500;
	font-size: 0.9rem;
	color: #fdfdfdca;
`;
const JokeBody = styled.div`
	width: 80vw;
	min-height: 20vh;
	margin: 30px auto;
	border: solid 1px #33dd33;
	padding: 1rem;
	color: #ffffffeb;
`;
const ButtonHolder = styled.div`
	width: 80vw;

	margin: 10px auto;
	text-align: right;
`;
const Button = styled.button`
	outline: none;
	color: #33dd33;
	border: solid 2px #ffffff;
	background: none;
	border-radius: 20px;
	padding: 0.5rem 1rem;
	font-weight: 600;
	transition: all 0.5s;
	&:hover {
		color: #ffffff;
		border-color: #33dd33;
	}
`;
export default JokeContent;
