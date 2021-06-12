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
		db.collectionGroup(`posts`)
			.get()
			.then((res) => {
				res.forEach((data) => {
					if (data.id === params.jokeId) {
						setJoke(data.data());
					}
				});
				setLoading(false);
			})
			.catch((e) => console.log(e));
	}, [params.jokeId]);
	
	if (!loading) {
		
		let t = new Date(1970, 0, 1); // Epoch
		t.setSeconds(joke.date);
		console.log(t);
	}

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
					<JokeContentPage>
						<Header>
							<ProfileHolder>
								<ProfileIcon></ProfileIcon>
								<JokerName>{joke.name}</JokerName>
							</ProfileHolder>
							{/* <DateHolder>{`${joke.date[0]} ${joke.date[1]}`}</DateHolder> */}
						</Header>
						<JokeBody>{joke.joke}</JokeBody>
						{/* <ButtonHolder>
						<Button onClick={backHandler}>Back</Button>
					</ButtonHolder> */}
						<Comment user={joke} />
					</JokeContentPage>
				</>
			)}
		</>
	);
};
const JokeContentPage = styled.div`
	width: 100%;
	height: 100%;
	background: ${(p) => p.theme.background};
	margin: 30px auto 0 auto;
	transition: all 1s;
`;
const Header = styled.div`
	width: 80vw;
	margin: 30px auto ;
	border: solid 1px #33dd33;
	border-radius: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	background: ${(p) => p.theme.background};
	color: ${(p) => p.theme.fontColor};
`;
const ProfileHolder = styled.div`
	width: 90px;
	display: flex;
	justify-content: space-around;
`;
const JokerName = styled.h1`
	font-size: 1rem;
	font-weight: 600;
	color: ${(p) => p.theme.fontColor};
`;
const ProfileIcon = styled(BsPerson)`
	
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
	margin: 30px auto 0px auto;
	border: solid 1px #33dd33;
	padding: 1rem;
	
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

