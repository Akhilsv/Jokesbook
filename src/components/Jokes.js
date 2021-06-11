import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FaEye, FaBookmark, FaRegCommentDots } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import firebase from 'firebase/app';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { DataContext } from '../DataContext';
import db from '../Firebase';

function Jokes(props) {
	const { currentUser } = useContext(DataContext);
	const history = useHistory();
	const viewHandler = () => {
		history.push(`jokes/${props.pid}`);
	};
	const gotoProfileHandler = () => {
		if (props.uid !== currentUser.uid) {
			history.push(`jokes/user/${props.uid}`);
		}
		else{
				history.push(`/profile`)
		}
	};
	// const likeHandler = () => {
	// 	db.collection(`user`)
	// 		.doc(`${props.id}`)
	// 		.collection('likes')
	// 		.doc(`z2dcl7qjU2o4Ygd84Ir3`)
	// 		.update({
	// 			1: firebase.firestore.FieldValue.arrayUnion(`${currentUser.uid}`),
	// 		})
	// 		.then(() => console.log('Comment is added'))
	// 		.catch((e) => console.log(e));
	// };
	return (
		<>
			<JokeContainer>
				<Header>
					<ProfileIcon onClick={gotoProfileHandler} />
					<Name>{props.name}</Name>
				</Header>
				<Description>{props.joke}</Description>
				<Holder>
					<Icon onClick={viewHandler} />
					<Heart />
					<FaRegCommentDots onClick={viewHandler} />
					<BookMark />
				</Holder>
			</JokeContainer>
		</>
	);
}
const JokeContainer = styled.div`
	width: 80vw;
	border: solid 2px #33dd33;
	background-color: none;
	display: flex;
	padding: 15px;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	margin: 10px auto;
	transition: all 0.5s;
	border-radius: 10px;
	&:hover {
		background-color: #2e2e2e;
		border-radius: 30px;
	}
`;
const Header = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
`;
const ProfileIcon = styled(IoPersonCircleOutline)`
	cursor: pointer;
	font-size: 40px;
	color: #ffffffeb;
`;
const Name = styled.h1`
	text-transform: capitalize;
	font-size: 1.2rem;
	font-weight: 600;
	margin-left: 5px;
	color: #ffffffeb;
`;
const Holder = styled.div`
	width: 90%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #ffffffeb;
`;
const Description = styled.div`
	width: 95%;
	min-height: 10vh;
	margin: 10px auto;
	color: #cfcfcfeb;
	padding-bottom: 15px;
`;
const Icon = styled(FaEye)`
	transition: all 0.5s;
	font-size: 1.2rem;
	&:hover {
		transform: rotate(360deg);
		fill: #5678e7;
	}
`;
const Heart = styled(FaHeart)`
	transition: all 0.5s;
	font-size: 1.2rem;
	&:hover {
		transform: scale(1.1);
		fill: #f56c6c;
	}
`;
const BookMark = styled(FaBookmark)`
	font-size: 1.2rem;

	fill: #ffffff;
	transition: all 0.5s;

	&:hover {
		transform: scale(1.1);
		fill: #5678e7;
	}
`;

export default Jokes;
