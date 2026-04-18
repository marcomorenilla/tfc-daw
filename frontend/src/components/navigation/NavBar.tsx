import { DesktopNavBar } from "./DesktopNavBar";
import { MobileNavBar } from "./MobileNavBar";
import { ProfileNav } from "./ProfileNav";

export default function NavBar() {
  return (
    <>
      <DesktopNavBar />
      <MobileNavBar />
      <ProfileNav />
    </>
  );
}
