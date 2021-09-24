import React from 'react'
import styled from 'styled-components';

const Styles = styled.div`
  .react-share__ShareButton{
        margin-right: 1rem;
        svg {
          path {
            &:hover {
              fill:rgba(255,255,255,0.2);
            }
          }
        }
  }
`
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon
} from 'react-share'

const ShareButtons = ({title, url, twitterHandle, imageurl, tags, quote}) => {

    return(
      <Styles>
        <div>
          <FacebookShareButton url={url} quote={quote} hashtag='#realm'>
                <FacebookIcon  size={40} round={true}/>
         </FacebookShareButton>

          <TwitterShareButton url={url} title={title} via={twitterHandle} hashtags={tags}>
                <TwitterIcon  size={40} round={true} />
          </TwitterShareButton>

          <LinkedinShareButton url={url} title={title} description={quote}>
            <LinkedinIcon  size={40} round={true}/>
          </LinkedinShareButton>

          <RedditShareButton url={url} title={title}>
            <RedditIcon  size={40} round={true} />
          </RedditShareButton>
        </div>
      </Styles>
      )

}
export default ShareButtons