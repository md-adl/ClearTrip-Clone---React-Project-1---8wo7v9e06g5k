import { Margin } from '@mui/icons-material'
import React from 'react'
import offerImage from '../../images/offerImage.png'


const Offer = () => {
  return (
    <>
    <a href="https://offers.cleartrip.com/get-upto-25-off-on-hotels-ctwinter/" >Please Check Offer</a>
    <div>
      <img src={offerImage} alt="offerImage" width={900} />
    </div>
    </>
  )
}

export default Offer
