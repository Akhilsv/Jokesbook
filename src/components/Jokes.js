import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FaEye, FaBookmark, FaRegCommentDots } from 'react-icons/fa';
import { VscEdit } from 'react-icons/vsc';
import { FaHeart } from 'react-icons/fa';
import firebase from 'firebase/app';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { DataContext } from '../DataContext';
import { AiOutlineDelete } from 'react-icons/ai';
import db from '../Firebase';
import Delete from './Delete';

function Jokes(props) {
	const { currentUser } = useContext(DataContext);
	const [popup, setPopup] = useState(false);
	const history = useHistory();
	const viewHandler = () => {
		history.push(`/jokes/${props.pid}`);
	};
	const showEditOption = props.uid === currentUser.uid;
	const gotoProfileHandler = () => {
		if (props.uid !== currentUser.uid) {
			history.push(`/jokes/user/${props.uid}`);
		} else {
			history.push(`/profile`);
		}
	};

	let t = new Date(1970, 0, 1); // Epoch
	t.setSeconds(props.date);
	let day = t.toLocaleString('en-US', { day: '2-digit' });
	let month = t.toLocaleString('en-US', { month: 'short' });

	const editHandler = () => {
		history.push(`/${props.pid}/${props.uid}`);
	};
	const deletePostHandler = () => {
		db.collection(`users/${props.uid}/posts`)
			.doc(`/${props.pid}`)
			.delete()
			.then(() => console.log('deleted'))
			.catch((e) => console.log(e));
		setPopup(false);
	};
	const deleteHandler = () => {
		setPopup(true);
	};
	return (
		<>
			{popup && <Delete state={[popup, setPopup]} func={deletePostHandler} />}
			<JokeContainer>
				<Header>
					<ProfileIcon onClick={gotoProfileHandler} />
					<Name>{props.name}</Name>
					<DateH1>
						{day} {month}
					</DateH1>
				</Header>
				<Description>{props.joke}</Description>
				<Holder>
					<LeftPart>
						<Icon onClick={viewHandler} />
						<FaRegCommentDots onClick={viewHandler} />
					</LeftPart>
					<LeftPart>
						{showEditOption && <VscEdit onClick={editHandler} />}
						{showEditOption && <AiOutlineDelete onClick={deleteHandler} />}
					</LeftPart>
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
	margin: 10px auto;
	transition: all 0.5s;
	border-radius: 10px;
	color: ${(p) => p.theme.fontColor};
	transition: all 1s;
	&:hover {
		background-color: ${(p) => p.theme.jokeHover};
		border-radius: 30px;
	}
`;
const Header = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	position: relative;
`;
const ProfileIcon = styled(IoPersonCircleOutline)`
	cursor: pointer;
	font-size: 40px;
`;
const Name = styled.h1`
	text-transform: capitalize;
	font-size: 1.2rem;
	font-weight: 600;
	margin-left: 5px;
`;
const Holder = styled.div`
	width: 90%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	& svg {
		cursor: pointer;
		transition: all 0.5s;
		font-size: 1.2rem;
		&:hover {
			transform: scale(1.1);
			fill: #5678e7;
		}
	}
`;
const LeftPart = styled.div`
	width: 50%;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;
const Description = styled.div`
	width: 95%;
	min-height: 10vh;
	margin: 10px auto;

	padding-bottom: 15px;
`;
const Icon = styled(FaEye)`
	transition: all 0.5s;

	&:hover {
		transform: rotate(360deg);
		fill: #5678e7;
	}
`;
const DateH1 = styled.h1`
	font-size: 0.7rem;
	font-weight: 500;
	position: absolute;
	right: 0;
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

	transition: all 0.5s;

	&:hover {
		transform: scale(1.1);
		fill: #5678e7;
	}
`;

export default Jokes;
