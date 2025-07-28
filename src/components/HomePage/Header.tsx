import UserData from "./UserData";
import ButtonNSheet from "./ButtonNSheet";

const Header = () => {

  return (
    <div className="flex justify-between ml-5 mr-5 mb-10">
      <UserData />
      <ButtonNSheet />
    </div>
  );
};

export default Header;
