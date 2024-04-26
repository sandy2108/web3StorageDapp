import { useEffect } from "react";

const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  };

  const removeAccess = async () => {
    const address = document.querySelector(".address").value;
    await contract.disallow(address);
    setModalOpen(false);
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <>
      <div className="modalBackground " onClick={() => setModalOpen(false)}>
        <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
          <div className="text-md font-bold text-white my-2">To Share with</div>
          <div className="body">
            <input
              type="text"
              className="address flex-1 w-full mb-2 px-2 placeholder-gray-300 focus:border-transparent focus:outline-none bg-primary/20 py-4 md:p-4 caret-primary text-white rounded-xl"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address my-2 ">People With Access</option>
            </select>
          </form>
          <div className="flex items-center my-2 gap-3 justify-between">
            <button
              onClick={() => sharing()}
              className="bg-bggradient hover:text-white w-full text-black px-2 py-1 rounded-xl"
            >
              Allow
            </button>
            <button
              onClick={() => removeAccess()}
              className="bg-bggradient hover:text-white w-full text-black px-2 py-1 rounded-xl"
            >
              Remove Access
            </button>
          </div>
          <div className="w-full my-2">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
              className="bg-bggradient hover:text-white w-full text-black px-2 py-1 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
