import React from 'react'

import "../../styles/InstagramPage.css";
import { FiPlusSquare, FiMenu } from "react-icons/fi";

function InstagramPage() {
   
    
  return (
    <div className="insta-container">
      {/* Header */}
      <div className="insta-header">
      <img src="/images/img1.jpg" alt="Profile" className="profile-pic" />
        <h2>Touché_Beauty</h2>
       
       
      </div>

      {/* Profile Info */}
      <div className="insta-profile">
       
        <div className="profile-stats">
          <div>
            <span className='chiffre'>18</span>
            <p className='caract'>Publications</p>
          </div>
          <div>
            <span className='chiffre'>3,993</span>
            <p className='caract'>Abonnés</p>
          </div>
          <div>
            <span className='chiffre'>480</span>
            <p className='caract'>Abonnements</p>
          </div>
        </div>
      </div>
      

      {/* Buttons */}
      

      {/* Stories Highlights */}
      <div className="insta-stories">
        
        <img src="/images/img1.jpg" alt="Profile" className="profile-pic" />
        <img src="/images/img1.jpg" alt="Profile" className="profile-pic" />
        <img src="/images/img1.jpg" alt="Profile" className="profile-pic" />
        <img src="/images/img1.jpg" alt="Profile" className="profile-pic" />
       
      </div>

      {/* Posts Grid */}
      <div className="insta-posts">
      <div className="post"><img src="/images/img1.jpg" alt="Post 1" /></div>
        <div className="post"><img src="/images/img2.jpg" alt="Post 2" /></div>
        <div className="post"><img src="/images/img3.jpg" alt="Post 3" /></div>
        <div className="post"><img src="/images/blush.jpg" alt="Post 4" /></div>
        <div className="post"><img src="/images/fondation.jpg" alt="Post 5" /></div>
        <div className="post"><img src="/images/baniere2.jpg" alt="Post 6" /></div>
      </div>
    </div>
  )
}

export default InstagramPage