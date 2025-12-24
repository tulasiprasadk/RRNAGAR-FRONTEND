import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuickCart } from "../context/QuickCartContext";
import { API_BASE } from "../api/client";
import "./Home.css";

import ExploreItem from "../components/ExploreItem";
import DiscoverPopup from "../components/DiscoverPopup";
import MegaAd from "../components/MegaAd";
import AdScroll from "../components/AdScroll";

import hero1 from "../assets/hero-1.jpg";
import hero2 from "../assets/hero-2.jpg";
import hero3 from "../assets/hero-3.jpg";

const defaultCategories = [
  { id: 22, name: "Groceries", icon: "🛒", kannada: "ದಿನಸಿ ವಸ್ತುಗಳು" },
  { id: 29, name: "Flowers", icon: "🌸", kannada: "ಹೂವುಗಳು" },
  { id: 27, name: "Crackers", icon: "🎆", kannada: "ಪಟಾಕಿಗಳು" },
  { id: 28, name: "Pet services", icon: "🐾", kannada: "ಪಶು ಸೇವೆಗಳು" },
  { id: 24, name: "Local Services", icon: "🛠️", kannada: "ಸ್ಥಳೀಯ ಸೇವೆಗಳು" },
  { id: 25, name: "Consultancy", icon: "📑", kannada: "ಸಲಹಾ ಸೇವೆಗಳು" }
];

export default function Home() {
  const navigate = useNavigate();
  const { addItem } = useQuickCart();

  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(defaultCategories);
  const [selectedDiscover, setSelectedDiscover] = useState(null);
  const [popupAnchor, setPopupAnchor] = useState(null);

  const heroImages = [hero1, hero2, hero3];
  const [heroIndex, setHeroIndex] = useState(0);

  const templeRef = useRef(null);
  const parkRef = useRef(null);
  const itRef = useRef(null);

  /* ================= HERO ROTATION ================= */
  useEffect(() => {
    const t = setInterval(
      () => setHeroIndex(i => (i + 1) % heroImages.length),
      5000
    );
    return () => clearInterval(t);
  }, []);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    axios
      .get(`${API_BASE}/categories`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length) {
          setCategories(res.data);
        }
      })
      .catch(() => setCategories(defaultCategories));

    axios
      .get(`${API_BASE}/products`)
      .then(res => {
        if (Array.isArray(res.data)) setProducts(res.data);
      })
      .catch(() => setProducts([]));
  }, []);

  const displayedProducts = products.slice(0, 12);

  /* ================= SEARCH ================= */
  function handleSearchClick() {
    const q = searchText.trim().toLowerCase();
    if (!q) return;

    if (["flowers", "flower", "ಹೂವುಗಳು"].includes(q)) return navigate("/flowers");
    if (["crackers", "cracker", "ಪಟಾಕಿಗಳು"].includes(q)) return navigate("/crackers");
    if (["groceries", "grocery", "ಕಿರಾಣಿ"].includes(q)) return navigate("/groceries");
    if (["pet", "pets"].includes(q)) return navigate("/petservices");
    if (["local"].includes(q)) return navigate("/localservices");
    if (["consult"].includes(q)) return navigate("/consultancy");

    navigate(`/browse?q=${encodeURIComponent(searchText)}`);
  }

  function handleCategoryClick(id) {
    const c = categories.find(c => c.id === id);
    if (!c) return;

    const n = c.name.toLowerCase();
    if (n.includes("flower")) return navigate("/flowers");
    if (n.includes("cracker")) return navigate("/crackers");
    if (n.includes("grocery")) return navigate("/groceries");
    if (n.includes("pet")) return navigate("/petservices");
    if (n.includes("local")) return navigate("/localservices");
    if (n.includes("consult")) return navigate("/consultancy");

    navigate(`/browse?category=${id}`);
  }

  /* ================= RENDER ================= */
  return (
    <>

      <main className="home-layout">
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* CATEGORIES */}
          <section className="section">
            <h2>Popular Categories</h2>
            <div className="cat-row">
              {categories.map(cat => (
                <div
                  key={cat.id}
                  className="cat-card"
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  <div className="cat-icon">{cat.icon || "🛍️"}</div>
                  <div className="cat-name">{cat.name}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ADS GRID */}
          <section className="ads-grid-section">
            <h2>What's New in RR Nagar!</h2>
            <div className="ads-grid">
              <div className="ad-item"><img src="/ads/vchase.png" alt="VHCase" /></div>
              <div className="ad-item"><img src="/ads/ichase.png" alt="ICase" /></div>
              <div className="ad-item"><img src="/ads/rrnagar.png" alt="RR Nagar" /></div>
            </div>
          </section>

          {/* DISCOVER */}
          <section className="section">
            <h2>Discover Around You</h2>
            <div className="discover-scroll">
              <div className="discover-track">
                <ExploreItem
                  ref={templeRef}
                  icon="🛕"
                  title="Temples"
                  titleKannada="ದೇವಾಲಯಗಳು"
                  onClick={() => {
                    setSelectedDiscover({
                      icon: "🛕",
                      title: "Temples",
                      titleKannada: "ದೇವಾಲಯಗಳು",
                      longInfo: "Temples in RR Nagar are peaceful community spaces.",
                      longInfoKannada: "ದೇವಾಲಯಗಳು ಸಮುದಾಯ ಮತ್ತು ಪೂಜೆಗೆ."
                    });
                    setPopupAnchor(templeRef);
                  }}
                />
                <ExploreItem
                  ref={parkRef}
                  icon="🌳"
                  title="Parks"
                  titleKannada="ಉದ್ಯಾನಗಳು"
                  onClick={() => {
                    setSelectedDiscover({
                      icon: "🌳",
                      title: "Parks",
                      titleKannada: "ಉದ್ಯಾನಗಳು",
                      longInfo: "Parks for walks, play and relaxation.",
                      longInfoKannada: "ಉದ್ಯಾನಗಳು ವಿಶ್ರಾಂತಿ ಮತ್ತು ಆಟಕ್ಕೆ."
                    });
                    setPopupAnchor(parkRef);
                  }}
                />
                <ExploreItem
                  ref={itRef}
                  icon="💻"
                  title="IT Park"
                  titleKannada="ಐಟಿ ಪಾರ್ಕ್"
                  onClick={() => {
                    setSelectedDiscover({
                      icon: "💻",
                      title: "IT Park",
                      titleKannada: "ಐಟಿ ಪಾರ್ಕ್",
                      longInfo: "IT hubs and startups in RR Nagar.",
                      longInfoKannada: "ಐಟಿ ಉದ್ಯೋಗ ಮತ್ತು ಆವಿಷ್ಕಾರ."
                    });
                    setPopupAnchor(itRef);
                  }}
                />
              </div>
            </div>
          </section>




        </div>
      </main>

      <DiscoverPopup
        item={selectedDiscover}
        anchorRef={popupAnchor}
        onClose={() => {
          setSelectedDiscover(null);
          setPopupAnchor(null);
        }}
      />
    </>
  );
}
