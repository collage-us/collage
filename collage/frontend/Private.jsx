import React, {Navigate} from 'react';

const PrivateRoutes = ({loggedIn, registered}) => {
// this can be taken care in navbar logic
  return (
    (loggedIn && !registered) ? <Navigate to="/signup"/> : <h1>You can only see this if you are logged in and registered</h1>);
};

export default PrivateRoutes;