"use client"
import Footer from "../components/footer/Footer.js"
import Header from "../components/header/Header.js"
import "./index.css"



function Contact() {

  return (
    <div className="contact-page">
      <Header />
      <div className="contact-content" >
        
          <h2 className="contact-element">Contact phone: +0100 3049 2933 </h2>
          <h2 className="contact-element">Social Networks:
            <i  className="fa fa-google network-element" aria-hidden="true" style={{fontSize: "32px"}}></i>
            <i className="fa fa-facebook network-element" aria-hidden="true" style={{fontSize: "32px"}}></i>
            <i className="fa fa-instagram network-element" aria-hidden="true" style={{fontSize: "32px"}}></i>
          </h2>
          <h2 className="form-column">Contact us @
            <form>
              <div className="contact-form">
                <label htmlFor="name">Name: </label>
                  <input type="text"
                  id="name"
                  name="name" />
              </div>
            </form>
            <form>
              <div className="contact-form">
                <label htmlFor="e-mail">E-mail: </label>
                  <input type="text"
                  id="e-mail"
                  name="e-mail" />
              </div>
            </form>
            <form>
              <div className="contact-form">
                <label htmlFor="message">Message: </label>
                  <textarea type="text"
                  id="message"
                  name="message"
                  style={{
                    width:"500px",
                    height:"120px",
                    borderRadius: "5px"
                  }} />
                <button type="submit" style={{borderRadius:"5px"}}>Submit</button>
              </div>
            </form>
          </h2>

          
        
        
      </div>
      <Footer />
    </div>
  )
  
}

export default Contact;
