import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LoadHolder, Loading } from '../components/Loading';
import { DataContext } from '../DataContext';
import db from '../Firebase';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileBody from '../components/profile/ProfileBody';
import Jokes from '../components/Jokes';

const Profile = () => {
	const [publicPosts, setPublicPosts] = useState([]);
	const [privatePosts, setPrivatePosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const { currentUser } = useContext(DataContext);
	const [value, setValue] = useState(`public`);
	useEffect(() => {
		fetchData('public', setPublicPosts);
		fetchData('private', setPrivatePosts);
		
	}, []);

	const fetchData = (type, state) => {
		try {
			db.collection(`users`)
				.doc(`${currentUser.uid}`)
				.collection(`${type}`)
				.onSnapshot((res) => {
					console.log(res);
					let arr = [];
					res.forEach((data) => {
						const getData = data.data();
						arr.push({ ...getData, pid: data.id });
						// setPosts((p) => [getData, ...p]);
					});
					state(arr);
				});
		} catch (error) {
			console.log(error);
		}
	};
	const all = [...publicPosts, ...privatePosts];
	console.log(all);
	const getValueHandler = (value) => {
		setValue(value);
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
					data={publicPosts}
					user={currentUser.displayName}
					value={getValueHandler}
				/>
			)}

			{!loading && publicPosts.map((joke) => {
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
export default Profile;
