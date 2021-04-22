import { faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube, faMedium } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';

const Styles = styled.div`

`

export default function SocialIcons() {
    return (
        <Styles>
            <div className="row">
                <div className="pr-3">
                    <a href="https://twitter.com/trsam97">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                </div>
                <div className="pr-3">
                    <a href="https://twitter.com/trsam97">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
                <div className="pr-3">
                    <a href="https://twitter.com/trsam97">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                </div>
            </div>
        </Styles>
    )
}