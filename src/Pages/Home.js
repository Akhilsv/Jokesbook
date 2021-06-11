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
		const tree = db.collectionGroup(`public`).where('type','==','private').onSnapshot((res) => {
			let arr = [];
			setData([]);
			res.forEach((datas) => {
				return arr.push({ ...datas.data(), pid: datas.id });
				//  setData((prev) => {
				// 	return [...prev,{...datas.data(),pid:datas.id}]
				// })
			});
			console.log('here');
			setData(arr);
			setLoading(false);
		});

		return () => {
			tree();
		};
	}, []);

	// !loading && console.log(data), console.log(loading);
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
								pid={joke.pid}
								uid={joke.uid}
								name={joke.name}
								title={joke.title}
								joke={joke.joke}
								date={joke.date}
							/>
						);
					})}
				<button onClick={logout}>Logout</button>
			</JokesContainer>
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
