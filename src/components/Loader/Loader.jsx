import { Circles } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Circles
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{ margin: '0 auto' }}
      wrapperClass=""
      visible={true}
    />
  );
};
