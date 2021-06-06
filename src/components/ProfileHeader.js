import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoPersonCircleOutline } from 'react-icons/io5';
import db from '../Firebase';
import { DataContext } from '../DataContext';
import { LoadHolder, Loading } from './Loading';

const ProfileHeader = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const { currentUser } = useContext(DataContext);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			db.collection(`${currentUser.uid}`).onSnapshot((res) => {
				let arr = [];
				res.forEach((data) => {
					const getData = data.data();
					arr.push(getData);
					// setPosts((p) => [getData, ...p]);
				});
				setPosts(arr);
				setLoading(false);
			});
		} catch (error) {
			console.log('error');
		}
	};
	let publicPost;
	let privatePost;
	if (!loading) {
		publicPost = posts.filter((post) => {
			return post.type === 'public';
		});
		privatePost = posts.filter((post) => {
			return post.type === 'private';
        });

	}
	
	
	return (
		<>
			{loading && (
				<LoadHolder>
					<Loading />
				</LoadHolder>
			)}
			{!loading && (
				<Header>
					<ColumnHolder>
						<ProfilePhoto />
						<UserName>{currentUser.displayName} </UserName>
					</ColumnHolder>
					<PostDetailsHolder>
						<ColumnHolder>
							<PostCount>{posts.length}</PostCount>
							<H1>Posts</H1>
						</ColumnHolder>
						<ColumnHolder>
							<PostCount>{publicPost.length}</PostCount>
							<H1>Public</H1>
						</ColumnHolder>
						<ColumnHolder>
							<PostCount>{privatePost.length}</PostCount>
							<H1>Private</H1>
						</ColumnHolder>
                    </PostDetailsHolder>
				</Header>
			)}
		</>
	);
};
const Header = styled.div`
	width: 80vw;
	margin: 30px auto;
	border: solid 2px green;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	padding-left: 50px;
	@media (max-width: 650px) {
		width: 95vw;

		padding-left: 10px;
	}
`;
const ColumnHolder = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ProfilePhoto = styled(IoPersonCircleOutline)`
	fill: white;
	font-size: 4rem;
`;
const UserName = styled.h1`
	text-align: center;
	font-size: 1rem;
	color: white;
	text-transform: capitalize;
`;

const PostDetailsHolder = styled.div`
	width: 70%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	color: white;
`;

const PostCount = styled.h1`
	font-size: 1rem;
	font-weight: 700;
	cursor: pointer;
`;
const H1 = styled.h1`
	font-size: 1.2rem;
	font-weight: 500;
	cursor: pointer;
	@media (max-width: 400px) {
		font-size: 1rem;
		font-weight: 500;
	}
`;
export default ProfileHeader;
