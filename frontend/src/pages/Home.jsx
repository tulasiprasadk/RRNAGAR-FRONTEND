import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import ExploreItem from "../components/ExploreItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import hero1 from "../assets/hero-1.jpg";
import hero2 from "../assets/hero-2.jpg";
import hero3 from "../assets/hero-3.jpg";

import ad1 from "../assets/ads/ad1.jpg";
import ad2 from "../assets/ads/ad2.jpg";
import ad3 from "../assets/ads/ad3.jpg";
import ad4 from "../assets/ads/ad4.jpg";

export default function Home() {
  const navigate = useNavigate();
  /* -----------------------------------
      HERO SLIDER
  ----------------------------------- */
  const heroImages = [hero1, hero2, hero3];
  const fallbackHero = "/images/rrnagar_hero.jpg";
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroSrc, setHeroSrc] = useState(heroImages[0] || fallbackHero);

  /* -----------------------------------
      PRODUCTS & SEARCH
  ----------------------------------- */
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [addingToCart, setAddingToCart] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  }

  async function addToCart(product) {
    setAddingToCart(product.id);
    try {
      // Create a cart in localStorage if customer is not logged in
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existing = cart.find(item => item.id === product.id);
      
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          titleKannada: product.titleKannada,
          description: product.description,
          descriptionKannada: product.descriptionKannada,
          price: product.price,
          unit: product.unit,
          quantity: 1,
          image: product.image,
          variety: product.variety,
          subVariety: product.subVariety
        });
      }
      
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`✓ ${product.title} added to cart!`);
      
      // Optionally navigate to cart
      // navigate("/cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart");
    } finally {
      setAddingToCart(null);
    }
  }

  function handleSearchClick() {
    setHasSearched(true);
    
    if (searchQuery.trim() === "") {
      setFilteredProducts(products.slice(0, 12)); // Show first 12 products
    } else {
      // Redirect to browse page with search query
      navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
    }
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const nextSrc = heroImages[heroIndex] || fallbackHero;
    setHeroSrc(nextSrc);
  }, [heroIndex]);

  /* -----------------------------------
      POPULAR CATEGORIES
  ----------------------------------- */
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error loading categories:", err);
      // Fallback to hardcoded categories if API fails
      setCategories([
        { id: 1, name: "Flowers", icon: "🌸" },
        { id: 2, name: "Crackers", icon: "🎆" },
        { id: 3, name: "Vegetables", icon: "🥬" },
        { id: 4, name: "Fruits", icon: "🍎" },
        { id: 5, name: "Milk Products", icon: "🥛" },
        { id: 6, name: "Groceries", icon: "🛒" },
      ]);
    }
  }

  function handleCategoryClick(categoryId) {
    navigate(`/browse?category=${categoryId}`);
  }

  /* -----------------------------------
      ADS
  ----------------------------------- */
  const ads = [
    { image: ad1, title: "Chase Supermarket", link: "https://vchase.in" },
    { image: ad2, title: "Marketing", link: "https://vchase.in" },
    { image: ad3, title: "Crackers", link: "https://rrnagar.com" },
    { image: ad4, title: "Pet Services", link: "https://thevetbuddy.com" }
  ];

  const adsLoop = [...ads, ...ads]; // Duplicate for seamless scroll

  /* -----------------------------------
      DISCOVER SECTION
  ----------------------------------- */
  const discover = [
    {
      title: "Temples",
      desc: "Spiritual places",
      icon: "🛕",
      longInfo:
        "RR Nagar has several beautiful temples blending heritage and modern culture. These peaceful spaces provide devotion, calmness and cultural identity.",
    },
    {
      title: "Parks",
      desc: "Green spaces",
      icon: "🌳",
      longInfo:
        "Well-kept parks with jogging tracks, shaded walkways and playgrounds make RR Nagar refreshing for families, pets and fitness lovers.",
    },
    {
      title: "IT Parks",
      desc: "Tech hubs",
      icon: "💻",
      longInfo:
        "Close to Global Village Tech Park, RR Nagar attracts IT professionals and startups — a fast-growing tech-friendly locality.",
    },
    {
      title: "Education",
      desc: "Schools & colleges",
      icon: "🎓",
      longInfo:
        "RR Nagar hosts reputed PU colleges, schools and skill learning centers offering strong academic foundations.",
    },
    {
      title: "Entertainment",
      desc: "Fun places",
      icon: "🎭",
      longInfo:
        "Cafés, theatres, events and food streets make RR Nagar an entertainment hub for youth, families and culture lovers.",
    }
  ];

  /* -----------------------------------
      AUTO-DETECT SCROLL WIDTH (DISCOVER)
  ----------------------------------- */
  const discoverRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    if (!discoverRef.current) return;

    const items = discoverRef.current.querySelectorAll(".discover-item");
    if (items.length === 0) return;

    let total = 0;
    items.forEach((item) => {
      const style = window.getComputedStyle(item);
      const width = item.offsetWidth;
      const marginRight = parseFloat(style.marginRight);
      total += width + marginRight;
    });

    setScrollWidth(total);
  }, []);

  /* -----------------------------------
      RETURN: PAGE UI
  ----------------------------------- */
  return (
    <main className="home">

      {/* HERO WITH SIDEBAR RESULTS */}
      <section className="hero" style={{ display: hasSearched ? 'flex' : 'block', gap: '20px', alignItems: 'flex-start' }}>
        <div className="hero-inner" style={{ flex: hasSearched ? '0 0 50%' : '1' }}>
          <div className="hero-image">
            <img
              src={heroSrc}
              alt="RR Nagar"
              onError={(e) => {
                if (e.currentTarget.src !== window.location.origin + fallbackHero) {
                  e.currentTarget.src = fallbackHero;
                  setHeroSrc(fallbackHero);
                }
              }}
            />
          </div>

          <div className="hero-text">
            <h1 className="hero-title">ನಮ್ಮಿಂದ ನಿಮಗೆ — ನಿಮ್ಮಷ್ಟೇ ಹತ್ತಿರ.</h1>
            <p className="hero-sub">From Us To You — As Close As You Need Us.</p>

            <div className="hero-search">
              <input 
                className="hero-search-input" 
                placeholder="Search groceries, flowers, products…" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="hero-search-btn" onClick={handleSearchClick}>Search</button>
            </div>
          </div>
        </div>

        {/* PRODUCTS SIDEBAR - Show next to hero when searched */}
        {hasSearched && (
          <div style={{ flex: '0 0 48%', background: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', maxHeight: '500px', overflowY: 'auto' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: '700', color: '#333' }}>
              {searchQuery ? `Results for "${searchQuery}"` : "All Products"}
            </h3>
            {filteredProducts.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: 'linear-gradient(135deg, #e31e24 0%, #ffd600 100%)', color: 'white' }}>
                      <th style={{ padding: '10px', textAlign: 'left', fontSize: '12px', fontWeight: '600' }}>Product</th>
                      <th style={{ padding: '10px', textAlign: 'left', fontSize: '12px', fontWeight: '600' }}>Price</th>
                      <th style={{ padding: '10px', textAlign: 'center', fontSize: '12px', fontWeight: '600' }}>Qty</th>
                      <th style={{ padding: '10px', textAlign: 'center', fontSize: '12px', fontWeight: '600' }}>Add</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <img 
                              src={product.image ? `/${product.image}` : `/placeholder.svg`} 
                              alt={product.title || 'Product'} 
                              style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: 4 }}
                              onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
                            />
                            <div>
                              <strong style={{ display: 'block', fontSize: '13px' }}>
                                {product.title}
                                {product.titleKannada && (
                                  <span style={{ color: '#c8102e', marginLeft: '5px' }}>({product.titleKannada})</span>
                                )}
                              </strong>
                              {product.variety && (
                                <span style={{ fontSize: '11px', color: '#666' }}>{product.variety}</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '10px', fontWeight: 'bold', color: '#28a745' }}>₹{product.price}</td>
                        <td style={{ padding: '10px', textAlign: 'center' }}>
                          <input 
                            type="number" 
                            min="1" 
                            defaultValue="1" 
                            id={`qty-sidebar-${product.id}`}
                            style={{ width: 50, padding: 4, border: '1px solid #ddd', borderRadius: 4, textAlign: 'center', fontSize: '12px' }}
                          />
                        </td>
                        <td style={{ padding: '10px', textAlign: 'center' }}>
                          <button 
                            onClick={() => addToCart(product)}
                            disabled={addingToCart === product.id}
                            style={{ 
                              padding: '5px 10px', 
                              background: addingToCart === product.id ? '#ccc' : '#e31e24', 
                              color: 'white', 
                              border: 'none', 
                              borderRadius: 4, 
                              cursor: addingToCart === product.id ? 'not-allowed' : 'pointer',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}
                          >
                            {addingToCart === product.id ? '...' : '🛒'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ textAlign: 'center', padding: '20px', color: '#666', fontSize: '14px' }}>
                No products found
              </p>
            )}
          </div>
        )}
      </section>

      {/* CONTENT */}
      <div className="content">

        {/* CATEGORIES */}
        <section className="section">
          <h2 className="section-title">Popular Categories</h2>
          <div className="cat-row">
            {categories.map((c) => (
              <div 
                key={c.id} 
                className="cat-card"
                onClick={() => handleCategoryClick(c.id)}
                style={{ cursor: 'pointer' }}
              >
                <span className="icon">{c.icon || "📦"}</span>
                <div className="label" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                  <span style={{ fontWeight: 700 }}>{c.name || ""}</span>
                  <span style={{ color: '#b30000', fontSize: '0.95em' }}>{c.nameKannada || c.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ADS (RIGHT → LEFT) */}
        <div className="ads-viewport">
          <div className="ads-track">
            {adsLoop.map((ad, i) => (
              <a
                key={i}
                href={ad.link}
                className="ad-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src={ad.image || '/placeholder.svg'} 
                  alt={ad.title || 'Ad'} 
                  onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
                />
                <p className="ad-title">{ad.title}</p>
              </a>
            ))}
          </div>
        </div>

        {/* DISCOVER (AUTO-WIDTH LEFT → RIGHT) */}
        <section className="section">
          <h2 className="section-title">Discover RR Nagar</h2>

          <div className="discover-viewport">
            <div
              className="discover-track"
              ref={discoverRef}
              style={{ "--scroll-width": `${scrollWidth}px` }}
            >
              {/* FIRST SET */}
              {discover.map((d, i) => (
                <div className="discover-item" key={i}>
                  <ExploreItem {...d} />
                </div>
              ))}

              {/* DUPLICATE SET */}
              {discover.map((d, i) => (
                <div className="discover-item" key={`dup-${i}`}>
                  <ExploreItem {...d} />
                </div>
              ))}
            </div>
          </div>

        </section>

      </div>
    </main>
  );
}
