import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Fetching Teams from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched Teams:', results);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setError('Failed to load teams');
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner-border text-primary me-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span>Loading Teams...</span>
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
      <div className="card-header bg-info text-white py-3">
        <h2 className="mb-0 fw-bold">👥 Teams</h2>
      </div>
      <div className="card-body p-0">
        {teams.length === 0 ? (
          <div className="empty-state">
            <p>No teams available. Create or join a team to get started!</p>
            <button className="btn btn-primary">Create Team</button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  {teams.length > 0 && Object.keys(teams[0]).map((key) => (
                    <th key={key} className="fw-bold text-uppercase small">
                      {key.replace(/_/g, ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teams.map((team, idx) => (
                  <tr key={team.id || idx}>
                    {Object.values(team).map((val, i) => (
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

export default Teams;
