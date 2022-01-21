import ConversationProfile from "./conversationProfile";
import Options from "./options";
import "./header.css";

function Header() {
  return (
    <header className="chat__header">
      <ConversationProfile />
      <Options />
    </header>
  );
}

export default Header;
