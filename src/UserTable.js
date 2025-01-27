import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, editUser, deleteUser } from './Features/users';

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  const [form, setForm] = useState({ id: '', name: '', username: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (form.name && form.username && form.email) {
      dispatch(addUser({ ...form, id: users.length + 1 }));
      setForm({ id: '', name: '', username: '', email: '' });
    }
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    setForm(user);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    dispatch(editUser({ id: form.id, updatedUser: form }));
    setForm({ id: '', name: '', username: '', email: '' });
    setIsEditing(false);
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <form onSubmit={isEditing ? handleUpdateUser : handleAddUser}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleInputChange}
          required
        />
         <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
      </form>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>phone</th>
            <th>Email</th>
            <th>City</th>
            <th>Zip Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
              <td>{user.address.zipcode}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
