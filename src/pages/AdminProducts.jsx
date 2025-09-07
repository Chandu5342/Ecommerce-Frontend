import React, { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";
import { Modal, Button, Form, Card, Badge } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const [editForm, setEditForm] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createProduct(form, token);
      alert(" Product created successfully");
      setForm({ name: "", description: "", price: "", category: "", image: "" });
      fetchProducts();
    } catch (err) {
      alert(" Failed to create product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id, token);
      alert(" Product deleted");
      fetchProducts();
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  const handleEditClick = (product) => {
    setEditForm({ ...product });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(editForm._id, editForm, token);
      alert("Product updated");
      setShowEditModal(false);
      fetchProducts();
    } catch (err) {
      alert("Failed to update product");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold"> Admin - Manage Products</h2>

      {/* Add Product Form */}
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-dark text-white fw-semibold">
           Add New Product
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleCreate}>
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  name="description"
                  placeholder="Short Description"
                  className="form-control"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  className="form-control"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  className="form-control"
                  value={form.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  className="form-control"
                  value={form.image}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <button type="submit" className="btn btn-success w-100 fw-semibold">
                  Add Product
                </button>
              </div>
            </div>
          </form>
        </Card.Body>
      </Card>

      <div className="row">
        {products.map((p) => (
          <div className="col-md-4 mb-4" key={p._id}>
            <Card className="h-100 shadow-sm product-card">
              {p.image && (
                <Card.Img
                  variant="top"
                  src={p.image}
                  alt={p.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <Card.Body>
                <Card.Title className="fw-bold">{p.name}</Card.Title>
                <Card.Text>{p.description}</Card.Text>
                <h6>
                  <Badge bg="success" className="me-2">
                    ₹{p.price}
                  </Badge>
                  <Badge bg="info">{p.category}</Badge>
                </h6>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleEditClick(p)}
                >
                  <PencilSquare className="me-1" /> Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(p._id)}
                >
                  <Trash className="me-1" /> Delete
                </Button>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editForm && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={editForm.price}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={editForm.image}
                  onChange={handleEditChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminProducts;
