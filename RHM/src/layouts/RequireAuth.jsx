import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

import useAuthStore from "../stores/store_auth";

export default function RequireAuth() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth');
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? <Outlet /> : null;
}
