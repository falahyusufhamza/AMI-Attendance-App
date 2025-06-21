import { Header } from 'antd/es/layout/layout'
import React from 'react'

function header({children}) {
  return (
    <Header className='header-container' style={{
        position: 'sticky', top: 0, zIndex: 10,
        backgroundColor: "#4287f5", color: "white", padding: 8, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        {children}
    </Header>
  )
}

export default header