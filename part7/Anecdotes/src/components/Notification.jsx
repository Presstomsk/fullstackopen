import PropTypes from 'prop-types'

const Notification = ({notification}) => {
    const style = {
        display: notification !== null ? '' : 'none'
    }

    console.log(notification)

    return(
        <div>
            <p style={style}>{notification}</p>
        </div>
    )
}

Notification.propTypes = {
    notification: PropTypes.string    
}

export default Notification