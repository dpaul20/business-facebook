import Groups from "./Groups";
import Profile from "./Profile";

export default function LeftSidebar() {
  return (
    <div className="w-full lg:w-1/4">
      <Profile />
      <Groups />
    </div>
  );
}
