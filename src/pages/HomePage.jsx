import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import "../styles/homePage.css";

const HomePage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="home-page">
      {/* Header */}
      <HeaderBar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-image">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZEYdn18SDg8d0V_kRRQPoLImcmfpH_bv7rcKQcmcIRTFu1wUeMZ3HzEkCzjrtDzt4wCD0IDG_W5zK1Xm_QHKDakzxLOZpFfmyCZLoQtlI6NbKuU-g19hlWJusWs8mFJn6lp3UUmEYqNSPAdeaLAkMAcYFRyIvwCe-8HrYsDlWTwn6dPqZAktk8M-vk_aVprYV3ObeTB_9WS_WmcTfyuqrRM1vrP83YEXDJvOpXsDGcohu6a0ov9mQlo_HngLXpF9-A0KqN-adAPg"
              alt="Vibrant healthy bowl with fresh vegetables and grains"
            />
          </div>
          <div className="hero-content">
            <h1 className="hero-title">
              Trasforma il tuo frigo in un <span className="hero-highlight">banchetto</span>
            </h1>
            <p className="hero-description">
              Dì addio allo spreco alimentare. Inserisci quello che hai a disposizione e scopri ricette deliziose generate istantaneamente per te.
            </p>
            <div className="hero-buttons">
              <Link to={isLoggedIn ? "/inventory" : "/register"} className="btn-primary">
                Genera la tua cena
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <p className="stat-label">Ricette Generate</p>
            <p className="stat-number">50k+</p>
            <div className="stat-trend green">
              <span className="material-symbols-outlined">trending_up</span>
              <span>+15% questo mese</span>
            </div>
          </div>
          <div className="stat-card">
            <p className="stat-label">Utenti Attivi</p>
            <p className="stat-number">12k+</p>
            <div className="stat-trend green">
              <span className="material-symbols-outlined">trending_up</span>
              <span>+10% questa settimana</span>
            </div>
          </div>
          <div className="stat-card">
            <p className="stat-label">Cibo Salvato</p>
            <p className="stat-number">2.5 Tonne</p>
            <div className="stat-trend orange">
              <span className="material-symbols-outlined">eco</span>
              <span>Impatto Green</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="funziona">
        <div className="how-it-works-container">
          <div className="how-it-works-header">
            <h2>Semplice come contare fino a tre</h2>
            <div className="header-line"></div>
            <p>Abbiamo reso la cucina creativa accessibile a tutti. Segui questi passaggi per il tuo prossimo pasto.</p>
          </div>

          <div className="steps-grid">
            {/* Step 1 */}
            <div className="step-card">
              <div className="step-icon step-icon-1">
                <span className="material-symbols-outlined">shopping_cart</span>
              </div>
              <h3>1. Aggiungi ingredienti</h3>
              <p>Apri la porta del frigo, guarda cosa hai e inseriscilo nell'app. Anche quell'ultima carota conta!</p>
            </div>

            {/* Step 2 */}
            <div className="step-card">
              <div className="step-icon step-icon-2">
                <span className="material-symbols-outlined">skillet</span>
              </div>
              <h3>2. Ottieni 3 ricette</h3>
              <p>Il nostro algoritmo intelligente ti suggerirà tre opzioni bilanciate basate sui tuoi ingredienti.</p>
            </div>

            {/* Step 3 */}
            <div className="step-card">
              <div className="step-icon step-icon-3">
                <span className="material-symbols-outlined">restaurant</span>
              </div>
              <h3>3. Gusta il tuo pasto</h3>
              <p>Segui le istruzioni semplici e goditi una cena deliziosa senza aver sprecato nulla.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Pronto a cucinare <br />qualcosa di incredibile?</h2>
          <p>Unisciti a migliaia di chef casalinghi che hanno smesso di buttare cibo e hanno iniziato a creare ricordi.</p>
          <div className="cta-buttons">
            <Link to={isLoggedIn ? "/inventory" : "/register"} className="btn-cta-primary">
              <span>Crea la tua prima ricetta</span>
              
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
