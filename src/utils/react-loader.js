import RingLoader from "react-spinners/RingLoader";
import { Hourglass } from "react-loader-spinner";
function Loader(props) {
  let design = {
    display: "block",
    margin: "0 auto",
    marginTop: "20%",
    zIndex: "1111",
    backgroundSize: "cover",
  };
  return (
    <>
      {/* <RingLoader
            color={"#1976d2"}
            loading={props.loading}
            className={props.design}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> */}
      <div className="w-100 d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{design}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
      />
      </div>
    </>
  );
}

export default Loader;
