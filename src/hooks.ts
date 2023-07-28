import React from 'react';
import {AuthContext} from './auth';

const useAuth = () => {
    return React.useContext(AuthContext);
}
  
export { useAuth }