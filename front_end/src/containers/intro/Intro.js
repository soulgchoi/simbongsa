import React, { useState } from 'react'
import 'assets/mycss/intro.scss'
import Downup from "components/intro/Downup"
import Mparallax from "components/intro/Parallax"
import ListUp from "components/intro/ListUp"

const items = ['Lorem', 'ipsum', 'dolor', 'sit']
const config = { mass: 5, tension: 2000, friction: 200 }

export default function Intro() {
  

  return (
    <div>
      <ListUp></ListUp>
    </div> 
  )
}

