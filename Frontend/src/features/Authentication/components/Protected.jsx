import React from 'react'
import { useAuth } from '../hooks/auth.hooks';
import { Navigate } from 'react-router';
import Loader from './Loader';

const Protected = ({ children }) => {
    const { user , loading} = useAuth();

    if (loading) {
        return <Loader />
    }

    if(!user){
        return <Navigate to="/login" />
    }
    
  return children
}

export default Protected