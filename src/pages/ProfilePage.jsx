// frontend/src/pages/ProfilePage.jsx
import { useState, useEffect } from 'react';
import * as dataService from '../services/dataService';
import HeaderBar from '../components/HeaderBar';
import '../styles/profilePage.css';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

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
                {/* Aggiungere un pulsante Logout qui sarebbe ideale */}
            </div>
        </div>
    );
};

export default ProfilePage;