import { faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube, faMedium } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';

const Styles = styled.div`

`

const SocialIcons = () => {
    return (
        <Styles>
            {/* <h1>Test</h1>
            <div className="row">
            <div className="pr-3">
                <a href="mailto:ravitejakolla29@gmail.com">
                    <FontAwesomeIcon icon="envelope" size="2x" />
                </a>
            </div>
            <div className="pr-3">
                <a href="https://www.linkedin.com/in/ravitejakolla">
                    <FontAwesomeIcon icon={["fab", "linkedin"]} size="2x" />
                </a>
            </div>
            <div className="pr-3">
                <a href="https://github.com/ravi-kolla">
                    <FontAwesomeIcon icon={["fab", "github"]} size="2x" />
                </a>
            </div>
            <div className="pr-3">
                <a href="https://twitter.com/ravitejakolla">
                    <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
                </a>
            </div>
            </div> */}
        </Styles>
    )
}

export default SocialIcons;