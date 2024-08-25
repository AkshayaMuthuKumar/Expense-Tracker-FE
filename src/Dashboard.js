import React, { useState } from 'react';
import { Modal, Button, Form, Table, Navbar, Nav } from 'react-bootstrap';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function Dashboard({ user, onLogout }) {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState(['Food', 'Transportation', 'Entertainment']);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
    notes: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  const handleShowAddExpenseModal = () => setShowAddExpenseModal(true);
  const handleCloseAddExpenseModal = () => setShowAddExpenseModal(false);

  const handleShowEditExpenseModal = (index) => {
    setExpenseForm(expenses[index]);
    setEditingIndex(index);
    setShowEditExpenseModal(true);
  };
  const handleCloseEditExpenseModal = () => setShowEditExpenseModal(false);

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setExpenseForm({ ...expenseForm, [name]: value });
  };

  const handleAddExpense = () => {
    setExpenses([...expenses, { ...expenseForm, date: moment(expenseForm.date).format('YYYY-MM-DD') }]);
    setExpenseForm({ description: '', amount: '', category: '', date: '', notes: '' });
    handleCloseAddExpenseModal();
  };

  const handleEditExpense = () => {
    const updatedExpenses = expenses.map((expense, index) =>
      index === editingIndex ? { ...expenseForm, date: moment(expenseForm.date).format('YYYY-MM-DD') } : expense
    );
    setExpenses(updatedExpenses);
    setExpenseForm({ description: '', amount: '', category: '', date: '', notes: '' });
    handleCloseEditExpenseModal();
  };

  const handleDeleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div>
   <Navbar bg="dark" variant="dark">
  <div className="container-fluid">
    <Navbar.Brand>Expense Tracker</Navbar.Brand>
    <Nav className="d-flex justify-content-start align-items-center">
      {user && <Navbar.Text>{user.name}</Navbar.Text>}
      <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
    </Nav>
  </div>
</Navbar>


    <div className="container mt-5">
      <h1>Expense Dashboard</h1>
      <Button variant="primary" onClick={handleShowAddExpenseModal}>
        Add Expense
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>{expense.notes}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowEditExpenseModal(index)} className="mr-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteExpense(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showAddExpenseModal} onHide={handleCloseAddExpenseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={expenseForm.description}
                onChange={handleExpenseChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={expenseForm.amount}
                onChange={handleExpenseChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" name="category" value={expenseForm.category} onChange={handleExpenseChange}>
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={expenseForm.date}
                onChange={handleExpenseChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                value={expenseForm.notes}
                onChange={handleExpenseChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddExpenseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddExpense}>
            Add Expense
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditExpenseModal} onHide={handleCloseEditExpenseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={expenseForm.description}
                onChange={handleExpenseChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={expenseForm.amount}
                onChange={handleExpenseChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" name="category" value={expenseForm.category} onChange={handleExpenseChange}>
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={expenseForm.date}
                onChange={handleExpenseChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                value={expenseForm.notes}
                onChange={handleExpenseChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditExpenseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditExpense}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>

  );
}

export default Dashboard;
