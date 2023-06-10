const Layout = ({ children }) => {
  const getAllNote = async () => {
    const response = await getData(ENDPOINT_API);
    console.log(response);
  };

export default Layout;
