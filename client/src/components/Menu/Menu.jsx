import "../../../public/css/animate.css"
import "../../../public/css/baguetteBox.min.css"
import "../../../public/css/bootstrap.min.css"
import "../../../public/css/style.css"
import "../../../public/css/responsive.css"
import "../../../public/css/superslides.css"
import "../../../public/css/font-awesome.min.css"
import "../../../public/css/classic.time.css"
import "../../../public/css/classic.date.css"
import "../../../public/css/classic.css"


export default function Menu() {
    return (<>
        <div className="menu-box">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="heading-title text-center">
                            <h2> Menu</h2>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="special-menu text-center">
                        </div>
                    </div>
                </div>
                <div className="row special-list">
                    <div className="col-lg-4 col-md-6 special-grid drinks">
                        <div className="gallery-single fix">
                            <img src="images/img-01.jpg" className="img-fluid" alt="Image" />
                            <div className="why-text">
                                <h4>Special Drinks 1</h4>
                                <p>Sed id magna vitae eros sagittis euismod.</p>
                                <h5> $7.79</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 special-grid drinks">
                        <div className="gallery-single fix">
                            <img src="images/img-02.jpg" className="img-fluid" alt="Image" />
                            <div className="why-text">
                                <h4>Special Drinks 2</h4>
                                <p>Sed id magna vitae eros sagittis euismod.</p>
                                <h5> $9.79</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 special-grid drinks">
                        <div className="gallery-single fix">
                            <img src="images/img-03.jpg" className="img-fluid" alt="Image" />
                            <div className="why-text">
                                <h4>Special Drinks 3</h4>
                                <p>Sed id magna vitae eros sagittis euismod.</p>
                                <h5> $10.79</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 special-grid lunch">
                        <div className="gallery-single fix">
                            <img src="images/img-04.jpg" className="img-fluid" alt="Image" />
                            <div className="why-text">
                                <h4>Special Lunch 1</h4>
                                <p>Sed id magna vitae eros sagittis euismod.</p>
                                <h5> $15.79</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 special-grid lunch">
                        <div className="gallery-single fix">
                            <img src="images/img-05.jpg" className="img-fluid" alt="Image" />
                            <div className="why-text">
                                <h4>Special Lunch 2</h4>
                                <p>Sed id magna vitae eros sagittis euismod.</p>
                                <h5> $18.79</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 special-grid lunch">
                        <div className="gallery-single fix">
                            <img src="images/img-06.jpg" className="img-fluid" alt="Image" />
                            <div className="why-text">
                                <h4>Special Lunch 3</h4>
                                <p>Sed id magna vitae eros sagittis euismod.</p>
                                <h5> $20.79</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 special-grid dinner">
                        <div className="gallery-single fix">
                            <img src="images/img-07.jpg" className="img-fluid" alt="Image" />
                            <div className="why-text">
                                <h4>Special Dinner 1</h4>
                                <p>Sed id magna vitae eros sagittis euismod.</p>
                                <h5> $25.79</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 special-grid dinner">
                        <div className="gallery-single fix">
                            <img src="images/img-08.jpg" className="img-fluid" alt="Image" />
                            <div className="why-text">
                                <h4>Special Dinner 2</h4>
                                <p>Sed id magna vitae eros sagittis euismod.</p>
                                <h5> $22.79</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 special-grid dinner">
                        <div className="gallery-single fix">
                            <img src="images/img-09.jpg" className="img-fluid" alt="Image" />
                            <div className="why-text">
                                <h4>Special Dinner 3</h4>
                                <p>Sed id magna vitae eros sagittis euismod.</p>
                                <h5> $24.79</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}