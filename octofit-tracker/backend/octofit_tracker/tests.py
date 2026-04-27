from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create(email='test@example.com', name='Test User', team=self.team)

    def test_user_creation(self):
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertEqual(self.user.team.name, 'Test Team')

    def test_activity_creation(self):
        activity = Activity.objects.create(user=self.user, type='Run', duration=30)
        self.assertEqual(activity.type, 'Run')

    def test_workout_creation(self):
        workout = Workout.objects.create(user=self.user, description='Pushups', duration=20)
        self.assertEqual(workout.description, 'Pushups')

    def test_leaderboard_creation(self):
        leaderboard = Leaderboard.objects.create(user=self.user, score=100)
        self.assertEqual(leaderboard.score, 100)
