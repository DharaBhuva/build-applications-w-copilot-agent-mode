import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched Activities:', results);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setError('Failed to load activities');
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner-border text-primary me-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span>Loading Activities...</span>
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
      <div className="card-header bg-primary text-white py-3">
        <h2 className="mb-0 fw-bold">🏃 Activities</h2>
      </div>
      <div className="card-body p-0">
        {activities.length === 0 ? (
          <div className="empty-state">
            <p>No activities found. Start logging your first activity!</p>
            <button className="btn btn-primary">Add Activity</button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  {activities.length > 0 && Object.keys(activities[0]).map((key) => (
                    <th key={key} className="fw-bold text-uppercase small">
                      {key.replace(/_/g, ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={activity.id || idx}>
                    {Object.values(activity).map((val, i) => (
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

export default Activities;
