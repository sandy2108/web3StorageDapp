"use client";
import axios from "axios"; // Import axios for HTTP requests
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Upload from "../abi/Upload.json";
import Display from "./Display";
import Modal from "./Modal";

const Hero = () => {
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [contract, setContract] = useState(null);
  const account = useAccount();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [switchTab, setSwitchTab] = useState("upload");

  function handleSwitchTab(tab) {
    setSwitchTab(tab);
  }

  function initializeContract() {
    const currentContractAddress = "0xe55e45aB97C29d23A3D5b16eC725505FEAC02890";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newContract = new ethers.Contract(
      currentContractAddress,
      Upload,
      signer
    );
    setContract(newContract);
    setProvider(provider);
  }

  useEffect(() => {
    if (window.ethereum) {
      initializeContract();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "84995554fc4208bda24c",
            pinata_secret_api_key:
              "a31fc9fbb61c8f86d28a6849d926f1b7b50eab09390848bde5b63f8757970e52",
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        await contract.add(account.address, ImgHash); // Wait for the contract transaction to complete
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (error) {
        console.error("Unable to upload image to Pinata:", error);
        alert("Unable to upload image to Pinata");
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(data);
    };
    setFileName(data.name);
    e.preventDefault();
  };

  return (
    <div className="relative w-full min-h-screen">
      <div className="max-w-[1240px] mx-auto p-4">
        <div className="w-full">
          <h1 className="text-2xl my-3 text-white text-center ">
            Web3 Storage: The Revolution way to store the datas
          </h1>
        </div>

        <div className="bg-[#121212] rounded-[20px] p-2 md:p-5 border border-[#393939]">
          <div className="bg-[#000000] border border-[#393939] rounded-[10px] p-[3px] flex items-center">
            <button
              onClick={() => setSwitchTab("upload")}
              className={`w-full rounded-[10px] md:p-3 p-2  text-center text-[20px] font-medium leading-[24px] 
                            ${
                              switchTab === "upload"
                                ? "text-black bg-bggradient"
                                : "text-white"
                            }`}
            >
              Upload
            </button>
            <button
              onClick={() => setSwitchTab("view")}
              className={`w-full rounded-[10px] md:p-3 p-2  text-center text-[20px] font-medium leading-[24px] 
                            ${
                              switchTab === "view"
                                ? "text-black bg-bggradient"
                                : "text-white"
                            }`}
            >
              View
            </button>
          </div>

          {switchTab === "upload" ? (
            <>
              {" "}
              <div className="relative w-full my-10">
                <div className=" my-2">
                  <h1 className="text-[2xl text-white">Upload Your File: </h1>
                  <div>
                    {" "}
                    <button
                      className="share text-black font-bold my-2 text-md rounded-xl px-2 bg-primary hover:bg-red-700"
                      onClick={() => setModalOpen(true)}
                    >
                      Access Control
                    </button>
                    {modalOpen && (
                      <>
                        <div
                          onClick={() => setModalOpen(false)}
                          className="left-0 top-15 overflow-x-auto w-[500px] overflow-y-auto  absolute   z-20 flex border border-[#393939] flex-col my-3 bg-[#121212] divide-y px-5 divide-[#6E6E6E] rounded-[10px] mt-2"
                        >
                          <Modal
                            setModalOpen={setModalOpen}
                            contract={contract}
                          ></Modal>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                  <label
                    htmlFor="file-upload"
                    className="use-client flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      disabled={!account}
                      type="file"
                      id="file-upload"
                      name="data"
                      className="hidden"
                      onChange={retrieveFile}
                    />
                  </label>
                  <span className="textArea flex items-center text-red-500 font-semibold">
                    Image Name: <span className="text-white">{fileName}</span>
                  </span>
                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="upload cursor-pointer text-white w-[200px] hover:text-black rounded-2xl px-4 py-2 mt-4 bg-bggradient   "
                      disabled={!file}
                    >
                      Upload File
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="my-10 ">
                <Display contract={contract} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
