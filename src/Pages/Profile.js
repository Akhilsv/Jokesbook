import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LoadHolder, Loading } from '../components/Loading';
import { DataContext } from '../DataContext';
import db from '../Firebase';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileBody from '../components/profile/ProfileBody';

const Profile = () => {
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
	const getValueHandler = (data) => {
		console.log(data);
    };
    
	return (
		<>
			{loading && (
				<LoadHolder>
					<Loading />
				</LoadHolder>
			)}

			{!loading && (
                <ProfileHeader data={posts} user={currentUser.displayName} value={getValueHandler}/>
			)}
			{!loading && <ProfileBody />}
		</>
	);
};

export default Profile;
