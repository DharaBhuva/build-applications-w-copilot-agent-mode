import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Fetching Users from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched Users:', results);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner-border text-primary me-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span>Loading Users...</span>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      {error}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );

  return (
    <div className="card mx-auto my-4" style={{maxWidth: '1000px'}}>
      <div className="card-header bg-warning text-dark py-3">
        <h2 className="mb-0 fw-bold">👤 Users</h2>
      </div>
      <div className="card-body p-0">
        {users.length === 0 ? (
          <div className="empty-state">
            <p>No users found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  {users.length > 0 && Object.keys(users[0]).map((key) => (
                    <th key={key} className="fw-bold text-uppercase small">
                      {key.replace(/_/g, ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user.id || idx}>
                    {Object.values(user).map((val, i) => (
                      <td key={i}>{typeof val === 'object' ? JSON.stringify(val) : val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
