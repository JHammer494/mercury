import { Set, Router, Route, Private } from '@redwoodjs/router'

import UsersLayout from 'src/layouts/UsersLayout'
import HeaderLayout from 'src/layouts/HeaderLayout'
import AircraftDetailsLayout from 'src/layouts/AircraftDetailsLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Set wrap={HeaderLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
        <Private unauthenticated="home">
          <Set wrap={AircraftDetailsLayout}>
            <Route path="/aircraft-details/{id:Int}" page={AircraftDetailsPage} name="aircraftDetails" />
            <Route path="/aircraft-details/{id:Int}/inspections" page={AircraftInspectionsPage} name="aircraftInspections" />
          </Set>
          <Route path="/fleet-status" page={FleetStatusPage} name="fleetStatus" />
          <Route path="/job-list" page={JobListPage} name="jobList" />
          <Route path="/schedule" page={SchedulePage} name="schedule" />
          <Route path="/schedule-builder" page={ScheduleBuilderPage} name="scheduleBuilder" />
          <Private unauthenticated="fleetStatus" roles={['debrief', 'pro super', 'lead pro super']}>
            <Route path="/sortie-directory" page={SortieDirectoryPage} name="sortieDirectory" />
          </Private>
        </Private>
      </Set>
      <Private unauthenticated="home" roles="admin">
        <Set wrap={UsersLayout}>
          <Route path="/users" page={UserUsersPage} name="users" />
          <Route path="/users/new" page={UserNewUserPage} name="newUser" />
          <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
          <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
        </Set>
      </Private>
    </Router>
  )
}

export default Routes
