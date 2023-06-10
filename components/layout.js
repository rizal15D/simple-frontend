const Layout = ({ children }) => {
  const getAllNote = async () => {
    const response = await getData(ENDPOINT_API);
    console.log(response);
  };
  return (
    <main className="h-screen grid grid-cols-6 text-gray-500 bg-white">
      <div className="flex flex-col col-span-1 flex items-center border-r border-r-1 p-2 border-r-gray-200 shadow">
        <p className="text-sm font-bold">Daftar Catatan</p>
        <div className="my-2 w-full  overflow-y-scroll">
          <div className="p-1 w-full max-h-[700px]">
            {children.list}
          </div>
        </div>
        {children.addNote}
      </div>
      {children.form}
    </main>
  );
};

export default Layout;
