
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-gradient mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src="/octofitapp-logo.png" alt="OctoFit Logo" className="navbar-logo me-2" />
              <span className="fw-bold">OctoFit Tracker</span>
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={
              <div className="text-center my-5">
                <h1 className="display-4 fw-bold mb-3">Welcome to OctoFit Tracker!</h1>
                <p className="lead text-muted mb-4">Track your fitness journey, compete with teammates, and achieve your goals.</p>
                <div className="row g-4 mt-5 justify-content-center">
                  <div className="col-md-3">
                    <div className="card h-100 text-center">
                      <div className="card-body">
                        <h5 className="card-title">🏃 Activities</h5>
                        <p className="card-text">Log and track your workouts and activities.</p>
                        <Link to="/activities" className="btn btn-primary">View Activities</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card h-100 text-center">
                      <div className="card-body">
                        <h5 className="card-title">🏆 Leaderboard</h5>
                        <p className="card-text">See how you rank against other users.</p>
                        <Link to="/leaderboard" className="btn btn-primary">View Leaderboard</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card h-100 text-center">
                      <div className="card-body">
                        <h5 className="card-title">👥 Teams</h5>
                        <p className="card-text">Join teams and compete together.</p>
                        <Link to="/teams" className="btn btn-primary">View Teams</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card h-100 text-center">
                      <div className="card-body">
                        <h5 className="card-title">💪 Workouts</h5>
                        <p className="card-text">Discover personalized workout suggestions.</p>
                        <Link to="/workouts" className="btn btn-primary">View Workouts</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
