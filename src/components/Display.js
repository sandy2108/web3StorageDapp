import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

const Display = ({ contract }) => {
  const [data, setData] = useState(null);
  const [inputAddress, setInputAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const account = useAccount();

  const getData = async () => {
    if (!contract) {
      setError("Contract not available");
      return;
    }

    const address = inputAddress.trim() || account.address;
    setIsLoading(true);

    try {
      const dataArray = await contract.display(address);
      if (dataArray.length === 0) {
        setData(null);
        toast.warn("No Assets to display");
      } else {
        setData(dataArray);
        toast.success("Assets are Fetched successfully");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.warn("Access denied! You dont have Assets between this Address.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="max-w-[1240px] mx-auto">
          <div className=" border border-primary rounded-xl p-4">
            <div className="items-center">
              <h1 className="text-2xl font-medium my-3 text-primary text-center">
                Display Images
              </h1>
              <h1 className="text-sm my-3 text-white text-center">
                Enter the address to display images from that address
              </h1>
            </div>

            <div className="my-5 flex flex-col max-w-[1/2] items-center justify-center">
              <input
                type="text"
                placeholder="Enter Address"
                className="flex-1 w-1/2 px-2 placeholder-primary-300 focus:border-transparent focus:outline-none bg-primary/20 py-4 md:p-4 caret-primary text-white rounded-xl"
                value={inputAddress}
                onChange={(e) => setInputAddress(e.target.value)}
              />

              <button
                className="bg-bggradient w-1/2 my-5 mx-auto text-black px-4 py-2 items-center justify-center rounded-xl"
                onClick={getData}
                disabled={isLoading}
              >
                Get Data
              </button>
            </div>
          </div>
          {data && data.length > 0 && (
            <div className="border rounded-xl p-3 border-primary my-20">
              <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 md:grid-cols-2 xl:gap-x-8">
                {data &&
                  data.map((url, index) => (
                    <a href={url} key={index} target="_blank" rel="noreferrer">
                      <UserImage key={index} image={url} />
                    </a>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Display;

function UserImage({ image }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      <div className=" rounded-lg bg-gray-200">
        <Link href={image} className="">
          <Image
            src={image}
            alt="/"
            width={400}
            height={300}
            layout="responsive" // Ensures images maintain aspect ratio
            objectFit="cover" // Resizes the image to cover its container while maintaining aspect ratio
            className={helperfunction(
              "group-hover:opacity-75 duration-700  ease-in-out max-w-[430px] max-h-[300px] object-cover rounded-lg overflow-hidden",
              isLoading
                ? "grayscale blur-xl scale-110"
                : "grayscale-0 blur-0 scale-100"
            )}
            onLoadingComplete={() => setLoading(false)}
          />
        </Link>
      </div>
    </>
  );
}

function helperfunction(...classes) {
  return classes.filter(Boolean).join(" ");
}
