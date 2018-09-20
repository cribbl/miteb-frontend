import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from '../LandingPage/Footer'

class PrivacyPolicy extends Component {
  render () {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
        <h3 style={{ fontWeight: 700, margin: 30, textAlign: 'center' }}>Privacy Policy</h3>

        <div style={{ margin: 15 }}>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>Cribbl Services ("us", "we", or "our") operates the <span style={{ fontWeight: 700 }}>https://bookings.cribblservices.com</span> website (the "Service").</p>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. This Privacy Policy for Cribbl Services is compliant with the terms of <a href='https://www.eugdpr.org/' target='_blank' style={{ color: 'black', fontWeight: 700, textDecoration: 'underline' }}>GDPR</a> and is powered by FreePrivacyPolicy.com.</p>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from https://bookings.cribblservices.com</p>
        </div>

        <div style={{ margin: 15 }}>
          <h6 style={{ fontWeight: 700 }}>Information Collection And Use</h6>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
        </div>
        <div style={{ margin: 15 }}>
          <h6 style={{ fontWeight: 700 }}>Types of Data Collected</h6>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}><span style={{ fontWeight: 700 }}>Personal Data</span><br />
            While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:<br /><br />
            <ul>
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Cookies and Usage Data</li>
              <li>Usage Data</li>
            </ul>
              We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
        </div>
        <div style={{ margin: 15 }}>
          <h6 style={{ fontWeight: 700 }}>Tracking & Cookies Data</h6>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.</p>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.</p>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>

          <span style={{ fontWeight: 700 }}>Examples of Cookies we use:</span>
          <p>Session Cookies: We use Session Cookies to operate our Service.<br />
          Preference Cookies: We use Preference Cookies to remember your preferences and various settings.<br />
          Security Cookies: We use Security Cookies for security purposes.</p>
        </div>

        <div style={{ margin: 15 }}>
          <h6 style={{ fontWeight: 700 }}>Use of Data</h6>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>
          Cribbl Services uses the collected data for various purposes:
            <ul>
              <li>To provide and maintain the Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
              <li>To provide customer care and support</li>
              <li>To provide analysis or valuable information so that we can improve the Service</li>
              <li>To monitor the usage of the Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </p>
        </div>

        <div style={{ margin: 15 }}>
          <h6 style={{ fontWeight: 700 }}>Transfer Of Data</h6>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.</p>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>If you are located outside India and choose to provide information to us, please note that we transfer the data, including Personal Data, to India and process it there.</p>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>Cribbl Services will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</p>
        </div>

        <div style={{ margin: 15 }}>
          <h6 style={{ fontWeight: 700 }}>Disclosure Of Data</h6>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>Legal Requirements</p>
          <p>Cribbl Services may disclose your Personal Data in the good faith belief that such action is necessary to:
            <ul>
              <li>To comply with a legal obligation</li>
              <li>To protect and defend the rights or property of Cribbl Services</li>
              <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
              <li>To protect the personal safety of users of the Service or the public</li>
              <li>To protect against legal liability</li>
            </ul>
          </p>
        </div>

        <div style={{ margin: 15 }}>
          <h6 style={{ fontWeight: 700 }}>Security Of Data</h6>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
        </div>

        <div style={{ margin: 15 }}>
          <h6 style={{ fontWeight: 700 }}>Service Providers</h6>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</p>
          <p>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
        </div>

        <div style={{ margin: 15 }}>
          <h6 style={{ fontWeight: 700 }}>Analytics</h6>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>We may use third-party Service Providers to monitor and analyze the use of our Service.</p>
          <span style={{ fontWeight: 700 }}>Google Analytics</span>
          <p>Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.</p>
          <p>You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js, analytics.js, and dc.js) from sharing information with Google Analytics about visits activity.</p>
          <p>For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page: https://policies.google.com/privacy?hl=en</p>
        </div>

        <div style={{ margin: 15 }}>
          <h6 style={{ fontWeight: 700 }}>Links To Other Sites</h6>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
          <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
        </div>

        <div style={{ margin: 15 }}>
          <h6 style={{ fontWeight: 700 }}>Children's Privacy</h6>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>Our Service does not address anyone under the age of 18 ("Children").</p>

          <p>We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p>
        </div>

        <div style={{ margin: 15 }}>
          <h6 style={{ fontWeight: 700 }}>Changes To This Privacy Policy</h6>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
          <p>We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.</p>
          <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
        </div>

        <div style={{ margin: 15 }}>
          <h6 style={{ fontWeight: 700 }}>Contact Us</h6>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>If you have any questions about this Privacy Policy, please contact us:</p>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>By email: support@cribblservices.com</p>
          <p style={{ margin: '10px 0px', lineHeight: '20px' }}>By phone number: +91 77606 27296</p>
        </div>

        <Footer />
        <p style={{ backgroundColor: 'rgb(60, 60, 60)', width: '100%', color: 'white', fontSize: 12, padding: 5, textAlign: 'center' }}>All Rights Reserved @ <a href='https://cribblservices.com' style={{ textDecoration: 'none', color: 'white' }}>Cribbl Services</a></p>

      </div>
    )
  }
}

function mapStateToProps (state) {
  const { isMobile } = state.toggler
  return {
    isMobile
  }
}

export default connect(mapStateToProps)(PrivacyPolicy)
