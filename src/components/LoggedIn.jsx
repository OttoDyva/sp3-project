// Util
import facade from "../util/apiFacade"

function LoggedIn({logged}) {

    return (
      <div>
        {facade.hasUserAccess('user', LoggedIn) && (
            <div>
        </div>
    )}
      </div>
    )
  }

export default LoggedIn