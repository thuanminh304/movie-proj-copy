import React from 'react'
import withLayout from "hocs/withLayout"
 function ClientLayout(props) {
    return (
        <div>
            HEADER
            {props.children} 
            FOOTER
        </div>
    )
}

export default withLayout(ClientLayout)
