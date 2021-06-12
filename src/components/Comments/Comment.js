import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddComment from './AddComment';
import ShowComments from './ShowComments';
import db from '../../Firebase';
import { useLocation } from 'react-router-dom';

const Comment = ({ user }) => {
	const [comments, setComments] = useState([]);
	const location = useLocation();
	const [loading, setLoading] = useState(true);
	const postId = location.pathname.split('/')[2];

	useEffect(() => {
		const sub = db
			.collection(`users/${user.uid}/posts`)
			.doc(`${postId}`)
			.collection('comments')
			.onSnapshot((res) => {
				setComments([]);
				res.forEach((data) => {
					const getData = data.data();
					setComments((prev) => [...prev, getData]);
				});
				setLoading(false);
			});

		return () => sub();
	}, []);

	return (
		<>
			<CommentSection>
				<AddComment user={user} />
				<ShowCommentSection >
					{loading && <P>LoadinShowCommentSectiong...</P>}
					{comments.length === 0 && !loading && (
						<P>No comments on this post yet</P>
					)}

					{!loading &&
						comments.map((data) => {
							return (
								<ShowComments
									user={user}
									postId={postId}
									key={data.id}
									uid={data.uid}
									id={data.id}
									name={data.name}
									comment={data.comment}
								/>
							);
						})}
				</ShowCommentSection>
			</CommentSection>
		</>
	);
};

export default Comment;

const CommentSection = styled.div`
	width: 84vw;
	margin: 30px auto 0 auto;
	padding-bottom: 50px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;
const ShowCommentSection = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 10px;
	justify-content: space-around;
	align-items: center;
	transition: all 1s ease-in;
	padding: 10px 0px;
`;
const P = styled.p`
	color: ${(p) => p.theme.fontColor};
`;
