import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRefreshToken from '../../hooks/useRefreshToken';
import { useSelector } from 'react-redux';
import { RootState } from '../../_reducers';
import useGetProfile from '../../hooks/useGetProfile';

function LandingPage() {
  const user = useSelector((state: RootState) => state.user_reducer.loginUser);

  const navigate = useNavigate();
  const refresh = useRefreshToken();
  const getProfile = useGetProfile();

  const profile = () => {
    if (user) {
      refresh();
      let accessToken = localStorage.getItem('accessToken');
      getProfile(accessToken);
    } else {
      console.log('로그인하세요');
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-3xl font-extrabold text-gray-900 ">
      <button
        onClick={profile}
        className="p-2 border-2 border-gray-500 rounded-lg mb-2"
      >
        Profile 요청
      </button>
      {!user ? <div>로그인 X</div> : <div>로그인 O</div>}
    </div>
  );
}

export default LandingPage;
