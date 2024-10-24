import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "../stores/store_auth";

export default function NotRequireAuth() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return !isAuthenticated ? <Outlet /> : null;
}
