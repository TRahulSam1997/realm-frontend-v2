import { faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube, faMedium } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';

const Styles = styled.div`
    /* .center {
    display: table;
    width: 100%;
    height: 100vh;
    } */

    #social-test {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    font-size: 30px;

    .social {
        padding-left: 0px;
    }

    li {
        color: rgba(167, 146, 129, 0.6);
        list-style-type: none;
        display: inline-block;
        width: 50px;
        height: 50px;
        line-height: 50px;
        padding: 1%;
        border: 1px solid rgba(167, 146, 129, 0.4);
        cursor: pointer;
        margin-left: 10px;
        margin-bottom: 20px;
        transition: ease .3s;
        &:hover {
            color: rgba(167, 146, 129, 1);
            border: 1px solid rgba(167, 146, 129, 1);
        }
    }
    }

    .social:hover > li {
    opacity: 0.5;
    }

    .social:hover > li:hover {
    opacity: 1;
    }

    #instagram {
        position:relative;
        top: calc(18% - 10px);
    }

    #linkedin {
        position:relative;
        top: calc(18% - 10px);
    }

    #youtube {
        position:relative;
        top: calc(30% - 10px);
    }

    #medium {
        position:relative;
        top: calc(18% - 10px);
    }

`

export default function SocialIcons() {
    return (
        <Styles>
            <div className="center">
                <div id="social-test">
                    <ul className="social">
                        <li>
                            <a href="https://www.facebook.com/">
                                <FontAwesomeIcon icon={faFacebook} id="facebook"/>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/realm.project/">
                                <FontAwesomeIcon icon={faInstagram} id="instagram"/>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/trsam97">
                                <FontAwesomeIcon icon={faTwitter} id="twitter"/>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/company/18713097/">
                                <FontAwesomeIcon icon={faLinkedin} id="linkedin"/>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/rahulsam/">
                                <FontAwesomeIcon icon={faYoutube} id="youtube"/>
                            </a>
                        </li>
                        <li>
                            <a href="https://medium.com/@trahulsam/">
                                <FontAwesomeIcon icon={faMedium} id="medium"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </Styles>
    )
}