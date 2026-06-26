import React, { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [editId, setEditId] = useState(null);

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "React Best Practices",
      author: "John Smith",
      status: "Published",
      date: "20 Jun 2026",
      content:
        "Learn modern React development techniques including hooks, reusable components, and performance optimization."
    },
    {
      id: 2,
      title: "JavaScript ES2026 Guide",
      author: "David",
      status: "Draft",
      date: "18 Jun 2026",
      content:
        "Explore the latest JavaScript features and improve your coding productivity."
    },
    {
      id: 3,
      title: "Frontend Developer Roadmap",
      author: "Sarah",
      status: "Published",
      date: "15 Jun 2026",
      content:
        "A complete roadmap for becoming a successful frontend developer."
    },
    {
      id: 4,
      title: "UI Design Principles",
      author: "Alex",
      status: "Draft",
      date: "10 Jun 2026",
      content:
        "Learn important UI design principles for creating attractive applications."
    },
    {
      id: 5,
      title: "State Management in React",
      author: "Emma",
      status: "Published",
      date: "08 Jun 2026",
      content:
        "Understand Context API, Redux, and modern state management techniques."
    }
  ]);

  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    status: "Draft"
  });

  const totalPosts = posts.length;
  const draftPosts = posts.filter(
    (p) => p.status === "Draft"
  ).length;
  const publishedPosts = posts.filter(
    (p) => p.status === "Published"
  ).length;

  const createPost = () => {
    if (
      !form.title ||
      !form.author ||
      !form.content
    ) {
      alert("Please fill all fields");
      return;
    }

    const newPost = {
      id: Date.now(),
      ...form,
      date: new Date().toLocaleDateString()
    };

    setPosts([newPost, ...posts]);

    setForm({
      title: "",
      author: "",
      content: "",
      status: "Draft"
    });

    alert("Blog Created Successfully");
  };

  const editPost = (post) => {
    setEditId(post.id);
    setForm(post);
    setPage("create");
  };

  const updatePost = () => {
    setPosts(
      posts.map((post) =>
        post.id === editId
          ? { ...form, id: editId }
          : post
      )
    );

    setEditId(null);

    setForm({
      title: "",
      author: "",
      content: "",
      status: "Draft"
    });

    alert("Blog Updated Successfully");
  };

  const deletePost = (id) => {
    setPosts(
      posts.filter((post) => post.id !== id)
    );
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      post.author
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const styles = {
    page: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg,#0f172a,#1e293b,#2563eb,#38bdf8)",
      color: "white",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    },

    nav: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      alignItems: "center",
      marginBottom: "20px"
    },

    btn: {
      padding: "10px 18px",
      border: "none",
      borderRadius: "8px",
      background: "#2563eb",
      color: "white",
      cursor: "pointer",
      margin: "5px"
    },

    card: {
      background: "rgba(255,255,255,0.12)",
      backdropFilter: "blur(10px)",
      padding: "20px",
      borderRadius: "15px",
      marginBottom: "15px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.3)"
    },

    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "10px",
      borderRadius: "8px",
      border: "none"
    }
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <div style={styles.nav}>
        <h2>📝 Content Creator Blog Manager</h2>

        <div>
          <button
            style={styles.btn}
            onClick={() => setPage("home")}
          >
            Home
          </button>

          <button
            style={styles.btn}
            onClick={() => setPage("create")}
          >
            Create Blog
          </button>

          <button
            style={styles.btn}
            onClick={() => setPage("posts")}
          >
            All Posts
          </button>
        </div>
      </div>

      {/* Home Page */}
      {page === "home" && (
        <>
          <div style={styles.card}>
            <h1>Welcome Blogger 👋</h1>
            <p>
              Manage your blog drafts and
              published articles professionally.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "15px"
            }}
          >
            <div style={styles.card}>
              <h2>{totalPosts}</h2>
              <p>Total Posts</p>
            </div>

            <div style={styles.card}>
              <h2>{draftPosts}</h2>
              <p>Draft Posts</p>
            </div>

            <div style={styles.card}>
              <h2>{publishedPosts}</h2>
              <p>Published Posts</p>
            </div>
          </div>

          <div style={styles.card}>
            <h2>Features</h2>
            <ul>
              <li>Create Blog Posts</li>
              <li>Edit Existing Posts</li>
              <li>Delete Posts</li>
              <li>Draft & Published Status</li>
              <li>Search Blog Posts</li>
              <li>View Full Blog Details</li>
            </ul>
          </div>
        </>
      )}

      {/* Create Blog Page */}
      {page === "create" && (
        <div style={styles.card}>
          <h2>
            {editId
              ? "Edit Blog Post"
              : "Create Blog Post"}
          </h2>

          <input
            style={styles.input}
            placeholder="Blog Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value
              })
            }
          />

          <input
            style={styles.input}
            placeholder="Author Name"
            value={form.author}
            onChange={(e) =>
              setForm({
                ...form,
                author: e.target.value
              })
            }
          />

          <textarea
            rows="8"
            style={styles.input}
            placeholder="Write your blog content..."
            value={form.content}
            onChange={(e) =>
              setForm({
                ...form,
                content: e.target.value
              })
            }
          />

          <select
            style={styles.input}
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value
              })
            }
          >
            <option>Draft</option>
            <option>Published</option>
          </select>

          <button
            style={styles.btn}
            onClick={
              editId
                ? updatePost
                : createPost
            }
          >
            {editId
              ? "Update Post"
              : "Create Post"}
          </button>
        </div>
      )}

      {/* All Posts Page */}
      {page === "posts" && (
        <>
          <div style={styles.card}>
            <input
              style={styles.input}
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          {filteredPosts.map((post) => (
            <div
              key={post.id}
              style={styles.card}
            >
              <h2>{post.title}</h2>

              <p>
                ✍️ {post.author}
              </p>

              <p>
                📅 {post.date}
              </p>

              <p>
                Status:
                <span
                  style={{
                    color:
                      post.status ===
                      "Published"
                        ? "lightgreen"
                        : "orange"
                  }}
                >
                  {" "}
                  {post.status}
                </span>
              </p>

              <button
                style={styles.btn}
                onClick={() =>
                  setSelectedPost(post)
                }
              >
                View
              </button>

              <button
                style={styles.btn}
                onClick={() =>
                  editPost(post)
                }
              >
                Edit
              </button>

              <button
                style={styles.btn}
                onClick={() =>
                  deletePost(post.id)
                }
              >
                Delete
              </button>
            </div>
          ))}
        </>
      )}

      {/* Blog Details Modal */}
      {selectedPost && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px"
          }}
        >
          <div
            style={{
              background: "white",
              color: "black",
              padding: "25px",
              borderRadius: "15px",
              maxWidth: "700px",
              width: "100%"
            }}
          >
            <h1>{selectedPost.title}</h1>

            <p>
              <b>Author:</b>{" "}
              {selectedPost.author}
            </p>

            <p>
              <b>Date:</b>{" "}
              {selectedPost.date}
            </p>

            <p>
              <b>Status:</b>{" "}
              {selectedPost.status}
            </p>

            <hr />

            <p
              style={{
                lineHeight: "1.8"
              }}
            >
              {selectedPost.content}
            </p>

            <button
              style={styles.btn}
              onClick={() =>
                setSelectedPost(null)
              }
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          marginTop: "40px",
          padding: "20px"
        }}
      >
        <hr />
        <p>
          © 2026 Content Creator Blog Manager |
          React Single File Project
        </p>
      </footer>
    </div>
  );
}
