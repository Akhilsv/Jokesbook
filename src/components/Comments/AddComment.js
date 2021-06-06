import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { BsPerson } from 'react-icons/bs';
import { DataContext } from '../../DataContext';
import db from '../../Firebase';
import { useLocation } from 'react-router-dom';

const AddComment = () => {
	const { currentUser } = useContext(DataContext);

	console.log();
	const [comment, setComment] = useState('');
	const location = useLocation();
	const postId = location.pathname.split('/')[2];
	const commentHandler = (e) => {
		setComment(e.target.value);
	};
	const cancelHandler = () => {
		setComment('');
	};
	const submitHandler = () => {
		const commentData = {
			id: Math.random(),
			uid: currentUser.uid,
			comment,
			name: currentUser.displayName,
		};

		db.collection(`public`)
			.doc(`${postId}`)
			.collection('comments')
			.doc(`${commentData.id}`)
			.set(commentData)
			.then(() => console.log('Comment is added'))
			.catch((e) => console.log(e));
		setComment('');
	};
	return (
		<>
			<AddCommentSection>
				<UserProfilePhoto></UserProfilePhoto>
				<CommentInput
					onChange={commentHandler}
					value={comment}
					placeholder='Add a public comment...'></CommentInput>
				<UserOptions>
					{comment.length > 0 && (
						<Button type='submit' onClick={cancelHandler}>
							Cancle
						</Button>
					)}
					{comment.length > 0 && (
						<Button colors={true} onClick={submitHandler}>
							Comment
						</Button>
					)}
				</UserOptions>
			</AddCommentSection>
		</>
	);
};

export default AddComment;

const AddCommentSection = styled.div`
	display: flex;
	width: 100%;
	height: 80px;
	justify-content: space-around;
	align-items: center;
	position: relative;
	transition: all 1s ease-in;
`;
const UserProfilePhoto = styled(BsPerson)`
	fill: #7cf74b;
	padding: 2px;
	font-size: 2rem;
	border: solid 2px white;
	border-radius: 50px;
`;
const CommentInput = styled.input`
	color: white;
	font-size: 1rem;
	padding: 0px 10px 5px 10px;
	width: 90%;
	margin-bottom: 30px;
	outline: none;
	border: none;

	background: none;
	border-bottom: 1px solid #33dd33;
	@media (max-width: 600px) {
		width: 80%;
	}
`;
const UserOptions = styled.div`
	position: absolute;
	right: 0%;
	bottom: 0%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	transition: all 1s ease-in;
`;

const Button = styled.button`
	transition: all 1s ease-in;
	outline: none;
	border: none;
	padding: 5px;
	width: 80px;
	height: 32px;
	font-weight: 600;
	margin-right: 20px;
	color: #e2e2e2;

	background: ${({ colors }) => (colors ? '#008307' : 'none')};
	@media (max-width: 600px) {
		width: 75px;
	}
`;
