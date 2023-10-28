/* eslint-disable prettier/prettier */
import React, {createContext, useContext, useState} from 'react';

const SubscriptionContext = createContext();

export function useSubscription() {
  return useContext(SubscriptionContext);
}

export function SubscriptionProvider({children}) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const setSubscriptionStatus = status => {
    setIsSubscribed(status);
  };

  return (
    <SubscriptionContext.Provider value={{isSubscribed, setSubscriptionStatus}}>
      {children}
    </SubscriptionContext.Provider>
  );
}
