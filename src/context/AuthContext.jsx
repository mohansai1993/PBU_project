import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Login,
  RegisterAthlete,
  RegisterCoach,
} from "../graphql/mutations/mutations";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../module/firebase";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [login] = useMutation(Login);
  const [registerCoach] = useMutation(RegisterCoach);
  const [registerAthlete] = useMutation(RegisterAthlete);
  const navigate = useNavigate();
  const client = useApolloClient();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setCurrentUser(decodedToken);
    }
  }, []);
  const handleLogin = (user) => {
    login({
      variables: {
        ...user,
      },
    })
      .then((user) => {
        console.log(user.data.login);
        navigate("/");
        localStorage.setItem("token", user.data.login.token);
        setCurrentUser(user.data.login);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: "Email and password are incorrect",
          icon: "error",
          confirmButtonText: "Cancel",
        });
      });
  };
  const handleRegisterCoach = ({ values }) => {
    return registerCoach({
      variables: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        skillLevelId: "644117be660a4dbcc1b81adc",
        coachingCity: values.coachingCity,
        coachingState: values.coachingState,
        coachingCountry: values.coachingCountry,
        coachingPinCode: values.coachingPinCode.toString(),
        document: values.document,
        coachingStreet: values.coachingStreet,
        subscriptionPlanId: values.paymentpaln,
      },
    }).then(async (user) => {
      console.log(user.data.registerCoach);
      setCurrentUser(user.data.registerCoach);
      await setDoc(doc(db, "users", user.data.registerCoach.userId), {
        uid: user.data.registerCoach.userId,
        displayName: values.firstName,
        email: values.email,
        photoURL:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
      });
      await setDoc(doc(db, "userChats", user.data.registerCoach.userId), {});
    });
  };
  const handleLogout = () => {
    // client.onResetStore();
    setCurrentUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleRegisterAthlete = ({ values }) => {
    return registerAthlete({
      variables: {
        ...values,
      },
    }).then(async (user) => {
      setCurrentUser(user.data.registerAthlete);
      await setDoc(doc(db, "users", user.data.registerAthlete.userId), {
        uid: user.data.registerAthlete.userId,
        displayName: values.firstName,
        email: values.email,
        photoURL:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
      });
      await setDoc(doc(db, "userChats", user.data.registerAthlete.userId), {});
    });
  };

  function handleGoogleSignIn({
    isLogin = true,
    isCoach = false,
    values = {},
  }) {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider).then((result) => {
      // Get the user's Firebase user ID
      const uid = result.user;
      if (isLogin) {
        handleLogin({
          email: uid.email,
          googleId: uid.uid,
        });
      } else {
        if (isCoach) {
          handleRegisterAthlete({
            values: {
              ...values,
              email: uid.email,
              googleId: uid.uid,
              firstName: uid?.displayName?.split(" ")[0],
              lastName: uid?.displayName?.split(" ")[1],
            },
          });
        } else {
          handleRegisterCoach({
            values: {
              email: uid.email,
              googleId: uid.uid,
              firstName: uid?.displayName?.split(" ")[0],
              lastName: uid?.displayName?.split(" ")[1],
            },
          });
        }
      }
      // TODO: Send the user ID to your server to store it in the MySQL database
    });
    // }
  }
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        handleLogin,
        handleRegisterCoach,
        handleLogout,
        handleGoogleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
