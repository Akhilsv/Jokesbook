import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadHolder, Loading } from '../components/Loading';
import db from '../Firebase';
import {
	Form,
	FormHolder,
	Label,
	Input,
	JokeInput,
	Holder,
	RadioButtonHolder,
	RadioButtonInput,
	RadioLabel,
	Button,
} from './NewJoke';

const PostEdit = () => {
	const [title, setTitle] = useState('');
	const [joke, setJoke] = useState('');
	const [type, setType] = useState('private');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		db.collection(`users/${params.pid}/posts`)
			.doc(`/${params.uid}`)
			.get()
			.then((res) => {
				const data = res.data();
				setTitle(data.title);
				setJoke(data.joke);
				setType(data.type);
				setLoading(false);
			});
	}, []);

	const params = useParams();

	const submithandler = (e) => {
		e.preventDefault();
	};
	const titleHandler = (e) => {
		setTitle(e.target.value);
	};
	const jokeHandler = (e) => {
		setJoke(e.target.value);
	};
	const radioButtonhandler = (e) => {
		setType(e.target.value);
	};

	return (
		<>
			{loading && (
				<LoadHolder>
					{' '}
					<Loading />
				</LoadHolder>
			)}
			{!loading && (
				<FormHolder>
					<Form onSubmit={submithandler}>
						{/* <Label>Joker name</Label>
					<Input value={name} onChange={nameHandler}></Input> */}
						<Label>Title</Label>
						<Input value={title} onChange={titleHandler}></Input>
						<Label>Write your joke</Label>
						<JokeInput onChange={jokeHandler} value={joke}></JokeInput>
						<Holder>
							<RadioButtonHolder>
								<RadioButtonInput
									type='radio'
									name='type'
									value='public'
									id='public'
									defaultChecked={type === 'public'}
									required
									onClick={radioButtonhandler}
								/>
								<RadioLabel htmlFor='public'>Public</RadioLabel>
								<RadioButtonInput
									type='radio'
									name='type'
									value='private'
									id='private'
									defaultChecked={type === 'private'}
									onClick={radioButtonhandler}
									required
								/>
								<RadioLabel htmlFor='private'>Private</RadioLabel>
							</RadioButtonHolder>
							<Button>Submit</Button>
						</Holder>
					</Form>
				</FormHolder>
			)}
		</>
	);
};

export default PostEdit;
