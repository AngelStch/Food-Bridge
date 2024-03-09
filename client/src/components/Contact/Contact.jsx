import "../../../public/css/animate.css";
import "../../../public/css/baguetteBox.min.css";
import "../../../public/css/bootstrap.min.css";
import "../../../public/css/style.css";
import "../../../public/css/responsive.css";
import "../../../public/css/superslides.css";
import "../../../public/css/font-awesome.min.css";
import "../../../public/css/classic.time.css";
import "../../../public/css/classic.date.css";
import "../../../public/css/classic.css";

export default function Contact() {
  return (
    <>
      <>
        <div className="contact-box">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="heading-title text-center">
                  <h2>Контакт</h2>
                  <p>Очакваме с нетърпение да чуем от вас!</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <form id="contactForm">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Твоето име"
                          required=""
                          data-error="Моля, въведете вашето име"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Твоят имейл"
                          id="email"
                          className="form-control"
                          name="name"
                          required=""
                          data-error="Моля, въведете вашия имейл"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          id="message"
                          placeholder="вашето съобщение"
                          rows={4}
                          data-error="Напишете вашето съобщение"
                          required=""
                          defaultValue={""}
                        />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="submit-button text-center">
                        <button
                          className="btn btn-common"
                          id="submit"
                          type="submit"
                        >
                          Изпрати съобщение
                        </button>
                        <div id="msgSubmit" className="h3 text-center hidden" />
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
