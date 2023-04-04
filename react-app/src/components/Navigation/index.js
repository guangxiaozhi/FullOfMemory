import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import SearchBar from './SearchBar';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

	const closeMenu = () => setShowMenu(false);

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
			<div className='search-container'>
				<SearchBar />
			</div>


			{isLoaded && (
				sessionUser ?
				<li className='dropdown-menu'>
					<ProfileButton user={sessionUser} />
				</li>
				: <div className='login-signup-button'>
					<div className='login-button'><OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            /></div>
					<div className='signup-button'><OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            /></div>
				</div>
			)}
		</ul>
	);
}

export default Navigation;
