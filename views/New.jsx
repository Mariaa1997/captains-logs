const React = require("react");

class New extends React.Component {
  render() {
    return (
      <div>
        <h1>New Logs Page</h1>
        <a href = {'/logs'} > Go to Index Page</a> <br/>
        {/* NOTE: action will be the route, method will be the HTTP verb */}
        <form action="/logs" method="POST">
          Title: <input type="text" name="title" />
          <br />
          Entry: <input type="textarea" name="entry" /> <br />
          Ship is Broken: <input type="checkbox" name="shipIsBroken" /> <br />
          <input type="submit" name="" value="submit" />
        </form>
      </div>
    );
  }
}

module.exports = New;