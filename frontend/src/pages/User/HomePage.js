import React, { useEffect } from "react";
import Header from "../../components/header.js";
import Footer from "../../components/footer.js";
import "../../styles/style.css"; // your homepage CSS

const HomePage = () => {

  // Update cart count on load
  useEffect(() => {
    updateCartCount();
  }, []);

  // ==== CART COUNT ====
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countEl = document.querySelector(".cart-count");

    if (countEl) {
      // quantity-based count
      const totalQty = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      countEl.textContent = totalQty;
    }
  };

  return (
    <>
      <Header />

      {/* ===== Banner ===== */}
      <section className="banner-section">
        <img src="/jewelry/banner.png" alt="Aurevra Banner" className="banner-img" />
        <a href="/shop" className="btn shop-now-btn">Shop Now</a>
      </section>

      {/* ================= BEST SELLER ================= */}
      <section className="shop-section" style={{ paddingTop: "100px" }}>
        <div className="container text-center">
          <div className="row justify-content-center g-4">
            <section className="daily-discovery">
              <h2><span>Best Seller</span></h2>
            </section>

            {/* === Sample Product Card === */}
            <div className="col-6 col-md-3">
              <div className="product-card">
                <img src="/jewelry/weddingring2.jpg" alt="Wedding Ring" />
                <div className="card-body">
                  <h5><a href="#">Elegant White Gold/Silver Intertwined Couple Ring Set</a></h5>
                  <p>₱23,500</p>
                  <button className="buy-btn">Add to Cart</button>
                </div>
              </div>
            </div>

            {/* ADD YOUR OTHER PRODUCTS HERE (same structure) */}

          </div>
        </div>
      </section>

      {/* ================= DAILY DISCOVERY ================= */}
      <section className="shop-section" style={{ paddingTop: "100px" }}>
        <div className="container text-center">
          <div className="row justify-content-center g-4">
            <section className="daily-discovery">
              <h2>Daily Discovery</h2>
            </section>

            {/* Example Card */}
            <div className="col-6 col-md-3">
              <div className="product-card">
                <img src="/jewelry/fashionring1.jpg" alt="Fashion Ring" />
                <div className="card-body">
                  <h5><a href="#">Custom Mokume-Gane Tension-Set Ring</a></h5>
                  <p>₱2,499</p>
                  <button className="buy-btn">Add to Cart</button>
                </div>
              </div>
            </div>

            {/* ADD MORE PRODUCTS SAME WAY */}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HomePage;
