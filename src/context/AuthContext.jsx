import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client";
import { createContext, useEffect, useState } from "react";
import { Login } from "../module/graphql/mutations/mutations";
import { useNavigate } from "react-router-dom";
import { RegisterCoach } from "../graphql/mutations/mutations";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../module/firebase";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [login] = useMutation(Login);
  const [registerCoach] = useMutation(RegisterCoach);
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
  const handleRegister = ({ values }) => {
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
        coachingStreet1: values.coachingStreet1,

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

  return (
    <AuthContext.Provider
      value={{ currentUser, handleLogin, handleRegister, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
