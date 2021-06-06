import './App.css';
import React, { Suspense, useContext } from 'react';
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
import styled from 'styled-components';
import { LoadHolder, Loading } from './components/Loading';


const Profile = React.lazy(() => import('./Pages/Profile'));
const NewJoke = React.lazy(() => import('./Pages/NewJoke'));
const JokeContent = React.lazy(() => import('./Pages/JokeContent'));
function App() {
	const { status } = useContext(DataContext);
	const [isLoggedIn, setIsLoggedIn] = status;


	return (
		<>
			<Router>
				<Nav />

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
		</>
	);
}
const P = styled.p`
	color: green;
	font-size: 5rem;
`;
export default App;
