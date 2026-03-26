import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const cartCount = getCartCount();

  // Import medicines data for search
  useEffect(() => {
    const loadMedicines = async () => {
      const medicinesData = await import('../data/medicines.json');
      return medicinesData.default;
    };

    loadMedicines().then((medicines) => {
      if (searchQuery.trim()) {
        const filtered = medicines
          .filter(
            (med) =>
              med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              med.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
              med.category.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 5);
        setSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    });
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/medicines?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
      setSearchQuery('');
    }
  };

  const handleSuggestionClick = (medicineId) => {
    navigate(`/medicine/${medicineId}`);
    setShowSuggestions(false);
    setSearchQuery('');
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <div className="trust-badge">
              <span>✅ Licensed Pharmacy</span>
              <span>🛡️ 100% Genuine Medicines</span>
            </div>
            <div className="header-contact">
              <span>📞 Helpline: 9994360660</span>
            </div>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <h1>
                Star MediCare
                <span className="green-star-logo"></span>
              </h1>
            </Link>

            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search medicines, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                className="search-input"
                aria-label="Search medicines"
              />
              <button type="submit" className="search-btn" aria-label="Search">
                🔍
              </button>
              {showSuggestions && suggestions.length > 0 && (
                <div className="search-suggestions">
                  {suggestions.map((med) => (
                    <div
                      key={med.id}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(med.id)}
                    >
                      <img src={med.image} alt={med.name} />
                      <div>
                        <div className="suggestion-name">{med.name}</div>
                        <div className="suggestion-brand">{med.brand}</div>
                        <div className="suggestion-price">₹{med.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </form>

            <div className="header-actions">
              {user ? (
                <>
                  <Link to={isAdmin ? '/admin' : '/account'} className="header-link">
                    👤 {user.name || user.email}
                  </Link>
                  <button onClick={logout} className="header-link btn-link">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    Sign Up
                  </Link>
                </>
              )}

              <Link to="/cart" className="cart-link">
                🛒 Cart
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>

              <button
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                ☰
              </button>
            </div>
          </div>

          <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
            <Link to="/medicines">All Medicines</Link>
            <Link to="/medicines?category=Pain Relief">Pain Relief</Link>
            <Link to="/medicines?category=Diabetes Care">Diabetes Care</Link>
            <Link to="/medicines?category=Vitamins%20%26%20Supplements">Vitamins</Link>
            <Link to="/medicines?category=Medical%20Devices">Medical Devices</Link>
            <Link to="/medicines?category=Cold%20%26%20Cough">Cold & Allergy medicines</Link>
            <Link to="/medicines?category=Skin%20Care%20Medicines">Skin Care</Link>
            <Link to="/medicines?category=Digestive%20Health">Digestive Health</Link>
            <Link to="/medicines?category=Heart%20%26%20BP%20Medicines">Blood pressure medicines</Link>
            <Link to="/medicines?category=Antiseptics">Antiseptics</Link>
            <Link to="/offers">Offers</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;


