import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Jokes from '../components/Jokes';
import styled from 'styled-components';
import db, { auth } from '../Firebase';
import { Loading, LoadHolder } from '../components/Loading';

const Home = () => {
	const [data, setData] = useState('');
	const [loading, setLoading] = useState(true);
	const history = useHistory();

	const gotoHandler = () => {
		history.push('/new-joke');
	};
	const logout = () => {
		auth.signOut();
	};

	useEffect(() => {
		fetchData();
	}, []);
	
	const fetchData = async() => {
		const publicJokes = db.collection(`public`);
		try {
			publicJokes.onSnapshot((res) => {
				res.forEach((data) => {
					const getData = data.data();
					setData((p) => {
						return [getData, ...p];
					});
				});
				setLoading(false);
			});
		} catch (error) {
			console.log('error');
		}
	};

	return (
		<>
			<JokesContainer>
				{loading && (
					<LoadHolder>
						{' '}
						<Loading />
					</LoadHolder>
				)}
				{!loading && data.length === 0 && (
					<NoDataFound>
						<Heading>NO JOKES FOUND</Heading>
						<AddJOkeButton onClick={gotoHandler}>ADD JOKE</AddJOkeButton>
					</NoDataFound>
				)}
				{!loading &&
					data &&
					data.map((joke) => {
						return (
							<Jokes
								key={joke.id}
								id={joke.id}
								name={joke.name}
								title={joke.title}
								joke={joke.joke}
								date={joke.date}
							/>
						);
					})}
			</JokesContainer>
			<button onClick={logout}>Logout</button>
		</>
	);
};

const JokesContainer = styled.div`
	margin: 50px 0px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const NoDataFound = styled.div`
	width: 100%;
	height: 100%;
	padding: 20px;
	display: flex;

	justify-content: space-around;
	align-items: center;
`;
const Heading = styled.h1`
	color: white;
	font-size: 1rem;
`;

const AddJOkeButton = styled.button`
	outline: none;
	border: none;
	font-weight: 800;
	padding: 10px;
	background-color: green;
`;
export default Home;
