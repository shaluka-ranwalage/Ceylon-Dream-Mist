"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  variant: string;
  sku: string;
  description: string;
  category: string;
  price: number;
  brand: string;
  volume: string;
  size: string;
  material: string;
  keyNotes: string;
  origin: string;
  imageUrl: string;
  galleryUrls: string[];
  availableQty: number;
};

type CustomerReview = {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
};

const demoProduct: Product = {
  id: "ceylon-dream-mist-sleep-intense",
  name: "Ceylon Dream Mist",
  variant: "Sleep Intense",
  sku: "CDM-SI-100",
  description:
    "An intense pacifying & cooling blend of powerful Ayurveda WonderHerbs & potent essential oils to promote dreamy restful sleep.",
  category: "Sleep & Wellness Mist",
  price: 5900,
  brand: "Ceylon",
  volume: "100 ml",
  size: "Travel-friendly spray bottle",
  material: "Ayurvedic herb blend with essential oils",
  keyNotes: "Lavender, Neroli, Ylang Ylang, Orange",
  origin: "Sri Lanka",
  imageUrl: "/resources/file_00000000ff1071fdb42e0a21068c6a49.png",
  galleryUrls: [
    "/resources/ceylon_dream_mist_gallery_1.png",
    "/resources/ceylon_dream_mist_gallery_2.png",
    "/resources/ceylon_dream_mist_gallery_3.png"
  ],
  availableQty: 48
};

const sriLankanReviews: CustomerReview[] = [
  {
    id: "review-kandy",
    name: "Nimali Perera",
    location: "Kandy",
    rating: 5,
    date: "12 Jan 2026",
    comment:
      "This mist has become part of my bedtime routine. The lavender note is very soothing and I fall asleep much faster now."
  },
  {
    id: "review-colombo",
    name: "Kasun Fernando",
    location: "Colombo",
    rating: 5,
    date: "04 Feb 2026",
    comment:
      "I spray it on my pillow and room linen every night. The scent is calming without being too strong, and it feels premium."
  },
  {
    id: "review-galle",
    name: "Sanduni Jayawardena",
    location: "Galle",
    rating: 4,
    date: "28 Dec 2025",
    comment:
      "Very relaxing fragrance blend. Neroli and ylang ylang stand out nicely. Delivery was fast and packaging was excellent."
  },
  {
    id: "review-jaffna",
    name: "Tharindu Rajan",
    location: "Jaffna",
    rating: 5,
    date: "19 Jan 2026",
    comment:
      "One of the best sleep mists I have tried in Sri Lanka. It helps me unwind after work and the bottle lasts long."
  }
];

function formatLKR(amount: number) {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0
  }).format(amount);
}

function ProductGallery({ name, images }: { name: string; images: string[] }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <section className="pd-gallery">
      <div className="pd-gallery-main">
        <Image src={activeImage} alt={name} fill priority sizes="(max-width: 1024px) 100vw, 55vw" />
      </div>

      <div className="pd-gallery-row">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`pd-thumb ${activeImage === image ? "is-active" : ""}`}
            aria-label={`Select image for ${name}`}
          >
            <Image src={image} alt={`${name} thumbnail`} fill sizes="(max-width: 700px) 33vw, 170px" />
          </button>
        ))}
      </div>
    </section>
  );
}

export function ProductPage() {
  const product = demoProduct;
  const inStock = product.availableQty > 0;
  const maxQty = Math.max(1, product.availableQty || 1);

  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "shipping" | "safety">("details");
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const images = useMemo(() => [product.imageUrl, ...product.galleryUrls], [product.galleryUrls, product.imageUrl]);
  const averageRating = useMemo(
    () =>
      sriLankanReviews.reduce((sum, review) => sum + review.rating, 0) /
      sriLankanReviews.length,
    []
  );
  const activeReview = sriLankanReviews[activeReviewIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReviewIndex((current) => (current + 1) % sriLankanReviews.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  function dec() {
    setQty((current) => Math.max(1, current - 1));
  }

  function inc() {
    setQty((current) => Math.min(maxQty, current + 1));
  }

  function addToCart() {
    window.alert("Added to cart");
  }

  function buyNow() {
    window.alert("Proceeding to checkout");
  }

  function showNextReview() {
    setActiveReviewIndex((current) => (current + 1) % sriLankanReviews.length);
  }

  function showPreviousReview() {
    setActiveReviewIndex((current) =>
      current === 0 ? sriLankanReviews.length - 1 : current - 1
    );
  }

  return (
    <main className="pd-page">
      <header className="pd-site-header">
        <div className="pd-shell pd-site-header-inner">
          <Link href="/" className="pd-brand" aria-label="Ceylon Dream Mist home">
            <span className="pd-brand-text">Ceylon Dream Mist</span>
          </Link>

          <nav className="pd-site-nav" aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <a href="#reviews">Reviews</a>
            <a href="#support">Contact</a>
          </nav>
        </div>
      </header>

      <div className="pd-shell">
        <div className="pd-breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/products">Products</Link>
          <span>/</span>
          <span className="current">{product.name}</span>
        </div>

        <div className="pd-grid">
          <div className="pd-left">
            <ProductGallery images={images} name={product.name} />
          </div>

          <div className="pd-right">
            <section className="pd-card pd-fade-in">
              <div className="pd-header-row">
                <div>
                  <p className="pd-category">{product.category}</p>
                  <h1>{product.name}</h1>
                  <p className="pd-variant">{product.variant}</p>
                  <p className="pd-sku">
                    SKU: <span>{product.sku}</span>
                  </p>
                </div>

                <div className={`pd-stock ${inStock ? "in-stock" : "out-stock"}`}>
                  {inStock ? `In Stock (${product.availableQty})` : "Out of Stock"}
                </div>
              </div>

              <div className="pd-price-row">
                <div>
                  <p className="label">Price</p>
                  <p className="value">{formatLKR(product.price)}</p>
                </div>
                <div className="pd-total">
                  <p className="label">Total</p>
                  <p className="value">{formatLKR(product.price * qty)}</p>
                </div>
              </div>

              <div className="pd-actions-grid">
                <div className="pd-qty-col">
                  <p className="label">Quantity</p>
                  <div className="pd-qty-box">
                    <button type="button" onClick={dec} aria-label="Decrease quantity">
                      -
                    </button>
                    <span>{qty}</span>
                    <button type="button" onClick={inc} aria-label="Increase quantity">
                      +
                    </button>
                  </div>
                  <p className="pd-max">Max: {product.availableQty}</p>
                </div>

                <div className="pd-btn-col">
                  <button type="button" className="pd-btn solid" onClick={addToCart} disabled={!inStock}>
                    Add to cart
                  </button>
                  <button type="button" className="pd-btn ghost" onClick={buyNow}>
                    Buy now
                  </button>
                  <button
                    type="button"
                    className="pd-btn subtle"
                    onClick={() => setWishlisted((state) => !state)}
                  >
                    {wishlisted ? "Saved to wishlist" : "Save to wishlist"}
                  </button>
                </div>
              </div>

              <div className="pd-description">
                <h2>Description</h2>
                <p>{product.description}</p>
              </div>

              <div className="pd-tags">
                <span>Ayurveda Powered</span>
                <span>Pillow & Linen Safe</span>
                <span>Night Ritual Essential</span>
              </div>
            </section>

            <section className="pd-card">
              <div className="pd-tabs" aria-label="Product info tabs">
                <button
                  type="button"
                  className={activeTab === "details" ? "is-active" : ""}
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </button>
                <button
                  type="button"
                  className={activeTab === "shipping" ? "is-active" : ""}
                  onClick={() => setActiveTab("shipping")}
                >
                  Shipping
                </button>
                <button
                  type="button"
                  className={activeTab === "safety" ? "is-active" : ""}
                  onClick={() => setActiveTab("safety")}
                >
                  Safety
                </button>
              </div>

              <div className="pd-tab-panel">
                {activeTab === "details" && (
                  <>
                    <ul>
                      <li>Brand: {product.brand}</li>
                      <li>Category: {product.category}</li>
                      <li>Variant: {product.variant}</li>
                      <li>Volume: {product.volume}</li>
                      <li>Size: {product.size}</li>
                      <li>Key Notes: {product.keyNotes}</li>
                      <li>Base: {product.material}</li>
                      <li>Origin: {product.origin}</li>
                      <li>SKU: {product.sku}</li>
                    </ul>

                    <p>
                      An intense pacifying and cooling blend of powerful Ayurveda herbs and potent
                      essential oils to promote dreamy restful sleep. Comforting and grounding
                      Neroli Blossom helps take away daily stress and gently unwind, while exotic
                      Ylang Ylang calms and clarifies mind and body. The finest oriental Lavender
                      helps soothe the senses, promoting tranquil calm and restful sleep. Zesty
                      Orange helps balance the chakras. Fresh Organic Aloe Vera helps tone and
                      hydrate skin while natural Witch Hazel helps cool and comfort, improving
                      overall skin health.
                    </p>

                    <p>
                      <strong>How to Use</strong>
                    </p>
                    <p>
                      Spray on lightly, all over body, pillows and bed linen. Leave on. Relax and
                      unwind. For optimum results, use after bath and at bedtime.
                    </p>

                    <p>
                      <strong>Ayurveda Wonderherbs</strong>
                    </p>
                    <ul>
                      <li>
                        Lavender - Comforts and calms the skin and helps lighten the skin while
                        reducing wrinkles.
                      </li>
                      <li>
                        Neroli - Rich in regenerative qualities and antiseptic properties. Soothes
                        and treats acne and redness associated with breakouts.
                      </li>
                      <li>
                        Ylang Ylang - Rich in antiseptic properties. Intensely moisturizes and
                        rejuvenates the skin.
                      </li>
                    </ul>
                  </>
                )}

                {activeTab === "shipping" && (
                  <ul>
                    <li>Islandwide delivery within 2-4 business days</li>
                    <li>Same-day dispatch for orders before 2 PM</li>
                    <li>Secure, leak-protected packaging for bottle and carton</li>
                    <li>Cash on delivery and online payment options available</li>
                  </ul>
                )}

                {activeTab === "safety" && (
                  <ul>
                    <li>For external use only. Avoid contact with eyes.</li>
                    <li>Store in a cool, dry place away from direct sunlight.</li>
                    <li>Patch test on a small skin area before first use.</li>
                  </ul>
                )}
              </div>
            </section>
          </div>
        </div>

        <section id="reviews" className="pd-reviews">
          <div className="pd-reviews-head">
            <h2>Customer Reviews</h2>
            <p>Trusted by customers across the island</p>
          </div>

          <div className="pd-reviews-grid">
            <article className="pd-review-summary">
              <p className="pd-review-score">{averageRating.toFixed(1)}</p>
              <p className="pd-review-score-base">/ 5.0</p>
              <p className="pd-review-stars-line">★★★★★</p>
              <p className="pd-review-count">{sriLankanReviews.length} verified reviews</p>
            </article>

            <article className="pd-review-slider">
              <div key={activeReview.id} className="pd-review-slide">
                <p className="pd-review-stars">
                  {"★".repeat(activeReview.rating)}
                  {"☆".repeat(5 - activeReview.rating)}
                </p>
                <p className="pd-review-text">“{activeReview.comment}”</p>

                <div className="pd-review-meta">
                  <div>
                    <p className="pd-review-name">{activeReview.name}</p>
                    <p className="pd-review-location">{activeReview.location}, Sri Lanka</p>
                  </div>
                  <time>{activeReview.date}</time>
                </div>
              </div>

              <div className="pd-review-controls">
                <button type="button" onClick={showPreviousReview} aria-label="Previous review">
                  Previous
                </button>
                <button type="button" onClick={showNextReview} aria-label="Next review">
                  Next
                </button>
              </div>

              <div className="pd-review-dots">
                {sriLankanReviews.map((review, index) => (
                  <button
                    key={review.id}
                    type="button"
                    aria-label={`Show review ${index + 1}`}
                    className={index === activeReviewIndex ? "is-active" : ""}
                    onClick={() => setActiveReviewIndex(index)}
                  />
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>

      <footer id="support" className="pd-site-footer">
        <div className="pd-shell">
          <section className="pd-footer-cta">
            <h2>Ready for deeper, calmer sleep?</h2>
            <p>
              Discover how Ceylon Dream Mist Sleep Intense helps you unwind, relax your senses, and
              create a soothing nightly ritual.
            </p>
            <button type="button">Contact Us</button>
          </section>

          <section className="pd-footer-card">
            <div className="pd-footer-card-inner">
              <div className="pd-footer-main">
                <div className="pd-footer-brand-col">
                  <div className="pd-footer-brand">
                    <span className="pd-footer-brand-mark">C</span>
                    <span>Ceylon Dream Mist</span>
                  </div>
                  <p className="pd-footer-text">
                    Ceylon Dream Mist helps transform daily stress into deep calm, supporting
                    restful nights with an Ayurveda-inspired botanical blend.
                  </p>

                  <div className="pd-footer-social" aria-label="Social media links">
                    <a href="#" aria-label="X">
                      X
                    </a>
                    <a href="#" aria-label="Instagram">
                      IG
                    </a>
                    <a href="#" aria-label="LinkedIn">
                      in
                    </a>
                    <a href="#" aria-label="GitHub">
                      GH
                    </a>
                  </div>
                </div>

                <div className="pd-footer-link-grid">
                  <div className="pd-footer-link-col">
                    <p className="pd-footer-title">Product</p>
                    <div className="pd-footer-links">
                      <Link href="/">Features</Link>
                      <a href="#">Pricing</a>
                      <a href="#">Integrations</a>
                      <a href="#">Changelog</a>
                    </div>
                  </div>

                  <div className="pd-footer-link-col">
                    <p className="pd-footer-title">Resources</p>
                    <div className="pd-footer-links">
                      <a href="#">Documentation</a>
                      <a href="#">Tutorials</a>
                      <a href="#">Blog</a>
                      <a href="#">Support</a>
                    </div>
                  </div>

                  <div className="pd-footer-link-col">
                    <p className="pd-footer-title">Company</p>
                    <div className="pd-footer-links">
                      <a href="#">About</a>
                      <a href="#">Careers</a>
                      <a href="#">Contact</a>
                      <a href="#">Partners</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pd-footer-rule" />

              <div className="pd-footer-bottom">
                <p>© {new Date().getFullYear()} Ceylon Dream Mist. All rights reserved.</p>
                <div className="pd-footer-legal-links">
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms of Service</a>
                  <a href="#">Cookies Settings</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </footer>
    </main>
  );
}
