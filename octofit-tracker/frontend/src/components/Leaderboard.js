import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Fetched Leaderboard:', results);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load leaderboard');
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner-border text-primary me-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span>Loading Leaderboard...</span>
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
      <div className="card-header bg-success text-white py-3">
        <h2 className="mb-0 fw-bold">🏆 Leaderboard</h2>
      </div>
      <div className="card-body p-0">
        {leaders.length === 0 ? (
          <div className="empty-state">
            <p>No leaderboard data available yet.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="fw-bold text-uppercase small">Rank</th>
                  {leaders.length > 0 && Object.keys(leaders[0]).map((key) => (
                    <th key={key} className="fw-bold text-uppercase small">
                      {key.replace(/_/g, ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leaders.map((leader, idx) => (
                  <tr key={leader.id || idx}>
                    <td className="fw-bold text-primary">{idx + 1}</td>
                    {Object.values(leader).map((val, i) => (
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

export default Leaderboard;
