const React = require('react');

class Show extends React.Component {
    render () {
        const log = this.props.log;

        return (
            <div>
                <h1> Show Page </h1>
                <p>The {log.title} is {log.entry}</p>
                <div>
                {log.shipIsBroken ? 'Ship is Broken' : "Ship is NOT BROKEN!"}
                </div>
            </div>
            
        )
    }
}

module.exports = Show;