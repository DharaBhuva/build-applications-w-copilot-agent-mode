from django.core.management.base import BaseCommand
from octofit_tracker import models as octo_models

class Command(BaseCommand):
	help = 'Populate the octofit_db database with test data'

	def handle(self, *args, **options):
		# Delete existing data
		octo_models.User.objects.all().delete()
		octo_models.Team.objects.all().delete()
		octo_models.Activity.objects.all().delete()
		octo_models.Leaderboard.objects.all().delete()
		octo_models.Workout.objects.all().delete()

		# Create teams
		marvel = octo_models.Team.objects.create(name='Marvel')
		dc = octo_models.Team.objects.create(name='DC')

		# Create users
		ironman = octo_models.User.objects.create(email='ironman@marvel.com', name='Iron Man', team=marvel)
		captain = octo_models.User.objects.create(email='captain@marvel.com', name='Captain America', team=marvel)
		batman = octo_models.User.objects.create(email='batman@dc.com', name='Batman', team=dc)
		superman = octo_models.User.objects.create(email='superman@dc.com', name='Superman', team=dc)

		# Create activities
		octo_models.Activity.objects.create(user=ironman, type='Run', duration=30)
		octo_models.Activity.objects.create(user=batman, type='Swim', duration=45)

		# Create workouts
		octo_models.Workout.objects.create(user=captain, description='Pushups', duration=20)
		octo_models.Workout.objects.create(user=superman, description='Situps', duration=25)

		# Create leaderboard
		octo_models.Leaderboard.objects.create(user=ironman, score=100)
		octo_models.Leaderboard.objects.create(user=batman, score=90)

		self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
