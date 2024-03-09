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
export default function About() {
    return (
        <div className="about-section-box">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <img src="images/about-img.jpg" alt="" className="img-fluid" />
                    </div>
                    <div className="col-lg-6 col-md-6 text-center">
                        <div className="inner-column">
                            <h1>
                                Добре дошли в <span>Food-Fridge</span>
                            </h1>
                            <h4>Малка История</h4>
                            <p>
                                Добре дошли в Food-Fridge, убежище за тези, които се сблъскват със социални предизвикателства. Разбираме, че поръчването на храна понякога може да изглежда обременяващо, особено за хора, които се сблъскват с трудни социални ситуации. Затова създадохме безопасна и подкрепяща онлайн платформа, където можете да поръчате вкусни ястия без никакво добавено напрежение или тревожност.
                            </p>
                            <p>
                                Нашето потребителско съвместимо инфрачервено и състрадателно екипа за подкрепа е тук, за да направи вашето поръчване гладко и приятно. Независимо дали се сблъсквате със социална тревожност, изолация или някакво друго предизвикателство, знайте, че не сте сами. В Food-Fridge сме посветени на предоставянето на гостоприемно място, където всеки може да се наслади на удобството на доставката на храна с достойнство и комфорт.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}