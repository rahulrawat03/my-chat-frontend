import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Slider from "./slider";
import Search from "./search";
import Connections from "./connections";
import { removeSearch } from "../../services/storageService";
import "../common/common.css";
import "./friend.css";

function Friend({ modalOpened, openModal }) {
  const [tabNumber, setTabNumber] = useState(0);

  const handleModalClose = () => {
    removeSearch();
    openModal(false);
  };

  if (!modalOpened) return null;

  return (
    <section className="modal">
      <Slider tabNumber={tabNumber} setTabNumber={setTabNumber} />
      {tabNumber === 0 && <Search />}
      {tabNumber === 1 && <Connections />}
      {tabNumber === 2 && <Connections sent={true} />}
      <FaTimes className="modal__close" onClick={handleModalClose} />
    </section>
  );
}

export default Friend;
