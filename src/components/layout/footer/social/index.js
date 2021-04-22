import { faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube, faMedium } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';

const Styles = styled.div`

`

export default function SocialIcons() {
    return (
        <Styles>
            <div className="row">
                <a href="https://www.facebook.com/">
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://www.instagram.com/realm.project/">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://twitter.com/trsam97">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://www.linkedin.com/company/18713097/">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="https://www.youtube.com/rahulsam/">
                    <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a href="https://medium.com/@trahulsam/">
                    <FontAwesomeIcon icon={faMedium} />
                </a>
            </div>
        </Styles>
    )
}