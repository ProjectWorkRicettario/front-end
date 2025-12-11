// frontend/src/pages/ProfilePage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { logoutUser } from '../services/authService';
import * as dataService from '../services/dataService';
import HeaderBar from '../components/HeaderBar';
import '../styles/profilePage.css';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await dataService.getProfileData();
                setProfile(data);
            } catch (error) {
                console.error("Errore nel recupero profilo:", error);
                // Reindirizza al login se ricevi 401
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            logout();
            navigate('/login');
        } catch (error) {
            console.error('Errore nel logout:', error);
        }
    };

    if (loading) return <div>Caricamento Profilo...</div>;
    if (!profile) return <div>Errore: Dati utente non disponibili.</div>;

    return (
        <div className="profile-container">
            <HeaderBar />
            <h2>Profilo Personale</h2>
            <div className="profile-details">
                <p><strong>ID Utente:</strong> {profile.id}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Registrato Dal:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;