import './home.css'

export default function Home(params) {

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>

      <main className="content">
        <div class="container marketing">


          <div class="row banner-block">
            <div class="col-md-7">
              <h2 class="title-text">First featurette heading.</h2>
              <p class="lead">Some great placeholder content for the first featurette here. Imagine some exciting prose here.</p>
              <a href="/" className="btn btn-primary">Create a design</a>
            </div>
            <div class="col-md-5">
              <img className="img-fluid banner-size" src="./image.png" />
            </div>
          </div>

          <br/>
          <br/>

          <div class="row banner-block">
            <div class="col-md-7 order-md-2">
              <h2 class="title-text">Oh yeah, it’s that good.</h2>
              <p class="lead">Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.</p>
              <a href="/" className="btn btn-primary">Create a design</a>
            </div>
            <div class="col-md-5 order-md-1">
              <img className="img-fluid banner-size" src="./image2.jpg" />
            </div>

          </div>

          <br/>
          <br/>

          <div class="row banner-block">
            <div class="col-md-7">
              <h2 class="title-text">And lastly, this one.</h2>
              <p class="lead">And yes, this is the last block of representative placeholder content. Again, not really intended to be actually read, simply here to give you a better view of what this would look like with some actual content. Your content.</p>
              <a href="/" className="btn btn-primary">Create a design</a>
            </div>
            <div class="col-md-5">
                <img className="img-fluid banner-size" src="./image3.png" />
            </div>
          </div>
      </div>
      </main>
    </>
  );
};
