const React = require('react');
const Logs = require('../models/logs');
class Show extends React.Component {
    render () {
        const logs = this.props.logs;

        return (
            <div>
                <h1> Show Page </h1>
                <p>The {Logs.title} is {Logs.entry}</p>
                <div>
                {Logs.shipIsBroken ? 'Ship is Broken' : "Ship is NOT BROKEN!"}
                </div>
            </div>
            
        )
    }
}

module.exports = Show;