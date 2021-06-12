import React, { useContext } from 'react';
import { BsPerson } from 'react-icons/bs';
import styled from 'styled-components';
import { AiOutlineDelete } from 'react-icons/ai';
import { DataContext } from '../../DataContext';
import db from '../../Firebase';
import { useHistory } from 'react-router-dom';

const ShowComments = (props) => {
	const history = useHistory();
	const { currentUser } = useContext(DataContext);
	const showDeleteIcon = currentUser.uid === props.uid;
	const deleteHandler = () => {
		db.collection(`users`)
			.doc(`${props.user.uid}`)
			.collection('posts')
			.doc(`${props.postId}`)
			.collection(`comments`)
			.doc(`${props.id}`)
			.delete()
			.then(() => console.log('Comment is deleted'))
			.catch((e) => console.log(e));
	};
	const profilePushHandler = () => {
		if (currentUser.uid !== props.uid) {
			history.push(`/jokes/user/${props.uid}`);
		} else {
			history.push(`/profile`);
		}
	};
	return (
		<>
			<CommentHolder>
				<UserProfilePhoto onClick={profilePushHandler} />
				<CommentBody>
					<NameEditContainer>
						<UserName>{props.name}</UserName>
						{showDeleteIcon && <AiOutlineDelete onClick={deleteHandler} />}
					</NameEditContainer>
					<CommentData>{props.comment}</CommentData>
				</CommentBody>
			</CommentHolder>
		</>
	);
};

export default ShowComments;

const CommentHolder = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-around;
	transition: all 0.5s ease-in;
	padding: 10px;

	margin-bottom: 10px;
`;
const UserProfilePhoto = styled(BsPerson)`
	cursor: pointer;
	color: ${(p) => p.theme.fontColor};
	padding: 2px;
	font-size: 2rem;
	border: solid 2px ${(p) => p.theme.fontColor};
	border-radius: 50px;
	transition: all 0.5s;
	&:hover {
		background-color: #22222284;
	}
`;
const NameEditContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const CommentBody = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	color: ${(p) => p.theme.fontColor};
	margin-left: 20px;
`;
const UserName = styled.h1`
	font-size: 1rem;
	font-weight: 600;
	text-transform: capitalize;
`;
const CommentData = styled.h1`
	color: ${(p) => p.theme.fontColor};
	padding-top: 10px;
	font-size: 1rem;
	font-weight: 500;
`;
