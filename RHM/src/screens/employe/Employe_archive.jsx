import logo from "../../assets/bloodPocketAB+.svg";

const EmployeArchive = () => {
  return (
    <>
      <div className="border p-1 outline-offset-4 rounded-lg w-full h-full">
        <div className="bg-gray-100">
          <img src={logo} alt="logo" className="w-20 h-20 mx-auto" />
        </div>
        <p className="font-medium text-xs">Poche de sang</p>
        <div className="flex flex-row justify-between items-center mt-2 mb-4 w-full">
          <p className="bg-[#FFF8ED] py-1 px-6 rounded-2xl font-bold text-lg">
            AB+
          </p>
          <p className="text-lg">2000 FCFA</p>
        </div>
      </div>

 
    </>
  );
};

export default EmployeArchive;
