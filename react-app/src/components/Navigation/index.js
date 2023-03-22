import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='navigation'>
			<div className='icon-menu'>
				<li className="icon-list">
					<NavLink exact to="/"><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR71-Pz4ApR2-rKpzs1UQg7shcX3N0-BLiTYfjs6ZGvFu-Zv6e1ennmYeznXxGVASzpXBQ&usqp=CAU' alt=""/></NavLink>
				</li>
				<li className="menu-list">
					<NavLink exact to="/">All Questions</NavLink>
				</li>
			</div>
			<div>
				<SearchBar />
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
