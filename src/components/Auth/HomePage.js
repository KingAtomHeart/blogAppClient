// import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Row, Col, Button, Card, Spinner, Alert } from 'react-bootstrap';
// import { AuthContext } from '../../context/AuthContext';
// import { BlogContext } from '../../context/BlogContext';

// const HomePage = () => {
//   const { user } = useContext(AuthContext);
//   const { blogs, getBlogs } = useContext(BlogContext);
//   const [loading, setLoading] = useState(true);
//   const [featuredPosts, setFeaturedPosts] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFeaturedPosts = async () => {
//       try {
//         await getBlogs();
//       } catch (err) {
//         setError('Failed to load blogs. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFeaturedPosts();
//   }, [getBlogs]);

//   useEffect(() => {
//     if (blogs.length > 0) {
//       const sortedBlogs = [...blogs].sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
//       setFeaturedPosts(sortedBlogs.slice(0, 3));
//     }
//   }, [blogs]);

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Card className="text-center mb-4 shadow">
//           <Card.Body>
//             <Card.Title className="display-4"><strong>Welcome to Blog App</strong></Card.Title>
//             <Card.Text className="lead">
//               Your go-to place for insightful articles and discussions.
//             </Card.Text>
//           </Card.Body>
//         </Card>

//         <Col xs={12} md={4} className="mb-3">
//           <Link to="/posts">
//             <Button variant="primary" className="w-100">View All Posts</Button>
//           </Link>
//         </Col>
//         {user ? (
//           <Col xs={12} md={4} className="mb-3">
//             <Link to="/posts/new">
//               <Button variant="success" className="w-100">Create New Post</Button>
//             </Link>
//           </Col>
//         ) : (
//           <>
//             <Col xs={12} md={4} className="mb-3">
//               <Link to="/login">
//                 <Button variant="success" className="w-100">Login</Button>
//               </Link>
//             </Col>
//             <Col xs={12} md={4} className="mb-3">
//               <Link to="/register">
//                 <Button variant="primary" className="w-100">Register</Button>
//               </Link>
//             </Col>
//           </>
//         )}
//         {user && (
//           <Col xs={12} md={4} className="mb-3">
//             <Link to="/my-posts">
//               <Button variant="primary" className="w-100">My Posts</Button>
//             </Link>
//           </Col>
//         )}
//       </Row>

//       {loading ? (
//         <div className="text-center mt-3">
//           <Spinner animation="border" />
//           <p></p>
//         </div>
//       ) : error ? (
//         <Alert variant="danger" className="mt-3">{error}</Alert>
//       ) : (
//         <Card className="mb-5 shadow">
//           <Card.Body>
//             <h1 className="text-center mt-4">Latest Posts</h1>
//             <Row className="justify-content-center g-4 mt-4">
//               {featuredPosts.map(post => (
//                 <Col key={post._id} xs={12} sm={6} md={4}>
//                   <Card className="h-100 shadow">
//                     <Card.Body className="d-flex flex-column">
//                       <Card.Title className="fw-bold text-center">{post.title}</Card.Title>
//                       <Card.Text className="text-muted text-center">{post.content.substring(0, 200)}...</Card.Text>
//                       <div className="mt-auto d-flex justify-content-between align-items-center">
//                         <Card.Text className="mb-0"><strong>Author:</strong> {post.author.username}</Card.Text>
//                         <Card.Text className="mb-0"><strong>Published:</strong> {new Date(post.dateCreated).toLocaleString()}</Card.Text>
//                       </div>
//                       <Link to={`/posts/${post._id}`} className="btn btn-primary mt-3">Read More</Link>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           </Card.Body>
//         </Card>
//       )}
//     </Container>
//   );
// };

// export default HomePage;


import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { BlogContext } from '../../context/BlogContext';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const { blogs, getBlogs } = useContext(BlogContext);
  const [loading, setLoading] = useState(true);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        await getBlogs();
      } catch (err) {
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedPosts();
  }, [getBlogs]);

  useEffect(() => {
    if (blogs.length > 0) {
      const sortedBlogs = [...blogs].sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
      setFeaturedPosts(sortedBlogs.slice(0, 3));
    }
  }, [blogs]);

  return (
    <Container fluid className="p-0">
      {/* Hero Section */}
      <div
        className="text-white text-center d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png)',
          height: '60vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: '3rem',
        }}
      >
        <div>
          <h1 className="display-3 fw-bold">Mind Bloggling</h1>
          <p className="lead">Share your ideas</p>
          <div className="mt-4">
            <Link to="/posts" className="btn btn-light btn-lg me-3">Explore Posts</Link>
            {user ? (
              <Link to="/posts/new" className="btn btn-success btn-lg">Create Post</Link>
            ) : (
              <Link to="/login" className="btn btn-primary btn-lg">Get Started</Link>
            )}
          </div>
        </div>
      </div>

      {/* Call-to-Action Buttons */}
      <Row className="justify-content-center mb-5">
        {user ? (
          <>
            <Col xs={12} sm={6} md={3} className="mb-3">
              <Link to="/posts/new" className="btn btn-success w-100">Create New Post</Link>
            </Col>
            <Col xs={12} sm={6} md={3} className="mb-3">
              <Link to="/my-posts" className="btn btn-outline-primary w-100">My Posts</Link>
            </Col>
          </>
        ) : (
          <>
            <Col xs={12} sm={6} md={3} className="mb-3">
              <Link to="/login" className="btn btn-primary w-100">Login</Link>
            </Col>
            <Col xs={12} sm={6} md={3} className="mb-3">
              <Link to="/register" className="btn btn-outline-primary w-100">Register</Link>
            </Col>
          </>
        )}
      </Row>

      {/* Loading / Error / Featured Posts */}
      <Container>
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="grow" variant="primary" />
            <p className="mt-2">Loading posts...</p>
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        ) : (
          <>
            <h2 className="text-center mb-4 fw-bold">Latest Posts</h2>
            <Row className="g-4">
              {featuredPosts.map(post => (
                <Col key={post._id} xs={12} sm={6} md={4}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="text-center fw-bold">{post.title}</Card.Title>
                      <Card.Text className="text-muted text-center">
                        {post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}
                      </Card.Text>
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between text-muted small">
                          <span>By: {post.author.username}</span>
                          <span>{new Date(post.dateCreated).toLocaleDateString()}</span>
                        </div>
                        <Link to={`/posts/${post._id}`} className="btn btn-outline-primary w-100 mt-3">
                          Read More
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </Container>
  );
};

export default HomePage;
