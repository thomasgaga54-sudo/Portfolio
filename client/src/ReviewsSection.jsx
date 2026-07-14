import { useState, useEffect } from "react";

const STARS = [5, 4, 3, 2, 1];

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then(r => { if (!r.ok) throw new Error("Failed"); return r.json(); })
      .then(data => { setReviews(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        const newReview = await res.json();
        setReviews(prev => [newReview, ...prev]);
        setForm({ name: "", rating: 5, comment: "" });
        setStatus("success");
        setTimeout(() => setStatus(null), 4000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const avg = reviews.length
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <section id="reviews">
      <h2>Client Reviews</h2>

      <div className="reviews-meta">
        {avg && <span className="reviews-avg">⭐ {avg} / 5</span>}
        <span className="reviews-count">
          {reviews.length} review{reviews.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="reviews-layout">

        {/* ── Leave a Review form ── */}
        <form className="review-form" onSubmit={handleSubmit}>
          <h3>Leave a Review</h3>

          <input
            placeholder="Your Name"
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          {/* Star picker */}
          <div>
            <p className="star-label-text">Your Rating</p>
            <div className="star-picker">
              {STARS.map(n => (
                <label key={n} title={n + " star" + (n !== 1 ? "s" : "")}>
                  <input
                    type="radio"
                    name="rating"
                    value={n}
                    checked={form.rating === n}
                    onChange={() => setForm({ ...form, rating: n })}
                  />
                  ★
                </label>
              ))}
            </div>
          </div>

          <textarea
            placeholder="Share your experience with Ogaga's work..."
            required
            value={form.comment}
            onChange={e => setForm({ ...form, comment: e.target.value })}
          />

          <button
            type="submit"
            className="btn btn-primary"
            style={{ alignSelf: "flex-start" }}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Posting..." : "Post Review"}
          </button>

          {status === "success" && (
            <p className="success-msg">✓ Review posted! Thank you.</p>
          )}
          {status === "error" && (
            <p style={{ color: "#ff4d4d", fontSize: "0.88rem" }}>
              ✗ Could not post review. Please try again.
            </p>
          )}
        </form>

        {/* ── Reviews list ── */}
        <div className="reviews-list">
          {loading && (
            <div className="reviews-empty">
              <p className="empty-icon">⌛</p>
              <p>Loading reviews...</p>
            </div>
          )}

          {!loading && reviews.length === 0 && (
            <div className="reviews-empty">
              <p className="empty-icon">💬</p>
              <p>No reviews yet — be the first to leave one!</p>
            </div>
          )}

          {reviews.map((r, i) => (
            <div key={r._id || i} className="review-card">
              <div className="review-card-header">
                <div className="review-avatar">
                  {r.name.charAt(0).toUpperCase()}
                </div>
                <div className="review-card-meta">
                  <p className="review-name">{r.name}</p>
                  <div className="review-stars">
                    {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                  </div>
                </div>
                {r.createdAt && (
                  <span className="review-date">{formatDate(r.createdAt)}</span>
                )}
              </div>
              <p className="review-comment">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
