import './home.css'

export default function Home(params) {

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>

      <div className="row">
        <div className="col-3">
          Personal brand
        </div>
        <div className="col-9">
          Welcome to home page!
        </div>
      </div>
    </>
  );
};
