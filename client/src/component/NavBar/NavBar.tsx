import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../_reducers';
import { setLogout } from '../../_actions/user_action';

function NavBar() {
  const user = useSelector((state: RootState) => state.user_reducer.loginUser);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(setLogout());
    localStorage.setItem('accessToken', '');
  };
  return (
    <div className="absolute top-0 w-full left-0 bg-slate-900 text-white py-5 font-bold">
      <div className="flex items-center w-4/5 m-auto ">
        <Link to="/">
          <div className="flex-[1_1_0] px-20 text-xl">Todo List</div>
        </Link>
        <ul className="flex-[8_1_0] flex space-x-10">
          <Link to="/">
            <li>Home</li>
          </Link>
        </ul>
        <ul className="flex-[1_1_0] flex space-x-10 px-10">
          {!user ? (
            <Link to="/Login">
              <button>Login</button>
            </Link>
          ) : (
            <>
              <div>{user.username}</div>
              <button onClick={logoutHandler}>Logout</button>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
{
  /* <header class="p-3 bg-dark text-white">
<div class="container">
  <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
    <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
      <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"/></svg>
    </a>

    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
      <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
      <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
      <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
      <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
      <li><a href="#" class="nav-link px-2 text-white">About</a></li>
    </ul>

    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
      <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search">
    </form>

    <div class="text-end">
      <button type="button" class="btn btn-outline-light me-2">Login</button>
      <button type="button" class="btn btn-warning">Sign-up</button>
    </div>
  </div>
</div>
</header> */
}
