import DashboardWrapper from "~components/dashboard";
import Profile  from "~sections/Account/Profile";
import PasswordChange  from "~sections/Account/PasswordChange";

const ProfilePage = () => {

    return (
        <DashboardWrapper>
            <Profile />
            <PasswordChange />
        </DashboardWrapper>
    )
}

export default ProfilePage;