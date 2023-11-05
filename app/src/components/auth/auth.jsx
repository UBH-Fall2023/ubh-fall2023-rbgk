import {onAuthStateChanged, signOut} from "firebase/auth";
import React, {useEffect, useState} from "react";
import {auth} from "../../firebase";
import {useNavigate} from "react-router-dom";

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                console.log(user);
                navigate('/')
            } else {
                setAuthUser(null);
                navigate('/signin')

            }
        });

        return () => {
            listen();
        };
    }, []);


};

export default AuthDetails;