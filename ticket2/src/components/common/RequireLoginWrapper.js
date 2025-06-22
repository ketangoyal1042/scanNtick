import { useDispatch, useSelector } from 'react-redux';
import { requireLoggedIn } from '../utils/requireLoggedIn';
import React from 'react';

export default function RequireLoginWrapper({ children, onClick }) {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const visitor = useSelector((state) => state.visitor);

    return React.cloneElement(children, {
        onClick: () => requireLoggedIn({ auth, visitor, dispatch }, onClick),
    });
}
