import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Reset from './pages/reset/Reset';
import Signin from './pages/signin/Signin';

import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from 'services/firebase';
import { getUser } from 'services/user';
import { login, logout } from './redux/slices/userSlice';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {

        console.log('userAuth', userAuth);
        getUser(userAuth.uid).then((query) => {
          if (query) {
            onSnapshot(query, async (snapshot) => {
              snapshot.forEach((user: any) => {
                const userDatas = user.data();
                console.log('userDatas', userDatas);
                dispatch(
                  login({
                    // email: userDatas.email,
                    uid: userDatas.uid,
                    displayName: userDatas.displayName,
                    photoUrl: userDatas.photoURL,
                  })
                );
              });
            });
          }
        });
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );

}

export default App;
