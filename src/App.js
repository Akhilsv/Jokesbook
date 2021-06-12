import './App.css';
import React, { Suspense, useContext, useState } from 'react';
import Home from './Pages/Home';
import Nav from './components/Nav';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { DataContext } from './DataContext';
import Auth from './Pages/Auth';
import styled, { ThemeProvider } from 'styled-components';
import { LoadHolder, Loading } from './components/Loading';
import { darkTheme, lightTheme } from './Theme';

const Profile = React.lazy(() => import('./Pages/Profile'));
const NewJoke = React.lazy(() => import('./Pages/NewJoke'));
const JokeContent = React.lazy(() => import('./Pages/JokeContent'));
const PublicProfile = React.lazy(() => import('./Pages/PublicProfile'));
function App() {
	const { status } = useContext(DataContext);
	const [isLoggedIn, setIsLoggedIn] = status;
	const [isDarkMode, setIsDarkMode] = useState(() => false);

	return (
		<>
			<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
				<Body>
					<Router>
						<Nav is={isDarkMode} set={setIsDarkMode} />
						<Suspense
							fallback={
								<LoadHolder>
									<Loading />
								</LoadHolder>
							}>
							<Switch>
								<Route exact path='/'>
									<Redirect to='/jokes' />
								</Route>
								<Route exact path='/auth'>
									<Auth />
								</Route>
								{isLoggedIn && (
									<Route exact path='/jokes'>
										<Home />
									</Route>
								)}
								{isLoggedIn && (
									<Route exact path='/new-joke'>
										<NewJoke />
									</Route>
								)}
								{isLoggedIn && (
									<Route exact path='/jokes/:jokeId'>
										<JokeContent />
									</Route>
								)}
								{isLoggedIn && (
									<Route exact path='/jokes/user/:uid'>
										<PublicProfile />
									</Route>
								)}
								{isLoggedIn && (
									<Route exact path='/profile'>
										<Profile />
									</Route>
								)}
								<Route path='*'>
									<Redirect to='/auth' />
								</Route>
							</Switch>
						</Suspense>
					</Router>
				</Body>
			</ThemeProvider>
		</>
	);
}
const Body = styled.div`
	width: 100%;
	min-height: 100vh;
	background: ${(p) => p.theme.background};
	color: ${(p) => p.theme.fontColor};
	transition: all 1s;
`;
const P = styled.p`
	color: green;
	font-size: 5rem;
`;
export default App;
