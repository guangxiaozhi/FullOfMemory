import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='navigation'>
			<div className='icon-menu'>
				<li className="icon-list">
					<NavLink exact to="/"><img src='https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg'/></NavLink>
				</li>
				<li className="menu-list">
					<NavLink exact to="/">Questions</NavLink>
				</li>
			</div>

			{isLoaded && (
				<li className='dropdown-menu'>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
