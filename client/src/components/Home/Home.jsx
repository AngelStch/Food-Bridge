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

export default function Home() {
    return (
        <div className="text-center">
            <img src="/images/slider-03.jpg" alt="" style={{width : "100%", height : "auto", objectFit : 'cover'}}/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="m-b-20 p-5">
                            <strong>
                                Добре дошли в <br /> Food-Bridge
                            </strong>
                        </h1>
                        <p class="m-b-40 pb-3">
                            Добре дошли в Food-Fridge, убежище за тези, които се сблъскват със социални предизвикателства.
                            <br />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}