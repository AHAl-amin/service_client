// components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
    
  const userType = localStorage.getItem('user_type');
 



  
  // jodi role na thake
 
  if (!userType) {
    return <Navigate to="/" replace />;
  }
 



  // jodi role match kore
  if (allowedRoles.includes(userType)) {
    return children;
  }

  // jodi onno role hoy
  return <Navigate to="/unauthorized" replace />;
  
};

export default PrivateRoute;


