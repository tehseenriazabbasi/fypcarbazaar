import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import {withRouter} from 'react-router-dom';
import './footer.css';
import MapContainer from './MapContainer'


const mapStyles = {
    width: '100%',
    height: '100%'
};

const FooterPagePro = () => {
    return (
        <MDBFooter className="page-footer font-small pt-0 bg-dark mt-5" style={{ color: "#ffffff" }}>
            <div className={"bg-red"}>
                <MDBContainer fluid className="text-center text-md-left">
                    <MDBRow className="py-4 d-flex align-items-center">
                        <MDBCol md="6" lg="5" className="text-center text-md-left mb-4 mb-md-0">
                            <h6 className={"mb-0 white-text"}>
                                Get connected with us on social networks!
                            </h6>
                        </MDBCol>
                        <MDBCol md="6" lg="7" className="text-center text-md-right">
                            <a className="fb-ic ml-0">
                                <i className="fa fa-facebook-f white-text mr-lg-4"> </i>
                            </a>
                            <a className="tw-ic">
                                <i className="fa fa-twitter white-text mr-lg-4"> </i>
                            </a>
                            <a className="ins-ic">
                                <i className="fa fa-instagram white-text mr-lg-4"> </i>
                            </a>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
            <MDBContainer className="mt-5 mb-4 text-center text-md-left">
                <MDBRow className="mt-3">
                    <MDBCol md="3" lg="4" xl="3" className="mb-4">
                        <h6 className="text-uppercase font-weight-bold">
                            <strong>Car Bazar</strong>
                        </h6>
                        <hr className="bg-red accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px"}} />
                        <p>
                            Home of Cars. A place where you can find what you want!
                        </p>
                    </MDBCol>

                    <MDBCol md="3" lg="2" xl="2" className="mb-4">
                        <h6 className="text-uppercase font-weight-bold">
                            <strong>Useful links</strong>
                        </h6>
                        <hr className="bg-red accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                        <p>
                            <a href="">Your Account</a>
                        </p>
                        <p>
                            <a href="/signup">Become an Affiliate</a>
                        </p>
                        <p>
                            <a href="/userSetting">Help</a>
                        </p>
                    </MDBCol>
                    <MDBCol md="4" lg="3" xl="3" className="mb-4">
                        <h6 className="text-uppercase font-weight-bold">
                            <strong>Contact</strong>
                        </h6>
                        <hr className="bg-red accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                        <p>
                            <i className="fa fa-home mr-3" /> Islamabad, CUI, Park Road
                        </p>
                        <p>
                            <i className="fa fa-envelope mr-3" /> info@carbazar.com
                        </p>
                        <p>
                            <i className="fa fa-phone mr-3" /> 0331-7354483
                        </p>

                    </MDBCol>

                    <MDBCol md="2" lg="2" xl="2" className="mb-4">
                        <h6 className="text-uppercase font-weight-bold">
                            <strong>Find us</strong>
                        </h6>
                        <hr className="bg-red accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                        <MapContainer/>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a href="https://localhost:3000"> carbazar.com </a>
                </MDBContainer>
            </div>
        </MDBFooter>
    );
}

export default withRouter(FooterPagePro);