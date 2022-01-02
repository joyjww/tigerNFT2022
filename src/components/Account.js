import {DrizzleContext} from '@drizzle/react-plugin';
import { newContextComponents } from '@drizzle/react-components';
import { Drizzle } from '@drizzle/store';
import Cryptopunks from './artifacts/cryptopunks.json';

const {AccountData} = newContextComponents

const drizzleOptions = {
    contracts: [Cryptopunks],
  }
  
  const drizzle = new Drizzle(drizzleOptions)

function Account () {
    <div>
    <DrizzleContext.Provider drizzle={drizzle}>
    <DrizzleContext.Consumer>
    {drizzleContext => {
            const { drizzle, drizzleState, initialized } = drizzleContext;
            if (!initialized) {
              return "Loading..."
            }
            return (
              <AccountData accountIndex={0} units="ether" precision={2} drizzle={drizzle} drizzleState={drizzleState} />
            )
          }}
    </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    </div>
}

export default Account;