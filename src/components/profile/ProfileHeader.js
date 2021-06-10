import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { IoPersonCircleOutline, IoLogOutOutline } from 'react-icons/io5';

const ProfileHeader = ({ data, user, value }) => {
	const [postValue, setPostvalue] = useState('Posts');

	useEffect(() => {
		value(postValue);
	}, [postValue]);

	let publicPost = data.filter((post) => {
		return post.type === 'public';
	});

	let privatePost = data.filter((post) => {
		return post.type === 'private';
	});

	const clickHandler = (e) => {
		setPostvalue(e.target.innerHTML);
	};

	return (
		<>
			<Header>
				<DeatalisHolder>
					<ColumnHolder>
						<ProfilePhoto />
						<UserName>{user}</UserName>
					</ColumnHolder>
					<PostDetailsHolder>
						<ColumnHolder>
							<PostCount>{data.length}</PostCount>
							<H1 onClick={clickHandler}>Posts</H1>
						</ColumnHolder>
						<ColumnHolder>
							<PostCount>{publicPost.length}</PostCount>
							<H1 onClick={clickHandler}>Public</H1>
						</ColumnHolder>
						<ColumnHolder>
							<PostCount>{privatePost.length}</PostCount>
							<H1 onClick={clickHandler}>Private</H1>
						</ColumnHolder>
					</PostDetailsHolder>
				</DeatalisHolder>
				<ButtonsHolder>
					<EditButton>Edit Profile</EditButton>
					<LogOut />
					<LogOut />
				</ButtonsHolder>
			</Header>
		</>
	);
};
const Header = styled.div`
	width: 80vw;
	margin: 30px auto;
	border: solid 3px #336fdd;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;
	padding: 10px 50px 10px 50px;
	@media (max-width: 650px) {
		width: 95vw;
		padding: 10px 20px 10px 20px;
		border: none;
		margin-top:0;
	}
`;
const DeatalisHolder = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
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
const EditButton = styled.button`
	font-weight: 600;
	outline: none;
	width: 150px;
	height: 30px;
	border: #336fdd solid 2px;
	background: #336fdd;
	color: white;
	transition: all 0.5s;
	&:hover {
		background:#003aa5
	}
	@media (max-width: 500px) {
		width: 120px;
	}
`;
const ButtonsHolder = styled.div`
	margin-top: 30px;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	width: 100%;
`;
const LogOut = styled(IoLogOutOutline)`
	color: white;
	font-size: 1.5rem;
`;
export default ProfileHeader;
