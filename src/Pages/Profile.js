import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LoadHolder, Loading } from '../components/Loading';
import { DataContext } from '../DataContext';
import db from '../Firebase';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileBody from '../components/profile/ProfileBody';
import Jokes from '../components/Jokes';

const Profile = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const { currentUser } = useContext(DataContext);
	const [filteredData, setFilteredData] = useState([]);
	useEffect(() => {
		fetchData();
	}, []);
	useEffect(() => {
		getValueHandler();
	}, [posts]);
	const fetchData = async () => {
		try {
			db.collection(`users`)
				.doc(`${currentUser.uid}`)
				.collection('posts')
				.onSnapshot((res) => {
					let arr = [];
					res.forEach((data) => {
						const getData = data.data();
						arr.push({ ...getData, pid: data.id });
						// setPosts((p) => [getData, ...p]);
					});

					setPosts(arr);

					setLoading(false);
				});
		} catch (error) {
			console.log('error');
		}
	};

	const getValueHandler = (value) => {
		if (value === 'Public') {
			let data = posts.filter((post) => {
				return post.type === 'public';
			});
			return setFilteredData(data);
		}
		if (value === 'Private') {
			let data = posts.filter((post) => {
				return post.type === 'private';
			});
			return setFilteredData(data);
		} else {
			return setFilteredData(posts);
		}
	};

	return (
		<>
			{loading && (
				<LoadHolder>
					<Loading />
				</LoadHolder>
			)}
			{!loading && (
				<ProfileHeader
					data={posts}
					user={currentUser.displayName}
					value={getValueHandler}
				/>
			)}
			<JokesContainer>
				{!loading && filteredData.length === 0 && (
					<NoPost>
						<img src={'/nopost.svg'} alt='post' />
						<p>No post yet...</p>
					</NoPost>
				)}
				{!loading &&
					filteredData.map((joke) => {
						return (
							<Jokes
								key={joke.id}
								uid={joke.uid}
								pid={joke.pid}
								name={joke.name}
								title={joke.title}
								joke={joke.joke}
								date={joke.date}
							/>
						);
					})}
			</JokesContainer>
		</>
	);
};

export const JokesContainer = styled.div`
	padding-bottom: 50px;
	& p {
		text-align: center;
	}
`;
const NoPost = styled.div`
	width: 60%;
	height: 200px;
	margin: 20px auto;
	display: flex;
	justify-content: space-evenly;
	align-items: center;

	& img {
		width: 200px;
		height: 200px;
	}
	& p {
		font-size: 1.4rem;
		letter-spacing: 2px;

		@media (max-width: 600px) {
			font-size: 1.1rem;
			margin-top: 30px;
		}
	}
	@media (max-width: 600px) {
		flex-direction: column;

		width: 90%;
	}
`;
export default Profile;
