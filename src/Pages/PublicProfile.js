import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Jokes from '../components/Jokes';
import { LoadHolder, Loading } from '../components/Loading';
import {
	ColumnHolder,
	H1,
	Header,
	PostCount,
	PostDetailsHolder,
	ProfilePhoto,
	UserName,
	EditButton,
	DeatalisHolder,
} from '../components/profile/ProfileHeader';
import db from '../Firebase';
import { JokesContainer } from './Profile';

const PublicProfile = () => {
	const [posts, setPosts] = useState();
	const [loading, setLoading] = useState(true);
	const params = useParams();
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		try {
			db.collection(`users`)
				.doc(`${params.uid}`)
				.collection(`posts`)
				.onSnapshot((res) => {
					console.log(res);
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
			console.log(error);
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
				<Header>
					<DeatalisHolder>
						<ColumnHolder>
							<ProfilePhoto />
							<UserName>Testing</UserName>
						</ColumnHolder>
						<PostDetailsHolder>
							<ColumnHolder>
								<PostCount>{posts.length}</PostCount>
								<H1>POSTS</H1>
							</ColumnHolder>
							<EditButton>Follow</EditButton>
						</PostDetailsHolder>
					</DeatalisHolder>
				</Header>
			)}
			<JokesContainer>
				{!loading &&
					posts.map((joke) => {
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
			</JokesContainer>
		</>
	);
};

export default PublicProfile;
