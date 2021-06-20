import React, { useState, createContext, useEffect } from 'react';
import { auth } from './Firebase';

export const DataContext = createContext();

export const DataProvider = (props) => {
	const [isLoggesIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState('');

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setCurrentUser(user);
				setIsLoggedIn(true);
				setIsLoading(false);
			} else {
				setIsLoggedIn(false);
				setIsLoading(false);
			}
		});
	}, []);

	const values = {
		status: [isLoggesIn, setIsLoggedIn],
		currentUser: currentUser,
	};
	return (
		<DataContext.Provider value={values}>
			{!isLoading && props.children}
		</DataContext.Provider>
	);
};
