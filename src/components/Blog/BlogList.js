// import React, { useEffect, useContext, useState } from 'react';
// import { BlogContext } from '../../context/BlogContext';
// import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const BlogList = () => {
//   const { blogs, getBlogs } = useContext(BlogContext);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       await getBlogs();
//       setLoading(false);
//     };
//     fetchBlogs();
//   }, [getBlogs]);

// // temporary internal styling 

//   if (loading) return (
//     <div className="text-center mt-5">
//       <Spinner animation="border" />
//     </div>
//   );

//   const sortedBlogs = [...blogs].sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

//   return (
//     <Container className="mt-5">
//       <h1 className="text-center mb-4">Blog Posts</h1>
//       <Row className="justify-content-center g-4">
//         {sortedBlogs.length === 0 ? (
//           <Col xs={12} className="text-center">
//             <p>No blogs found.</p>
//           </Col>
//         ) : (
//           sortedBlogs.map(blog => (
//             <Col key={blog._id} xs={12} md={6} lg={4}>
//               <Card className="h-100 shadow">
//                 <Card.Body className="d-flex flex-column">
//                   <Card.Title className="fw-bold text-center">{blog.title}</Card.Title>
//                   <Card.Text className="text-muted text-center">{blog.content.substring(0, 200)}...</Card.Text>
//                   <div className="mt-auto d-flex justify-content-between align-items-center">
//                     <Card.Text className="mb-0"><strong>Author:</strong> {blog.author.username}</Card.Text>
//                     <Card.Text className="mb-0"><strong>Published:</strong> {new Date(blog.dateCreated).toLocaleString()}</Card.Text>
//                   </div>
//                   <Link to={`/posts/${blog._id}`} className="btn btn-primary mt-3">Read More</Link>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default BlogList;

import React, { useEffect, useContext, useState } from 'react';
import { BlogContext } from '../../context/BlogContext';
import { Container, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const { blogs, getBlogs } = useContext(BlogContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      await getBlogs();
      setLoading(false);
    };
    fetchBlogs();
  }, [getBlogs]);

  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

  return (
    <>
      {/* Hero Section */}
      <div
        className="text-white text-center d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png)',
          height: '50vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: '3rem',
        }}
      >
        <div>
          <h1 className="display-3 fw-bold">All Blog Posts</h1>
          <p className="lead">Explore our collection of blogposts.</p>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="grow" variant="primary" />
          <p className="mt-2">Loading posts...</p>
        </div>
      ) : (
        <Container>
          {/* Blog List */}
          <Row className="justify-content-center g-4">
            {sortedBlogs.length === 0 ? (
              // Empty State
              <Col xs={12} className="text-center mt-5">
                <Alert variant="light" className="py-5 shadow-sm">
                  <h3 className="text-muted">
                    <i className="bi bi-journal-x"></i> No blogs available
                  </h3>
                  <p>Be the first to create a new blog post!</p>
                </Alert>
              </Col>
            ) : (
              sortedBlogs.map(blog => (
                <Col key={blog._id} xs={12} sm={6} md={4}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="fw-bold text-center">{blog.title}</Card.Title>
                      <Card.Text className="text-muted text-center">
                        {blog.content.length > 100
                          ? `${blog.content.substring(0, 100)}...`
                          : blog.content}
                      </Card.Text>
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between text-muted small">
                          <span>By: {blog.author.username}</span>
                          <span>{new Date(blog.dateCreated).toLocaleDateString()}</span>
                        </div>
                        <Link
                          to={`/posts/${blog._id}`}
                          className="btn btn-outline-primary w-100 mt-3"
                        >
                          Read More
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Container>
      )}
    </>
  );
};

export default BlogList;
