import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PublicRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-[20px] font-pretendad text-[#696969]">로딩 중...</p>
            </div>
        );
    }

    if (user) {
        return <Navigate to="/home" replace />;
    }

    return children;
}
