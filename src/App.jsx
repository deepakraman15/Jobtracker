
import { useMemo, useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 1499, emoji: "🎧", color: "#fff0d9" },
  { id: 2, name: "Smart Watch", category: "Electronics", price: 2199, emoji: "⌚", color: "#e7e9ff" },
  { id: 3, name: "Running Shoes", category: "Fashion", price: 1899, emoji: "👟", color: "#e0f5e9" },
  { id: 4, name: "Classic Backpack", category: "Accessories", price: 999, emoji: "🎒", color: "#fce4e4" },
  { id: 5, name: "Sunglasses", category: "Accessories", price: 599, emoji: "🕶️", color: "#fff1c9" },
  { id: 6, name: "Cotton T-Shirt", category: "Fashion", price: 499, emoji: "👕", color: "#e1f2ff" },
  { id: 7, name: "Gaming Controller", category: "Electronics", price: 1799, emoji: "🎮", color: "#f0e3ff" },
  { id: 8, name: "Sports Ball", category: "Sports", price: 699, emoji: "🏀", color: "#ffe6d6" }
];

const categories = ["All", "Electronics", "Fashion", "Accessories", "Sports"];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const changeQuantity = (id, amount) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add a product first!");
      return;
    }

    alert(`Order demo successful! Total: ₹${total.toLocaleString("en-IN")}`);
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="shop">
      <header className="navbar">
        <a className="logo" href="#home">
          Shop<span>Zone.</span>
        </a>

        <div className="search-box">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setShowCart(false);
            }}
          />
        </div>

        <button
          className="cart-button"
          onClick={() => setShowCart(!showCart)}
        >
          🛒 Cart <span className="cart-count">{cartCount}</span>
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">YOUR EVERYDAY MARKETPLACE</span>
            <h1>
              Find your next
              <br />
              <span>favourite thing.</span>
            </h1>
            <p>
              Discover products you'll love at great prices.
              Simple shopping starts here.
            </p>
            <a className="hero-button" href="#products">
              Shop now <span>→</span>
            </a>
          </div>

          <div className="hero-art" aria-label="Shopping bags illustration">
            <div className="art-circle"></div>
            <div className="shopping-bag bag-one">S</div>
            <div className="shopping-bag bag-two">Z</div>
            <span className="float-star star-one">✦</span>
            <span className="float-star star-two">✧</span>
            <span className="art-caption">SHOP SMART.</span>
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <span className="eyebrow">OUR COLLECTION</span>
              <h2>Explore products</h2>
              <p>Find something special for every day.</p>
            </div>
            <span className="product-count">
              {filteredProducts.length} products
            </span>
          </div>

          <div className="categories">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "category active" : "category"}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {showCart ? (
            <section className="cart-panel">
              <div className="cart-heading">
                <h2>Your shopping cart</h2>
                <button
                  className="close-button"
                  onClick={() => setShowCart(false)}
                >
                  ✕ Close
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="empty-cart">
                  <span>🛍️</span>
                  <h3>Your cart is empty</h3>
                  <p>Add some products to get started.</p>
                  <button
                    className="primary-button"
                    onClick={() => setShowCart(false)}
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <>
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <div
                        className="cart-item-icon"
                        style={{ background: item.color }}
                      >
                        {item.emoji}
                      </div>
                      <div className="cart-item-info">
                        <strong>{item.name}</strong>
                        <span>₹{item.price.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="quantity-controls">
                        <button onClick={() => changeQuantity(item.id, -1)}>
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => changeQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="cart-total">
                    <span>Total</span>
                    <strong>₹{total.toLocaleString("en-IN")}</strong>
                  </div>
                  <button className="primary-button checkout-button" onClick={checkout}>
                    Place demo order →
                  </button>
                  <p className="demo-note">
                    Demo only — no real payment will be taken.
                  </p>
                </>
              )}
            </section>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-results">
              <span>🔎</span>
              <h3>No products found</h3>
              <p>Try another search or category.</p>
              <button
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Show all products
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div
                    className="product-image"
                    style={{ background: product.color }}
                  >
                    <span className="product-emoji">{product.emoji}</span>
                    <span className="product-tag">Popular</span>
                  </div>

                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <div className="product-bottom">
                      <strong>
                        ₹{product.price.toLocaleString("en-IN")}
                      </strong>
                      <button
                        className="add-button"
                        onClick={() => addToCart(product)}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <a className="logo" href="#home">
          Shop<span>Zone.</span>
        </a>
        <p>Good finds. Great prices. Happy shopping.</p>
        <span>© 2026 ShopZone — Demo website</span>
      </footer>
    </div>
  );
}

export default App;
