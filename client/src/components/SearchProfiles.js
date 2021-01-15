import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfiles, getUserChats } from '../actions';
import { ProfileCard } from './ProfileCard';

export const SearchProfiles = (props) => {

  const dispatch = useDispatch();
  const profiles = useSelector(state => state.profiles);
  const user = useSelector(state => state.user);
  const query = props.location.search.split('=')[1];

  useEffect(() => {
    if (Object.keys(user)[0] !== 'id') {
      dispatch(getUserChats);
    }
    dispatch(getProfiles(query));
    //eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-4xl text-white my-2">Search Profiles</h1>
      {profiles.length > 0 ? (
        profiles.map(profile => (
          <ProfileCard profile={profile} user={user} key={profile.id}/>
        ))
      ) : (
        <p>Sorry, no profiles found</p>
      )}
    </div>
  )
}
