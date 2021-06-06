import React,{ useState,useEffect } from 'react';
import styled from 'styled-components';
import AddComment from './AddComment';
import ShowComments from './ShowComments';
import db from '../../Firebase';
import { useLocation } from 'react-router-dom';

const Comment = () => {
	const [comments, setComments] = useState([]);
	const location = useLocation();
	const postId = location.pathname.split('/')[2];

	useEffect(() => {
		fetchData();

		return () => {
			fetchData();
		}
	}, []);
	const fetchData = async () => {
		const publicJokes = db
			.collection(`public`)
			.doc(`${postId}`)
			.collection('comments');
		try {
			publicJokes.onSnapshot((res) => {
				setComments([]);
				res.forEach((data) => {
					const getData = data.data();
					setComments((prev) => [...prev, getData]);
				});
			});
		} catch (error) {
			console.log('error');
		}
	};


	return (
		<>
			<CommentSection>
				<AddComment  />
				<ShowCommentSection>
					{comments &&
						comments.map((data) => {
							return (
								<ShowComments
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
	margin: 30px auto;
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
