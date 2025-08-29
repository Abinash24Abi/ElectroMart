import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Button, Table, Card, Spinner, Alert, Modal ,Row,Col} from "react-bootstrap";
import { FiEdit, FiTrash2, FiUpload, FiPlus, FiX } from "react-icons/fi";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ 
    name: "", 
    brand: "", 
    category: "", 
    price: "", 
    discount: 0, 
    stock: 0 
  });
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchProducts(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("brand", form.brand);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("discount", form.discount);
      formData.append("stock", form.stock);
      if (file) formData.append("image", file);

      if (editId) {
        await axios.put(
          `http://localhost:5000/api/products/${editId}`, 
          formData, 
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/products", 
          formData, 
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ name: "", brand: "", category: "", price: "", discount: 0, stock: 0 });
    setFile(null);
    setImagePreview(null);
    setEditId(null);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      discount: product.discount,
      stock: product.stock
    });
    setEditId(product._id);
    if (product.imageUrl) {
      setImagePreview(`http://localhost:5000${product.imageUrl}`);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/products/${productToDelete._id}`);
      fetchProducts();
      setShowDeleteModal(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">
        {editId ? "✏️ Edit Product" : "➕ Add New Product"}
      </h2>

      {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

      <Card className="mb-5 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Form.Group as={Col} md={6}>
                <Form.Label>Product Name</Form.Label>
                <Form.Control 
                  type="text" 
                  value={form.name} 
                  onChange={e => setForm({...form, name: e.target.value})} 
                  required 
                />
              </Form.Group>

              <Form.Group as={Col} md={6}>
                <Form.Label>Brand</Form.Label>
                <Form.Control 
                  type="text" 
                  value={form.brand} 
                  onChange={e => setForm({...form, brand: e.target.value})} 
                  required 
                />
              </Form.Group>

              <Form.Group as={Col} md={6}>
                <Form.Label>Category</Form.Label>
                <Form.Control 
                  type="text" 
                  value={form.category} 
                  onChange={e => setForm({...form, category: e.target.value})} 
                  required 
                />
              </Form.Group>

              <Form.Group as={Col} md={2}>
                <Form.Label>Price ($)</Form.Label>
                <Form.Control 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  value={form.price} 
                  onChange={e => setForm({...form, price: e.target.value})} 
                  required 
                />
              </Form.Group>

              <Form.Group as={Col} md={2}>
                <Form.Label>Discount (%)</Form.Label>
                <Form.Control 
                  type="number" 
                  min="0" 
                  max="100" 
                  value={form.discount} 
                  onChange={e => setForm({...form, discount: e.target.value})} 
                />
              </Form.Group>

              <Form.Group as={Col} md={2}>
                <Form.Label>Stock</Form.Label>
                <Form.Control 
                  type="number" 
                  min="0" 
                  value={form.stock} 
                  onChange={e => setForm({...form, stock: e.target.value})} 
                />
              </Form.Group>

              <Form.Group as={Col} md={12}>
                <Form.Label>Product Image</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="me-3"
                  />
                  {imagePreview && (
                    <div className="position-relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
                        className="rounded border"
                      />
                      <Button 
                        variant="danger" 
                        size="sm" 
                        className="position-absolute top-0 end-0 translate-middle rounded-circle p-0"
                        style={{ width: '20px', height: '20px' }}
                        onClick={() => {
                          setFile(null);
                          setImagePreview(null);
                        }}
                      >
                        <FiX size={12} />
                      </Button>
                    </div>
                  )}
                </div>
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                {editId && (
                  <Button variant="outline-secondary" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
                <Button variant={editId ? "warning" : "success"} type="submit" disabled={loading}>
                  {loading ? (
                    <Spinner as="span" size="sm" animation="border" />
                  ) : editId ? (
                    <>
                      <FiEdit className="me-1" /> Update Product
                    </>
                  ) : (
                    <>
                      <FiPlus className="me-1" /> Add Product
                    </>
                  )}
                </Button>
              </div>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">📦 Product List</h4>
            <span className="text-muted">{products.length} products</span>
          </div>

          {loading && !products.length ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead className="table-dark">
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <td>
                        {product.imageUrl && (
                          <img 
                            src={`http://localhost:5000${product.imageUrl}`} 
                            alt={product.name} 
                            style={{ width: '50px', height: '50px', objectFit: 'contain' }} 
                            className="rounded"
                          />
                        )}
                      </td>
                      <td>{product.name}</td>
                      <td>{product.brand}</td>
                      <td>{product.category}</td>
                      <td>${product.price}</td>
                      <td>{product.discount}%</td>
                      <td className={product.stock <= 0 ? "text-danger" : ""}>
                        {product.stock}
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button 
                            variant="outline-warning" 
                            size="sm" 
                            onClick={() => handleEdit(product)}
                          >
                            <FiEdit />
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm" 
                            onClick={() => confirmDelete(product)}
                          >
                            <FiTrash2 />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{productToDelete?.name}</strong>? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading ? <Spinner as="span" size="sm" animation="border" /> : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminProducts;