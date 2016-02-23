import React from 'react';

class Footer extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <label className="navbar-text pull-left">Copyright © 2016 Ephraim Pei</label>

          <ul className="media-icons-list list-inline pull-right">

            <li><a href="http://www.ephraimpei.com">
              <img className="social-media-icon img-circle" src="/images/icons/ephraim.png"/>
            </a></li>

            <li><a href="https://www.linkedin.com/in/ephraimpei">
              <img className="social-media-icon img-circle" src="/images/icons/linkedin.png"/>
            </a></li>

            <li><a href="https://github.com/ephraimpei">
              <img className="social-media-icon img-circle" src="/images/icons/github.png"/>
            </a></li>

          </ul>
        </div>
      </div>
     );
  }
}

export default Footer;
