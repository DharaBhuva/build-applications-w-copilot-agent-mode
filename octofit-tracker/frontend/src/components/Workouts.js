import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Fetching Workouts from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched Workouts:', results);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setError('Failed to load workouts');
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner-border text-primary me-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span>Loading Workouts...</span>
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
      <div className="card-header bg-danger text-white py-3">
        <h2 className="mb-0 fw-bold">💪 Workouts</h2>
      </div>
      <div className="card-body p-0">
        {workouts.length === 0 ? (
          <div className="empty-state">
            <p>No workouts available. Check back soon for personalized workout suggestions!</p>
            <button className="btn btn-primary">Browse Workouts</button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  {workouts.length > 0 && Object.keys(workouts[0]).map((key) => (
                    <th key={key} className="fw-bold text-uppercase small">
                      {key.replace(/_/g, ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, idx) => (
                  <tr key={workout.id || idx}>
                    {Object.values(workout).map((val, i) => (
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

export default Workouts;
