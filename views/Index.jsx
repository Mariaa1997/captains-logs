const React = require("react");

class Index extends React.Component {
  render() {
    const { logs } = this.props;
    // const fruits = this.props.fruits;

    return (
      <div>
        <h1>Logs Index Page</h1>
        <nav>
          <a href="logs/new">Create a New Logs</a>
        </nav>
        <ul>
          {logs.map((log, i) => {
            return (
              <li>
                Title <a href={`/logs/${log._id}`}> {log.title}</a> Entry:{log.entry}{" "}
                <br></br>
                {log.shipIsBroken ? `Ship is Broken` : `Ship is NOT BROKEN`}
                <br />
                <a href={`/logs/${log._id}/edit`}> Edit This Log</a>
                <form action={`/logs/${log._id}?_method=DELETE`} method="Post">
                  <input type="submit" value="DELETE" />
                </form>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

module.exports = Index;
